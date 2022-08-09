<template>
  <div class="p-4">
    <h1
      v-color:color.delay.font="'red'"
      class="text-center"
    >{{ message }}</h1>
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