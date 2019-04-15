<template>
  <div class="home">
    <navbar></navbar>
    <b-loading :active.sync="isLoading" :canCancel="false"></b-loading>
    <b-notification :active.sync="isActive" type="is-warning">
      {{errorMsg}}
    </b-notification>
    <div class="container">
      <b-message v-if="succes" id="message">
        <h5 class="is-size-5 has-text-centered">
          Your encrypted message generated link:
        </h5>
        <h6 class="is-size-6 has-text-centered">
          (Click on it to copy to clipboard)
        </h6>

        <p @click="doCopy" id="link" class="has-text-centered">
          {{link}}
        </p>
        <div class="has-text-centered" id="generate-again">
          <a class="button is-primary" @click="again">Generate a new message</a>
        </div>
      </b-message>
      <div class="columns is-desktop" v-if="!succes">
        <div class="column is-half">
          <div class="form">
            <h1 class="title is-4 has-text-centered">
              Secret message
            </h1>
            <b-field label="Message:">
              <b-input maxlength="500" type="textarea" v-model="message"></b-input>
            </b-field>
            <b-field class="is-grouped is-grouped-centered">
              <div class="field">
                <b-tooltip label="Time (in hours) before the message is destroyed" position="is-top" type="is-dark" multilined>
                  <label class="label">
                    <font-awesome-icon :icon="['fas', 'question-circle']" /> Time to live:</label>
                </b-tooltip>
                <div class="control">
                  <span class="select">
                    <select v-model="ttl">
                      <option value="1">1 H</option>
                      <option value="2">2 H</option>
                      <option value="3">3 H</option>
                      <option value="4">4 H</option>
                      <option value="5">5 H</option>
                      <option value="6">6 H</option>
                      <option value="7">7 H</option>
                      <option value="8">8 H</option>
                      <option value="9">9 H</option>
                      <option value="10">10 H</option>
                      <option value="11">11 H</option>
                      <option value="12">12 H</option>
                      <option value="13">13 H</option>
                      <option value="14">14 H</option>
                      <option value="15">15 H</option>
                      <option value="16">16 H</option>
                      <option value="17">17 H</option>
                      <option value="18">18 H</option>
                      <option value="19">19 H</option>
                      <option value="20">20 H</option>
                      <option value="21">21 H</option>
                      <option value="22">22H</option>
                      <option value="23">23 H</option>
                      <option value="24">24 H</option>
                    </select>
                  </span>
                </div>
              </div>
              <div class="field" id="rn-field">
                <b-tooltip label="Number of readings before the message is destroyed" position="is-top" type="is-dark" multilined>
                  <label class="label">
                    <font-awesome-icon :icon="['fas', 'question-circle']" /> Reading number: </label>
                </b-tooltip>
                <div class="control">
                  <span class="select">
                    <select v-model="rn">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </span>
                </div>
              </div>
            </b-field>
            <div class="has-text-centered">
              <a class="button is-primary" @click="encrypt">Generate</a>
            </div>
          </div>
          <div class="has-text-centered" id="hiw">
            <router-link to="how_it_works">How it works</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '../components/Navbar'
import cypher from '../services/Cypher.js'
import exchange from '../services/Exchange.js'
export default {
  name: 'home',
  components: { navbar },
  data: function () {
    return {
      message: '',
      ttl: '1',
      rn: '1',
      errorMsg: '',
      link: '',
      succes: false,
      isLoading: false,
      isActive: false
    }
  },
  methods: {
    encrypt: function () {
      this.isLoading = true
      setTimeout(() => {
        cypher.encrypt(this.message).then((data) => {
          this.send(data, this.ttl, this.rn, data.key)
        })
      }, 50)
    },
    send: function (data, ttl, rn, key) {
      exchange.send(data, ttl, rn).then((uid) => {
        this.message = ''
        this.link =
              process.env.VUE_APP_BASE_URL + '/' + uid + '/' + key
        this.succes = true
        this.isLoading = false
        this.isModalActive = true
      }).catch(() => {
        this.isLoading = false
        this.isActive = true
        this.errorMsg = 'An error occured, please retry later.'
      })
    },
    again: function () {
      this.succes = false
    },
    doCopy: function () {
      this.$copyText(this.link).then(() => {
        this.$toast.open('Copied to clipboard')
      })
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
#rn-field {
  margin-left: 10vw;
}
#hiw,
#generate-again,
#link {
  margin-top: 30px;
  word-wrap: break-word;
}
</style>
