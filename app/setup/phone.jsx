import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Image // Added Image for the phone icon
    ,




    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import phoneImg from "../../assets/images/onboarding/phone.png"; // Assuming this path is correct

const Phone = () => {
    const [phoneNumber, setPhoneNumber] = useState(''); // Changed from fullName to phoneNumber

    const handleGoBack = () => {
        router.back();
    };

    const handleNext = () => {
        router.push('/setup/otp');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

            {/* Progress Bar (updated for step 2) */}
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBarActive, { width: '36.66%' }]} />
                <View style={styles.progressBarInactive} />
            </View>

            <View style={styles.contentArea}>
                {/* Phone Image */}
                <Image source={phoneImg} style={styles.phoneImage} />

                <Text style={styles.title}>What’s your phone number?</Text>
                <Text style={styles.description}>We’ll use your number and email to send ryde updates and receipts.</Text>

                <View style={styles.inputContainer}>
                    {/* Country Code Selector (simplified for UI, actual implementation would be more complex) */}
                    <TouchableOpacity style={styles.countryCodeDropdown}>
                        <Text style={styles.countryCodeText}>+1</Text>
                        <Ionicons name="chevron-down" size={16} color="#FFF" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter phone number" // Updated placeholder as per image
                        placeholderTextColor="#AAA" // Changed color for better visibility on dark input
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>

            </View>

            <TouchableOpacity
                onPress={handleNext}
                style={[styles.nextButton, !phoneNumber && styles.nextButtonDisabled]}
                disabled={!phoneNumber}
            >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
            
            {/* Previous Button (matching the style of the "Cancel" button in FullName) */}
            <TouchableOpacity onPress={handleGoBack} style={styles.previousButton}>
                <Text style={styles.previousButtonText}>Previous</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1A1B', // Dark background
        paddingTop: StatusBar.currentHeight + 20,
        paddingHorizontal: 25,
    },
    progressBarContainer: {
        flexDirection: 'row',
        height: 5,
        backgroundColor: 'rgba(255,215,0,0.3)', // Lighter gold/yellow for inactive part
        borderRadius: 5,
        marginHorizontal: 0, // Should span full width of the screen content area
        marginBottom: 30, // Space between progress bar and back button/content
        overflow: 'hidden', // Ensures the active bar stays within rounded corners
    },
    progressBarActive: {
        height: '100%',
        backgroundColor: 'rgba(255,215,0,0.3)', // Green color for active part (matching phone icon)
        borderRadius: 5,
    },
    progressBarInactive: {
        flex: 1, // Takes the rest of the space
        backgroundColor: 'transparent',
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
    phoneImage: { // Changed from documentImage
        width: 80, // Adjust size as needed
        height: 80, // Adjust size as needed
        marginBottom: 30,
        resizeMode: 'contain',
        // Assuming this is a green phone icon, adjust if it's an image
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
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
    inputContainer: {
        flexDirection: 'row', // Align country code and input horizontally
        backgroundColor: '#2A2A2A', // Darker background for input as per image
        borderRadius: 15,
        paddingHorizontal: 15,
        width: '100%',
        height: 55,
        alignItems: 'center', // Vertically align items in the row
        marginBottom: 30,
    },
    countryCodeDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
        borderRightWidth: 1,
        borderRightColor: '#333',
        marginRight: 10,
    },
    countryCodeText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
    },
    input: {
        color: 'white',
        fontSize: 16,
        flex: 1, // Take remaining space
    },
    nextButton: {
        width: '100%',
        paddingVertical: 18,
        backgroundColor: '#FBB73A', // Yellow color
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15, // Space between Next and Previous
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
    previousButton: { // New style for the Previous button
        width: '100%',
        paddingVertical: 15,
        backgroundColor: 'transparent',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30, // Space from bottom of the screen
        borderWidth: 1,
        borderColor: '#AAA',
    },
    previousButtonText: { // New style for the Previous button text
        color: '#AAA',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Phone;
