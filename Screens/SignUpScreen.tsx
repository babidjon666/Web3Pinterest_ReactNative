import React, { useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text, StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import { SignUp } from '../Services/auth';
import { User } from '../Models/User';

function SignUpScreen(): React.JSX.Element {
    const [user, setUser] = useState<User>();
    const [email, setEmail] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    
    const handleSignUp = async () => {
        setLoading(true);
        setError(''); 
    
        try {
            const user = await SignUp(email, password, userName);
            if (user) {
                setUser(user);
            } else {
                setError("User creation failed");
            }
    
        } catch (err: any) {
            setError(err.message); 
        } finally {
            setLoading(false); 
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.logo}
                source={{ uri: 'https://static.vecteezy.com/system/resources/previews/024/093/325/non_2x/solana-sol-glass-crypto-coin-3d-illustration-free-png.png' }}
            />  
            <View style={styles.card}>
                <Text style={styles.title}>Sign Up</Text>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.smallTitle}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter email"
                        placeholderTextColor="#aaa"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />  
                </View>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.smallTitle}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter username"
                        placeholderTextColor="#aaa"
                        value={userName}
                        onChangeText={setUserName}
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.smallTitle}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter password"
                        placeholderTextColor="#aaa"
                        value={password}
                        onChangeText={setPassword} 
                        secureTextEntry={true}
                    />
                </View>
                
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                
                <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    card: {
        width: '95%',
        padding: 20,
        borderRadius: 25,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: 'bold',
        color: 'black',

    },
    smallTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 8,
        paddingLeft: 15,
        borderWidth: 0.2,
    },
    errorText: {
        color: '#ff5c5c',
        marginBottom: 10,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginTop: 10,
        shadowColor: 'black',
        shadowRadius: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SignUpScreen;
