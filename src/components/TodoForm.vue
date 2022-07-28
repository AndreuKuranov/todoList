<template>
  <form class="mt-3 mb-4" @submit.prevent>
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
        return this.task.text.length
      },

      createTask() {
        // вешаю дополнительную проверку, потому что в инспекторе можно убрать disabled 
        // и кнопка будет активна, и тогда можно будет создать пустую задачу
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