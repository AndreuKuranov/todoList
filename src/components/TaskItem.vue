<template>
  <li class="d-flex py-2 px-3 mb-2 border rounded">
    <my-button 
      :title="item.done ? 'Отменить выполнение' : 'Отметить как выполненную'"
      type="button"
      :class="{ 'btn-success': item.done, 'btn-secondary': !item.done }"
      @click="completedTask(item)"
    >
      {{ item.done ? 'completed' : 'in order' }}
    </my-button> 

    <div class="d-flex align-items-center p-2">{{ item.title }}</div>

    <my-button
      type="button"
      class="d-flex btn-info ms-auto"
      @click="$router.push({
        path: `/tasklist/${item.id}`, 
        query: { 
          title: item.title
        }
      })"
    >
      <span class="material-symbols-outlined">info</span>
    </my-button>

    <my-button
      type="button"
      class="d-flex btn-warning ms-3"
      @click="setModalVisible('edit')"
    >
      <span class="material-symbols-outlined">edit</span>
    </my-button>

    <my-button
      type="button"
      class="d-flex btn-danger ms-3"
      @click="deleteTask(item)"
    >
      <span class="material-symbols-outlined">delete</span>
    </my-button> 
  </li>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';

  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods: {
      ...mapMutations({
        setFormCondition: 'task/setFormCondition',
        setModalVis: 'task/setModalVisible',
        setTodoItem: 'task/setTodoItem',
        setTodoItemsCompleted: 'task/setTodoItemsCompleted',
        setTaskTd: 'task/setTaskTd',
        setTodoItemsDelete: 'task/setTodoItemsDelete',
      }),
      ...mapActions({
        putTaskCompleted: 'task/putTaskCompleted',
        delTask: 'task/delTask',
      }),

      completedTask(elem) {
        this.setTodoItem(elem);
        this.setTodoItemsCompleted();
        this.putTaskCompleted();
      },
      deleteTask(elem) {
        this.setTaskTd(elem.id);
        this.setTodoItemsDelete(elem);
        this.delTask();
      },
      setModalVisible(val) {
        this.setFormCondition(val);
        this.setModalVis(true);
        this.setTodoItem(this.item);
      },
    },
  }
</script>

<style scoped>

</style>