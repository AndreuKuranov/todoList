<template>
  <div class="d-flex mb-1">
    <div 
      class="bg-primary text-white rounded px-2 me-1"
      v-for="item in [
        `Сompleted tasks ${completedTasks}`, 
        `All tasks ${allTasks}`, 
        `Percent complete taskalist ${percentCompleteTaskalist}%`,
      ]"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        completedTasks: 'task/completedTasks',
        allTasks: 'task/allTasks',
        percentCompleteTaskalist: 'task/percentCompleteTaskalist',
      })
    }
  }
</script>

<style scoped>

</style>