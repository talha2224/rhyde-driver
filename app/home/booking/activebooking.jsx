import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Location from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Linking, Platform, ScrollView, StatusBar, StyleSheet, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import badge_image from '../../../assets/images/bookings/badge.png';
import config from '../../../config';
import { useSocket } from '../../../contexts/SocketContext';
import { darkMapStyle } from '../../../style/dark.map.style';

const ActiveBooking = () => {
    const { getSocket } = useSocket();

    const params = useLocalSearchParams();
    const [bookingDetails, setBookingDetails] = useState(null);

    const [currentStep, setCurrentStep] = useState('passengerPickup');
    const [isOnline] = useState(true);
    const [rating, setRating] = useState(0);

    // LOCATIONS 
    const [pickupLocation, setPickupLocation] = useState(null);
    const [dropOffLocation, setDropOffLocation] = useState(null);
    const [driverLocation, setDriverLocation] = useState(null)

    // REVIEW 
    const [feedback, setFeedback] = useState('');


    const handleRateRyder = () => {
        setCurrentStep('review');
    };


    const handleCompleteRyde = () => {
        axios
            .put(`${config.baseUrl}/booking/status/${bookingDetails._id}`, { status: "completed", })
            .then((res) => {
                if (res) {
                    Toast.show({ type: "success", text1: "Rhyde Completed", text2: "Thanks for chosing Rhyde", });
                    setCurrentStep("tripSuccessful")
                }
            });
    }

    const handleSubmitReview = async () => {
        try {
            const riderId = bookingDetails?.riderId?._id;
            const driverId = bookingDetails?.driverId?._id;
            const bookingId = bookingDetails?._id;

            if (!riderId || !driverId || !bookingId || !rating) {
                Toast.show({ type: 'error', text1: 'Missing data for review', });
                return;
            }

            const payload = {
                bookingId,
                riderId,
                stars: rating,
                message: feedback,
            };

            const res = await axios.post(`${config.baseUrl}/review`, payload);
            if (res?.data) {
                Toast.show({
                    type: 'success',
                    text1: 'Review submitted successfully!',
                });
                router.push('/home');
            }
        } catch (error) {
            console.error("Review submission error:", error);
            Toast.show({
                type: 'error',
                text1: 'Failed to submit review',
            });
        }
    };

    const handleCallPress = () => {
        const phoneNumber = `tel:${bookingDetails?.riderId?.phone_number}`;
        Linking.openURL(phoneNumber).catch(err => console.error('Failed to open dialer:', err));
    };

    const renderPassengerPickup = () => (
        <View style={styles.bottomSheet}>
            <Text style={styles.bottomSheetHeader}>Passenger’s pickup</Text>
            <View style={styles.passengerInfoContainer}>
                <Image source={{ uri: bookingDetails?.riderId?.profile }} style={styles.passengerAvatar} />
                <View style={styles.passengerDetails}>
                    <Text style={styles.passengerName}>{bookingDetails?.riderId?.name}</Text>
                    <Text style={styles.passengerDistance}>{bookingDetails?.distance?.toFixed(2)}Miles</Text>
                </View>
                {/* <TouchableOpacity onPress={() => { router.push("/home/chat") }} style={styles.passengerActionButton}>
                    <Ionicons name="chatbox-outline" size={20} color="#FFF" />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={handleCallPress} style={styles.passengerActionButton}>
                    <Ionicons name="call-outline" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
            <View style={styles.locationDetailRow}>
                <Ionicons name="location-sharp" size={20} color="#FFD700" style={styles.locationIcon} />
                <Text style={styles.locationText}>{bookingDetails?.pickupAddress}</Text>
            </View>
            <View style={styles.locationDetailRow}>
                <Ionicons name="location-sharp" size={20} color="#FFD700" style={styles.locationIcon} />
                <Text style={styles.locationText}>{bookingDetails?.dropOffAddress}</Text>
            </View>
            <TouchableOpacity style={[styles.actionButton, styles.nextButton]} onPress={handleCompleteRyde}>
                <Text style={styles.actionButtonText}>Complete ryde</Text>
            </TouchableOpacity>
        </View>
    );

    const renderTripSuccessful = () => (
        <View style={styles.bottomSheet}>
            <Text style={styles.bottomSheetHeader}>Trip completed</Text>
            <Image source={badge_image} style={{ marginBottom: 10 }} />
            <Text style={styles.tripSuccessfulTitle}>Trip successful</Text>
            <Text style={styles.tripSuccessfulDescription}>You have completed your ryde. Kindly rate your driver.</Text>
            <TouchableOpacity style={styles.actionButton} onPress={handleRateRyder}>
                <Text style={styles.actionButtonText}>Rate ryder</Text>
            </TouchableOpacity>
        </View>
    );

    const renderReview = () => (
        <View style={styles.bottomSheet}>
            <Text style={styles.bottomSheetHeader}>Review</Text>
            <Text style={styles.reviewQuestion}>How was your experience with {bookingDetails?.driverId?.name}?</Text>
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
                value={feedback}
                onChangeText={setFeedback}
            />
            <TouchableOpacity style={styles.actionButton} onPress={handleSubmitReview}>
                <Text style={styles.actionButtonText}>Submit review</Text>
            </TouchableOpacity>
        </View>
    );

    // PARAMS 
    useEffect(() => {
        if (params?.bookingData) {
            const bookingData = JSON.parse(params?.bookingData);
            setPickupLocation(bookingData?.pickupCoordinates)
            setDropOffLocation(bookingData?.dropOffCoordinates)
            setBookingDetails(bookingData)
        }
        else {
            ToastAndroid.show("No booking rydes", ToastAndroid.SHORT);
            router.back();
        }
    }, []);

    useEffect(() => {
        let locationSubscription = null;

        const startLocationUpdates = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            const socket = getSocket();
            const driverId = await AsyncStorage.getItem("userId");
            const riderId = bookingDetails?.riderId?._id;

            if (!socket || !driverId || !riderId) {
                console.log("Missing socket, driverId, or riderId");
                return;
            }

            locationSubscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 10,
                },
                (loc) => {
                    if (loc?.coords) {
                        setDriverLocation({
                            latitude: loc.coords.latitude,
                            longitude: loc.coords.longitude,
                        });

                        socket.emit("driverLocation", {
                            driverId: riderId,
                            latitude: loc.coords.latitude,
                            longitude: loc.coords.longitude,
                        });
                    }
                }
            );
        };

        if (bookingDetails?.riderId?._id) {
            startLocationUpdates();
        }

        return () => {
            if (locationSubscription) {
                locationSubscription.remove();
            }
        };
    }, [bookingDetails]);




    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#1A1A1B" />
                <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <View style={styles.userInfo}>
                            <Image source={{ uri: bookingDetails?.driverId?.profile_img }} style={styles.profileAvatar} />
                            <View>
                                <Text style={styles.greeting}>Welcome back!</Text>
                                <Text style={styles.userName}>{bookingDetails?.driverId?.name}</Text>
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

                    {
                        pickupLocation && dropOffLocation && driverLocation ? (
                            <MapView
                                style={styles.mapContainer}
                                initialRegion={{
                                    latitude: pickupLocation?.latitude || 0,
                                    longitude: pickupLocation?.longitude || 0,
                                    latitudeDelta: 0.05,
                                    longitudeDelta: 0.05,
                                }}
                                showsUserLocation
                                showsMyLocationButton={false}
                                customMapStyle={darkMapStyle}
                            >
                                {/* 📍 User Pickup Location */}
                                <Marker coordinate={pickupLocation}>
                                    <MaterialCommunityIcons name="map-marker" size={30} color="gold" />
                                </Marker>

                                {/* 🚘 Driver Location */}
                                <Marker coordinate={driverLocation}>
                                    <MaterialCommunityIcons name="car" size={26} color="gold" />
                                </Marker>

                                {/* 🎯 Drop-off Location */}
                                <Marker coordinate={dropOffLocation}>
                                    <MaterialCommunityIcons name="flag-checkered" size={26} color="gold" />
                                </Marker>

                                {/* 🛣️ Polyline: Driver → Pickup → Drop-off */}
                                <Polyline
                                    coordinates={[
                                        driverLocation,
                                        pickupLocation,
                                        dropOffLocation
                                    ]}
                                    strokeColor="gold" // Line color
                                    strokeWidth={1}     // Line thickness
                                />
                            </MapView>
                        ) : (
                            <Text>Loading Map</Text>
                        )
                    }
                </ScrollView>
                {currentStep === 'passengerPickup' && renderPassengerPickup()}
                {currentStep === 'tripSuccessful' && renderTripSuccessful()}
                {currentStep === 'review' && renderReview()}
            </View>
        </KeyboardAvoidingView>
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
        lineHeight: 40
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

