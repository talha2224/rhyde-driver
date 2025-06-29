import { router } from 'expo-router';
import { useState } from 'react';
import {
    Image // Added Image for the document icon
    ,









    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import DocumentImg from "../../assets/images/onboarding/document.png"; // Assuming this path is correct

const FullName = () => {
    const [fullName, setFullName] = useState('');

    const handleGoBack = () => {
        router.back();
    };

    const handleNext = () => {
        router.push('/setup/phone');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
                <View style={styles.progressBarActive} />
                <View style={styles.progressBarInactive} />
            </View>

            <View style={styles.contentArea}>
                <Image source={DocumentImg} style={styles.documentImage} />
                <Text style={styles.title}>What's your full name?</Text>
                <Text style={styles.description}>Tell us how you'd like to be addressed on your driver profile.</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Full Name"
                        placeholderTextColor="#AAA"
                        autoCapitalize="words"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </View>

                <TouchableOpacity
                    onPress={handleNext}
                    style={[styles.nextButton, !fullName && styles.nextButtonDisabled]}
                    disabled={!fullName}
                >
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
                
                {/* Cancel Button */}
                <TouchableOpacity onPress={handleGoBack} style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

            </View>
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
        backgroundColor: 'rgba(255,215,0,0.3)', // Lighter gold/yellow for inactive part
        borderRadius: 5,
        marginHorizontal: 0,
        marginVertical: 30,
        overflow: 'hidden',
    },
    progressBarActive: {
        width: '33.33%', // Example: 1 out of 3 steps
        height: '100%',
        backgroundColor: '#FBB73A', // Gold color for active part
        borderRadius: 5,
    },
    progressBarInactive: {
        flex: 1, // Takes the rest of the space
        backgroundColor: 'transparent', // Already set by container background
    },
    backButton: {
        position: 'absolute',
        top: StatusBar.currentHeight + 20,
        left: 20,
        zIndex: 10,
        padding: 8,
        backgroundColor: "#1C1A1B", // Match screen background
        borderRadius: 50,
    },
    contentArea: {
        flex: 1,
        marginTop: 40,
        alignItems: 'center', // Center items horizontally as per image
    },
    documentImage: {
        width: 80, // Adjust size as needed
        height: 80, // Adjust size as needed
        marginBottom: 30,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
        textAlign: 'center', // Center align title
    },
    description: {
        fontSize: 16,
        color: '#A19BAE',
        marginBottom: 40,
        lineHeight: 22,
        textAlign: 'center', // Center align description
        paddingHorizontal: 10, // Add some horizontal padding
    },
    inputContainer: {
        backgroundColor: '#2A2A2A', // Darker background for input as per image
        borderRadius: 15,
        paddingHorizontal: 15,
        width: '100%',
        height: 55,
        justifyContent: 'center',
        marginBottom: 30, // Space before buttons
    },
    input: {
        color: 'white',
        fontSize: 16,
        flex: 1,
    },
    nextButton: {
        width: '100%',
        paddingVertical: 18,
        backgroundColor: '#FBB73A', // Yellow color
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15, // Space between Next and Cancel
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    nextButtonDisabled: {
        backgroundColor: 'rgba(255,215,0,0.5)', // Lighter yellow when disabled
    },
    nextButtonText: {
        color: '#1C1A1B', // Dark text for yellow button
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: 'transparent',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30, // Space from bottom of the screen
        borderWidth: 1, // Add border
        borderColor: '#AAA', // Border color
    },
    cancelButtonText: {
        color: '#AAA', // Light gray text
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FullName;
