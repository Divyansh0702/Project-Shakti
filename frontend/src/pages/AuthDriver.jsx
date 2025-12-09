import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../shared/api'
import CameraCapture from '../components/CameraCapture'
// Firebase authentication removed

export default function AuthDriver() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [stage, setStage] = useState('form')
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '', gender: 'Female',
    vehicleNumber: '', vehicleModel: ''
  })
  const [license, setLicense] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [otp, setOtp] = useState('')
  const [otpInfo, setOtpInfo] = useState('')
  const [confirmResult, setConfirmResult] = useState(null)

  useEffect(() => {
    // Reset selfie and stage when switching modes
    setPhoto(null)
    setStage('form')
  }, [mode])
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const e = {}
    if (!form.email || !form.email.includes('@')) e.email = 'Valid email required'
    if (mode === 'login') {
      if (!form.password || form.password.length < 4) e.password = 'Minimum 4 characters'
      if (!photo) e.photo = 'Selfie is required'
    } else if (mode === 'register') {
      if (stage === 'form') {
        if (!form.password || form.password.length < 4) e.password = 'Minimum 4 characters'
        if (!form.name) e.name = 'Name is required'
        if (!form.phone) {
          e.phone = 'Phone is required'
        } else {
          const e164 = /^\+[1-9]\d{6,14}$/
          if (!e164.test(form.phone)) {
            e.phone = 'Use international format, e.g. +91XXXXXXXXXX'
          }
        }
        if (!form.vehicleNumber) e.vehicleNumber = 'Vehicle number is required'
        if (!form.vehicleModel) e.vehicleModel = 'Vehicle model is required'
        if (!photo) e.photo = 'Selfie is required'
      } else if (stage === 'otp') {
        if (!otp || otp.length < 4) e.otp = 'Enter the OTP sent to you'
      }
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    try {
      if (!validate()) return
      setIsSubmitting(true)
      if (mode === 'login') {
        const fd = new FormData()
        fd.append('email', form.email)
        fd.append('password', form.password)
        if (photo) fd.append('photo', photo, 'selfie.jpg')
        const resp = await api.post('/auth/driver/login', fd)
        const data = resp.data
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', 'driver')
        localStorage.setItem('user', JSON.stringify(data.user))
        if (data?.user?.name) localStorage.setItem('name', data.user.name)
        window.dispatchEvent(new CustomEvent('auth-changed'))
        navigate('/driver/dashboard')
        return
      }

      if (mode === 'register' && stage === 'form') {
        const fd = new FormData()
        Object.entries(form).forEach(([k,v])=> fd.append(k, v))
        if (license) fd.append('license', license)
        if (photo) fd.append('photo', photo, 'selfie.jpg')
        // Let the browser set the correct multipart boundary automatically
        await api.post('/auth/driver/register', fd)
        // Immediately login after successful register
        const login = await api.post('/auth/driver/login', { email: form.email, password: form.password })
        localStorage.setItem('token', login.data.token)
        localStorage.setItem('role', 'driver')
        localStorage.setItem('user', JSON.stringify(login.data.user))
        if (login?.data?.user?.name) localStorage.setItem('name', login.data.user.name)
        window.dispatchEvent(new CustomEvent('auth-changed'))
        navigate('/driver/dashboard')
        return
      }
      // No OTP stage
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-[100dvh] overflow-hidden px-6 py-16 bg-gradient-to-br from-pink-800 via-slate-800 to-indigo-900 text-white">
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 bg-gradient-to-br from-fuchsia-500/25 to-indigo-500/25 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-gradient-to-br from-cyan-400/20 to-pink-600/20 blur-3xl rounded-full" />

      <section className="relative mx-auto w-full max-w-md font-poppins">
        <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl p-6">
          <h2 className="text-3xl font-semibold tracking-tight">Driver {mode === 'login' ? 'Login' : (stage==='form' ? 'Register' : 'Verify OTP')}</h2>
          <p className="mt-4 text-sm text-white/70">Sign in to access your driver dashboard.</p>

        <div className="flex gap-2 mt-4 mb-8">
          <button
            onClick={() => { setMode('login'); setErrors({}) }}
            className={`relative inline-flex items-center justify-center p-0.5 overflow-hidden rounded-xl group bg-gradient-to-br from-purple-500 to-pink-500 focus:ring-2 focus:outline-none ${mode==='login'?'':'opacity-80'}`}
          >
            <span className="relative px-4 py-2.5 leading-5 bg-white/10 text-white rounded-[inherit] transition-all ease-in duration-75 group-hover:bg-transparent">Login</span>
          </button>
          <button
            onClick={() => { setMode('register'); setErrors({}) }}
            className={`relative inline-flex items-center justify-center p-0.5 overflow-hidden rounded-xl group bg-gradient-to-br from-purple-500 to-pink-500 focus:ring-2 focus:outline-none ${mode==='register'?'':'opacity-80'}`}
          >
            <span className="relative px-4 py-2.5 leading-5 bg-white/10 text-white rounded-[inherit] transition-all ease-in duration-75 group-hover:bg-transparent">Register</span>
          </button>
        </div>

        <form onSubmit={submit} className="mt-2 space-y-4">
          {mode==='register' && (
            <>
              <div>
                <label className="block text-sm text-white/80 mb-1">Name</label>
                <input name="name" value={form.name} onChange={onChange} placeholder="Your name" className={`w-full rounded-xl bg-white/10 border ${errors.name?'border-red-500':'border-white/20'} px-3 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-fuchsia-400/60`} />
                {errors.name && <p className="text-rose-300 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Phone</label>
                <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone number" className={`w-full rounded-xl bg-white/10 border ${errors.phone?'border-red-500':'border-white/20'} px-3 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-indigo-400/60`} />
                {errors.phone && <p className="text-rose-300 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Vehicle Number</label>
                <input name="vehicleNumber" value={form.vehicleNumber} onChange={onChange} placeholder="Vehicle number" className={`w-full rounded-xl bg-white/10 border ${errors.vehicleNumber?'border-red-500':'border-white/20'} px-3 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-indigo-400/60`} />
                {errors.vehicleNumber && <p className="text-rose-300 text-xs mt-1">{errors.vehicleNumber}</p>}
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Vehicle Model</label>
                <input name="vehicleModel" value={form.vehicleModel} onChange={onChange} placeholder="Vehicle model" className={`w-full rounded-xl bg-white/10 border ${errors.vehicleModel?'border-red-500':'border-white/20'} px-3 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-indigo-400/60`} />
                {errors.vehicleModel && <p className="text-rose-300 text-xs mt-1">{errors.vehicleModel}</p>}
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Upload License (image/pdf)</label>
                <input type="file" accept="image/*,application/pdf" onChange={(e)=> setLicense(e.target.files?.[0]||null)} className="w-full text-white" />
                {license && <p className="text-xs text-white/70 mt-1">Selected: {license.name}</p>}
              </div>
              <div>
                <CameraCapture onCapture={setPhoto} label="Quick Selfie Verification" />
                {errors.photo && <p className="text-rose-300 text-xs mt-1">{errors.photo}</p>}
              </div>
            </>
          )}
          <div>
            <label className="block text-sm text-white/80 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" className={`w-full rounded-xl bg-white/10 border ${errors.email?'border-red-500':'border-white/20'} px-3 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-fuchsia-400/60`} />
            {errors.email && <p className="text-rose-300 text-xs mt-1">{errors.email}</p>}
          </div>
          {stage==='form' && (
            <div>
              <label className="block text-sm text-white/80 mb-1">Password</label>
              <input type="password" name="password" value={form.password} onChange={onChange} placeholder="••••" className={`w-full rounded-xl bg-white/10 border ${errors.password?'border-red-500':'border-white/20'} px-3 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-indigo-400/60`} />
              {errors.password && <p className="text-rose-300 text-xs mt-1">{errors.password}</p>}
            </div>
          )}
          {mode==='login' && (
            <div>
              <CameraCapture onCapture={setPhoto} label="Quick Selfie Verification" />
              {errors.photo && <p className="text-rose-300 text-xs mt-1">{errors.photo}</p>}
            </div>
          )}
          <div className="pt-2">
            <button disabled={isSubmitting} type="submit" className={`w-full py-3 rounded-xl font-medium shadow-lg transition ${isSubmitting ? 'bg-white/20 text-white cursor-not-allowed' : 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500'}`}>
              {mode==='login' ? 'Login' : 'Register & Login'}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white hover:bg-white/15">⟵ Back to Home</Link>
        </div>
        </div>
      </section>
    </main>
  )
}
