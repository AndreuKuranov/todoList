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
        message: 'Что-то пошло не так: "Ошибка 404"',
      }
    },
  }
</script>

<style scoped>

</style>