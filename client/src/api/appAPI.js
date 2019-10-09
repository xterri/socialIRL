import axios from 'axios';

export default axios.create({
    // enter public url for access to api; for now use ngrok (connect it to the server/expressAPI)
    baseURL: 'https://socialirl.appspot.com/'
});