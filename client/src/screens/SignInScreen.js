import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { Context as AuthContext } from '../context/AuthContext';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignInScreen = ({ navigation }) => {
    const { state, signin } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <AuthForm
                headerText='Sign In'
                errorMessage=''
                submitButtonText='Sign In'
                onSubmit={() => {}}
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