import React, { useEffect, useState } from 'react'
import { listRams, resendRams } from '../lib/api.js'

const PASS_KEY = 'hutchi-rams-passcode'

export default function Records() {
  const [passcode, setPasscode] = useState(() => sessionStorage.getItem(PASS_KEY) || '')
  const [unlocked, setUnlocked] = useState(false)
  const [query, setQuery] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendState, setResendState] = useState({})

  async function load(pc) {
    setLoading(true)
    setError('')
    const res = await listRams(pc, query)
    setLoading(false)
    if (res.ok) {
      setRows(res.body.items || [])
      setUnlocked(true)
      sessionStorage.setItem(PASS_KEY, pc)
    } else if (res.status === 401) {
      setError('Incorrect passcode.')
      setUnlocked(false)
    } else {
      setError(res.body?.message || 'Could not load records.')
    }
  }

  useEffect(() => {
    if (passcode) load(passcode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleUnlock(e) {
    e.preventDefault()
    load(passcode)
  }

  async function handleResend(id) {
    setResendState(s => ({ ...s, [id]: 'sending' }))
    const res = await resendRams(id, passcode)
    setResendState(s => ({ ...s, [id]: res.ok ? 'sent' : 'error' }))
  }

  if (!unlocked) {
    return (
      <div className="page" style={{ maxWidth: 480 }}>
        <div className="card">
          <h3>Records — passcode required</h3>
          <p className="card-help">
            Stored RAMS contain names, signatures and site addresses, so this page is protected by a shared
            passcode (set as <code>RAMS_ADMIN_PASSCODE</code> in Netlify's environment variables).
          </p>
          <form onSubmit={handleUnlock}>
            <div className="field">
              <label>Passcode</label>
              <input type="password" value={passcode} onChange={e => setPasscode(e.target.value)} autoFocus />
            </div>
            {error && <div className="error-text" style={{ marginBottom: 10 }}>{error}</div>}
            <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Checking…' : 'Unlock'}</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <h2>Records</h2>
      <div className="records-toolbar">
        <input
          placeholder="Search by client, job ref or site..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && load(passcode)}
        />
        <button className="btn btn-secondary btn-sm" onClick={() => load(passcode)}>Search</button>
        <button className="btn btn-ghost btn-sm" onClick={() => { setUnlocked(false); sessionStorage.removeItem(PASS_KEY) }}>Lock</button>
      </div>

      {error && <div className="banner error">{error}</div>}
      {loading && <p className="card-help">Loading…</p>}

      {!loading && rows.length === 0 && <p className="card-help">No stored RAMS match your search.</p>}

      {rows.length > 0 && (
        <table className="simple">
          <thead>
            <tr>
              <th>Client / Project</th><th>Job Ref</th><th>Site</th><th>Issue Date</th><th>Status</th><th>Signed by</th><th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.clientName}</td>
                <td>{r.jobRef}</td>
                <td>{r.siteName}</td>
                <td>{r.issueDate}</td>
                <td><span className={`badge ${r.status === 'completed' ? 'complete' : 'draft'}`}>{r.status}</span></td>
                <td>{r.signedCount} operative(s){r.reviewerSigned ? ' + QA' : ''}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <a className="btn btn-secondary btn-sm" href={getRamsPdfUrlSync(r.id, passcode)} target="_blank" rel="noreferrer">View PDF</a>{' '}
                  <button className="btn btn-secondary btn-sm" onClick={() => handleResend(r.id)} disabled={resendState[r.id] === 'sending'}>
                    {resendState[r.id] === 'sending' ? 'Sending…' : resendState[r.id] === 'sent' ? 'Sent ✓' : resendState[r.id] === 'error' ? 'Failed — retry' : 'Resend email'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

function getRamsPdfUrlSync(id, passcode) {
  return `/.netlify/functions/get-rams?id=${encodeURIComponent(id)}&passcode=${encodeURIComponent(passcode || '')}`
}
