import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import profile_image from '../../assets/images/profile_photo.png';

const RydeDetails = () => {
    const driverDetails = {
        name: 'Alisha Mark',
        location: 'Illinois, United States',
        profilePic: profile_image,
        rating: 4.7,
        trips: 359,
        yearsOfExperience: 5,
        reviews: 205,
    };

    const rideInfo = {
        distance: '13km',
        rideFare: '$21',
        pickupLocation: '4517 Washington Ave. Manchester, Kent...',
        destinationLocation: '2118 Thornridge Cir. Syracuse, Connecti...',
    };

    const handleGoBack = () => {
        router.back();
    };

    const handleAcceptRequest = () => {
        console.log('Accept request clicked');
        router.push('/home/booking/activebooking');
    };

    const handleCancel = () => {
        console.log('Cancel clicked');
        router.back();
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1A1A1B" />
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ryde details</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.driverProfileContainer}>
                    <View style={styles.profileImageWrapper}>
                        <Image source={driverDetails.profilePic} style={styles.profileImage} />
                        <View style={styles.verifiedIcon}>
                            <FontAwesome name="check-circle" size={20} color="#FFD700" />
                        </View>
                    </View>
                    <Text style={styles.driverName}>{driverDetails.name}</Text>
                    <View style={styles.driverLocation}>
                        <Ionicons name="location-sharp" size={16} color="#AAA" />
                        <Text style={styles.driverLocationText}>{driverDetails.location}</Text>
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsGrid}>
                    <View style={styles.statBox}>
                        <AntDesign name="star" size={24} color="#FFD700" />
                        <Text style={styles.statValue}>{driverDetails.rating}</Text>
                        <Text style={styles.statLabel}>Ratings</Text>
                    </View>
                    <View style={styles.statBox}>
                        <MaterialCommunityIcons name="car-multiple" size={24} color="#FFD700" />
                        <Text style={styles.statValue}>{driverDetails.trips}</Text>
                        <Text style={styles.statLabel}>Trips</Text>
                    </View>
                    <View style={styles.statBox}>
                        <MaterialCommunityIcons name="calendar-clock-outline" size={24} color="#FFD700" />
                        <Text style={styles.statValue}>{driverDetails.yearsOfExperience}</Text>
                        <Text style={styles.statLabel}>Years of Exp</Text>
                    </View>
                    <View style={styles.statBox}>
                        <MaterialCommunityIcons name="comment-text-outline" size={24} color="#FFD700" />
                        <Text style={styles.statValue}>{driverDetails.reviews}</Text>
                        <Text style={styles.statLabel}>Reviews</Text>
                    </View>
                </ScrollView>

                <View style={styles.rideDetailsContainer}>
                    <View style={styles.rideDetailRow}>
                        <Text style={styles.rideDetailLabel}>Distance</Text>
                        <Text style={styles.rideDetailValue}>{rideInfo.distance}</Text>
                    </View>
                    <View style={styles.rideDetailRow}>
                        <Text style={styles.rideDetailLabel}>Ride Fare</Text>
                        <Text style={styles.rideDetailValue}>{rideInfo.rideFare}</Text>
                    </View>
                    <View style={styles.locationDetailRow}>
                        <MaterialCommunityIcons name="target" size={20} color="#FFD700" style={styles.locationIcon} />
                        <Text style={styles.locationText}>{rideInfo.pickupLocation}</Text>
                    </View>
                    <View style={styles.locationDetailRow}>
                        <MaterialCommunityIcons name="map-marker" size={20} color="#FFF" style={styles.locationIcon} />
                        <Text style={styles.locationText}>{rideInfo.destinationLocation}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={handleAcceptRequest} style={styles.acceptButton}>
                    <Text style={styles.acceptButtonText}>Accept request</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181617',
        paddingTop: StatusBar.currentHeight + 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    backButton: {
        paddingRight: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    driverProfileContainer: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    profileImageWrapper: {
        position: 'relative',
        marginBottom: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#FFD700',
    },
    verifiedIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#1C1A1B',
        borderRadius: 15,
        padding: 2,
    },
    driverName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 5,
    },
    driverLocation: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    driverLocationText: {
        fontSize: 14,
        color: '#AAA',
        marginLeft: 5,
    },
    statsGrid: {
        marginBottom: -20,
        maxHeight: 140,
    },
    statBox: {
        backgroundColor: '#2A2A2A',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        marginBottom: 15,
        marginRight: 10,
        width: 100,
        height: 110,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 5,
    },
    statLabel: {
        fontSize: 12,
        color: '#AAA',
        marginTop: 2,
        textAlign: 'center',
    },
    rideDetailsContainer: {
        backgroundColor: '#2A2A2A',
        borderRadius: 15,
        padding: 20,
        marginBottom: 30,
    },
    rideDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    rideDetailLabel: {
        fontSize: 16,
        color: '#AAA',
    },
    rideDetailValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    locationDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    locationIcon: {
        marginRight: 10,
    },
    locationText: {
        fontSize: 16,
        color: '#FFF',
        flexShrink: 1,
    },
    acceptButton: {
        backgroundColor: '#FFD700',
        borderRadius: 15,
        paddingVertical: 18,
        alignItems: 'center',
        marginBottom: 15,
    },
    acceptButtonText: {
        color: '#1C1A1B',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#1c1a1b',
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#AAA',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RydeDetails;
