// Thin client for the Netlify Functions backend. All calls are same-origin
// (Netlify serves /.netlify/functions/* alongside the static site) so no
// base URL configuration is needed once deployed.

async function asJson(res) {
  const text = await res.text()
  try {
    return { ok: res.ok, status: res.status, body: text ? JSON.parse(text) : {} }
  } catch {
    return { ok: res.ok, status: res.status, body: { message: text } }
  }
}

export async function submitRams({ data, pdfBase64, recipients, message }) {
  const res = await fetch('/.netlify/functions/submit-rams', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data, pdfBase64, recipients, message }),
  })
  return asJson(res)
}

export async function listRams(passcode, query) {
  const res = await fetch(`/.netlify/functions/list-rams?q=${encodeURIComponent(query || '')}`, {
    headers: { 'x-rams-passcode': passcode || '' },
  })
  return asJson(res)
}

export async function getRamsPdfUrl(id, passcode) {
  return `/.netlify/functions/get-rams?id=${encodeURIComponent(id)}&passcode=${encodeURIComponent(passcode || '')}`
}

export async function resendRams(id, passcode, recipients) {
  const res = await fetch('/.netlify/functions/resend-rams', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-rams-passcode': passcode || '' },
    body: JSON.stringify({ id, recipients }),
  })
  return asJson(res)
}
