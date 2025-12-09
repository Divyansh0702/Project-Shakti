import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../shared/api'

export default function ManageAccount() {
  const navigate = useNavigate()
  const [role, setRole] = useState(localStorage.getItem('role') || 'customer')
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user') || '{}') } catch { return {} }
  })
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(() => {
    const p = user?.phone || ''
    return p?.startsWith('+91') ? p : (p ? `+91${p.replace(/^\+?91/, '')}` : '+91')
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setRole(localStorage.getItem('role') || 'customer')
    try { setUser(JSON.parse(localStorage.getItem('user') || '{}')) } catch {}
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      setSaving(true)
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }
      const path = role === 'driver' ? '/auth/driver/me' : '/auth/customer/me'
      const { data } = await api.put(path, { email, phone }, { headers })
      if (data?.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
        if (data.user?.name) localStorage.setItem('name', data.user.name)
        window.dispatchEvent(new CustomEvent('auth-changed'))
      }
      setMessage('Account updated successfully')
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Update failed'
      setMessage(msg)
    } finally {
      setSaving(false)
    }
  }

  const displayName = user?.name || localStorage.getItem('name') || 'Account'

  return (
    <main className="relative min-h-[100dvh] overflow-hidden px-6 py-16 bg-gradient-to-br from-pink-800 via-slate-800 to-indigo-900 text-white">
      {/* Decorative gradient blurs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 bg-gradient-to-br from-fuchsia-500/25 to-indigo-500/25 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-gradient-to-br from-cyan-400/20 to-pink-600/20 blur-3xl rounded-full" />

      <section className="relative mx-auto w-full max-w-2xl">
        {/* Glass card */}
        <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="px-8 pt-8 pb-4 text-center">
            <div className="mx-auto w-24 h-24 rounded-full border-2 grid place-items-center bg-white/10 border border-white/20 shadow-lg">
              <span className="text-3xl">👤</span>
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">{displayName}</h2>
            <p className="mt-1 text-sm text-white/70">{email || user?.email || ''}</p>
          </div>

          {/* Divider */}
          <div className="mx-8 my-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Form */}
          <div className="px-8 pb-8">
            <h3 className="text-lg font-medium">Update Your Details</h3>
            <form onSubmit={submit} className="mt-6 space-y-5">
              <div>
                <label className="block text-sm text-white/80 mb-1">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">✉️</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-white/10 border border-white/20 px-10 py-2.5 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-fuchsia-400/60"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1">Phone</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">📞</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl bg-white/10 border border-white/20 px-10 py-2.5 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-indigo-400/60"
                    placeholder="+91XXXXXXXXXX"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className={`w-full rounded-xl py-3 font-medium shadow-lg transition ${saving ? 'bg-white/20 text-white cursor-not-allowed' : 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500'} `}
              >
                {saving ? 'Saving...' : 'Save changes'}
              </button>
            </form>

            {message && (
              <p
                className={`mt-4 text-center text-sm rounded-lg px-3 py-2 border ${/success|updated/i.test(message) ? 'bg-emerald-400/10 border-emerald-400/30 text-emerald-200' : 'bg-rose-400/10 border-rose-400/30 text-rose-200'}`}
              >
                {message}
              </p>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white hover:bg-white/15"
              >
                ⟵ Back to Home
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
