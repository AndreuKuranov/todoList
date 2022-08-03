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
      @setModalVisible="setModalVisible"
      @setTodoItem="setTodoItem"
    />

    <div class="d-flex justify-content-end">
      <my-button
        class="btn-warning d-flex mt-3 me-3 p-2"
        type="button"
        @click="setModalVisible('create')"
      >
        <span class="material-symbols-outlined me-2">add</span>
        task
      </my-button>
    </div>

    <my-modal
      v-model:stateModal="modalVisible"
    >
      <TodoForm
        @create="createTask"
        @editTask="editTask"
        :todoItem="todoItem"
        :formCondition="formCondition"
      />
    </my-modal>
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
        todoItems: [],
        newTasksList: [],
        selectedValue: '',
        statisticsValue: {},
        modalVisible: false,
        formCondition: '', 
        todoItem: {}, 
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

      editTask(val) {
        this.todoItems = this.todoItems.map(elem => elem.id === this.todoItem.id ? { ...elem, text: val} : elem);
        this.modalVisible = false;
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

      setModalVisible(val) {
        this.formCondition = val;
        this.modalVisible = true;
      },

      setTodoItem(elem) {
        this.todoItem = elem;
      }
    },
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
      // не стал менять, т.к. наблюдатель срабатывает при изменение статуса, редактирование, удаление и создание задачи, сортировка не влияет на объект 
      todoItems: {
        handler() {
          const parsed = JSON.stringify(this.todoItems);
          localStorage.setItem('todoItems', parsed);
        },
        deep: true
      },

      // чистим состояния, т.к. при не активной модаки они не нужны
      modalVisible() {
        if(!this.modalVisible) {
          this.todoItem = {};
          this.formCondition = '';
        }
      }
    }
  }
</script>

<style>

</style>