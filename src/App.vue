<template>
  <div class="container-xl">
    <div class="p-4">
      <h1 class="text-center text-dark">{{ message }}</h1>
    </div>

    <div class="d-flex mb-1">
      <div 
        class="bg-primary text-white rounded px-2 me-1"
        v-for="item in [
          `Сompleted tasks ${completedTasks}`, 
          `All tasks ${allTasks}`, 
          `Percent complete taskalist ${percentCompleteTaskalist}%`,
        ]"
      >
        {{ item }}
      </div>
    </div>

    <ul class="list-group">
      <li 
        class="list-group-item d-flex"
        v-for="item in todoItems"
        :key="item.id"
      >
        <button 
          type="button"
          class="btn"
          :class="{ 'btn-success': item.done, 'btn-secondary': !item.done }"
          @click="completedTask(item)"
        >
          {{ item.done ? 'completed' : 'in order' }}
        </button> 
        <div class="d-flex align-items-center p-2">{{ item.text }}</div>
      </li>
    </ul>

    <form class="mt-3 mb-4" @submit.prevent>
      <div class="input-group">
        <input
          class="form-control"
          type="text"
          placeholder="Add new Task"
          v-model="textInputTask"
        />

        <button 
          type="button" 
          class="input-group-text btn" 
          :class="{ 'btn-success': validInput() }"
          :disabled="!validInput()"
          @click="createTask"
        >
          Add
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
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
        textInputTask: ''
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

      validInput() {
        return this.textInputTask.length
      },

      createTask() {
        // вешаю дополнительную проверку, потому что в инспекторе можно убрать disabled 
        // и кнопка будет активна, и тогда можно будет создать пустую задачу
        if (this.validInput()) {
          this.todoItems.push({id: Date.now(), text: this.textInputTask, done: false});

          this.textInputTask = '';
        }
      },
    },
    computed: {
      completedTasks() {
        let counter = 0;

        this.todoItems.forEach(item => {
          if (item.done) {
            counter += 1;
          }
        });

        return counter
      },
      allTasks() {
        return this.todoItems.length
      },
      percentCompleteTaskalist() {
        return (this.completedTasks / this.allTasks * 100).toFixed(0)
      }
    },
  }
</script>

<style>

</style>