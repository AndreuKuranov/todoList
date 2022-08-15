import "bootstrap/dist/css/bootstrap.css";
import { createApp } from 'vue';
import App from './App';
import components from '@/components/UI';
import router from "@/router/router";
import directives from '@/directives';
import i18nPlugin from '@/plugins/i18n';

const app = createApp(App);

components.forEach(component => {
  app.component(component.name, component);
})

directives.forEach(directive => {
  app.directive(directive.name, directive);
})

app
  .use(router)
  .use(i18nPlugin)
  .mount('#app');

import "bootstrap/dist/js/bootstrap.js";
