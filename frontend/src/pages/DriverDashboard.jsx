import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../shared/api'

export default function DriverDashboard() {
  const navigate = useNavigate()
  const [location, setLocation] = useState(null)
  const [request, setRequest] = useState(null)
  const [isOnDuty, setIsOnDuty] = useState(false)
  const [isActing, setIsActing] = useState(false)
  const [history, setHistory] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!token || role !== 'driver' || !user?._id) return
    const fetchHistoryOnce = async () => {
      try {
        const { data } = await api.get(`/rides/driver/${user._id}/history`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setHistory(data?.history || [])
      } catch {}
    }
    fetchHistoryOnce()
  }, [])

  // Track live location
  useEffect(() => {
    const watch = navigator.geolocation?.watchPosition?.((pos) => {
      const { latitude, longitude } = pos.coords
      setLocation({ lat: latitude, lng: longitude })
    })
    return () => navigator.geolocation?.clearWatch?.(watch)
  }, [])

  // Update availability + location
  useEffect(() => {
    const send = async () => {
      const token = localStorage.getItem('token')
      if (!token) return
      try {
        await api.post(
          '/driver/me/status',
          { isAvailable: isOnDuty, location },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } catch { }
    }
    if (location !== null) send()
  }, [location, isOnDuty])

  // Fetch incoming requests
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    if (!token || role !== 'driver' || !user?._id) {
      setRequest(null)
      if (!token || role !== 'driver') navigate('/driver/auth')
      return
    }

    const updateStatus = async () => {
      try {
        await api.post(
          '/driver/me/status',
          { isAvailable: isOnDuty, location },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } catch { }
    }

    const fetchReq = async () => {
      if (!isOnDuty) return
      try {
        const { data } = await api.get(`/rides/driver/${user._id}/pending`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setRequest(data?.ride || null)
      } catch (err) {
        const status = err?.response?.status
        const message = err?.response?.data?.message || 'Failed to fetch ride requests'
        if (status === 401 || status === 403) {
          alert(`${message}. Please login as driver.`)
          navigate('/driver/auth')
        }
      }
    }

    const fetchHistory = async () => {
      try {
        const { data } = await api.get(`/rides/driver/${user._id}/history`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setHistory(data?.history || [])
      } catch {}
    }

    let interval
    updateStatus()

    if (isOnDuty) {
      fetchReq()
      fetchHistory()
      interval = setInterval(fetchReq, 5000)
    } else {
      setRequest(null)
    }

    return () => interval && clearInterval(interval)
  }, [isOnDuty, location])

  const accept = async () => {
    if (!request || !isOnDuty || isActing) return
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (!token || role !== 'driver') { navigate('/driver/auth'); return }
    try {
      setIsActing(true)
      await api.post(`/rides/${request._id}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Ride accepted')
      setRequest(null)
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const { data } = await api.get(`/rides/driver/${user._id}/history`, { headers: { Authorization: `Bearer ${token}` } })
      setHistory(data?.history || [])
    } catch (err) {
      const status = err?.response?.status
      const message = err?.response?.data?.message || err.message
      if (status === 401 || status === 403) {
        alert(`${message}. Please login as driver.`)
        navigate('/driver/auth')
      } else {
        alert(message)
      }
    } finally {
      setIsActing(false)
    }
  }

  const reject = async () => {
    if (!request || !isOnDuty || isActing) return
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (!token || role !== 'driver') { navigate('/driver/auth'); return }
    try {
      setIsActing(true)
      await api.post(`/rides/${request._id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Ride rejected')
      setRequest(null)
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const { data } = await api.get(`/rides/driver/${user._id}/history`, { headers: { Authorization: `Bearer ${token}` } })
      setHistory(data?.history || [])
    } catch (err) {
      const status = err?.response?.status
      const message = err?.response?.data?.message || err.message
      if (status === 401 || status === 403) {
        alert(`${message}. Please login as driver.`)
        navigate('/driver/auth')
      } else {
        alert(message)
      }
    } finally {
      setIsActing(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-200 via-white to-pink-200 font-poppins">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-30" />
        <div className="absolute top-48 -right-24 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply blur-3xl opacity-30" />
        <div className="absolute bottom-[-4rem] left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-blue-200 rounded-full mix-blend-multiply blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-600 to-rose-600 font-merriweather">Driver Dashboard</h2>

        {/* Container for glowing button + ignition text */}
        <div className='bg-black w-[150px] h-[150px] rounded-lg flex flex-col items-center justify-center text-white shadow-[0_0_15px_#97f3ff] transition-all duration-500'>

          {/* BUTTON (GLOW PINK WHEN ON) */}
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              checked={isOnDuty}
              onChange={() => setIsOnDuty((v) => !v)}
              className="hidden peer"
            />

            <div
              className="
                w-[70px] h-[70px] rounded-full 
          bg-neutral-600 border-2 border-neutral-500 
          flex items-center justify-center 
          shadow-inner shadow-black/80 
          transition-all duration-500
          peer-checked:border-white
          peer-checked:bg-cyan-200/60
          peer-checked:shadow-[0_0_1px_#97f3ff_inset,0_0_2px_#97f3ff_inset,0_0_10px_#97f3ff_inset,0_0_40px_#97f3ff,0_0_100px_#97f3ff,0_0_5px_#97f3ff]
          active:translate-y-[2px]
                active:translate-y-[2px]
              "
            >
              {/* Icon */}
              <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-6 transition peer-checked:drop-shadow-[0_0_6px_#ff69d0]"
              >
                <path
                  className="fill-neutral-700 peer-checked:fill-white"
                  d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"
                />
              </svg>
            </div>
          </label>

          {/* IGNITION TEXT */}
          <div className="mt-3 text-sm font-semibold">
            {isOnDuty ? "Stop Ignition" : "Start Ignition"}
          </div>

        </div>
        </div>

        {/* Status and location cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl p-4">
            <div className="text-lg text-gray-600">Status</div>
            <div className="mt-1 text-lg font-semibold">
              <span className={isOnDuty ? 'text-green-700' : 'text-gray-700'}>
                {isOnDuty ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl p-4">
            <div className="text-lg text-gray-600">Location</div>
            <div className="mt-1 text-lg font-semibold text-gray-800">
              {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Fetching...'}
            </div>
          </div>
        </div>

      {request ? (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6">
          <h3 className="font-semibold mb-3">Incoming Ride Request</h3>

          <p><span className="font-semibold">Pickup:</span> {request.pickup?.address}</p>
          <p><span className="font-semibold">Drop:</span> {request.drop?.address}</p>
          <p><span className="font-semibold">Fare:</span> ₹{request.fare}</p>

          <div className="mt-4 flex gap-2">
            <button
              onClick={accept}
              disabled={!isOnDuty || isActing}
              className={`px-4 py-2 rounded ${(!isOnDuty || isActing)
                ? 'bg-green-600/60 cursor-not-allowed'
                : 'bg-green-600 text-white'}`}
            >
              Accept
            </button>

            <button
              onClick={reject}
              disabled={!isOnDuty || isActing}
              className={`px-4 py-2 rounded ${(!isOnDuty || isActing)
                ? 'bg-red-600/60 cursor-not-allowed'
                : 'bg-red-600 text-white'}`}
            >
              Reject
            </button>
          </div>
        </div>
      ) : (
        <div className="text-gray-700">
          {isOnDuty ? 'No pending ride requests.' : 'You are OFF Duty. Toggle to ON Duty to receive requests.'}
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-3xl font-bold mb-3">History</h3>
        {history.length === 0 ? (
          <div className="text-gray-700">No history yet.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {history.map((h) => (
              <div key={`${h.rideId}-${h.at}`} className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm">{new Date(h.at).toLocaleString()}</div>
                  <span className={`px-2 py-1 rounded text-white ${h.decision==='accepted'?'bg-green-600':'bg-red-600'}`}>{h.decision}</span>
                </div>
                <div className="mt-2 text-sm">
                  <p><span className="font-semibold">Pickup:</span> {h.pickup?.address}</p>
                  <p><span className="font-semibold">Drop:</span> {h.drop?.address}</p>
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <div>₹{h.fare}</div>
                  <div>{h.distanceKm ? `${h.distanceKm.toFixed(2)} km` : ''}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
