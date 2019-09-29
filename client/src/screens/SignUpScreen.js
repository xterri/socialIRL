import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Context as AuthContext } from '../context/AuthContext';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignUpScreen = () => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <NavigationEvents 
                onWillBlur={clearErrorMessage}  
            />
            <AuthForm
                headerText='Create an Account'
                errorMessage={state.errorMessage}
                submitButtonText='Sign Up'
                onSubmit={signup} // same as ({ email, password }) => signup({ email, password })
                newAccount={true}
            />
            <NavLink text='Log in with your account' routeName='SignIn' />
        </View>
    );
};

// Remove the header
SignUpScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 70,
    }
});

export default SignUpScreen;