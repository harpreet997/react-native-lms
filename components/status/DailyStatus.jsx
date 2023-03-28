import { Text, ScrollView, Alert, Button, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { Input, SocialIcon } from 'react-native-elements';
import { Icon } from '@rneui/themed';

const DailyStatus = () => {
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.email) {
            handleError('Please input email', 'email');
            isValid = false;
        }
        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        }
        if (isValid) {
            login();
        }
    };

    const login = () => {
        Alert.alert("Login Successfully")
    };


    return (
        <ScrollView>
            <Input
                onChangeText={text => handleOnchange(text, 'email')}
                onFocus={() => handleError(null, 'email')}
                placeholder='Enter Email'
                leftIcon={{ type: 'fontisto', name: 'email' }}
                errorMessage={errors.email}
            />
            <Input
                onChangeText={text => handleOnchange(text, 'password')}
                onFocus={() => handleError(null, 'password')}
                placeholder='Enter Password'
                secureTextEntry={true}
                leftIcon={{ type: 'MaterialCommunityIcons', name: 'lock-outline' }}
                errorMessage={errors.password}
            />
            <Button title="login" onPress={() => {
                setTimeout(() => {
                    validate();
                }, 1000)
            }} />
            <SocialIcon
                title='Sign In With Facebook'
                button
                type='facebook'
            />
        </ScrollView>
    )
}

export default DailyStatus
