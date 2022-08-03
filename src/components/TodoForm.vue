<template>
  <form @submit.prevent>
    <h3 class="text-center text-dark">{{ textForm('Создание задачи', 'Редактирование задачи') }}</h3>
    <div class="d-flex justify-content-center flex-column mt-4">

      <div class="form-floating mb-3">
        <my-input
          class="form-control" 
          id="floatingInput" 
          v-model.trim="task.text"
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
          text: '', 
          done: false 
        },
      }
    },
    mounted() {
      if (this.formCondition === 'edit') {
        this.task.text = this.todoItem.text
      }
    },
    methods: {
      validInput() {
        return this.task.text.length
      },

      createTask() {
        if (this.formCondition === 'create' && this.validInput()) {
          
          this.task.id = uniqueId();
          this.$emit('create' , this.task);

          this.task = {
            text: '', 
            done: false
          };
        }

        if (this.formCondition === 'edit') {
          this.$emit('editTask', this.task.text);
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
    directives: {
      focus: {
        mounted(el) {
          el.focus()
        }
      }
    }   
  }
</script>

<style scoped>

</style>