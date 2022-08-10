<template>
  <div>
    <my-input
      placeholder="Введите сумму"
      class="mt-3"
      type="number"
      v-model="money"
    />

    <div class="p-3">{{ prefix(ranks) }}</div>
  </div>
</template>

<script>
  import loggingMixin from '@/mixins/loggingMixin';

  export default {
    mixins: [loggingMixin],

    data() {
      return {
        money: '',
      }
    },
  }
</script>

<style scoped>

</style>