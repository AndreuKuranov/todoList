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
  import { mapState, mapActions, mapMutations } from 'vuex';

  export default {
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
    computed: {
      ...mapState({
        todoItem: state => state.task.todoItem,
        formCondition: state => state.task.formCondition,
      }),
    },
    methods: {
      ...mapMutations({
        setTodoItemsCreate: 'task/setTodoItemsCreate',
        setModalVisible: 'task/setModalVisible',
        setTodoItemsTitle: 'task/setTodoItemsTitle',
        setTodoItemTitle: 'task/setTodoItemTitle',
      }),
      ...mapActions({
        putTaskTitle: 'task/putTaskTitle',
        postTask: 'task/postTask',
      }),

      validInput() {
        return this.task.title.length
      },

      createTask() {
        if (this.formCondition === 'create' && this.validInput()) {

          this.task.id = uniqueId();

          this.setTodoItemsCreate(this.task);
          this.postTask();
          this.setModalVisible(false);

          this.task = {
            title: '', 
            done: false,
            desc: '',
            created: '',
            updated: '',
          };
        }

        if (this.formCondition === 'edit') {
          this.setTodoItemsTitle(this.task);
          this.setTodoItemTitle(this.task.title);
          this.putTaskTitle();
          this.setModalVisible(false);
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