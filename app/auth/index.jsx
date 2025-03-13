import { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useRouter} from 'expo-router';
import {useAuth} from '../../contexts/AuthContext.js';

const AuthScreen = () => {
    const {login, register} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleAuth = async () => {
        if (!email.trim() || !password.trim()) {
            setError('Email and Password are required');
        }

        if (isRegistering && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        let response;
        if (isRegistering) {
            response = await register(email, password);
        } else {
            response = await login(email, password);
        }
        if (response?.error) {
            Alert.alert('Error', response.error);
            return;
        }
        router.replace('/notes');
    }


    return (
        <View style={styles.container}>
            <Text style={styles.header}>{isRegistering ? 'Signup' : 'Login'}</Text>

            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder='Email'
                placeholderTextColor='#aaa'
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                keyboardType='email-address'
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                placeholderTextColor='#aaa'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textContentType='none'
            />

            {isRegistering && (
                <TextInput
                    style={styles.input}
                    placeholder='Confirm Password'
                    placeholderTextColor='#aaa'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    textContentType='none'
                />
            )}
            <TouchableOpacity style={styles.button} onPress={handleAuth}>
                <Text style={styles.buttonText}>
                    {isRegistering ? 'Signup' : 'Login'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
                <Text style={styles.switchText}>
                    {isRegistering ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa'
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333'
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#fff',
        padding: 12,
        fontSize: 16
    },
    button: {
        width: '100%',
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    switchText: {
        color: '#007bff',
        marginTop: 10
    },
    error: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center'
    }

});

export default AuthScreen;