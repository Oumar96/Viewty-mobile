import axios from 'axios';

export default {
    async vote(movieName, data){
        await axios.put(`https://us-central1-view-and-party.cloudfunctions.net/api/movies/${movieName}/vote`, data)
    }
}