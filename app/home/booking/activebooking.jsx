import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    Image,
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import badge_image from '../../../assets/images/bookings/badge.png';
import mapImg from '../../../assets/images/home/map.png';
import profile_image from '../../../assets/images/profile_photo.png';

const { height } = Dimensions.get('window');

const ActiveBooking = () => {
    const [currentStep, setCurrentStep] = useState('goToPickup');
    const [isOnline] = useState(true);
    const [rating, setRating] = useState(0);

    const passengerInfo = {
        name: 'Alisha Mark',
        distance: '2.7KM',
        location: '2118 Thornridge Cir. Syracuse, Connecti...',
        profilePic: profile_image,
        phone: '123-456-7890',
    };

    const tripInfo = {
        pickupLocation: '4517 Washington Ave, Manchester, Kent...',
        destinationLocation: '2118 Thornridge Cir. Syracuse, Connecti...',
    };

    const handleGoToPickup = () => {
        setCurrentStep('passengerPickup');
    };

    const handleNextFromPickup = () => {
        setCurrentStep('startTripStatus');
    };

    const handleStartTrip = () => {
        setCurrentStep('dropOffLocation');
    };

    const handleCompleteTrip = () => {
        setCurrentStep('tripSuccessful');
    };

    const handleRateRyder = () => {
        setCurrentStep('review');
    };

    const handleCancelRyde = () => {
        router.push('/home/booking/cancelled');
    };

    const handleSubmitReview = () => {
        console.log('Review submitted with rating:', rating);
        router.push('/home');
    };

    const handleCallPress = () => {
        const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // Generates a 10-digit number
        const phoneNumber = `tel:${randomNumber}`;
        Linking.openURL(phoneNumber).catch(err => console.error('Failed to open dialer:', err));
    };

    const renderGoToPickup = () => (
        <View style={styles.bottomSheet}>
            <TouchableOpacity style={styles.actionButton} onPress={handleGoToPickup}>
                <Text style={styles.actionButtonText}>Go to pickup</Text>
            </TouchableOpacity>
        </View>
    );

    const renderPassengerPickup = () => (
        <View style={styles.bottomSheet}>
            <Text style={styles.bottomSheetHeader}>Passenger’s pickup</Text>
            <View style={styles.passengerInfoContainer}>
                <Image source={passengerInfo.profilePic} style={styles.passengerAvatar} />
                <View style={styles.passengerDetails}>
                    <Text style={styles.passengerName}>{passengerInfo.name}</Text>
                    <Text style={styles.passengerDistance}>{passengerInfo.distance}</Text>
                </View>
                <TouchableOpacity onPress={() => { router.push("/home/chat") }} style={styles.passengerActionButton}>
                    <Ionicons name="chatbox-outline" size={20} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCallPress} style={styles.passengerActionButton}>
                    <Ionicons name="call-outline" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
            <View style={styles.locationDetailRow}>
                <Ionicons name="location-sharp" size={20} color="#FFD700" style={styles.locationIcon} />
                <Text style={styles.locationText}>{passengerInfo.location}</Text>
            </View>
            <TouchableOpacity style={[styles.actionButton, styles.nextButton]} onPress={handleCancelRyde}>
                <Text style={styles.actionButtonText}>Cancel ryde</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "#1C1A1B", heightL: 40, marginBottom: 10, paddingVertical: 18, width: "100%", justifyContent: "center", alignItems: "center", borderRadius: 15 }} onPress={handleNextFromPickup}>
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Next</Text>
            </TouchableOpacity>
        </View>
    );

    const renderStartTripStatus = () => (
        <View style={styles.bottomSheet}>
            <Text style={styles.bottomSheetHeader}>Destination</Text>
            <TouchableOpacity style={styles.actionButton} onPress={handleStartTrip}>
                <Text style={styles.actionButtonText}>Start trip</Text>
            </TouchableOpacity>
        </View>
    );

    const renderDropOffLocation = () => (
        <View style={styles.bottomSheet}>
            <Text style={styles.bottomSheetHeader}>Drop off Location</Text>
            <View style={styles.locationDetailRow}>
                <Ionicons name="location-sharp" size={20} color="#FFD700" style={styles.locationIcon} />
                <Text style={styles.locationText}>{tripInfo.destinationLocation}</Text>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={handleCompleteTrip}>
                <Text style={styles.cancelButtonText}>Complete trip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "#1C1A1B", heightL: 40, marginBottom: 10, paddingVertical: 18, width: "100%", justifyContent: "center", alignItems: "center", borderRadius: 15 }} onPress={handleCancelRyde}>
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Cancel trip</Text>
            </TouchableOpacity>
        </View>
    );

    const renderTripSuccessful = () => (
        <View style={styles.bottomSheet}>
            <Text style={styles.bottomSheetHeader}>Trip completed</Text>
            <Image source={badge_image} style={{marginBottom:10}}/>
            <Text style={styles.tripSuccessfulTitle}>Trip successful</Text>
            <Text style={styles.tripSuccessfulDescription}>You've completed the trip. Kindly rate your ryder</Text>
            <TouchableOpacity style={styles.actionButton} onPress={handleRateRyder}>
                <Text style={styles.actionButtonText}>Rate ryder</Text>
            </TouchableOpacity>
        </View>
    );

    const renderReview = () => (
        <View style={styles.bottomSheet}>
            <Text style={styles.bottomSheetHeader}>Review</Text>
            <Text style={styles.reviewQuestion}>How was your experience with Grace?</Text>
            <View style={styles.starRatingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                        <AntDesign
                            name={star <= rating ? "star" : "staro"}
                            size={30}
                            color="#FFD700"
                            style={styles.starIcon}
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <TextInput
                style={styles.feedbackInput}
                placeholder="Write your feedback (Optional)"
                placeholderTextColor="#AAA"
                multiline
                numberOfLines={4}
            />
            <TouchableOpacity style={styles.actionButton} onPress={handleSubmitReview}>
                <Text style={styles.actionButtonText}>Submit review</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1A1A1B" />
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.userInfo}>
                        <Image source={profile_image} style={styles.profileAvatar} />
                        <View>
                            <Text style={styles.greeting}>Welcome back!</Text>
                            <Text style={styles.userName}>Michael</Text>
                        </View>
                    </View>
                    <View style={styles.statusToggleContainer}>
                        <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#FFD700" }}
                            thumbColor={isOnline ? "#FFF" : "#F4F3F4"}
                            ios_backgroundColor="#3e3e3e"
                            value={isOnline}
                        />
                    </View>
                </View>
                <View style={styles.mapContainer}>
                    <Image source={mapImg} style={styles.mapImage} resizeMode="cover" />
                </View>
            </ScrollView>
            {currentStep === 'goToPickup' && renderGoToPickup()}
            {currentStep === 'passengerPickup' && renderPassengerPickup()}
            {currentStep === 'startTripStatus' && renderStartTripStatus()}
            {currentStep === 'dropOffLocation' && renderDropOffLocation()}
            {currentStep === 'tripSuccessful' && renderTripSuccessful()}
            {currentStep === 'review' && renderReview()}
        </View>
    );
};

