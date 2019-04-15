import axios from 'axios'
class Exchange {
  send (result, ttl, rn) {
    return new Promise(function (resolve, reject) {
      const hash = result.hash
      const iv = result.iv
      const salt = result.salt
      const encrypted = result.encrypted
      axios.post(process.env.VUE_APP_API_URL, {
        encrypted: encrypted,
        hash: hash,
        ttl: Number(ttl),
        rn: Number(rn),
        iv: iv,
        salt: salt
      }).then(function (response) {
        if (response.data.errors) {
          reject(new Error('An error occured during exchange procedure'))
        } else {
          resolve(response.data.uid)
        }
      }).catch(function () {
        reject(new Error('An error occured during exchange procedure'))
      })
    })
  }
  retrieve (uid) {
    return new Promise(function (resolve, reject) {
      axios.get(process.env.VUE_APP_API_URL + '/' + uid).then((response) => {
        if (response.data.errors) {
          reject(new Error('This secret doesn\'t exist or has expired'))
        } else {
          resolve(response.data)
        }
      }).catch(() => {
        reject(new Error('An error occured please retry later'))
      })
    })
  }
}
export default new Exchange()
