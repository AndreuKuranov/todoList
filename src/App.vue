<template>
  <div class="container-xl">
    <div class="p-4">
      <h1 class="text-center text-dark">{{ message }}</h1>
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
    },
  }
</script>

<style>

</style>