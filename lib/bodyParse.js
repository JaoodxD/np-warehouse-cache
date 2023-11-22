import parse from './safeJsonParse.js'

export default async function bodyParse(body) {
  const chunks = []
  for await (const data of body) {
    chunks.push(data)
  }
  const response = parse(Buffer.concat(chunks).toString())
  return response
}
