import React from 'react'
import { SectionCard, Text, TextArea } from '../components/Fields.jsx'

export default function PermitsStep({ data, patch }) {
  const p = data.permits
  return (
    <SectionCard
      title="5.0 Permits Required / Type / Issued By / Security Arrangements"
      help="Confirm whether a Permit to Work is required for this project and, if so, the type and issuing authority. Never assume no permit is required — confirm with the principal contractor/client."
    >
      <div className="field">
        <label>Permits required?</label>
        <div className="row" style={{ gap: 20 }}>
          <label className="radio-row">
            <input type="radio" name="permits-required" checked={p.required === 'yes'} onChange={() => patch('permits', { required: 'yes' })} /> Yes
          </label>
          <label className="radio-row">
            <input type="radio" name="permits-required" checked={p.required === 'no'} onChange={() => patch('permits', { required: 'no' })} /> No
          </label>
        </div>
      </div>
      {p.required === 'yes' && (
        <div className="row">
          <Text label="Permit type" value={p.type} onChange={v => patch('permits', { type: v })} placeholder="e.g. Hot works, Confined space, Permit to work at height" />
          <Text label="Issued by" value={p.issuedBy} onChange={v => patch('permits', { issuedBy: v })} placeholder="e.g. Principal Contractor's site manager" />
        </div>
      )}
      <TextArea label="Note" value={p.note} onChange={v => patch('permits', { note: v })} rows={3} />
    </SectionCard>
  )
}
