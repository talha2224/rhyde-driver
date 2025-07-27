import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    Linking,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import bellImg from "../../../assets/images/bell.png";
import userImg from "../../../assets/images/home/user.png";

const Emergency = () => {
    const [isCalling, setIsCalling] = useState(false);

    const handleGoBack = () => {
        router.back();
    };

    const handleCallEmergency = () => {
        setIsCalling(true);
        const phoneNumber = `tel:${911}`;
        Linking.openURL(phoneNumber).catch(err => console.error('Failed to open dialer:', err));
    };



    const friendsNotified = [
        { id: '1', name: 'Andrew Talks', avatar: userImg },
        { id: '2', name: 'Shenaya', avatar: userImg },
        { id: '3', name: 'Cynthia', avatar: userImg },
        { id: '4', name: 'John', avatar: userImg },
        { id: '5', name: 'Owen', avatar: userImg },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1A1A1B" />
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.contentArea}>
                <View style={styles.emergencyAlertSection}>
                    <Image source={bellImg} style={styles.bellImage} />
                    <Text style={styles.alertTitle}>Emergency Alert</Text>
                    <Text style={styles.alertDescription}>Your live location is being shared</Text>
                    <TouchableOpacity
                        style={styles.callButton}
                        onPress={handleCallEmergency}
                        disabled={isCalling}
                    >
                        <Ionicons name="call" size={24} color="#1C1A1B" style={styles.callIcon} />
                        <Text style={styles.callButtonText}>
                            {isCalling ? 'Calling 911...' : 'Calling 911...'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.friendsNotifiedSection}>
                    <Text style={styles.friendsNotifiedHeader}>Your friends has been notified</Text>
                    {friendsNotified.map((friend) => (
                        <View key={friend.id} style={styles.friendItem}>
                            <Image source={friend.avatar} style={styles.friendAvatar} />
                            <Text style={styles.friendName}>{friend.name}</Text>
                            <Ionicons name="notifications" size={20} color="#FFD700" style={styles.notificationIcon} />
                        </View>
                    ))}
                </View>
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
    backButton: {
        position: 'absolute',
        top: StatusBar.currentHeight + 20,
        left: 20,
        zIndex: 10,
        padding: 8,
        backgroundColor: "#1C1A1B",
        borderRadius: 50,
    },
    contentArea: {
        flex: 1,
        marginTop: 40,
        alignItems: 'center',
    },
    emergencyAlertSection: {
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    bellImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    alertTitle: {
        fontSize: 22,
        color: 'white',
        marginBottom: 8,
        textAlign: 'center',
    },
    alertDescription: {
        fontSize: 14,
        color: '#AAA',
        marginBottom: 30,
        textAlign: 'center',
    },
    callButton: {
        flexDirection: 'row',
        backgroundColor: '#FFD700',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    callIcon: {
        marginRight: 10,
    },
    callButtonText: {
        color: '#1C1A1B',
        fontSize: 18,
    },
    friendsNotifiedSection: {
        backgroundColor: '#252222',
        borderRadius: 15,
        padding: 25,
        width: '100%',
    },
    friendsNotifiedHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    friendAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
    },
    friendName: {
        flex: 1,
        fontSize: 16,
        color: '#FFF',
        fontWeight: '500',
    },
    notificationIcon: {
        marginLeft: 10,
    },
});

export default Emergency;
