import axios from 'axios';

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
        await axios.put(`https://us-central1-view-and-party.cloudfunctions.net/api/movies/${movieName}/vote`, data)
    },
    /**
     *
     * @returns {Promise}
     */
    async endRoom(){
        // apo
    }
}