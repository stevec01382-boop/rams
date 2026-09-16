import React from 'react'
import { SectionCard, Text } from '../components/Fields.jsx'
import SignaturePad from '../components/SignaturePad.jsx'
import { blankOperative } from '../state/initialData.js'

export default function SignOffStep({ data, setSection }) {
  const s = data.signOff

  function updateOp(id, field, value) {
    setSection('signOff', {
      ...s,
      operatives: s.operatives.map(o => (o.id === id ? { ...o, [field]: value } : o)),
    })
  }
  function signOp(id, sig) {
    setSection('signOff', {
      ...s,
      operatives: s.operatives.map(o => (o.id === id ? { ...o, signature: sig, signedAt: new Date().toISOString() } : o)),
    })
  }
  function clearOp(id) {
    setSection('signOff', {
      ...s,
      operatives: s.operatives.map(o => (o.id === id ? { ...o, signature: null, signedAt: null } : o)),
    })
  }
  function addOp() {
    setSection('signOff', { ...s, operatives: [...s.operatives, blankOperative()] })
  }
  function removeOp(id) {
    setSection('signOff', { ...s, operatives: s.operatives.filter(o => o.id !== id) })
  }

  function updateReviewer(field, value) {
    setSection('signOff', { ...s, reviewer: { ...s.reviewer, [field]: value } })
  }
  function signReviewer(sig) {
    setSection('signOff', { ...s, reviewer: { ...s.reviewer, signature: sig, signedAt: new Date().toISOString() } })
  }
  function clearReviewer() {
    setSection('signOff', { ...s, reviewer: { ...s.reviewer, signature: null, signedAt: null } })
  }

  function updateClient(field, value) {
    setSection('signOff', { ...s, clientRep: { ...s.clientRep, [field]: value } })
  }
  function signClient(sig) {
    setSection('signOff', { ...s, clientRep: { ...s.clientRep, signature: sig, signedAt: new Date().toISOString() } })
  }
  function clearClient() {
    setSection('signOff', { ...s, clientRep: { ...s.clientRep, signature: null, signedAt: null } })
  }

  return (
    <>
      <SectionCard
        title="Operative sign-off"
        help="Operatives' confirmation that they have read, understood and will comply with the details outlined in this RAMS. Each person signs on this device before starting work."
      >
        {s.operatives.map((op, i) => (
          <div key={op.id} className="operative-card">
            <div className="operative-head">
              <strong>Operative {i + 1}</strong>
              {s.operatives.length > 1 && <button className="btn-ghost" onClick={() => removeOp(op.id)}>✕ remove</button>}
            </div>
            <div className="row">
              <Text label="Name" value={op.name} onChange={v => updateOp(op.id, 'name', v)} />
              <Text label="Role" value={op.role} onChange={v => updateOp(op.id, 'role', v)} />
            </div>
            <SignaturePad value={op.signature} onSign={sig => signOp(op.id, sig)} onClear={() => clearOp(op.id)} label={op.name} />
          </div>
        ))}
        <button className="btn btn-secondary btn-sm" onClick={addOp}>+ Add operative</button>
      </SectionCard>

      <SectionCard title="Internal QA reviewer sign-off" help="The person who reviewed this RAMS before issue (see Document Control on page 1).">
        <div className="row">
          <Text label="Name" value={s.reviewer.name} onChange={v => updateReviewer('name', v)} />
          <Text label="Role" value={s.reviewer.role} onChange={v => updateReviewer('role', v)} />
        </div>
        <SignaturePad value={s.reviewer.signature} onSign={signReviewer} onClear={clearReviewer} label={s.reviewer.name} />
      </SectionCard>

      <SectionCard title="Client representative sign-off (optional)" help="Enable if the client/principal contractor wants to countersign this RAMS.">
        <label className="checkbox-row" style={{ marginBottom: 12 }}>
          <input type="checkbox" checked={s.clientRep.enabled} onChange={e => updateClient('enabled', e.target.checked)} />
          Include a client representative signature
        </label>
        {s.clientRep.enabled && (
          <>
            <div className="row">
              <Text label="Name" value={s.clientRep.name} onChange={v => updateClient('name', v)} />
              <Text label="Role" value={s.clientRep.role} onChange={v => updateClient('role', v)} />
            </div>
            <SignaturePad value={s.clientRep.signature} onSign={signClient} onClear={clearClient} label={s.clientRep.name} />
          </>
        )}
      </SectionCard>
    </>
  )
}
