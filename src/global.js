import {reactive, readonly } from "vue";
import axios from 'axios';

const server = reactive({
	url: 'http://192.168.134.8:8090',
});


export default {
	server:readonly(server),
	axios:readonly(axios),
}