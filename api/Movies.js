import axios from "./api";
import config from "../config.js";
const apiRoute = config.api;

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
    return await axios.put(`${apiRoute}/movies/${movieName}/vote`, data);
  },
  /**
   *
   * @param {Object} params
   * @param {String} params.movieNames
   * @returns {Promise}
   */
  async getMoviesDetails(params) {
    return await axios.get(`${apiRoute}/movies`, {
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
