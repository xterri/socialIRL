import appAPI from '../api/appAPI';
import createDataContext from './createDataContext'; 
import _ from 'lodash';

const eventDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'get_events':
            return action.payload;
        case 'disliked_event':
        case 'liked_event':
            return state.filter((event) => event._id !== action.payload);
        default:
            return state;
    }
};

// get all events not created by current user
const getEvents = (dispatch) => {
    return (async () => {
        const response = await appAPI.get('/events');
        const len = response.data.length;
        
        // randomize array before dispatch
        response.data.forEach((event) => {
            event.priority = 0.3 * (Math.floor(Math.random() * len) / len) + 0.7 * (new Date(event.eventDate).getTime() - Date.now());
        });

        dispatch({ type: 'get_events', payload: _.sortBy(response.data, 'priority') }); 
    });
}

const addEvent = (dispatch) => {
    // TODO: List what contents need to be added to db
    return (async (title, description, eventDate, callback) => {
        try {
            const response = await appAPI.post('/events', { title, description, eventDate }); 

            // dispatch({ type: 'add_events', payload: response.data }); 

            callback ? callback() : null;
        } catch (err) {
            console.error(err);
        }
    });
};

// remove event from the state list. should reappear after refresh
const dislikeEvent = (dispatch) => {
    return (async (id) => {

        dispatch({ type: 'disliked_event', payload: id });
    });
};

const likeEvent = (dispatch) => {
    return (async (id) => {
        // save user._id to event._id
        await appAPI.post('/events', { eventId: id });

        dispatch({ type: 'liked_event', payload: id });
        // callback ? callback() : null;
    });
};


// pass in reducer, object w/ actions, & initial/default state
export const { Context, Provider } = createDataContext(
    eventDetailsReducer, 
    { addEvent, getEvents, dislikeEvent, likeEvent},
    // {}
);