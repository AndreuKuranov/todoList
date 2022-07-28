<template>
  <ul class="list-group">
    <transition-group name="tasks-list">
      <TaskItem 
        @completedTask="completedTask"
        v-for="item in todoItems"
        :key="item.id"
        :item="item"
      />
    </transition-group>
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