import Axios from "axios";

const baseURL = "http://app.qikan.cn/"

const http = Axios.create({ baseURL })
// http.interceptors.response.use(response => response.data)

export default http