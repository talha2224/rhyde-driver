import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import profile_photo from "../../../assets/images/profile_photo.png";

const SingleProfile = () => {
  const userDetails = {
    name: 'Paul Cleverly',
    age: 30, // Added age
    gender: 'Male',
    ethnicity: 'Caucasian', // Added ethnicity
    phoneNumber: '+1 (876) 555-1234', // Added phone number
    address: '123 Main Street, Kingston', // Added address
    location: 'Kingston, Jamaica',
    email: 'paulcleverly@gmail.com',
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Profile Info */}
        <View style={styles.profileInfoContainer}>
          <View style={styles.profilePhotoContainer}>
            <Image source={profile_photo} style={styles.profilePhoto} />
            <TouchableOpacity style={styles.editIcon}>
              <MaterialCommunityIcons name="pencil" size={20} color="#1C1A1B" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userDetails.name}</Text>
          <Text style={styles.userLocation}>{userDetails.location}</Text>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>My Details</Text>

          {/* Name */}
          <TouchableOpacity style={styles.detailItem}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailValue}>{userDetails.name}</Text>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>

          {/* Email Address */}
          <TouchableOpacity style={styles.detailItem}>
            <Text style={styles.detailLabel}>Email Address</Text>
            <Text style={styles.detailValue}>{userDetails.email}</Text>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>

          {/* Age */}
          <TouchableOpacity style={styles.detailItem}>
            <Text style={styles.detailLabel}>Age</Text>
            <Text style={styles.detailValue}>{userDetails.age}</Text>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>

          {/* Gender */}
          <TouchableOpacity style={styles.detailItem}>
            <Text style={styles.detailLabel}>Gender</Text>
            <Text style={styles.detailValue}>{userDetails.gender}</Text>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>

          {/* Ethnicity */}
          <TouchableOpacity style={styles.detailItem}>
            <Text style={styles.detailLabel}>Ethnicity</Text>
            <Text style={styles.detailValue}>{userDetails.ethnicity}</Text>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>

          {/* Phone Number */}
          <TouchableOpacity style={styles.detailItem}>
            <Text style={styles.detailLabel}>Phone Number</Text>
            <Text style={styles.detailValue}>{userDetails.phoneNumber}</Text>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>

          {/* Address */}
          <TouchableOpacity style={styles.detailItem}>
            <Text style={styles.detailLabel}>Address</Text>
            <Text style={styles.detailValue}>{userDetails.address}</Text>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>

          {/* Location */}
          <TouchableOpacity style={styles.detailItem}>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValue}>{userDetails.location}</Text>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>
        </View>

      </ScrollView>
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
  profileInfoContainer: {
    alignItems: 'center',
    backgroundColor: '#1C1A1B', // Darker background for info card
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  profilePhotoContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFD700', // Gold border
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFD700', // Gold background
    borderRadius: 15,
    padding: 5,
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
  },
  detailsSection: {
    backgroundColor: '#1C1A1B', // Darker background for details card
    borderRadius: 15,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  detailLabel: {
    fontSize: 16,
    color: '#AAA',
  },
  detailValue: {
    fontSize: 16,
    color: '#FFF',
    flex: 1, // Allow value to take available space
    textAlign: 'right', // Align value to the right
    marginRight: 10,
  },
});

export default SingleProfile;
