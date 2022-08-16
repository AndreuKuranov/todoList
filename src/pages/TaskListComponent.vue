<template>
  <div>
    <TodoTitle
      v-color:color.delay.font="'red'"
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
      <render-button 
        class="btn-warning d-flex mt-3 me-3 p-2" 
        v-mousemove="coordinates"
        :tag="'button'"
      >
        <span class="material-symbols-outlined me-2">add</span>
        task
      </render-button>
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

    <div @click="setModalVisible('create')" ref="cursor" class="cursor"></div>
  </div>
</template>

<script>
  import TodoForm from '@/components/TodoForm';
  import TodoTitle from '@/components/TodoTitle';
  import TaskList from '@/components/TaskList';
  import StatisticsTasks from '@/components/StatisticsTasks';
  import SortTasks from '@/components/SortTasks';
  import FilterMoney from '@/components/FilterMoney';
  import axios from 'axios';

  export default {
    components: {
      TodoForm,
      TodoTitle,
      TaskList,
      StatisticsTasks,
      SortTasks,
      FilterMoney
    },
    props: {
      reg: {
        type: Object
      },
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
      coordinates(event) {
        let cursor = this.$refs.cursor

        cursor.style.display = 'block'

        cursor.style.top = `${event.clientY - cursor.offsetHeight / 2}px`;
        cursor.style.left = `${event.clientX - cursor.offsetWidth / 2}px`;

        cursor.onmouseout = () => {
          cursor.style.display = 'none';
        }
      },

      completedTask(elem) {
        this.todoItems.forEach(item => {
          if (item.id === elem.id) {
            item.done = !item.done
            this.putTask(item, item.title, item.done);
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

      async putTask(task, title, done) {
        await axios.put(`http://localhost:5000/tasks/${task.id}`, {
            ...task, done: done, title: title
        });
      },

      editTask(val) {
        this.todoItems = this.todoItems.map(elem => elem.id === this.todoItem.id ? { ...elem, title: val.title} : elem);
        this.putTask(this.todoItem, val.title, this.todoItem.done);
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
      },

      async getTasks() {
        try {
          const response = await axios.get('http://localhost:5000/tasks');
          this.todoItems = response.data;
        } catch (e) {
          console.log(e.message);
        }
      }
    },
    mounted() {
      // по хорошему запрос делать в app и данные хранить в нем или в сторе, а так получается запрос происходит каждый раз при смене страници
      this.getTasks()
    },
    watch: {
      todoItems: {
        handler() {
          const parsed = JSON.stringify(this.todoItems);
          localStorage.setItem('todoItems', parsed);
        },
        deep: true
      },

      modalVisible() {
        if(!this.modalVisible) {
          this.todoItem = {};
          this.formCondition = '';
        }
      }
    },
  }
</script>

<style>
.cursor {
  display: none;
  position: absolute;
  width: 15px;
  height: 15px;
  border: 1px solid red; 
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>