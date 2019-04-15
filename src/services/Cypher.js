const crypto = require('crypto')
var bcrypt = require('bcryptjs')
class Cypher {
  encrypt (text, keyy) {
    return new Promise(function (resolve, reject) {
      let key = null
      if (keyy) {
        key = keyy
      } else {
        key = crypto.randomBytes(40).toString('hex')
      }
      const hash = bcrypt.hashSync(key, 10)
      const salt = crypto.randomBytes(256).toString('hex')
      const iv = crypto.randomBytes(16)
      const ek = crypto.pbkdf2Sync(key, salt, 50000, 32, 'sha256')
      const cipher = crypto.createCipheriv('aes-256-ctr', ek, iv)
      let encrypted = cipher.update(text, 'utf8', 'hex')
      encrypted += cipher.final()
      resolve({ key: key, iv: iv.toString('hex'), salt: salt, hash: hash, encrypted: encrypted })
    })
  }

  decrypt (enc, key, iiv, salt) {
    return new Promise(function (resolve, reject) {
      try {
        const iv = Buffer.from(iiv, 'hex')
        const ek = crypto.pbkdf2Sync(key, salt, 50000, 32, 'sha256')
        const decipher = crypto.createDecipheriv('aes-256-ctr', ek, iv)
        let decrypted = decipher.update(enc, 'hex', 'utf8')
        decrypted += decipher.final('utf8')
        resolve({ message: decrypted, error: false })
      } catch (err) {
        reject(new Error('An error occured during decryption process'))
      }
    })
  }
}

export default new Cypher()
