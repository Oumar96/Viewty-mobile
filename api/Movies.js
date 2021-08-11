import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config.js";
const api = config.api;

axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  /**
   *
   * @param {String} movieName
   * @param {Object} payload
   * @param {String} payload.user
   * @param {String} payload.room
   * @param {String} payload.vote
   * @returns {Promise}
   */
  async vote(movieName, data) {
    console.log(`${api}/movies/${movieName}/vote`);
    return await axios.put(`${api}/movies/${movieName}/vote`, data);
  },
  /**
   *
   * @param {Object} params
   * @param {String} params.movieNames
   * @returns {Promise}
   */
  async getMoviesDetails(params) {
    return await axios.get(`${api}/movies`, {
      params: params,
    });
  },
  /**
   *
   * @returns {Promise}
   */
  async endRoom() {
    // apo
  },
};
