import Vue from "vue";
import axios from "axios";

Vue.prototype.$axios = axios;

// const ApiEndPoint = "http://192.168.1.101:3000";

const ApiEndPoint = "http://localhost:3000";

// const ApiEndPoint = axios.create({ baseURL: "http://localhost:3000/" });


// const ApiEndPoint = "https://pmill.sedots.site"
export default ApiEndPoint;