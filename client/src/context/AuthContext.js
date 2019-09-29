import { AsyncStorage } from 'react-native'; // will be deprecated will need to use react-native-async-storage when ready

import appAPI from '../api/appAPI';
import createDataContext from './createDataContext';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error': 
            return { ...state, errorMessage: action.payload };
        case 'signup':
            return { errorMessage: '', token: action.payload };
        default:
            return state;
    };
};

/*
** Action functions
*/
const signup = (dispatch) => async ({ email, password, confirmPassword }) => {
    try {
        const response = await appAPI.post('/signup',{ email, password, confirmPassword });
        // send and store a token to user's device
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signup', payload: response.data.token});

        // navigate to main flow
        navigate('mainFlow');
        
    } catch (err) {
        console.log(err);
        // TODO: pull error message from api/server and display here 
        dispatch({ type: 'add_error', payload: 'Error with Sign Up'});
    }
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
    { token: null, errorMessage: '' }
);