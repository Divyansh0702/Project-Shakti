import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleMap, useLoadScript, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import api from '../shared/api'

const libraries = ['places']

export default function CustomerDashboard() {
  const navigate = useNavigate()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  })

  const [pickup, setPickup] = useState({ address: '', lat: null, lng: null })
  const [drop, setDrop] = useState({ address: '', lat: null, lng: null })
  const pickupAutocomplete = useRef(null)
  const dropAutocomplete = useRef(null)
  const pickupInputRef = useRef(null)
  const dropInputRef = useRef(null)
  const [fare, setFare] = useState(null)
  const [distanceKm, setDistanceKm] = useState(null)
  const serviceOptions = [
    { key: 'bike', name: 'Bike', icon: '🏍️', perKm: 12 },
    { key: 'auto', name: 'Auto', icon: '🛺', perKm: 18 },
    { key: 'shakti_go', name: 'Shakti Go', icon: '🚕', perKm: 20 },
    { key: 'shakti_xl', name: 'Shakti XL', icon: '🚖', perKm: 25 },
  ]
  const [selectedService, setSelectedService] = useState('bike')
  const center = useMemo(() => ({ lat: 28.6139, lng: 77.2090 }), []) 
  const [when, setWhen] = useState('now') 
  const [forWhom, setForWhom] = useState('me')
  const [showWhenPanel, setShowWhenPanel] = useState(false)
  const [directions, setDirections] = useState(null)
  const today = new Date()
  const addDays = (d, n) => { const t = new Date(d); t.setDate(t.getDate() + n); return t }
  const [scheduleDate, setScheduleDate] = useState(today.toISOString().slice(0,10))
  const [scheduleTime, setScheduleTime] = useState(() => {
    const hh = String(today.getHours()).padStart(2, '0')
    const mm = String(today.getMinutes()).padStart(2, '0')
    return `${hh}:${mm}`
  })

  // Guard: ensure logged in as customer; otherwise redirect to customer auth
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (!token || role !== 'customer') {
      navigate('/customer/auth')
    }
  }, [navigate])

  useEffect(() => {
    if (pickup.lat && drop.lat && window.google) {
      const service = new window.google.maps.DistanceMatrixService()
      const origin = new window.google.maps.LatLng(pickup.lat, pickup.lng)
      const destination = new window.google.maps.LatLng(drop.lat, drop.lng)
      service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
      }, (resp) => {
        try {
          const meters = resp?.rows?.[0]?.elements?.[0]?.distance?.value || 0
          const km = meters / 1000
          setDistanceKm(km)
          const perKm = serviceOptions.find(s => s.key === selectedService)?.perKm || 20
          setFare(Math.round(km * perKm))
        } catch (e) {
          console.error('Distance matrix error', e)
        }
      })
    }
  }, [pickup, drop, selectedService])

  useEffect(() => {
    try {
      if (!window.google || !pickup.lat || !drop.lat) { setDirections(null); return }
      const ds = new window.google.maps.DirectionsService()
      const origin = new window.google.maps.LatLng(pickup.lat, pickup.lng)
      const destination = new window.google.maps.LatLng(drop.lat, drop.lng)
      ds.route({ origin, destination, travelMode: window.google.maps.TravelMode.DRIVING }, (res, status) => {
        if (status === 'OK') setDirections(res)
        else setDirections(null)
      })
    } catch { setDirections(null) }
  }, [pickup, drop])

  const handlePickupPlace = () => {
    const place = pickupAutocomplete.current?.getPlace?.()
    const loc = place?.geometry?.location
    const lat = loc?.lat?.(); const lng = loc?.lng?.()
    if (lat && lng) {
      setPickup({ address: place.formatted_address || place.name || pickup.address, lat, lng })
    }
  }
  const handleDropPlace = () => {
    const place = dropAutocomplete.current?.getPlace?.()
    const loc = place?.geometry?.location
    const lat = loc?.lat?.(); const lng = loc?.lng?.()
    if (lat && lng) {
      setDrop({ address: place.formatted_address || place.name || drop.address, lat, lng })
    }
  }

  const geocodeAddress = async (address, setFn, current) => {
    try {
      if (!window.google || !address) return
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const loc = results[0].geometry.location
          setFn({ address: results[0].formatted_address, lat: loc.lat(), lng: loc.lng() })
        } else {
          // keep address, clear coords
          setFn({ ...current, lat: null, lng: null })
        }
      })
    } catch (e) { console.error('Geocode failed', e) }
  }

  const bookRide = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await api.post('/rides/request', {
        pickup,
        drop,
        fare,
        service: selectedService,
        distanceKm,
      }, { headers: { Authorization: `Bearer ${token}` } })
      alert(`Ride requested. Assigned driver: ${data?.driver?.name || 'TBD'}`)
    } catch (err) {
      const status = err?.response?.status
      const message = err?.response?.data?.message || 'Ride request failed'
      if (status === 401 || status === 403) {
        alert(`${message}. Please login as customer.`)
        navigate('/customer/auth')
      } else {
        alert(message)
      }
    }
  }

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[420px_1fr] font-poppins ">
      {/* Left panel */}
      <aside className="p-6 bg-white border-r bg-gradient-to-br from-indigo-300 via-fuchsia-200 to-pink-300">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold mb-4">Get a ride</h2>

          {/* Pickup */}
          <div className="mb-3">
            <div className="flex items-center justify-between rounded-lg border px-3 py-2 border-black">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-pink-600 inline-block" />
                <span className="text-md font-medium">Pickup location</span>
              </div>
            </div>
            <Autocomplete onLoad={(ac) => { pickupAutocomplete.current = ac }} onPlaceChanged={handlePickupPlace}>
              <input
                ref={pickupInputRef}
                value={pickup.address}
                onChange={(e) => setPickup({ address: e.target.value, lat: null, lng: null })}
                onBlur={() => geocodeAddress(pickup.address, setPickup, pickup)}
                placeholder="Enter pickup address"
                className="mt-2 w-full border rounded-lg px-3 py-2 border-black"
              />
            </Autocomplete>
          </div>

          {/* Dropoff */}
          <div className="mb-3">
            <div className="flex items-center justify-between rounded-lg border px-3 py-2 border-black">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded bg-purple-600 inline-block" />
                <span className="text-md font-medium">Dropoff location</span> 
              </div>
            </div>
            <Autocomplete onLoad={(ac) => { dropAutocomplete.current = ac }} onPlaceChanged={handleDropPlace}>
              <input
                ref={dropInputRef}
                value={drop.address}
                onChange={(e) => setDrop({ address: e.target.value, lat: null, lng: null })}
                onBlur={() => geocodeAddress(drop.address, setDrop, drop)}
                placeholder="Enter drop address"
                className="mt-2 w-full border rounded-lg px-3 py-2 border-black"
              />
            </Autocomplete>
          </div>

          {/* When (expandable panel similar to reference) */}
          <div className="mb-3">
            <div
              className="flex items-center justify-between rounded-lg border px-3 py-2 cursor-pointer border-black  "
              onClick={() => setShowWhenPanel(v => !v)}
            >
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-gray-700 inline-block" />
                <span className="text-sm font-medium">Pickup {when === 'now' ? 'now' : 'later'}</span>
              </div>
              <span className="text-lg text-gray-500">{showWhenPanel ? '▴' : '▾'}</span>
            </div>

            {showWhenPanel && (
              <div className="mt-3 rounded-lg border border-black px-4 py-4 space-y-4">
                <h3 className="text-lg font-semibold">When do you want to be picked up?</h3>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <span className="inline-block w-4">📅</span> Date
                    </label>
                    <input
                      type="date"
                      className="border rounded px-2 py-1 text-sm"
                      value={scheduleDate}
                      min={today.toISOString().slice(0,10)}
                      max={addDays(today, 90).toISOString().slice(0,10)}
                      onChange={(e) => setScheduleDate(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <span className="inline-block w-4">⏰</span> Time
                    </label>
                    <input
                      type="time"
                      step="300"
                      className="border rounded px-2 py-1 text-sm"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-3"><span className="w-4">🗓️</span><p>Choose pickup time up to 90 days in advance</p></div>
                  <div className="flex items-start gap-3"><span className="w-4">⏳</span><p>Extra wait time included to meet your ride</p></div>
                  <div className="flex items-start gap-3"><span className="w-4">≡</span><p>Cancel at no charge up to 60 minutes in advance</p></div>
                </div>

                <button
                  className="w-full px-4 py-3 rounded-lg bg-black text-white font-semibold"
                  onClick={() => { setWhen('later'); setShowWhenPanel(false) }}
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* For me */}
          <div className="mb-5">
            <div className="flex items-center justify-between rounded-lg border border-black px-3 py-2">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-gray-700 inline-block" />
                <span className="text-sm font-medium">For {forWhom === 'me' ? 'me' : 'someone else'}</span>
              </div>
              <select className="text-sm border rounded px-2 py-1" value={forWhom} onChange={(e) => setForWhom(e.target.value)}>
                <option value="me">Me</option>
                <option value="friend">Someone else</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-4 grid grid-cols-2 gap-4">
            <div className="font-medium text-md text-gray-800 flex items-center gap-2 border border-black rounded-md px-2 py-1">Distance: {distanceKm ? `${distanceKm.toFixed(2)} km` : '-'}</div>
            <div className="font-medium text-md text-gray-800 flex items-center gap-2 border border-black rounded-md px-2 py-1">Estimated fare: {fare ? `₹${fare}` : '-'}</div>  
          </div>

          {/* Search Button */}
          <button
            disabled={!pickup.lat || !drop.lat}
            onClick={bookRide}
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold disabled:opacity-50"
          >
            Search
          </button>

          <div className="mt-5">
            <h3 className="text-sm font-medium mb-2">Select service</h3>
            <ul className="space-y-2">
              {serviceOptions.map(s => {
                const isActive = selectedService === s.key
                const estLow = distanceKm ? Math.round(distanceKm * s.perKm * 0.9) : null
                const estHigh = distanceKm ? Math.round(distanceKm * s.perKm * 1.1) : null
                return (
                  <li key={s.key}>
                    <button
                      type="button"
                      onClick={() => setSelectedService(s.key)}
                      className={`w-full flex items-center justify-between rounded-xl border border-black px-4 py-3 ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{s.icon}</span>
                        <span className="text-sm font-semibold">{s.name}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {distanceKm ? `₹ ${estLow} - ₹ ${estHigh}` : '–'}
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </aside>

      {/* Map area */}
      <div className="h-[80vh] lg:h-screen">
        <GoogleMap center={center} zoom={12} mapContainerStyle={{ width: '100%', height: '100%' }}>
          {pickup.lat && <Marker position={{ lat: pickup.lat, lng: pickup.lng }} />}
          {drop.lat && <Marker position={{ lat: drop.lat, lng: drop.lng }} />}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{ suppressMarkers: true, polylineOptions: { strokeColor: '#4F46E5', strokeOpacity: 0.9, strokeWeight: 5 } }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  )
}
