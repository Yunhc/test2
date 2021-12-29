import {reactive, readonly } from "vue";
import axios from 'axios';

const server = reactive({
	url: 'http://localhost:8090',
});


export default {
	server:readonly(server),
	axios:readonly(axios),
}