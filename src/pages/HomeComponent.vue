<template>
  <div>
    <TodoTitle
      :message="message"
    />
  </div>
</template>

<script>
  import TodoTitle from '@/components/TodoTitle';

  export default {
    components: {
      TodoTitle,
    },
    data() {
      return {
        message: 'Добро пожаловать в приложение "Список задач"',
      }
    },
  }
</script>

<style scoped>

</style>