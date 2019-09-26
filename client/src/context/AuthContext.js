import { AsyncStorage } from 'react-native';

import appAPI from '../api/appAPI';
import createDataContext from './createDataContext';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error': 
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    };
};

/*
** Action functions
*/
const signup = (dispatch) => {
    return async ({ email, password, confirmPassword }) => {
        try {
            const response = await appAPI.post('/signup',{ email, password, confirmPassword });
            console.log(response.data);
        } catch (err) {
            // TODO: pull error message from api/server and display here 
            dispatch({ type: 'add_error', payload: 'Error with Sign Up'});
        }
    };
};

const signin = (dispatch) => {
    return ({ email, password }) => {
        // try to signin
        // success = update state
        // fail = show error message

    };
};

const signout = (dispatch) =>{
    return () => {
        // signout
    };
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signup, signout },
    { isSignedIn: false, errorMessage: '' }
);