<template>
  <div>
    <TodoTitle
      :message="message"
    />
    <div class="d-flex gap-2">
      <router-link class="btn btn-info" to="/">Home</router-link>
      <router-link class="btn btn-info" to="/tasklist">Tasklist</router-link>
      <router-link class="btn btn-info" to="/about">About</router-link>
    </div>
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