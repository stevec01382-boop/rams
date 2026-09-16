import React, { useEffect, useRef, useState } from 'react'

function renderTypedSignature(text) {
  const canvas = document.createElement('canvas')
  canvas.width = 500
  canvas.height = 160
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#140D1C'
  ctx.font = "64px 'Segoe Script', 'Brush Script MT', cursive"
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  // Fallback: if the cursive font isn't available the browser substitutes a
  // default font, which still produces a legible (if plainer) signature.
  ctx.fillText(text || 'Signature', canvas.width / 2, canvas.height / 2)
  return canvas.toDataURL('image/png')
}

export default function SignaturePad({ value, onSign, onClear, label }) {
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const hasInk = useRef(false)
  const [mode, setMode] = useState('draw')
  const [typedName, setTypedName] = useState('')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#140D1C'
    ctx.lineWidth = 2.2
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    hasInk.current = false
  }, [mode])

  function pos(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return {
      x: (clientX - rect.left) * (canvasRef.current.width / rect.width),
      y: (clientY - rect.top) * (canvasRef.current.height / rect.height),
    }
  }

  function start(e) {
    e.preventDefault()
    drawing.current = true
    const ctx = canvasRef.current.getContext('2d')
    const { x, y } = pos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }
  function move(e) {
    if (!drawing.current) return
    e.preventDefault()
    const ctx = canvasRef.current.getContext('2d')
    const { x, y } = pos(e)
    ctx.lineTo(x, y)
    ctx.stroke()
    hasInk.current = true
  }
  function end(e) {
    drawing.current = false
  }

  function clearCanvas() {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    hasInk.current = false
    onClear && onClear()
  }

  function saveDrawn() {
    if (!hasInk.current) return
    const dataUrl = canvasRef.current.toDataURL('image/png')
    onSign({ type: 'draw', dataUrl, capturedAt: new Date().toISOString() })
  }

  function saveTyped() {
    if (!typedName.trim()) return
    const dataUrl = renderTypedSignature(typedName.trim())
    onSign({ type: 'type', dataUrl, typedName: typedName.trim(), capturedAt: new Date().toISOString() })
  }

  if (value) {
    return (
      <div>
        <div className="sig-status" style={{ marginBottom: 6 }}>
          Signed {value.capturedAt ? new Date(value.capturedAt).toLocaleString('en-GB') : ''}
        </div>
        <img src={value.dataUrl} alt={label || 'Signature'} style={{ height: 70, border: '1px solid var(--border)', borderRadius: 8, background: '#fff' }} />
        <div style={{ marginTop: 8 }}>
          <button className="btn btn-ghost" onClick={onClear}>Clear &amp; re-sign</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="sig-tabs">
        <button className={mode === 'draw' ? 'active' : ''} onClick={() => setMode('draw')}>Draw</button>
        <button className={mode === 'type' ? 'active' : ''} onClick={() => setMode('type')}>Type</button>
      </div>
      {mode === 'draw' ? (
        <>
          <canvas
            ref={canvasRef}
            width={500}
            height={160}
            className="sig-box"
            style={{ width: '100%', maxWidth: 420, height: 140 }}
            onMouseDown={start}
            onMouseMove={move}
            onMouseUp={end}
            onMouseLeave={end}
            onTouchStart={start}
            onTouchMove={move}
            onTouchEnd={end}
          />
          <div className="sig-controls">
            <button className="btn btn-secondary btn-sm" onClick={clearCanvas}>Clear</button>
            <button className="btn btn-primary btn-sm" onClick={saveDrawn}>Save signature</button>
          </div>
        </>
      ) : (
        <>
          <input value={typedName} onChange={e => setTypedName(e.target.value)} placeholder="Type your full name" style={{ maxWidth: 420 }} />
          {typedName && <div className="typed-sig-preview">{typedName}</div>}
          <div className="sig-controls">
            <button className="btn btn-primary btn-sm" onClick={saveTyped}>Use typed signature</button>
          </div>
        </>
      )}
    </div>
  )
}
