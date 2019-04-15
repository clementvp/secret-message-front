<template>
    <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <h1 class="navbar-item  is-size-4">
                <router-link class="has-text-white" :to="{ name: 'home' }">Secret messages</router-link>
            </h1>
        </div>
    </nav>
</template>
<script>
export default {
  name: 'navbar'
}
</script>
<style scoped>
.navbar {
  background-color: #4db6ac;
}
</style>
