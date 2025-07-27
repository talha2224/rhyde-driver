import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import cover_photo from "../../../assets/images/cover_photo.png";
import badgeImg from '../../../assets/images/home/badge.png';
import BottomNavbar from "../../../components/BottomNavbar";
import config from '../../../config';
import { menuItems, milestonesData } from '../../../constants/constant';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [rideHistory, setRideHistory] = useState([])
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return;
        const res = await axios.get(`${config.baseUrl}/driver/info/${userId}`);
        let wallet = await axios.get(`${config.baseUrl}/wallet/history/driver/${userId}`);
        let ride = await axios.get(`${config.baseUrl}/booking/history/all?driverId=${userId}`)
        let review = await axios.get(`${config.baseUrl}/review?driverId=${userId}`)
        setRideHistory(ride?.data?.data || []);
        setUser(res.data.data);
        setBalance(wallet?.data?.data[0]?.amount)
        setReviews(review?.data?.data)

      } catch (error) {
        console.error("Error fetching user info:", error?.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userId")
    router.push('/signin')
  }

  const renderProfileTab = () => (
    <View style={styles.menuSection}>
      {menuItems.map(({ title, description, icon, route, danger }) => (
        <TouchableOpacity key={title} style={styles.menuItem} onPress={title === "Logout" ? handleLogout : () => router.push(route)}>
          <MaterialCommunityIcons name={icon} size={24} color={danger ? "#FF6347" : "#FFD700"} />
          <View style={styles.menuItemTextContainer}>
            <Text style={styles.menuItemTitle}>{title}</Text>
            {description !== '' && (
              <Text style={styles.menuItemDescription}>{description}</Text>
            )}
          </View>
          <AntDesign name="right" size={16} color="#AAA" />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderReviewsTab = () => {
    const getRatingStats = (reviews) => {
      const total = reviews.length;
      const starCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

      reviews.forEach(r => {
        starCount[r.stars] = (starCount[r.stars] || 0) + 1;
      });

      const average = (reviews.reduce((acc, r) => acc + r.stars, 0) / total || 0).toFixed(1);

      const ratingsBreakdown = {};
      for (let i = 1; i <= 5; i++) {
        ratingsBreakdown[i] = total ? ((starCount[i] / total) * 100).toFixed(0) : 0;
      }

      return { averageRating: average, totalReviews: total, ratingsBreakdown };
    };

    const ratingStats = getRatingStats(reviews);

    return (
      <ScrollView contentContainerStyle={styles.tabContent}>
        <View style={styles.reviewsSummary}>
          <Text style={styles.averageRating}>{ratingStats.averageRating}</Text>
          <Text style={styles.totalReviews}>({ratingStats.totalReviews} driver reviews)</Text>
          {[5, 4, 3, 2, 1].map((star) => (
            <View key={star} style={styles.ratingBarContainer}>
              <Text style={styles.ratingBarLabel}>{star}</Text>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${ratingStats.ratingsBreakdown[star]}%` }]} />
              </View>
              <Text style={styles.ratingPercentage}>{ratingStats.ratingsBreakdown[star]}%</Text>
            </View>
          ))}
        </View>

        <Text style={styles.feedbackTitle}>Feedback & reviews</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.feedbackFilter}>
          {['Verified', 'Latest', 'New', 'Previous', 'Neutral'].map((label, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.filterButton, label === 'Verified' && { backgroundColor: "#FBB73A" }]}
            >
              <Text style={[styles.filterButtonText, label === 'Verified' && { color: "#000" }]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {reviews.map((item, index) => (
          <View key={item._id || index} style={styles.feedbackItem}>
            <Image source={{uri:item?.driverId?.profile_img}} style={styles.feedbackUserImage} />
            <View style={styles.feedbackDetails}>
              <Text style={styles.feedbackUserName}>{item?.driverId?.name}</Text>
              <Text style={styles.feedbackTripId}>Booking ID: {item.bookingId.slice(-6)} | {new Date(item.createdAt).toLocaleDateString()}</Text>
              <Text style={styles.feedbackComment}>{item.message.trim()}</Text>
            </View>
            <MaterialCommunityIcons name="star" size={24} color="#FFD700" />
            <Text style={{ color: 'white', marginLeft: 4 }}>{item.stars}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };


  const renderMilestonesTab = () => (
    <ScrollView contentContainerStyle={styles.tabContent}>
      <View style={styles.milestoneLevelCard}>
        <Text style={styles.milestoneLevelText}>Level 20</Text>
        <Text style={styles.milestoneLevelSubText}>Keep up the good</Text>
        <View style={styles.milestoneProgressBarBackground}>
          <View style={styles.milestoneProgressBarFill} />
        </View>
        <Text style={styles.milestoneProgressText}>10/20 rides</Text>
      </View>

      <Text style={styles.milestonesSectionTitle}>Milestones and rewards</Text>
      {milestonesData.map((milestone) => (
        <View key={milestone.id} style={styles.milestoneItem}>
          <View style={styles.milestoneIconText}>
            {milestone.reached ? <AntDesign name="checkcircle" size={24} color="#FBB73A" style={{ marginRight: 15 }} /> : <Image source={badgeImg} style={styles.milestoneBadge} />}
          </View>
          <View style={styles.milestoneDetails}>
            <Text style={styles.milestoneTitle}>{milestone.title}</Text>
            <Text style={styles.milestoneDescription}>{milestone.description}</Text>
          </View>
          {!milestone.reached && <MaterialCommunityIcons name="lock" size={24} color="#AAA" />}
        </View>
      ))}
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile': return renderProfileTab();
      case 'Reviews': return renderReviewsTab();
      case 'Milestones': return renderMilestonesTab();
      default: return null;
    }
  };


  const getRatingStats = (reviews) => {
    const total = reviews.length;
    const average = (reviews.reduce((acc, r) => acc + r.stars, 0) / total || 0).toFixed(1);
    return average;
  };

  const averageRating = getRatingStats(reviews);


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1A1B" />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileHeaderSection}>
          <Image source={cover_photo} style={styles.coverPhoto} resizeMode="cover" />
          <View style={styles.profileCard}>
            <Image source={{ uri: user?.profile_img }} style={styles.profilePhoto} />
            <Text style={styles.userName}>{user?.name}</Text>
            <View style={styles.profileStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{averageRating}</Text>
                <Text style={styles.statLabel}>Ratings</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{rideHistory?.length}</Text>
                <Text style={styles.statLabel}>Trips</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{balance?.toFixed(2)}</Text>
                <Text style={styles.statLabel}>Earned</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.tabContainer}>
          {['Profile', 'Reviews', 'Milestones'].map((tab) => (
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
      </ScrollView>

      <BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181617', // Dark background color
  },
  scrollViewContent: {
    paddingBottom: 80, // Space for BottomNavbar
  },
  profileHeaderSection: {
  },
  coverPhoto: {
    width: '100%',
    height: 180, // Adjust height as needed
  },
  profileCard: {
    marginTop: -20, // Overlap with cover photo
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    marginTop: -50, // Adjust to position correctly on the card
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  userLocation: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 20,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: "#2a2a2a",
    padding: 10,
    borderRadius: 10
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#AAA',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    backgroundColor: '#181617', // Match the tab background from Trips component
    borderRadius: 15,
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
    backgroundColor: '#FFD700', // Active tab color
  },
  tabButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  activeTabButtonText: {
    color: '#1C1A1B', // Text color for active tab
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 20, // Adjust as needed
  },

  // Profile Tab Specific Styles (from original Profile component)
  menuSection: {
    backgroundColor: '#181617', // Match tab container background
    borderRadius: 15,
    // marginHorizontal: 20, // Already handled by tabContent paddingHorizontal
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1, // Add separator
    borderBottomColor: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  menuItemDescription: {
    fontSize: 12,
    color: '#AAA',
  },

  // Reviews Tab Specific Styles (from original Trips component)
  reviewsSummary: {
    backgroundColor: '#181617',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  averageRating: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
  },
  totalReviews: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 15,
  },
  ratingBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingBarLabel: {
    fontSize: 14,
    color: '#FFF',
    marginRight: 10,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#444',
    borderRadius: 5,
    marginRight: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFD700', // Gold color
    borderRadius: 5,
  },
  ratingPercentage: {
    fontSize: 14,
    color: '#FFF',
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  feedbackFilter: {
    // flexDirection: 'row',
    marginBottom: 15,
  },
  filterButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  filterButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  feedbackItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#181617',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  feedbackUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  feedbackDetails: {
    flex: 1,
  },
  feedbackUserName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  feedbackTripId: {
    fontSize: 12,
    color: '#AAA',
    marginBottom: 5,
  },
  feedbackComment: {
    fontSize: 14,
    color: '#FFF',
  },

  // Milestones Tab Specific Styles (from original Trips component)
  milestoneLevelCard: {
    backgroundColor: '#FFD700', // Gold background
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  milestoneLevelText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1A1B',
  },
  milestoneLevelSubText: {
    fontSize: 16,
    color: '#1C1A1B',
    marginBottom: 10,
  },
  milestoneProgressBarBackground: {
    height: 8,
    backgroundColor: '#1C1A1B',
    borderRadius: 5,
    marginBottom: 5,
  },
  milestoneProgressBarFill: {
    width: '50%', // Example progress, adjust as needed
    height: '100%',
    backgroundColor: '#8A2BE2', // Purple color for progress
    borderRadius: 5,
  },
  milestoneProgressText: {
    fontSize: 14,
    color: '#1C1A1B',
  },
  milestonesSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181617',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  milestoneIconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  milestoneBadge: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  milestoneDetails: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  milestoneDescription: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
});

export default Profile;
