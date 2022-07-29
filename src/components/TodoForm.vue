<template>
  <form class="mt-2 mb-4" @submit.prevent>
    <div class="input-group">
      <my-input
        placeholder="Add new Task"
        v-model="task.text"
      />

      <my-button 
        type="button" 
        class="input-group-text" 
        :class="{ 'btn-success': validInput() }"
        :disabled="!validInput()"
        @click="createTask"
      >
        Add
      </my-button>
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
        const space = /^\S/;
        return space.test(String(this.task.text))
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