import "bootstrap/dist/css/bootstrap.css";
import { createApp } from 'vue';
import App from './App';
import components from '@/components/UI';
import directives from '@/directives';

const app = createApp(App);

components.forEach(component => {
  app.component(component.name, component)
})

directives.forEach(directive => {
  app.directive(directive.name, directive);
})

app.mount('#app');

import "bootstrap/dist/js/bootstrap.js";

