import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import Bootstrap CSS & JS
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min';

// Import Axios
import axios from 'axios';

// Set credential axios with true
axios.defaults.withCredentials = true;

const app = createApp(App);

app.use(router);

app.mount('#app');