import appAPI from '../api/appAPI';
import createDataContext from './createDataContext'; 

// temp. until Events DB set up
import data from '../devSource/events.json';

const eventDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'get_eventDetails':
            return action.payload;
        default:
            return state;
    }
};

const getEventDetails = (dispatch) => {
    return (async () => {
        // const response = await jsonServer.get('/eventDetails'); 

        dispatch({ type: 'get_eventDetails', payload: data.eventDetails }); 
    });
}

const addEvent = (dispatch) => {
    // TODO: List what contents need to be added to db
    return (async (content) => {
        await jsonServer.post('/eventDetails', { content }); 
    });
};

// pass in reducer, object w/ actions, & initial/default state
export const { Context, Provider } = createDataContext(
    eventDetailsReducer, 
    { addEvent, getEventDetails }, 
    []);