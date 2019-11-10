import { AsyncStorage } from 'react-native';

import appAPI from '../api/appAPI';
import createDataContext from './createDataContext'; 


const eventDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'get_events':
            return action.payload;
        default:
            return state;
    }
};

const getEvents = (dispatch) => {
    return (async () => {
        const response = await appAPI.get('/events'); 

        dispatch({ type: 'get_events', payload: response.data }); 
    });
}

const addEvent = (dispatch) => {
    // TODO: List what contents need to be added to db
    return (async (title, description, eventDate, callback) => {
        try {
            await appAPI.post('/events', { title, description, eventDate }); 

            callback ? callback() : null;
        } catch (err) {
            console.error(err);
        }
    });
};

// pass in reducer, object w/ actions, & initial/default state
export const { Context, Provider } = createDataContext(
    eventDetailsReducer, 
    { addEvent, getEvents }, 
    []);