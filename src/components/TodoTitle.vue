<template>
  <div class="p-4">
    <h1 class="text-center text-dark">{{ message }}</h1>
  </div>
</template>

<script>
  export default {
    props: {
      message: {
        type: String,
        required: true
      }
    },
  }
</script>

<style scoped>

</style>