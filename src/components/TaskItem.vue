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
  import axios from 'axios';

  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods: {
      completedTask(elem) {
        this.$emit("completedTask", elem);
      },
      async delTask(id) {
        try {
          await axios.delete(`http://localhost:5000/tasks/${id}`);
        } catch (e) {
          console.log(e.message);
        }
      },
      deleteTask(elem) {
        this.delTask(elem.id)
        this.$emit("deleteTask", elem);
      },
      setModalVisible(val) {
        this.$emit("setModalVisible", val);
        this.$emit("setTodoItem", this.item);
      },
    },
  }
</script>

<style scoped>

</style>