export default function parse (text) {
  try {
    return JSON.parse(text)
  } catch (error) {
    console.log(text)
    return null
  }
}
