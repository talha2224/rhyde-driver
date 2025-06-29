import { router } from 'expo-router';
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import sucessImg from "../../assets/images/onboarding/badge.png";

const Success = () => {
    const handleOkayGotIt = () => {
        router.push('/home');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1A1A1B" />

            <View style={styles.contentArea}>
                <Image source={sucessImg} style={styles.successImage} />

                <Text style={styles.title}>Success</Text>
                <Text style={styles.description}>
                    Your application has been submitted. {'\n'}We'll review your information shortly
                </Text>

                <TouchableOpacity
                    onPress={handleOkayGotIt}
                    style={styles.okayButton}
                >
                    <Text style={styles.okayButtonText}>Okay, Got it!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1A1B',
        paddingHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentArea: {
        alignItems: 'center',
        borderRadius: 20,
        padding: 30,
        width: '100%',
        maxWidth: 400,
    },
    successImage: {
        width: 100,
        height: 100,
        marginBottom: 30,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#A19BAE',
        marginBottom: 40,
        lineHeight: 22,
        textAlign: 'center',
    },
    okayButton: {
        width: '100%',
        paddingVertical: 18,
        backgroundColor: '#FBB73A',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    okayButtonText: {
        color: '#1C1A1B',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Success;
