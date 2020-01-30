import { API } from "../../config/config";
import axios from "axios";

export default {
  login(email, password) {
    return axios
      .post(`${API}login`, { email, password })
      .then(({ data }) => data);
  },
  getUser() {
    return axios.get(`${API}user/auth`).then(({ data }) => data);
  }
};
