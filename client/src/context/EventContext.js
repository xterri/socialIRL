import appAPI from '../api/appAPI';
import createDataContext from './createDataContext'; 


const eventDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'get_events':
            return action.payload;
        case 'disliked_event':
            return state.filter((event) => event._id !== action.payload);
        case 'liked_event':
            return state.filter((event)=> event._id !== action.payload);
        default:
            return state;
    }
};

// get all events not created by current user
const getEvents = (dispatch) => {
    return (async (view) => {
        const response = await appAPI.get('/events', { params: { view }}); 

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

// remove event from the state list. should reappear after refresh
const dislikeEvent = (dispatch) => {
    return (async (id) => {
        dispatch({ type: 'disliked_event', payload: id });
    });
};

const likeEvent = (dispatch) => {
    return (async (id) => {

        /*
        ** Are we able to just send a request to server end and re-map the event's interestedUsers to include current userID
        ** instead of doing this?
        */

        // get userID & event
        // const response = await appAPI.get('/events', { params: { eventId: id }}); 

        // const userId = response.data[0].userId;
        // const newLikes = response.data[0].event.interestedUsers;

        // newLikes.push(userId);

        // save user._id to event._id
        const response = await appAPI.get('/events', { params: { eventId: id }});

        console.log(response.data);

        dispatch({ type: 'liked_event', payload: id });
        // callback ? callback() : null;
    });
};

// pass in reducer, object w/ actions, & initial/default state
export const { Context, Provider } = createDataContext(
    eventDetailsReducer, 
    { addEvent, getEvents, dislikeEvent, likeEvent }, 
    // {currentIndex: 0 }
);