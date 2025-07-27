import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import BottomNavbar from "../../components/BottomNavbar";
import Map from "../../components/Map";
import RydeRequestsModal from "../../components/RydeRequestsModal";
import config from "../../config";
import { useSocket } from "../../contexts/SocketContext";
const { height, width } = Dimensions.get("window");

const Home = () => {
  const { getSocket } = useSocket();
  const [isOnline, setIsOnline] = useState(false);
  const [showRydeRequestsModal, setShowRydeRequestsModal] = useState(false);
  const [allRideRequest, setAllRideRequest] = useState([]);
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);

  const toggleOnlineStatus = async () => {
    Toast.show({
      type: "info",
      text1: "Changing Status...",
      text2: "Please wait.",
      autoHide: false,
    });
    try {
      const userId = await AsyncStorage.getItem("userId");
      let res = await axios.post(`${config.baseUrl}/driver/online/toggle`, {
        driverId: userId,
        online: !isOnline,
      });
      if (res) {
        Toast.hide();
        setIsOnline((prev) => {
          const newState = !prev;
          return newState;
        });
        Toast.show({
          type: "success",
          text1: "Status Changed",
          text2: "Best Of Luck!",
        });
      }
    } catch (error) {
      Toast.hide();
      console.error(
        "❌ Failed to update location:",
        error?.response?.data || error.message
      );
    }
  };

  const onAccept = (booking) => {
    axios
      .put(`${config.baseUrl}/booking/accept-cancel/${booking._id}`, {
        accepted: true,
      })
      .then((res) => {
        Toast.show({
          type: "success",
          text1: "Request Accepted",
          text2: "Have A Safe Journey",
        });
        setShowRydeRequestsModal(false);
        router.push({pathname:"/home/booking/activebooking",params:{bookingData:JSON.stringify(res?.data?.data)}});
      });
  };

  const onIgnore = async (booking) => {
    try {
      const result = await axios.put(
        `${config.baseUrl}/booking/accept-cancel/${booking._id}`,
        { cancelled: true }
      );

      if (result) {
        Toast.show({ type: "info", text1: "Request Declined" });
        const updatedRequests = allRideRequest.filter(
          (item) => item._id !== booking._id
        );
        setAllRideRequest(updatedRequests);
        if (updatedRequests.length === 0) {
          setShowRydeRequestsModal(false);
        }
      }
    } catch (error) {
      console.error("Error declining ride:", error);
      Toast.show({ type: "error", text1: "Error declining request" });
    }
  };

  const updateLocation = async (latitude, longitude) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const role = "driver";
      if (!userId || !latitude || !longitude) return;
      const payload = {
        latitude,
        longitude,
        ...(role === "driver" ? { driverId: userId } : { riderId: userId }),
      };
      await axios.post(`${config.baseUrl}/location/update`, payload);
    } catch (error) {
      console.error(
        "❌ Failed to update location:",
        error?.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) return;
        const response = await axios.get(`${config.baseUrl}/driver/info/${userId}`);
        if (response.data?.data) {
          console.log(response?.data?.data?.online,'response?.data?.data?.online')
          setUser(response.data.data);
          setIsOnline(response?.data?.data?.online)
        }
      } catch (error) {
        console.log(
          "Failed to fetch user:",
          error?.response?.data || error.message
        );
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          ToastAndroid.show(
            "Permission to access location was denied",
            ToastAndroid.SHORT
          );
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        const [addr] = await Location.reverseGeocodeAsync(loc.coords);
        await updateLocation(loc.coords.latitude, loc.coords.longitude);
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("newBookingRequest", (bookingData) => {
      setAllRideRequest([...allRideRequest, bookingData]);
      setShowRydeRequestsModal(true);
    });

    return () => {
      socket.off("newBookingRequest");
    };
  }, [getSocket]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: user?.profile_img }}
              style={styles.profileAvatar}
            />
            <View>
              <Text style={styles.greeting}>Welcome back!</Text>
              <Text style={styles.userName}>{user?.name}</Text>
            </View>
          </View>
          <View style={styles.statusToggleContainer}>
            <Text style={styles.statusText}>
              {isOnline ? "Online" : "Offline"}
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#FFD700" }}
              thumbColor={isOnline ? "#FFF" : "#F4F3F4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleOnlineStatus}
              value={isOnline}
            />
          </View>
        </View>

        {!location ? (
          <View
            style={[
              styles.mapContainer,
              {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#000",
              },
            ]}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>Map loading...</Text>
          </View>
        ) : (
          <Map mapContainer={styles.mapContainer} location={location} />
        )}

        <View style={styles.driverStatsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statIconBox}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={24}
                color="#FFD700"
              />
            </View>
            <Text style={styles.statValue}>8.5 h</Text>
            <Text style={styles.statLabel}>Hours online</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statIconBox}>
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={24}
                color="#FFD700"
              />
            </View>
            <Text style={styles.statValue}>25 miles</Text>
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
        requests={allRideRequest}
        onAccept={onAccept}
        onIgnore={onIgnore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1C1A1B" },
  scrollViewContent: { paddingBottom: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#EA9B09",
  },
  userInfo: { flexDirection: "row", alignItems: "center" },
  profileAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  greeting: { fontSize: 16, color: "#FFF" },
  userName: { fontSize: 20, fontWeight: "bold", color: "#FFF" },
  statusToggleContainer: { flexDirection: "row", alignItems: "center" },
  statusText: { color: "#FFF", marginRight: 8, fontSize: 16 },
  mapContainer: {
    height: 400,
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: { width: "100%", height: "100%" },
  driverStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#181617",
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  statItem: { alignItems: "center" },
  statIconBox: {
    width: 50,
    height: 50,
    backgroundColor: "#252222",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  statValue: { fontSize: 18, fontWeight: "bold", color: "#FFF", marginTop: 5 },
  statLabel: { fontSize: 12, color: "#AAA", marginTop: 2, textAlign: "center" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  rydeRequestsModalContent: {
    backgroundColor: "#181617",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.8,
    paddingBottom: 20,
  },
  rydeRequestsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  rydeRequestsTitle: { fontSize: 20, fontWeight: "bold", color: "#FFF" },
  rydeRequestsSeeAll: { color: "#FFD700", fontSize: 14 },
  rydeRequestsScrollContent: { paddingHorizontal: 20, paddingTop: 10 },
  rydeRequestCard: {
    backgroundColor: "#1C1A1B",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    marginRight: 15,
    width: width / 1.1,
  },
  rydeRequestHeader: {
    flexDirection: "row",
    alignItems: "center",
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
  rydeRequestName: { fontSize: 16, fontWeight: "bold", flex: 1 },
  rydeRequestDistance: { fontSize: 14, color: "#AAA", marginRight: 10 },
  rydeRequestPrice: { fontSize: 18, fontWeight: "bold", color: "#FFD700" },
  rydeRequestLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  rydeRequestLocationText: { color: "#FFF", fontSize: 14, marginLeft: 10 },
  rydeRequestActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  ignoreButton: {
    flex: 1,
    backgroundColor: "#252222",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginRight: 10,
  },
  ignoreButtonText: { color: "#AAA", fontSize: 16, fontWeight: "bold" },
  acceptButton: {
    flex: 1,
    backgroundColor: "#FFD700",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  acceptButtonText: { color: "#1C1A1B", fontSize: 16, fontWeight: "bold" },
});

export default Home;
