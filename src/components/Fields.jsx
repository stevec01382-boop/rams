import React from 'react'

export function Field({ label, hint, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
      {hint && <div className="hint">{hint}</div>}
    </div>
  )
}

export function Text({ label, hint, value, onChange, placeholder, type = 'text' }) {
  return (
    <Field label={label} hint={hint}>
      <input type={type} value={value || ''} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
    </Field>
  )
}

export function TextArea({ label, hint, value, onChange, placeholder, rows = 4 }) {
  return (
    <Field label={label} hint={hint}>
      <textarea rows={rows} value={value || ''} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
    </Field>
  )
}

export function SectionCard({ title, kicker, help, children, right }) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          {kicker && <div className="pill">{kicker}</div>}
          <h3 style={{ marginTop: kicker ? 8 : 0 }}>{title}</h3>
        </div>
        {right}
      </div>
      {help && <p className="card-help">{help}</p>}
      {children}
    </div>
  )
}
