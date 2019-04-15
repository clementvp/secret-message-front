<template>
    <div class="retrieve">
        <navbar></navbar>
        <b-loading :active.sync="isLoading" :canCancel="false"></b-loading>
        <b-notification :active.sync="isNotifActive" type="is-warning">
            {{errorMsg}}
        </b-notification>
        <div class="container">
            <div class="columns is-desktop">
                <div class="column is-half">
                    <div class="form">
                        <div v-if="!this.error">
                            <h1 class="title is-4 has-text-centered">
                            Decrypted secret message:
                        </h1>
                        <b-field label="Message:">
                            <b-input maxlength="500" type="textarea" v-model="decryptedMsg"></b-input>
                        </b-field>
                        </div>
                        <div class="has-text-centered">
                            <router-link :to="{ name: 'home' }"><a class="button is-primary" >Create a secret message</a></router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import navbar from '../components/Navbar'
import exchange from '../services/Exchange.js'
import cypher from '../services/Cypher.js'
import CheckHash from '../services/CheckHash.js'
export default {
  name: 'Retrieve',
  components: { navbar },
  data: function () {
    return {
      errorMsg: '',
      decryptedMsg: '',
      isLoading: false,
      isNotifActive: false,
      error: false
    }
  },
  mounted: async function () {
    this.isLoading = true
    let uid = this.$route.params.uid
    let key = this.$route.params.key
    try {
      let response = await exchange.retrieve(uid)
      const encrypted = response.data.encrypted
      const salt = response.data.salt
      const iv = response.data.iv
      const hash = response.data.hash
      await CheckHash.check(key, hash)
      const decryptedData = await cypher.decrypt(encrypted, key, iv, salt)
      this.isLoading = false
      this.decryptedMsg = decryptedData.message
    } catch (err) {
      this.error = true
      this.isLoading = false
      this.errorMsg = err.message
      this.isNotifActive = true
    }
  }
}
</script>
<style scoped>
    .container {
  width: 92vw;
  margin-top: 10vh;
  margin-right: auto;
  margin-left: auto;
}
.column {
  margin-left: auto;
  margin-right: auto;
}
</style>
