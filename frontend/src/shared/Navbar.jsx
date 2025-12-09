import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
  const [displayName, setDisplayName] = useState('')
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  const readAuth = () => {
    try {
      const raw = localStorage.getItem('user')
      const parsed = raw ? JSON.parse(raw) : null
      const name = parsed?.name || localStorage.getItem('name') || ''
      setDisplayName(name)
      setIsLoggedIn(!!localStorage.getItem('token'))
    } catch {
      setDisplayName('')
      setIsLoggedIn(false)
    }
  }

  useEffect(() => { readAuth() }, [location])

  useEffect(() => {
    const onAuthChanged = () => readAuth()
    window.addEventListener('auth-changed', onAuthChanged)
    return () => window.removeEventListener('auth-changed', onAuthChanged)
  }, [])

  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const signOut = () => {
    localStorage.clear()
    setOpen(false)
    window.dispatchEvent(new CustomEvent('auth-changed'))
    navigate('/customer/auth')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white backdrop-blur-sm padding-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <nav className="flex items-center justify-between h-16">
          <Link to="/" className="text-4xl font-bold tracking-wide relative">SHAKTI</Link>

          <div className="hidden md:flex items-center gap-3 text-xl md:text-2xl">
            <Link to="/about" className="px-3 py-1 rounded hover:bg-white/10 transition duration-200">About</Link>
            <Link to="/safety" className="px-3 py-1 rounded hover:bg-white/10 transition duration-200">Safety</Link>
            <Link to="/blog" className="px-3 py-1 rounded hover:bg-white/10 transition duration-200">Blog</Link>
            <Link to="/contact" className="px-3 py-1 rounded hover:bg-white/10 transition duration-200">Contact</Link>

            {isLoggedIn ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setOpen(v => !v)}
                  className="ml-2 px-4 py-2 rounded-full bg-white text-black border border-white/20 shadow-sm select-none hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] transition duration-200 transform hover:scale-105 flex items-center gap-2"
                  aria-haspopup="true"
                  aria-expanded={open}
                >
                  <span className="font-semibold truncate max-w-[140px]">{displayName || 'Account'}</span>
                  <span className="inline-block w-2 h-2 border-b-2 border-r-2 border-black rotate-45 mt-1"></span>
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 w-[340px] bg-white text-gray-900 rounded-xl shadow-2xl ring-1 ring-gray-200 p-4 z-50 select-none hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] transition duration-200 ">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">{displayName || 'Account'}</h3>
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">👤</div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                      <span>★ 5</span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <button className="bg-gray-100 rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-gray-200">
                        <span>👜</span>
                        <span className="text-sm">Wallet</span>
                      </button>
                      <button className="bg-gray-100 rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-gray-200">
                        <span>🧾</span>
                        <span className="text-sm">Activity</span>
                      </button>
                    </div>

                    <div className="mt-4 divide-y">
                      <button onClick={() => { setOpen(false); navigate('/account') }} className="w-full flex items-center gap-3 py-3 hover:bg-gray-50 px-2">
                        <span>👤</span>
                        <span>Manage account</span>
                      </button>
                      <button onClick={() => { setOpen(false); navigate('/customer/dashboard') }} className="w-full flex items-center gap-3 py-3 hover:bg-gray-50 px-2">
                        <span>🚕</span>
                        <span>Ride</span>
                      </button>
                      <button onClick={() => { setOpen(false); navigate('/driver/auth') }} className="w-full flex items-center gap-3 py-3 hover:bg-gray-50 px-2">
                        <span>🛵</span>
                        <span>Drive & deliver</span>
                      </button>
                    </div>

                    <div className="mt-4">
                      <button onClick={signOut} className="w-full bg-red-600 text-white shadow-lg hover:shadow-red-200 rounded-lg py-3 hover:bg-red-500 text-2xl md:text-2xl transition duration-100 hover:scale-95">Sign out</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/customer/auth" className="px-4 py-2 rounded bg-blue-600 text-white">Customer</Link>
                <Link to="/driver/auth" className="px-4 py-2 rounded bg-pink-600 text-white">Driver</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
