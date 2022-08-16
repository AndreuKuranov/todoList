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
    },
  },
  data() {
    return {
      correctTasks: '',
      filterOptions: [
        {value: 'allTasks', name: 'Отображать все задачи'},
        {value: 'completedTasks', name: 'Отображать выполненные'},
        {value: 'outstandingTasks', name: 'Отображать невыполненные'},
      ],
      defaultSelectedValue: 'allTasks',
    }
  },
  methods: {
    sortedTaskList() {
      this.$emit(
        'sortedTaskList' , 
        this.serchTasks
      );
    },
    setSelectedValue(val) {
      this.$emit('setSelectedValue', val);
    }
  },
  mounted() {
    this.sortedTaskList();
    this.setSelectedValue(this.defaultSelectedValue);
  },
  computed: {
    filterTasks() {
      return this.todoItems.filter(item => this.defaultSelectedValue === this.filterOptions[0].value || 
      this.defaultSelectedValue === this.filterOptions[1].value && item.done || 
      this.defaultSelectedValue === this.filterOptions[2].value && !item.done
      )
    },
    serchTasks() {
      return this.filterTasks.filter(item => item.title.toLowerCase().includes(this.correctTasks.toLowerCase()))
    }
  },
  watch: {
    serchTasks: {
      handler() {
        this.sortedTaskList();
      },
      deep: true
    },
    defaultSelectedValue(val) {
      this.setSelectedValue(val);
    }
  }
}
</script>

<style scoped>

</style>
