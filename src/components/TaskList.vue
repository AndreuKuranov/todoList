<template>
  <ul class="list-group">
    <TaskItem 
      @completedTask="completedTask"
      v-for="item in todoItems"
      :key="item.id"
      :item="item"
    />
  </ul>
  
</template>

<script>
  import TaskItem from '@/components/TaskItem';

  export default {
    props: {
      todoItems: {
        type: Object,
        required: true
      }
    },
    methods: {
      completedTask(elem) {
        this.$emit("completedTask", elem);
      },
    },
    components: { TaskItem }
}
</script>

<style scoped>

</style>