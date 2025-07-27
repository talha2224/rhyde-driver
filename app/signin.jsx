import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Toast from 'react-native-toast-message';
import config from '../config';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async () => {
        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Missing fields',
                text2: 'Please enter both email and password.',
            });
            return;
        }

        try {
            Toast.show({
                type: 'info',
                text1: 'Logging in...',
                text2: 'Please wait.',
                autoHide: false,
            });

            const response = await axios.post(`${config.baseUrl}/driver/login`, {
                email,
                password,
            });

            Toast.hide();

            if (response.status === 200 && response.data?.data?._id) {
                await AsyncStorage.setItem('userId', response.data.data._id);
                Toast.show({type: 'success',text1: 'Login Successful',text2: 'Welcome back!',});
                router.push('/home');
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Login Failed',
                    text2: response.data?.msg || 'Unexpected error occurred.',
                });
            }
        } 
        catch (error) {
            Toast.hide();
            if (error.response) {
                const code = error.response.data?.code;
                const msg = error.response.data?.msg;

                if (code === 401) {
                    Toast.show({
                        type: 'error',
                        text1: 'Account Not Verified',
                        text2: msg || 'Verification pending. Check your email.',
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Login Error',
                        text2: msg || 'Invalid email or password.',
                    });
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Network Error',
                    text2: 'Please check your internet connection.',
                });
            }
        }
    };


    const handleForgotPassword = () => {
        router.push("/forgot");
    };

    const handleSignUp = () => {
        router.push("/signup");
    };

    const handleGoBack = () => {
        router.back();
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>


            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.inner}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={20} color="white" />
                    </TouchableOpacity>

                    <View style={styles.contentArea}>
                        <Text style={styles.welcomeText}>Welcome Back</Text>
                        <Text style={styles.descriptionText}>Sign in to continue your smooth and secure ryde experience</Text>

                        {/* Social Sign-in Icons */}
                        {/* <View style={styles.socialLoginContainer}>
                            <TouchableOpacity style={styles.socialIconButton}>
                                <AntDesign name="google" size={28} color="#FFF" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialIconButton}>
                                <AntDesign name="facebook-square" size={28} color="#FFF" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialIconButton}>
                                <AntDesign name="apple1" size={28} color="#FFF" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.orSignInText}>Or sign in with</Text> */}

                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email Address"
                                placeholderTextColor="#888"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#888"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.passwordToggle}
                            >
                                <MaterialCommunityIcons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={handleSignIn} style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Sign in</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
                            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                        </TouchableOpacity>

                        {/* Fingerprint icon */}
                        {/* <TouchableOpacity style={styles.fingerprintButton}>
                            <Ionicons name="finger-print-outline" size={40} color="#FFF" />
                        </TouchableOpacity> */}

                        <View style={styles.bottomLinkContainer}>
                            <Text style={styles.bottomLinkText}>Don't have an account?</Text>
                            <TouchableOpacity onPress={handleSignUp}>
                                <Text style={styles.bottomLink}> Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    inner: {
        flex: 1,
    },
    backButton: {
        position: 'absolute', // Position absolutely to stay on top of content area
        top: 50, // Adjust for status bar
        left: 25,
        borderRadius: 20,
        padding: 8,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#221E43", // Assuming a dark border
        zIndex: 100,
    },
    contentArea: {
        backgroundColor: "#000", // Black background for content area
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingBottom: 50,
        marginTop:50
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
        marginTop: 40,
    },
    descriptionText: {
        fontSize: 15,
        color: '#918D8F',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    socialLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 30,
    },
    socialIconButton: {
        backgroundColor: 'rgba(255,255,255,0.1)', // Light transparent background
        borderRadius: 15,
        padding: 15,
    },
    orSignInText: {
        color: '#918D8F',
        fontSize: 14,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 15,
        marginBottom: 15,
        paddingHorizontal: 15,
        width: '100%',
        height: 55,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 16,
    },
    passwordToggle: {
        padding: 5,
    },
    actionButton: {
        width: '100%',
        paddingVertical: 18,
        backgroundColor: '#FBB73A', // Gold button
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    actionButtonText: {
        color: '#333',
        fontSize: 18,
    },
    forgotPasswordButton: {
        marginTop: 20,
        marginBottom: 30, // Space before fingerprint
    },
    forgotPasswordText: {
        color: '#fff',
    },
    fingerprintButton: {
        marginBottom: 30, // Space before bottom link
    },
    bottomLinkContainer: {
        flexDirection: 'row',
    },
    bottomLinkText: {
        color: '#918D8F',
        fontSize: 14,
    },
    bottomLink: {
        color: '#fff',
        fontSize: 14,
    },
});

export default Signin;

