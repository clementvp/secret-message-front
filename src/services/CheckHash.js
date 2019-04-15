import bcrypt from 'bcryptjs'
class CheckHash {
  check (key, hash) {
    return new Promise(function (resolve, reject) {
      var bool = bcrypt.compareSync(key, hash)
      if (bool) {
        resolve()
      } else {
        reject(new Error('This secret doesn\'t exist or has expired'))
      }
    })
  }
}

export default new CheckHash()
