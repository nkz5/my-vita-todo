import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

import Gapi from 'vue-googleapis';

const app = createApp(App);

app.use(router);
/*
app.use(Gapi, {
    apiKey: 'AIzaSyDuwIWOwX3MG5FKsgxTjX99Uf5T0iuJ_8Q',
    clientId: '907367219545-cvb0d0ncjrlf49akl0fdnqbe9bhm83pp.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apisyoutube/v3/rest'],
  })
*/
app.mount('#app');
