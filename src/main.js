import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VCalendar from 'v-calendar';


// import VueHtmlToPaper from 'vue-html-to-paper';
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// Import Bootstrap an BootstrapVue CSS files (order is important)

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/style/index.scss';

import axios from 'axios';
import print from 'vue3-print-nb';
// import {Tabs, Tab} from 'vue3-tabs-component';

// import 'ag-grid-enterprise';
// import { LicenseManager } from  'ag-grid-enterprise';
// LicenseManager.setLicenseKey("0123456789");



// import java.io.BufferedReader;
// import java.io.ByteArrayInputStream;
// import java.io.IOException;
// import java.io.InputStream;
// import java.io.InputStreamReader;
// import javax.print.Doc;
// import javax.print.DocFlavor;
// import javax.print.DocPrintJob;
// import javax.print.PrintException;
// import javax.print.PrintService;
// import javax.print.PrintServiceLookup;
// import javax.print.SimpleDoc;


// const options = {
//   name: '_blank',
//   specs: [
//     'fullscreen=yes',
//     'titlebar=yes',
//     'scrollbars=yes'
//   ],
//   styles: [
//     'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
//     'https://unpkg.com/kidlat-css/css/kidlat.css'
//   ],
//   timeout: 1000, // default timeout before the print window appears
//   autoClose: true, // if false, the window will not close after printing
//   windowTitle: window.document.title // override the window title
// };

const app = createApp(App);

app.use(router);
app.use(store);
app.use(print);
app.use(VCalendar, {})

// app.use('tabs', Tabs);
// app.use('tab', Tab);

app.mount('#app');

// app.use(BootstrapVue);
// app.use(IconsPlugin);
// app.use(VueHtmlToPaper, options);

//전역변수 선언
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$url_rest = 'http://localhost:8090';
