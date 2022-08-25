import axios from "axios";

export const taskModule = {
  state: () => ({
    message: 'Hello from Vue App',
    todoItems: [],
    newTasksList: [],
    selectedValue: '',
    modalVisible: false,
    formCondition: '', 
    todoItem: {},
    todoItemTitle: '',
    taskTd: '',
    correctTasks: '',
    filterOptions: [
      {value: 'allTasks', name: 'Отображать все задачи'},
      {value: 'completedTasks', name: 'Отображать выполненные'},
      {value: 'outstandingTasks', name: 'Отображать невыполненные'},
    ],
    defaultSelectedValue: 'allTasks',
  }),
  getters: {
    completedTasks(state) {
      let counter = 0;

      state.todoItems.forEach(item => {
        if (item.done) {
          counter += 1;
        }
      });

      return counter
    },
    allTasks(state) {
      return state.todoItems.length
    },
    percentCompleteTaskalist(state, getters) {
      let percent = 0;

      if (getters.allTasks != 0) {
        percent = (getters.completedTasks / getters.allTasks * 100).toFixed(0)
      }

      return percent
    },
    filterTasks(state) {
      return state.todoItems.filter(item => state.defaultSelectedValue === state.filterOptions[0].value || 
        state.defaultSelectedValue === state.filterOptions[1].value && item.done || 
        state.defaultSelectedValue === state.filterOptions[2].value && !item.done
      )
    },
    serchTasks(state, getters) {
      return getters.filterTasks.filter(item => item.title.toLowerCase().includes(state.correctTasks.toLowerCase()))
    }
  },
  mutations: {
    setTodoItems(state, todoItems) {
      state.todoItems = todoItems
    },
    setTodoItemsDelete(state, elem) {
      state.todoItems = state.todoItems.filter((item) => item.id !== elem.id);
    },
    setTodoItemsCreate(state, task) {
      state.todoItems.push(task);
    },
    setTodoItemsCompleted(state) {
      state.todoItems.forEach(item => {
        if (item.id === state.todoItem.id) {
          item.done = !item.done;
        }
      });
    },
    setTodoItemsTitle(state, val) {
      state.todoItems = state.todoItems.map(elem => elem.id === state.todoItem.id ? { ...elem, title: val.title} : elem);
    },
    setNewTasksList(state, newTasksList) {
      state.newTasksList = newTasksList
    },
    setSelectedValue(state, selectedValue) {
      state.selectedValue = selectedValue
    },
    setStatisticsValue(state, statisticsValue) {
      state.statisticsValue = statisticsValue
    },
    setModalVisible(state, modalVisible) {
      state.modalVisible = modalVisible
    },
    setFormCondition(state, formCondition) {
      state.formCondition = formCondition
    },
    setTodoItem(state, todoItem) {
      state.todoItem = todoItem
    },
    setTodoItemTitle(state, todoItemTitle) {
      state.todoItemTitle = todoItemTitle
    },
    setTaskTd(state, taskTd) {
      state.taskTd = taskTd
    },
    setCorrectTasks(state, correctTasks) {
      state.correctTasks = correctTasks
    },
    setDefaultSelectedValue(state, defaultSelectedValue) {
      state.defaultSelectedValue = defaultSelectedValue
    },
  },
  actions: {
    async postTask({state}, task) {
      try {
        await axios.post('http://localhost:5000/tasks', {
          id: task.id, 
          title: task.title, 
          done: task.done, 
          desc: task.desc, 
          created: task.created, 
          updated: task.updated,
        });
      } catch (e) {
        console.log(e.message);
      }
    },
    async getTasks({state, commit}) {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        commit('setTodoItems', response.data);
      } catch (e) {
        console.log(e.message);
      }
    },
    async putTaskCompleted({state}) {
      try {
        await axios.put(`http://localhost:5000/tasks/${state.todoItem.id}`, {
          ...state.todoItem, done: state.todoItem.done
        });
      } catch (e) {
        console.log(e.message);
      }
    },
    async putTaskTitle({state}) {
      try {
        await axios.put(`http://localhost:5000/tasks/${state.todoItem.id}`, {
          ...state.todoItem, title: state.todoItemTitle
        });
      } catch (e) {
        console.log(e.message);
      }
    },
    async delTask({state}) {
      try {
        await axios.delete(`http://localhost:5000/tasks/${state.taskTd}`);
      } catch (e) {
        console.log(e.message);
      }
    },
  },
  namespaced: true
}