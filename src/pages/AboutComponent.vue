<template>
  <div>
    <my-button
      type="button"
      class="btn-info mt-3 mb-3"
      @click="$router.push('/about/about-app')"
    >      
      О приложение
    </my-button>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>

</style>