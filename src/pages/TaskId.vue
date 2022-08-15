<template>
  <TodoTitle
    :message="message"
  />
</template>

<script>
  import TodoTitle from '@/components/TodoTitle';

  export default {
    components: {
      TodoTitle,
    },
    data() {
      return {
        message: `Task: ${this.$route.params.id}`,
      }
    },
    watch: {
      $route(toRoute, ftomRoute) {
        this.message = `Task: ${toRoute.params.id}`
      }
    }
  }
</script>

<style scoped>

</style>