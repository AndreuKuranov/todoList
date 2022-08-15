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
  import { ranksNumber } from '@/functions/functions.js';

  export default {
    data() {
      return {
        money: '',
      }
    },
    methods: {
      prefix(n) {
        return !n ? n : `${n} руб`;
      },
    },
    computed: {
      ranks() {
        return ranksNumber(this.money);
      },
    },
  }
</script>

<style scoped>

</style>