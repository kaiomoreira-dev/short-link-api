export class ShortUrl {
  value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string): ShortUrl {
    return new ShortUrl(this.generateCode(value))
  }

  private static generateCode(value: string): string {
    let shortUrl = ''
    let shortCode = ''
    if (value.includes('localhost')) {
      shortUrl = value
    } else {
      const chars =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      for (let i = 0; i < 6; i++) {
        shortCode += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      shortUrl = `http://localhost:3333/${shortCode}`
    }

    return shortUrl
  }
}
