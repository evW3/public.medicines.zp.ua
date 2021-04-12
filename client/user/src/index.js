import { createApp } from 'vue';
import App from '@/App';
import { pageTitle } from '@mixins/pageTitle';
import { router } from '@/router/index';
import { store } from '@store/index';
import 'leaflet/dist/leaflet.scss'; // import 'leaflet/dist/leaflet.css';
import './scss/default';

const app = createApp(App);

app.use(store);
app.use(router);
app.mixin(pageTitle);

app.mount('#app');