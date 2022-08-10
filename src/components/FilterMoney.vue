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
  import loggingMixin from '@/mixins/loggingMixin';

  export default {
    mixins: [loggingMixin],

    data() {
      return {
        money: '',
      }
    },
    // фильтры удалили из vue 3, так что реализовал так
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