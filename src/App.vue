<template>
  <div class="container-xl">
    <TodoTitle
      :message="message"
    />

    <StatisticsTasks
      :todoItems="todoItems"
    />

    <TaskList
      :todoItems="todoItems"
      @completedTask="completedTask"
    />

    <TodoForm
      @create="createTask"
    />
  </div>
</template>

<script>
  import TodoForm from '@/components/TodoForm';
  import TodoTitle from '@/components/TodoTitle';
  import TaskList from '@/components/TaskList';
  import StatisticsTasks from '@/components/StatisticsTasks';

  export default {
    components: {
      TodoForm,
      TodoTitle,
      TaskList,
      StatisticsTasks
    },
    data() {
      return {
        message: 'Hello from Vue App',
        todoItems: [
          {id: 1, text: 'task 1', done: false},
          {id: 2, text: 'task 2', done: false},
          {id: 3, text: 'task 3', done: true},
          {id: 4, text: 'task 4', done: false},
          {id: 5, text: 'task 5', done: false},
        ],
      }
    },
    methods: {
      completedTask(elem) {
        this.todoItems.forEach(item => {
          if (item.id === elem.id) {
            item.done = item.done ? false : true
          }
        });
      },

      createTask(task) {
        this.todoItems.push(task);
      },
    },
  }
</script>

<style>

</style>