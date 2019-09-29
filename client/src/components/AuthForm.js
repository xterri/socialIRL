import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';

import Spacer from './Spacer';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText, newAccount }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setComfirmPassword] = useState(''); 

    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>
            
            <Input label='Email' value={email} onChangeText={setEmail} autoCapitalize='none' autoCorrect={false} />
            <Spacer />
            
            <Input label='Password' value={password} onChangeText={setPassword} autoCapitalize='none' autoCorrect={false} secureTextEntry />
            
            { newAccount ? 
                <>
                    <Spacer />
                    <Input label='Confirm Password' value={confirmPassword} onChangeText={setComfirmPassword} autoCapitalize='none' autoCorrect={false} secureTextEntry />
                </>
                : null 
            }
            
            <Spacer>
                { newAccount ? 
                    <Button title={submitButtonText} onPress={() => onSubmit({ email, password, confirmPassword })}></Button> :
                    <Button title={submitButtonText} onPress={() => onSubmit({ email, password })}></Button>
                }
            </Spacer> 

            { errorMessage ? <Spacer><Text style={{ color: 'red', fontSize: 16 }}>{errorMessage}</Text></Spacer> : null }
        </>
    );
};

const styles = StyleSheet.create({});

export default AuthForm;