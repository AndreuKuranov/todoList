export default {
  mounted(el, binding) {
    el.addEventListener('pointermove', (event) => {
      binding.value(event)
    });
  },
  name: 'mousemove'
}