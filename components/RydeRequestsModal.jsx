import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const { height, width } = Dimensions.get('window');

const RydeRequestsModal = ({ visible, onClose, requests, onAccept, onIgnore }) => {
    return (
        <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.rydeRequestsModalContent}>
                    <View style={styles.rydeRequestsHeader}>
                        <Text style={styles.rydeRequestsTitle}>Ryde requests ({requests?.length})</Text>
                        <TouchableOpacity onPress={() => console.log('See all requests')}>
                            <Text style={styles.rydeRequestsSeeAll}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.rydeRequestsScrollContent}
                    >
                        {requests.map((request) => (
                            <View key={request?._id} style={styles.rydeRequestCard}>
                                <View style={styles.rydeRequestHeader}>
                                    <Image source={{uri:request?.riderId?.profile}} style={styles.rydeRequestAvatar} />
                                    <Text style={styles.rydeRequestName}>{request?.riderId?.name}</Text>
                                    <Text style={styles.rydeRequestDistance}>{request?.distance?.toFixed(2)}Km</Text>
                                    <Text style={styles.rydeRequestPrice}>{request?.fare}</Text>
                                </View>
                                <View style={styles.rydeRequestLocation}>
                                    <MaterialCommunityIcons name="circle-outline" size={16} color="#FFD700" />
                                    <Text style={styles.rydeRequestLocationText}>{request?.pickupAddress}</Text>
                                </View>
                                <View style={styles.rydeRequestLocation}>
                                    <MaterialCommunityIcons name="map-marker-outline" size={16} color="#FFF" />
                                    <Text style={styles.rydeRequestLocationText}>{request?.dropOffAddress}</Text>
                                </View>
                                <View style={styles.rydeRequestActions}>
                                    <TouchableOpacity style={styles.ignoreButton} onPress={() => onIgnore(request)}>
                                        <Text style={styles.ignoreButtonText}>Ignore</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.acceptButton} onPress={() => onAccept(request)}>
                                        <Text style={styles.acceptButtonText}>Accept</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>

    )
}

export default RydeRequestsModal

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    rydeRequestsModalContent: {
        backgroundColor: '#181617',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: height * 0.8,
        paddingBottom: 20,
    },
    rydeRequestsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    rydeRequestsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    rydeRequestsSeeAll: {
        color: '#FFD700',
        fontSize: 14,
    },
    rydeRequestsScrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    rydeRequestCard: {
        backgroundColor: '#1C1A1B',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        marginRight: 15,
        width: width / 1.1,
    },
    rydeRequestHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
    },
    rydeRequestAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    rydeRequestName: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    rydeRequestDistance: {
        fontSize: 14,
        color: '#AAA',
        marginRight: 10,
    },
    rydeRequestPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFD700',
    },
    rydeRequestLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    rydeRequestLocationText: {
        color: '#FFF',
        fontSize: 14,
        marginLeft: 10,
    },
    rydeRequestActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    ignoreButton: {
        flex: 1,
        backgroundColor: '#252222',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
        marginRight: 10,
    },
    ignoreButtonText: {
        color: '#AAA',
        fontSize: 16,
        fontWeight: 'bold',
    },
    acceptButton: {
        flex: 1,
        backgroundColor: '#FFD700',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
    },
    acceptButtonText: {
        color: '#1C1A1B',
        fontSize: 16,
        fontWeight: 'bold',
    },
});