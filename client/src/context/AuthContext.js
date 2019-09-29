import { AsyncStorage } from 'react-native'; // will be deprecated will need to use react-native-async-storage when ready

import appAPI from '../api/appAPI';
import createDataContext from './createDataContext';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error': 
            return { ...state, errorMessage: action.payload };
        case 'signup' || 'signin':
            return { errorMessage: '', token: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: ''};
        default:
            return state;
    };
};

/*
** Action functions
*/

// TODO: add a 'Forgot Password' link and action

const signup = (dispatch) => async ({ email, password, confirmPassword }) => {
    try {
        const response = await appAPI.post('/signup',{ email, password, confirmPassword });
        // send and store a token to user's device
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signup', payload: response.data.token});

        // navigate to main flow
        navigate('mainFlow');
        
    } catch (err) {
        // TODO: pull error message from api/server and display here 
        dispatch({ type: 'add_error', payload: 'Error with Sign Up'});
    }
};

const signin = (dispatch) => async ({ email, password }) => {
    try {
        const response = await appAPI.post('/signin',{ email, password });

        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token});

        // navigate to main flow
        navigate('mainFlow');
    } catch (err) {
        // TODO: pull error message from api/server and display here 
        dispatch({ type: 'add_error', payload: 'Incorrect password or username. Please try again.'});
    }
};

const signout = (dispatch) =>{
    return () => {
        // signout
    };
};

const tryLocalSignIn = (dispatch) => async () => {
    const token = await AsyncStorage.getItem('token');
    
    if (token){
        dispatch({ type: 'signin', payload: token });
        navigate('mainFlow');
    } else {
        // unncessary, but adding just in case
        navigate('loginFlow');
    }
};

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error_message' });
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signup, signout, clearErrorMessage, tryLocalSignIn },
    { token: null, errorMessage: '' }
);