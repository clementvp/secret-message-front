<template>
    <div class="hiw">
        <navbar></navbar>
        <div class="container">
            <h1 class="is-size-2">
                How it works ?
            </h1>
            <div>
                <div class="one">
                    <p>Provide a secret message, a lifetime and a reading number options</p>
                    <p>We use the AES encryption algorithm to encrypt your message with a generated strong key</p>
                    <p>The encrypted message is stored in our databse with a unique identifier</p>
                    <p>A link is generated and provided to you</p>
                    <p>Share this link with people</p>
                    <p>When the link is visited the secret is retrieved and decrypted</p>
                </div>
                <div class="two">
                    <p>When the lifetime you set has expired, the message is destroyed in our database</p>
                    <p>When the message is read the number of time you specified in the reading number option, it's destroyed in our database</p>
                    <p>You have the choice to configure both of these options</p>
                </div>
                <div class="three">
                    <p>The encryption keys are never stored</p>
                    <p>The encryption is made front side</p>
                    <p>The encryption keys are parts of the generated link, please be carreful with it</p>
                    <p>We can't decrypt your secret messages</p>
                    <p>It's a zero knowledge system</p>
                    <p>It's a end to end encryption system</p>
                </div>
                <div class="four">
                    <a class="button is-primary" @click="home">Back Home</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import navbar from '../components/Navbar'
export default {
  name: 'Hiw',
  components: { navbar },
  methods: {
    home: function () {
      this.$router.push({name: 'home'})
    }
  }
}
</script>
<style scoped>
.container {
  margin-top: 2vh;
  width: 92vw;
}
.one,
.two,.three {
  margin-top: 5vh;
}
.four{
    margin-top: 20px;
    margin-bottom: 40px;
}
</style>
