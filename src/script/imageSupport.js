/**
 * Image Support Detection modified from
 * https://dev.to/nucliweb/detect-avif-image-support-to-use-in-your-css-4pen
 */

async function supportsAvif() {
  if (!this.createImageBitmap) return false
  const avifData =
    'data:image/avif;base64,AAAAFGZ0eXBhdmlmAAAAAG1pZjEAAACgbWV0YQAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAC8AAAAGwAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAARWlwcnAAAAAoaXBjbwAAABRpc3BlAAAAAAAAAAQAAAAEAAAADGF2MUOBAAAAAAAAFWlwbWEAAAAAAAAAAQABAgECAAAAI21kYXQSAAoIP8R8hAQ0BUAyDWeeUy0JG+QAACANEkA='
  const blob = await fetch(avifData).then((r) => r.blob())
  return createImageBitmap(blob).then(
    () => true,
    () => false
  )
}
;(async () => {
  const classAvif = (await supportsAvif()) ? 'avif' : 'no-avif'
  document.querySelectorAll('.bg-image').forEach(e => e.classList.add(classAvif));
})()