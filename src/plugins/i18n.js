import { h } from 'vue';
import { ranksNumber } from '@/functions/functions.js';

export default {
  install: (app, options) => {
    app.provide('i18n', options)

    app.directive('color', {
      mounted(el, bindings, vnode) {
        const fontModifier = bindings.modifiers['font'];
    
        if (fontModifier) {
          el.style.fontSize = '40px';
        }
    
        const delayModifier = bindings.modifiers['delay'];
    
        let delay = 0;
    
        if (delayModifier) {
          delay = 2000
        }
    
        setTimeout(() => {
          const arg = bindings.arg;
          el.style[arg] = bindings.value;
        }, delay)
      },
    })

    app.directive('mousemove', {
      mounted(el, binding) {
        el.addEventListener('pointermove', (event) => {
          binding.value(event)
        });
      },
    })

    app.component('render-button', {
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
    })

    // подключается глобально и использоваться сразу на все компоненты, 
    // хз как подключать его в определенном компоненте, имя как директиве не задать 
    app.mixin({
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
    })
  }
}