<template>
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
</template>

<script>
  export default {
    props: {
      todoItems: {
        type: Object,
        required: true
      }
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
        let percent = 0;

        if (this.allTasks != 0) {
          percent = (this.completedTasks / this.allTasks * 100).toFixed(0)
        }

        return percent
      }
    },
    watch: {
      todoItems: {
        handler() {
          this.$emit('setStatisticsValue' , {
            allTasks: this.allTasks,
            completedTasks: this.completedTasks
          });
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

</style>