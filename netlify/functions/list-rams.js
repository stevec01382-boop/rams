import { ramsStore, json, checkPasscode, readIndex } from './lib/shared.js'

export default async (req) => {
  const url = new URL(req.url)
  const passcode = req.headers.get('x-rams-passcode') || url.searchParams.get('passcode') || ''
  const auth = checkPasscode(passcode)
  if (!auth.ok) return json(401, { message: auth.message })

  const q = (url.searchParams.get('q') || '').toLowerCase().trim()
  const store = ramsStore()
  const list = await readIndex(store)

  const items = q
    ? list.filter(r =>
        [r.clientName, r.jobRef, r.siteName].some(f => (f || '').toLowerCase().includes(q))
      )
    : list

  return json(200, { items })
}
