<template>
  <form @submit.prevent>
    <h3 class="text-center text-dark">Создание задачи</h3>
    <div class="d-flex justify-content-center flex-column mt-4">
      <my-input
        placeholder="Add new Task"
        v-model.trim="task.text"
      />

      <div class="d-flex justify-content-center mt-3">
        <my-button 
          type="button" 
          class="" 
          :class="{ 'btn-success': validInput(), 'btn-secondary': !validInput() }"
          :disabled="!validInput()"
          @click="createTask"
        >
          Add
        </my-button>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        task: { 
          text: '', 
          done: false 
        },
      }
    },
    methods: {
      validInput() {
        return this.task.text.length
      },

      createTask() {
        if (this.validInput()) {
          this.task.id = Date.now();
          this.$emit('create' , this.task);

          this.task = {
            text: '', 
            done: false
          };
        }
      },
    },
  }
</script>

<style scoped>

</style>