export default ActiveBooking;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1A1B'
    },
    scrollViewContent: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        backgroundColor: "#EA9B09",
        position: 'absolute',
        width: '100%',
        zIndex: 10,
        paddingBottom: 20,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    greeting: {
        fontSize: 16,
        color: '#FFF'
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    },
    statusToggleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusText: {
        color: '#FFF',
        marginRight: 8,
        fontSize: 16
    },
    mapContainer: {
        flex: 1,
        borderRadius: 15,
        marginHorizontal: 0,
        marginTop: 0,
    },
    mapImage: {
        width: '100%',
        height: '100%'
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#181617',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        paddingBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 20,
        // minHeight: height * 0.3,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bottomSheetHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
        textAlign: 'center',
    },
    actionButton: {
        width: '100%',
        paddingVertical: 18,
        backgroundColor: '#FFD700',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    actionButtonText: {
        color: '#1C1A1B',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#AAA',
        marginRight: 10,
    },
    cancelButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    nextButton: {
        flex: 1,

    },
    passengerInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1A1B',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        width: '100%',
    },
    passengerAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    passengerDetails: {
        flex: 1,
    },
    passengerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    passengerDistance: {
        fontSize: 14,
        color: '#AAA',
        marginTop: 2,
    },
    passengerActionButton: {
        padding: 8,
        marginLeft: 10,
        backgroundColor: '#444',
        borderRadius: 100,
    },
    locationDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1A1B',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        width: '100%',
    },
    locationIcon: {
        marginRight: 10,
    },
    locationText: {
        fontSize: 16,
        color: '#FFF',
        flexShrink: 1,
    },
    successIconContainer: {
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1C1A1B',
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    tripSuccessfulTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    tripSuccessfulDescription: {
        fontSize: 16,
        color: '#AAA',
        marginBottom: 15,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    reviewQuestion: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
        textAlign: 'center',
        lineHeight:40
    },
    starRatingContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    starIcon: {
        marginHorizontal: 5,
    },
    feedbackInput: {
        width: '100%',
        backgroundColor: '#1C1A1B',
        borderRadius: 15,
        padding: 15,
        color: '#FFF',
        fontSize: 16,
        minHeight: 100,
        textAlignVertical: 'top',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#444',
    },
});

