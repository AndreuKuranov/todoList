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
        v-for="item in newTasksList"
        :key="item.id"
        :item="item"
      />
    </transition-group>
    <div v-scroll-end="scroll">
      <div v-if="tasksEnd">end</div>
    </div>
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
  import { mapState, mapGetters } from 'vuex';

  export default {
    components: { 
      TaskItem 
    },
    computed: {
      ...mapState({
        selectedValue: state => state.task.selectedValue,
        todoItems: state => state.task.todoItems,
        newTasksList: state => state.task.newTasksList,
      }),
      ...mapGetters({
        completedTasks: 'task/completedTasks',
        allTasks: 'task/allTasks',
      })
    },
    methods: {
      scroll() {
        // console.log('123');
      },

      titleBlock() {
        if (this.selectedValue === 'allTasks') {
          return 'Задача не найдена'
        }

        if (this.selectedValue === 'completedTasks') {
          if (this.completedTasks === 0) {
            return 'Нет выполненных задач'
          } else {
            return 'Задача не найдена'
          }
        }

        if (this.selectedValue === 'outstandingTasks') {
          if (this.allTasks - this.completedTasks === 0) {
            return 'Все задачи выполнены'
          } else {
            return 'Задача не найдена'
          }
        }
      }
    },
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