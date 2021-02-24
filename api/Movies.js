import axios from 'axios';
import config from '../config.js';
const api = config.api;
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
    async vote(movieName, data){
        await axios.put(`${api}/movies/${movieName}/vote`, data)
    },
    /**
     *
     * @returns {Promise}
     */
    async endRoom(){
        // apo
    }
}