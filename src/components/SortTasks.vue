<template>
  <div class="row mb-3">
    <div class="col-9">
      <my-input
        placeholder="Serch tasks"
        v-model="correctTasks"
      />
    </div>
    <div class="col-3">
      <my-select
        v-model="defaultSelectedValue"
        :options="filterOptions"
      />
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
  data() {
    return {
      correctTasks: '',
      filterOptions: [
        {value: 'addTasks', name: 'Отображать все задачи'},
        {value: 'completedTasks', name: 'Отображать выполненные'},
        {value: 'outstandingTasks', name: 'Отображать невыполненные'},
      ],
      defaultSelectedValue: 'addTasks',
    }
  },
  methods: {
    sortedTaskList() {
      this.$emit(
        'sortedTaskList' , 
        this.filterTasks.filter(item => item.text.toLowerCase().includes(this.correctTasks.toLowerCase()))
      );
    }
  },
  computed: {
    filterTasks() {
      return this.todoItems.filter(item => this.defaultSelectedValue === this.filterOptions[0].value || 
      this.defaultSelectedValue === this.filterOptions[1].value && item.done || 
      this.defaultSelectedValue === this.filterOptions[2].value && !item.done
      )
    },
    serchTasks() {
      this.sortedTaskList();
    }
  },
  watch: {
    todoItems: {
      handler() {
        this.sortedTaskList();
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>