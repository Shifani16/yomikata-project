import { gunzipSync } from 'fflate'

// kuromoji calls: new zlib.Zlib.Gunzip(uint8array).decompress()
class Gunzip {
  private data: Uint8Array
  constructor(data: Uint8Array) {
    this.data = data
  }
  decompress(): Uint8Array {
    const d = this.data
    // gzip files start with bytes 0x1f 0x8b; if absent, the browser
    // already decompressed the file, so return it as-is
    if (d.length > 2 && d[0] === 0x1f && d[1] === 0x8b) {
      return gunzipSync(d)
    }
    return d
  }
}

export const Zlib = { Gunzip }
export default { Zlib }