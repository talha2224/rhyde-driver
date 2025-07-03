import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import truckImg from "../../assets/images/home/truck.png"; // Assuming this path is correct

const Buddy = () => {

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Buddy system</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.supportInfo}>
                    <Image source={truckImg} style={styles.supportImage} />
                    <Text style={styles.supportQuestion}>Get help on the road</Text>
                    <Text style={styles.supportHelperText}>Incase of a breakdown or other emergency, we’ll send a tow truck and a driver to assist you, covered by $100 of emergency credit</Text>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.back()}>
                <Text style={styles.actionButtonText}>Request assistance</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181617',
        paddingTop: 70,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    supportInfo: {
        alignItems: 'center',
        marginBottom: 30,
        flex: 1
    },
    supportImage: {
        width: 100, // Adjust size as needed
        height: 100, // Adjust size as needed
        marginTop: 55,
        marginBottom: 30,
        resizeMode: 'contain',
    },
    supportQuestion: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 50,
    },
    supportHelperText: {
        fontSize: 14,
        color: '#AAA',
        textAlign: 'center',
        lineHeight: 20,
    },
    actionButton: {
        width: '90%',
        paddingVertical: 18,
        backgroundColor: '#FFD700',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 70,
        marginHorizontal:20,
    },
    actionButtonText: {
        color: '#1C1A1B',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Buddy;
