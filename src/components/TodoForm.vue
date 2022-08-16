<template>
  <form @submit.prevent>
    <h3 class="text-center text-dark">{{ textForm('Создание задачи', 'Редактирование задачи') }}</h3>
    <div class="d-flex justify-content-center flex-column mt-4">

      <div class="form-floating mb-3">
        <my-input
          class="form-control" 
          id="floatingInput" 
          v-model.trim="task.title"
          v-focus
          placeholder="Task"
        />
        <label for="floatingInput">{{ textForm('Add new Task', 'Edit Task') }}</label>
      </div>

      <div class="d-flex justify-content-center mt-3">
        <my-button 
          type="button" 
          :class="{ 'btn-success': validInput(), 'btn-secondary': !validInput() }"
          :disabled="!validInput()"
          @click="createTask"
        >
          {{ textForm('Add', 'Edit') }}
        </my-button>
      </div>
    </div>
  </form>
</template>

<script>
  import { uniqueId } from '@/functions/functions.js';
  import axios from 'axios';

  export default {
    props: {
      formCondition: {
        type: String,
        default: true
      },
      todoItem: {
        type: Object,
        default: true
      }
    },
    data() {
      return {
        task: { 
          title: '', 
          done: false,
          desc: '',
          created: '',
          updated: '',
        },
      }
    },
    mounted() {
      if (this.formCondition === 'edit') {
        this.task.title = this.todoItem.title
      }
    },
    methods: {
      validInput() {
        return this.task.title.length
      },

      async postTask(task) {
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

      createTask() {
        if (this.formCondition === 'create' && this.validInput()) {

          this.task.id = uniqueId();

          this.postTask(this.task);
          this.$emit('create' , this.task);

          this.task = {
            title: '', 
            done: false,
            desc: '',
            created: '',
            updated: '',
          };
        }

        if (this.formCondition === 'edit') {
          this.$emit('editTask', this.task);
        }
      },

      textForm(val1, val2) {
        if (this.formCondition === 'create') {
          return val1
        }

        if (this.formCondition === 'edit') {
          return val2
        }
      },
    },  
  }
</script>

<style scoped>

</style>