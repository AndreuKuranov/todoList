<template>
  <div class="container-xl">
    <TodoTitle
      :message="message"
    />

    <SortTasks
      :todoItems="todoItems"
      @sortedTaskList="sortedTaskList"
      @setSelectedValue="setSelectedValue"
    />

    <StatisticsTasks
      :todoItems="todoItems"
      @setStatisticsValue="setStatisticsValue"
    />

    <TaskList
      :todoItems="todoItems"
      :newTasksList="newTasksList"
      :selectedValue="selectedValue"
      :statisticsValue="statisticsValue"
      @completedTask="completedTask"
      @deleteTask="deleteTask"
    />

    <div class="d-flex justify-content-end">
      <my-button
        class="btn-warning d-flex mt-3 me-3 p-2"
        type="button"
        @click="setModalVisible"
      >
        <span class="material-symbols-outlined me-2">add</span>
        task
      </my-button>
      <my-modal
        v-model:stateModal="modalVisible"
      >
        <TodoForm
          @create="createTask"
        />
      </my-modal>
    </div>
    
  </div>
</template>

<script>
  import TodoForm from '@/components/TodoForm';
  import TodoTitle from '@/components/TodoTitle';
  import TaskList from '@/components/TaskList';
  import StatisticsTasks from '@/components/StatisticsTasks';
  import SortTasks from '@/components/SortTasks';

  export default {
    components: {
      TodoForm,
      TodoTitle,
      TaskList,
      StatisticsTasks,
      SortTasks
    },
    data() {
      return {
        message: 'Hello from Vue App',
        todoItems: [
          // {id: 1, text: 'task 1', done: false},
          // {id: 2, text: 'task 2', done: false},
          // {id: 3, text: 'task 3', done: true},
          // {id: 4, text: 'task 4', done: false},
          // {id: 5, text: 'task 5', done: false},
        ],
        newTasksList: [],
        selectedValue: '',
        statisticsValue: {},
        modalVisible: false,
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
        this.modalVisible = false;
      },

      deleteTask(item) {
        this.todoItems = this.todoItems.filter((elem) => elem.id !== item.id);
      },

      sortedTaskList(list) {
        this.newTasksList = list;
      },

      setSelectedValue(val) {
        this.selectedValue = val;
      },

      setStatisticsValue(val) {
        this.statisticsValue = val;
      },

      setModalVisible() {
        this.modalVisible = true;
      }
    },
    // localStorage
    mounted() {
      if (localStorage.getItem('todoItems')) {
        try {
          this.todoItems = JSON.parse(localStorage.getItem('todoItems'));
        } catch(e) {
          localStorage.removeItem('todoItems');
        }
      }
    },
    watch: {
      todoItems: {
        handler() {
          const parsed = JSON.stringify(this.todoItems);
          localStorage.setItem('todoItems', parsed);
        },
        deep: true
      }
    }
  }
</script>

<style>

</style>