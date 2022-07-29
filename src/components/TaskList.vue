<template>
  <h2 
    class="text-danger text-center p-3" 
    v-if="todoItems.length > 0 && newTasksList.length === 0"
  >
    {{ titleBlock() }}
  </h2>

  <ul 
    class="list-group"  
    v-else-if="todoItems.length > 0"
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
      },
      selectedValue: {
        type: String,
      },
      statisticsValue: {
        type: Object,
      },
    },
    methods: {
      completedTask(elem) {
        this.$emit("completedTask", elem);
      },

      // Пока так, потом запишу красивей 
      titleBlock() {
        if (this.selectedValue === 'allTasks') {
          return 'Задача не найдена'
        }

        if (this.selectedValue === 'completedTasks') {
          if (this.statisticsValue.completedTasks === 0) {
            return 'Нет выполненных задач'
          } else {
            return 'Задача не найдена'
          }
        }

        if (this.selectedValue === 'outstandingTasks') {
          if (this.statisticsValue.allTasks - this.statisticsValue.completedTasks === 0) {
            return 'Все задачи выполнены'
          } else {
            return 'Задача не найдена'
          }
        }
      }
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