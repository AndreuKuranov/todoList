import { h } from 'vue';

export default {
  render() {
    return h(
      `${this.tag}`, // имя тега
      {
        class: 'btn',
        type: 'button'
      }, // входные параметры/атрибуты
      this.$slots.default() // массив дочерних элементов
    )
  },
  props: {
    tag: {
      type: String,
      required: true
    }
  }
}