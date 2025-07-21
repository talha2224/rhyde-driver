import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Image,
    Keyboard,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import DocumentImg from "../../assets/images/onboarding/document.png";
import config from '../../config';

const Otp = () => {

    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const [email, setUserEmail] = useState('');

    useEffect(() => {
        (async () => {
            const email = await AsyncStorage.getItem("email");
            setUserEmail(email);
        })();
    }, []);
    
    const sendOtp = async (email) => {
        try {
            await axios.post(`${config.baseUrl}/driver/send/otp`, { email });
            Toast.show({ type: 'success', text1: 'OTP sent to your email' });
        } catch (error) {
            console.error("OTP Send Error", error);
            Toast.show({ type: 'error', text1: 'Failed to send OTP' });
        }
    };

    const verifyOtp = async () => {
        const code = otp.join('');
        if (code.length !== 4) {
            Toast.show({ type: 'error', text1: 'Enter full 4-digit OTP' });
            return;
        }

        try {
            console.log(`${config.baseUrl}/driver/verify/otp`,'base url')
            const response = await axios.post(`${config.baseUrl}/driver/verify/otp`, {
                email: email,
                otp: code
            });

            if (response.status === 200) {
                Toast.show({ type: 'success', text1: 'OTP Verified!' });
                router.push('/setup/upload');
            } else {
                Toast.show({ type: 'error', text1: response?.data?.msg || "Verification failed" });
            }
        } catch (error) {
            console.error("OTP Verify Error", error);
            Toast.show({
                type: 'error',
                text1: error?.response?.data?.msg || "Invalid OTP"
            });
        }
    };

    const handleOtpChange = (text, index) => {
        if (text.length > 1) text = text.charAt(0);
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        if (text !== '' && index < 3) inputRefs.current[index + 1]?.focus();
        if (index === 3 && text !== '') Keyboard.dismiss();
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleGoBack = () => {
        router.back();
    };

    const isOtpComplete = otp.every(digit => digit !== '');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBarActive, { width: '100%' }]} />
                <View style={styles.progressBarInactive} />
            </View>

            <View style={styles.contentArea}>
                <Image source={DocumentImg} style={styles.documentImage} />
                <Text style={styles.title}>Verification</Text>
                <Text style={styles.description}>
                    An OTP code will be sent to your phone number or <Text style={styles.emailLink}>use Email instead</Text>
                </Text>

                <View style={styles.otpInputContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={[styles.otpInput, digit !== '' && styles.otpInputFilled]}
                            keyboardType="number-pad"
                            maxLength={1}
                            onChangeText={(text) => handleOtpChange(text, index)}
                            value={digit}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            caretHidden={true}
                        />
                    ))}
                </View>

                <TouchableOpacity onPress={sendOtp} style={styles.resendOtpButton}>
                    <Text style={styles.resendOtpLabel}>Didn't receive code?</Text>
                    <Text style={styles.resendOtpText}> Resend</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={verifyOtp} style={[styles.nextButton, !isOtpComplete && styles.nextButtonDisabled]} disabled={!isOtpComplete}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleGoBack} style={styles.previousButton}>
                <Text style={styles.previousButtonText}>Previous</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1A1B',
        paddingTop: StatusBar.currentHeight + 20,
        paddingHorizontal: 25,
    },
    progressBarContainer: {
        flexDirection: 'row',
        height: 5,
        backgroundColor: '#333',
        borderRadius: 5,
        marginHorizontal: 0,
        marginVertical: 30,
        overflow: 'hidden',
    },
    progressBarActive: {
        height: '100%',
        backgroundColor: '#FBB73A',
        borderRadius: 5,
    },
    progressBarInactive: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    contentArea: {
        marginTop: 40,
        alignItems: 'center',
    },
    documentImage: {
        width: 80,
        height: 80,
        marginBottom: 30,
        resizeMode: 'contain',
        tintColor: '#E0BBE4',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 8,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#A19BAE',
        marginBottom: 40,
        lineHeight: 22,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    emailLink: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    otpInputContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        marginBottom: 40,
        width: '100%',
        gap: 20
    },
    otpInput: {
        width: 50,
        height: 50,
        backgroundColor: '#2A2A2A',
        borderRadius: 10,
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#444',
    },
    otpInputFilled: {
        borderColor: '#FBB73A',
    },
    resendOtpButton: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    resendOtpLabel: {
        color: '#AAA',
        fontSize: 16,
    },
    resendOtpText: {
        color: '#FBB73A',
        fontSize: 16,
        fontWeight: 'bold',
    },
    nextButton: {
        width: '100%',
        paddingVertical: 18,
        backgroundColor: '#FBB73A',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    nextButtonDisabled: {
        backgroundColor: 'rgba(255,215,0,0.5)',
    },
    nextButtonText: {
        color: '#1C1A1B',
        fontSize: 18,
        fontWeight: 'bold',
    },
    previousButton: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: 'transparent',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#AAA',
    },
    previousButtonText: {
        color: '#AAA',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Otp;
