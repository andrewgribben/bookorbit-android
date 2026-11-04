/**
 * Creates a loader that serves one local EPUB's entries lazily, straight out of the on-disk zip,
 * instead of base64-ing the whole file through the WebView bridge first. Mirrors
 * makeStreamingLoader's interface (loadText, loadBlob, getSize) so it drops into
 * `new EPUB(loader).init()` the same way; the difference is purely where bytes come from - here,
 * `LocalEpubAssetHandler` on the Android side, intercepted via shouldInterceptRequest rather than
 * a real network fetch.
 *
 * @param {string} baseUrl - origin-relative base ending in '/', e.g. 'https://appassets.androidplatform.net/local-epub/'
 * @returns {Promise<Object>} Loader interface compatible with Foliate's EPUB class
 */
export const makeLocalZipLoader = async (baseUrl) => {
  const res = await fetch(`${baseUrl}entries.json`)
  if (!res.ok) throw new Error(`Failed to list local EPUB entries: ${res.status}`)
  const entries = await res.json()
  const map = new Map(entries.map((e) => [e.name, e]))

  const entryUrl = (name) => `${baseUrl}entry/${name.split('/').map(encodeURIComponent).join('/')}`

  const loadText = async (name) => {
    if (!name || !map.has(name)) return null
    try {
      const response = await fetch(entryUrl(name))
      if (!response.ok) return null
      return await response.text()
    } catch (e) {
      console.error(`Error loading local text ${name}:`, e)
      return null
    }
  }

  const loadBlob = async (name, type) => {
    if (!name || !map.has(name)) return null
    try {
      const response = await fetch(entryUrl(name))
      if (!response.ok) return null
      const blob = await response.blob()
      return type ? new Blob([blob], { type }) : blob
    } catch (e) {
      console.error(`Error loading local blob ${name}:`, e)
      return null
    }
  }

  const getSize = (name) => map.get(name)?.size ?? 0

  return { loadText, loadBlob, getSize }
}

export default makeLocalZipLoader
