import api from "./api";
import config from "../config.js";
const apiRoute = config.api;

export default {
  create(data) {
    return api.post(`${apiRoute}/rooms/`, data);
  },
};
