import React from 'react'
import RiskPill from './RiskPill.jsx'

const SL_OPTIONS = [1, 2, 3, 4, 5]

export default function HazardEditor({ hazards, onChange }) {
  function update(i, field, value) {
    const next = hazards.slice()
    next[i] = { ...next[i], [field]: value }
    onChange(next)
  }
  function add() {
    onChange([...hazards, { hazard: '', risk: '', s: 1, l: 1, control: '', rs: 1, rl: 1, notes: '' }])
  }
  function remove(i) {
    onChange(hazards.filter((_, idx) => idx !== i))
  }

  return (
    <div>
      {hazards.map((h, i) => (
        <div key={i} className="selected-card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hazard {i + 1}</strong>
            {hazards.length > 1 && <button className="btn-ghost" onClick={() => remove(i)}>✕ remove</button>}
          </div>
          <div className="hazard-grid">
            <div className="field">
              <label>Hazard</label>
              <textarea rows={2} value={h.hazard} onChange={e => update(i, 'hazard', e.target.value)} />
            </div>
            <div className="field">
              <label>Risk (what could happen)</label>
              <textarea rows={2} value={h.risk} onChange={e => update(i, 'risk', e.target.value)} />
            </div>
            <div className="field">
              <label>Notes</label>
              <textarea rows={2} value={h.notes} onChange={e => update(i, 'notes', e.target.value)} />
            </div>
          </div>
          <div className="row" style={{ marginTop: 4 }}>
            <div className="field" style={{ maxWidth: 140 }}>
              <label>Initial severity</label>
              <select value={h.s} onChange={e => update(i, 's', Number(e.target.value))}>
                {SL_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="field" style={{ maxWidth: 140 }}>
              <label>Initial likelihood</label>
              <select value={h.l} onChange={e => update(i, 'l', Number(e.target.value))}>
                {SL_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="field" style={{ display: 'flex', alignItems: 'center', paddingTop: 20 }}>
              <RiskPill s={h.s} l={h.l} />
            </div>
          </div>
          <div className="field">
            <label>Control measures</label>
            <textarea rows={3} value={h.control} onChange={e => update(i, 'control', e.target.value)} />
          </div>
          <div className="row">
            <div className="field" style={{ maxWidth: 140 }}>
              <label>Residual severity</label>
              <select value={h.rs} onChange={e => update(i, 'rs', Number(e.target.value))}>
                {SL_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="field" style={{ maxWidth: 140 }}>
              <label>Residual likelihood</label>
              <select value={h.rl} onChange={e => update(i, 'rl', Number(e.target.value))}>
                {SL_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="field" style={{ display: 'flex', alignItems: 'center', paddingTop: 20 }}>
              <RiskPill s={h.rs} l={h.rl} />
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-secondary btn-sm" onClick={add}>+ Add hazard row</button>
    </div>
  )
}
