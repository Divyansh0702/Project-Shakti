import { useEffect, useRef, useState } from 'react'

export default function CameraCapture({ onCapture, label = 'Capture photo' }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isBusy, setIsBusy] = useState(false)
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')
  const [tempFile, setTempFile] = useState(null)
  const [isFront, setIsFront] = useState(true)

  const open = async () => {
    try {
      setError('')
      setIsBusy(true)
      const constraints = { video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream
      const v = videoRef.current
      if (v) {
        v.srcObject = stream
        v.muted = true
        v.setAttribute('playsinline', 'true')
        await v.play()
      }
      try {
        const track = stream.getVideoTracks?.()[0]
        const settings = track?.getSettings?.() || {}
        const fm = settings.facingMode
        setIsFront(fm ? fm === 'user' : true)
      } catch {}
      setIsOpen(true)
    } catch (e) {
      setError('Camera access failed. Please allow camera permissions.')
    } finally {
      setIsBusy(false)
    }
  }

  const close = () => {
    try {
      const s = streamRef.current
      if (s) s.getTracks().forEach(t => t.stop())
    } catch {}
    streamRef.current = null
    setIsOpen(false)
  }

  const capture = async () => {
    const v = videoRef.current
    if (!v) return
    const w = v.videoWidth || 640
    const h = v.videoHeight || 480
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (isFront) {
      ctx.translate(w, 0)
      ctx.scale(-1, 1)
    }
    ctx.drawImage(v, 0, 0, w, h)
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.92))
    if (blob) {
      const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' })
      const url = URL.createObjectURL(blob)
      setPreview(url)
      setTempFile(file)
      onCapture && onCapture(file)
    }
  }

  useEffect(() => {
    return () => {
      try {
        const s = streamRef.current
        if (s) s.getTracks().forEach(t => t.stop())
      } catch {}
    }
  }, [])

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button type="button" onClick={open} disabled={isBusy} className={`px-4 py-2 rounded ${isBusy?'bg-gray-300':'bg-gray-900 hover:bg-black'} text-white`}>
          {isBusy ? 'Opening…' : (isOpen ? 'Camera On' : 'Open Camera')}
        </button>
        <span className="text-sm text-gray-700">{label}</span>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      {isOpen && !tempFile && (
        <div className="space-y-3">
          <video ref={videoRef} autoPlay playsInline className="w-full rounded border" style={{ objectFit: 'cover', transform: isFront ? 'scaleX(-1)' : 'none' }} />
          <div className="flex gap-2">
            <button type="button" onClick={capture} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">Capture</button>
            <button type="button" onClick={close} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Close</button>
          </div>
        </div>
      )}

      {preview && (
        <div className="mt-2">
          <img src={preview} alt="preview" className="max-h-48 rounded border" />
          <div className="mt-2 flex gap-2">
            <button type="button" onClick={() => { setTempFile(null); setPreview(''); }} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Retake</button>
            <button type="button" onClick={() => { if (tempFile) { onCapture && onCapture(tempFile) } close() }} className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white">Use Photo</button>
          </div>
        </div>
      )}
    </div>
  )
}
