<template>
  <div class="row mb-3">
    <div class="col-9">
      <my-input
        placeholder="Serch tasks"
        @input="setCorrectTasks($event.target.value)"
        :value="correctTasks"
      />
    </div>
    <div class="col-3">
      <my-select
        @change="setDefaultSelectedValue($event.target.value)"
        :value="defaultSelectedValue"
        :options="filterOptions"
      />
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex';

  export default {
    methods: {
      ...mapMutations({
        setCorrectTasks: 'task/setCorrectTasks',
        setDefaultSelectedValue: 'task/setDefaultSelectedValue',
        setSelectedValue: 'task/setSelectedValue',
        setNewTasksList: 'task/setNewTasksList',
      }),
    },
    mounted() {
      this.setNewTasksList(this.serchTasks);
      this.setSelectedValue(this.defaultSelectedValue);
    },
    computed: {
      ...mapState({
        defaultSelectedValue: state => state.task.defaultSelectedValue,
        filterOptions: state => state.task.filterOptions,
        correctTasks: state => state.task.correctTasks,
      }),
      ...mapGetters({
        serchTasks: 'task/serchTasks',
      }),
    },
    watch: {
      serchTasks: {
        handler() {
          this.setNewTasksList(this.serchTasks);
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
