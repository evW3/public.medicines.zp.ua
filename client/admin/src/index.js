import { createApp } from 'vue';
import App from '@/App';
import VTooltip from 'v-tooltip'
import { pageTitle } from '@mixins/pageTitle';
import  router  from '@/router/index';
import { store } from '@store/index';
import 'leaflet/dist/leaflet.scss';
import './styless/default';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VTooltip);
app.mixin(pageTitle);
app.mount('#app');