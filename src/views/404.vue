<template>
  <div class="notFound">
    <navbar></navbar>
    <div class="container">
      <div class="columns is-desktop">
        <div class="column is-half">
          <h1 class="title is-4 has-text-centered">
            404
          </h1>
          <h1 class="title is-4 has-text-centered">
            Ooops the page doesn't exist
          </h1>
          <div class="has-text-centered">
            <router-link :to="{ name: 'home' }">
              <a class="button is-primary">Back Home</a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from '../components/Navbar'
export default {
  name: 'notFound',
  components: { navbar }
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
