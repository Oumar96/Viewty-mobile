import api from "./api";
import config from "../config.js";
const apiRoute = config.api;

export default {
  getUsers(data) {
    console.log(data);
    return api.get(`${apiRoute}/users/`, data);
  },
};
