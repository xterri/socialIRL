import createDataContext from './createDataContext'; 
import jsonServer from '../api/jsonServer'; // how is this connected?

const eventDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'get_eventDetails':
            return state;
        default:
            return state;
    }
};


const getEventDetails = (dispatch) => {
    return (async () => {
        const response = await jsonServer.get('/eventDetails'); 
        dispatch({ type: 'get_eventDetails', payload: response.data }); 
    });
}

// pass in reducer, object w/ actions, & initial/default state
export const { Context, Provider } = createDataContext(
    eventDetailsReducer, 
    { addEventDetails }, 
    []);