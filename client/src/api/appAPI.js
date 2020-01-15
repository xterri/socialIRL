import { AsyncStorage } from 'react-native';
import axios from 'axios';

const instance = axios.create({
    // enter public url for access to api; for now use ngrok (connect it to the server/expressAPI)
    baseURL: 'https://0288de75.ngrok.io' // dev
    // baseURL: 'https://socialirl.appspot.com/' // prod 
});

// automatically authenticates the user to use the app; called every time we use our api
instance.interceptors.request.use(
    // called automatically when about to make a request
    async (config) => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            // adding authorization to header to use for authentication
            config.headers.Authorization = `Bearer ${token}`;
        }

        // return modified config object
        return config;
    },
    // called automatically when there is an error with request
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;