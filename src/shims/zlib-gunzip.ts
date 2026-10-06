import { gunzipSync } from 'fflate'

class Gunzip {
  private data: Uint8Array
  constructor(data: Uint8Array) {
    this.data = data
  }
  decompress(): Uint8Array {
    const d = this.data
    if (d.length > 2 && d[0] === 0x1f && d[1] === 0x8b) {
      return gunzipSync(d)
    }
    return d
  }
}

export const Zlib = { Gunzip }
export default { Zlib }