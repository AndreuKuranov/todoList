<template>
  <div>
    <Navbar />
    <div class="container-xl">
      <router-view />
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue';

  export default {
    components: { Navbar },
  }
</script>

<style scoped>

</style>