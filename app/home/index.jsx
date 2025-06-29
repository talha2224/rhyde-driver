import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';
import mapImg from '../../assets/images/home/map.png';
import profile_image from '../../assets/images/profile_photo.png';
import BottomNavbar from '../../components/BottomNavbar';
import { rydeRequests } from '../../constants/constant';
const { height, width } = Dimensions.get('window');

const Home = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [showRydeRequestsModal, setShowRydeRequestsModal] = useState(false);
  const [selectedRydeRequest, setSelectedRydeRequest] = useState(null);

  const toggleOnlineStatus = () => {
    setIsOnline(prev => {
      const newState = !prev;
      setShowRydeRequestsModal(newState);
      return newState;
    });
  };

  const handleAcceptRide = (request) => {
    setSelectedRydeRequest(request);
    setShowRydeRequestsModal(false);
    router.push("/home/rhydedetails")
  };

  const handleIgnoreRide = () => {
    setShowRydeRequestsModal(true);
  };

  const RydeRequestsModal = ({ visible, onClose, requests, onAccept, onIgnore }) => (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.rydeRequestsModalContent}>
          <View style={styles.rydeRequestsHeader}>
            <Text style={styles.rydeRequestsTitle}>Ryde requests ({requests.length})</Text>
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
              <View key={request.id} style={styles.rydeRequestCard}>
                <View style={styles.rydeRequestHeader}>
                  <Image source={request.avatar} style={styles.rydeRequestAvatar} />
                  <Text style={styles.rydeRequestName}>{request.name}</Text>
                  <Text style={styles.rydeRequestDistance}>{request.distance}</Text>
                  <Text style={styles.rydeRequestPrice}>{request.price}</Text>
                </View>
                <View style={styles.rydeRequestLocation}>
                  <MaterialCommunityIcons name="circle-outline" size={16} color="#FFD700" />
                  <Text style={styles.rydeRequestLocationText}>{request.pickup}</Text>
                </View>
                <View style={styles.rydeRequestLocation}>
                  <MaterialCommunityIcons name="map-marker-outline" size={16} color="#FFF" />
                  <Text style={styles.rydeRequestLocationText}>{request.destination}</Text>
                </View>
                <View style={styles.rydeRequestActions}>
                  <TouchableOpacity style={styles.ignoreButton} onPress={onIgnore}>
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
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
              onValueChange={toggleOnlineStatus}
              value={isOnline}
            />
          </View>
        </View>

        <View style={styles.mapContainer}>
          <Image source={mapImg} style={styles.mapImage} resizeMode="cover" />
        </View>

        <View style={styles.driverStatsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statIconBox}>
              <MaterialCommunityIcons name="clock-outline" size={24} color="#FFD700" />
            </View>
            <Text style={styles.statValue}>8.5 h</Text>
            <Text style={styles.statLabel}>Hours online</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statIconBox}>
              <MaterialCommunityIcons name="map-marker-distance" size={24} color="#FFD700" />
            </View>
            <Text style={styles.statValue}>25 km</Text>
            <Text style={styles.statLabel}>Distance Covered</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statIconBox}>
              <FontAwesome5 name="dollar-sign" size={24} color="#FFD700" />
            </View>
            <Text style={styles.statValue}>$200</Text>
            <Text style={styles.statLabel}>Total Earned</Text>
          </View>
        </View>
      </ScrollView>

      <BottomNavbar />

      <RydeRequestsModal
        visible={showRydeRequestsModal}
        onClose={() => setShowRydeRequestsModal(false)}
        requests={rydeRequests}
        onAccept={handleAcceptRide}
        onIgnore={handleIgnoreRide}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C1A1B' },
  scrollViewContent: { paddingBottom: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#EA9B09"
  },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  profileAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  greeting: { fontSize: 16, color: '#FFF' },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  statusToggleContainer: { flexDirection: 'row', alignItems: 'center' },
  statusText: { color: '#FFF', marginRight: 8, fontSize: 16 },
  mapContainer: {
    height: 500,
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: { width: '100%', height: '100%' },
  driverStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#181617',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  statItem: { alignItems: 'center' },
  statIconBox: {
    width: 50,
    height: 50,
    backgroundColor: "#252222",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginTop: 5 },
  statLabel: { fontSize: 12, color: '#AAA', marginTop: 2, textAlign: 'center' },
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
  rydeRequestsTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  rydeRequestsSeeAll: { color: '#FFD700', fontSize: 14 },
  rydeRequestsScrollContent: { paddingHorizontal: 20, paddingTop: 10 },
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
  rydeRequestAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  rydeRequestName: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  rydeRequestDistance: { fontSize: 14, color: '#AAA', marginRight: 10 },
  rydeRequestPrice: { fontSize: 18, fontWeight: 'bold', color: '#FFD700' },
  rydeRequestLocation: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  rydeRequestLocationText: { color: '#FFF', fontSize: 14, marginLeft: 10 },
  rydeRequestActions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 },
  ignoreButton: {
    flex: 1,
    backgroundColor: '#252222',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  ignoreButtonText: { color: '#AAA', fontSize: 16, fontWeight: 'bold' },
  acceptButton: {
    flex: 1,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  acceptButtonText: { color: '#1C1A1B', fontSize: 16, fontWeight: 'bold' },
});

export default Home;
