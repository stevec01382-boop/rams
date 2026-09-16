import { ramsStore, checkPasscode, json } from './lib/shared.js'

export default async (req) => {
  const url = new URL(req.url)
  const passcode = url.searchParams.get('passcode') || ''
  const auth = checkPasscode(passcode)
  if (!auth.ok) return json(401, { message: auth.message })

  const id = url.searchParams.get('id')
  if (!id) return json(400, { message: 'Missing id' })

  const store = ramsStore()
  const pdf = await store.get(`pdf-${id}`, { type: 'arrayBuffer' })
  if (!pdf) return json(404, { message: 'Not found' })

  return new Response(pdf, {
    status: 200,
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': `inline; filename="RAMS-${id}.pdf"`,
    },
  })
}
