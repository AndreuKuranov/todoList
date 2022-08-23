<template>
  <div>
    <TodoTitle
      v-color:color.delay.font="'red'"
      :message="$store.state.task.message"
    />

    <SortTasks />
    <StatisticsTasks />
    <TaskList />

    <div class="d-flex justify-content-end">
      <render-button 
        class="btn-warning d-flex mt-3 me-3 p-2" 
        v-mousemove="coordinates"
        :tag="'button'"
      >
        <span class="material-symbols-outlined me-2">add</span>
        task
      </render-button>
    </div>

    <my-modal v-model:stateModal="$store.state.task.modalVisible">
      <TodoForm />
    </my-modal>

    <div @click="setModalVisible('create')" ref="cursor" class="cursor"></div>
  </div>
</template>

<script>
  import TodoForm from '@/components/TodoForm';
  import TodoTitle from '@/components/TodoTitle';
  import TaskList from '@/components/TaskList';
  import StatisticsTasks from '@/components/StatisticsTasks';
  import SortTasks from '@/components/SortTasks';
  import FilterMoney from '@/components/FilterMoney';
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

  export default {
    components: {
      TodoForm,
      TodoTitle,
      TaskList,
      StatisticsTasks,
      SortTasks,
      FilterMoney
    },
    computed: {
      ...mapState({
        todoItems: state => state.task.todoItems,
      }),
    },
    methods: {
      ...mapMutations({
        setFormCondition: 'task/setFormCondition',
        setModalVis: 'task/setModalVisible',
      }),
      ...mapActions({
        getTasks: 'task/getTasks',
      }),

      coordinates(event) {
        let cursor = this.$refs.cursor

        cursor.style.display = 'block'

        cursor.style.top = `${event.clientY - cursor.offsetHeight / 2}px`;
        cursor.style.left = `${event.clientX - cursor.offsetWidth / 2}px`;

        cursor.onmouseout = () => {
          cursor.style.display = 'none';
        }
      },

      setModalVisible(val) {
        this.setFormCondition(val);
        this.setModalVis(true);
      },
    },
    mounted() {
      if (this.todoItems.length === 0) {
        this.getTasks();
      }
    },
  }
</script>

<style>
.cursor {
  display: none;
  position: absolute;
  width: 15px;
  height: 15px;
  border: 1px solid red; 
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>