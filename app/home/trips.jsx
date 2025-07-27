import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import userImg from '../../assets/images/home/user.png';
import BottomNavbar from '../../components/BottomNavbar';
import config from '../../config';
const Trips = () => {

  const [rideHistory, setRideHistory] = useState([])
  const [activeTab, setActiveTab] = useState('Upcoming');


  const renderRydeCard = (item, type) => (
    <View key={item.id} style={styles.rydeHistoryCard}>
      <View style={styles.rydeHistoryHeader}>
        <Image source={userImg} style={styles.userImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.userLocation}>{item.userLocation}</Text>
        </View>
        <Text style={styles.rydePrice}>{item.price}</Text>
      </View>

      <Text style={styles.sectionHeading}>Ryde Details</Text>

      <View style={styles.destinationRow}>
        <MaterialCommunityIcons name="map-marker-outline" size={20} color="#FBB73A" />
        <Text style={styles.destinationText}>{item.pickup}</Text>
      </View>
      <View style={styles.destinationRow}>
        <MaterialCommunityIcons name="map-marker" size={20} color="#FFF" />
        <Text style={styles.destinationText}>{item.destination}</Text>
      </View>

      <View style={styles.rydeDetailsRow}>
        <View style={styles.rydeDetailItem}>
          <MaterialCommunityIcons name="map-marker-distance" size={20} color="#FFF" />
          <Text style={styles.rydeDetailText}>{item.distance}</Text>
        </View>
        <View style={styles.rydeDetailItem}>
          <AntDesign name="calendar" size={20} color="#FFF" />
          <Text style={styles.rydeDetailText}>{item.date}</Text>
        </View>
        <View style={styles.rydeDetailItem}>
          <AntDesign name="clockcircleo" size={20} color="#FFF" />
          <Text style={styles.rydeDetailText}>{item.duration}</Text>
        </View>
      </View>

      {type === 'Upcoming' && (
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.cancelActionButton}
            onPress={() => console.log('Cancel Upcoming Ryde', item.id)}
          >
            <Text style={styles.cancelActionButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acceptActionButton}
            onPress={() => console.log('Accept Upcoming Ryde', item.id)}
          >
            <Text style={styles.acceptActionButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      )}

      {type === 'Active' && (
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.cancelActionButton}
            onPress={() => console.log('Cancel Active Ryde', item.id)}
          >
            <Text style={styles.cancelActionButtonText}>Cancel ryde</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderContent = () => {
    const filtered = rideHistory.filter((item) => {
      if (activeTab === 'Upcoming') return item.status === 'pending_approval';
      if (activeTab === 'Active') return item.status === 'ongoing';
      if (activeTab === 'Completed') return item.status === 'completed';
      if (activeTab === 'Cancelled') return item.status === 'decline';
      return false;
    });

    return (<ScrollView contentContainerStyle={styles.tabContent}>
      {filtered.length > 0 ? (
        filtered.map((item) =>
          renderRydeCard(
            {
              id: item._id,
              userName: 'Rider',
              userLocation: 'N/A',
              price: `$${(item.fare + (item.tip || 0)).toFixed(2)}`,
              pickup: item.pickupAddress,
              destination: item.dropOffAddress,
              distance: `${(item.distance / 1.609).toFixed(1)} miles`, // km to miles
              date: new Date(item.bookingTime).toLocaleDateString(),
              duration: 'N/A',
            },
            activeTab
          )
        )
      ) : (
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>No {activeTab} rides found.</Text>
      )}
    </ScrollView>
    );
  };

  useEffect(() => {
    (async () => {
      const driverId = await AsyncStorage.getItem("userId")
      let response = await axios.get(`${config.baseUrl}/booking/history/all?driverId=${driverId}`)
      setRideHistory(response?.data?.data || []);
    })()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1A1B" />
      <View style={styles.tabContainer}>
        {['Upcoming', 'Active', 'Completed', 'Cancelled'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabButtonText, activeTab === tab && styles.activeTabButtonText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderContent()}

      <BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1A1B',
    paddingTop: 50,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    backgroundColor: '#181617',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#FBB73A',
  },
  tabButtonText: {
    color: '#FFF',
  },
  activeTabButtonText: {
    color: '#1C1A1B',
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  rydeHistoryCard: {
    backgroundColor: '#181617',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  rydeHistoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  userLocation: {
    fontSize: 12,
    color: '#AAA',
  },
  rydePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FBB73A',
  },
  sectionHeading: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 5,
  },
  destinationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  destinationText: {
    color: '#FFF',
    fontSize: 14,
    marginLeft: 10,
  },
  rydeDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  rydeDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rydeDetailText: {
    color: '#FFF',
    fontSize: 12,
    marginLeft: 5,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  cancelActionButton: {
    flex: 1,
    backgroundColor: '#252222',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelActionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  acceptActionButton: {
    flex: 1,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  acceptActionButtonText: {
    color: '#1C1A1B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Trips;
