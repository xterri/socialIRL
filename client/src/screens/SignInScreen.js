import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Context as AuthContext } from '../context/AuthContext';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

// TODO: Look into resetting the states in AuthForm when screen goes back (resets in signup, but not in signin)
const SignInScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <NavigationEvents onWillBlur={clearErrorMessage} />
            <AuthForm
                headerText='Sign In'
                errorMessage={state.errorMessage}
                submitButtonText='Sign In'
                onSubmit={signin}
            />
            <NavLink text='Create an Account' routeName='SignUp'/>
        </View>
    );
};

SignInScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 70,
    }
});

export default SignInScreen;