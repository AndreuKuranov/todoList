<template>
  <ul 
    class="list-group"  
    v-if="todoItems.length > 0"
  >
    <transition-group name="tasks-list">
      <TaskItem 
        @completedTask="completedTask"
        v-for="item in newTasksList"
        :key="item.id"
        :item="item"
      />
    </transition-group>
  </ul>
  <h2 
    class="text-danger text-center p-3" 
    v-else
  >
    Please add new task
  </h2>
</template>

<script>
  import TaskItem from '@/components/TaskItem';

  export default {
    props: {
      newTasksList: {
        type: Object,
        required: true
      },
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
.tasks-list-item {
  display: inline-block;
  margin-right: 10px;
}
.tasks-list-enter-active,
.tasks-list-leave-active {
  transition: all 0.5s ease;
}
.tasks-list-enter-from,
.tasks-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>