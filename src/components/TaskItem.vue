<template>
  <li class="d-flex py-2 px-3 mb-2 border rounded">
    <my-button 
      type="button"
      :class="{ 'btn-success': item.done, 'btn-secondary': !item.done }"
      @click="completedTask(item)"
    >
      {{ item.done ? 'completed' : 'in order' }}
    </my-button> 
    <div class="d-flex align-items-center p-2">{{ item.text }}</div>
  </li>
</template>

<script>
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
    },
  }
</script>

<style scoped>

</style>