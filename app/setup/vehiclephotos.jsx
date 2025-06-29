import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';

import folderImg from "../../assets/images/onboarding/folder.png";

const VehiclePhotos = () => {
  const [frontViewUri, setFrontViewUri] = useState(null);
  const [sideViewUri, setSideViewUri] = useState(null);
  const [backViewUri, setBackViewUri] = useState(null);
  const [insideViewUri, setInsideViewUri] = useState(null);

  const requestMediaLibraryPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        ToastAndroid.show(
          'Media library permission is required to upload photos',
          ToastAndroid.SHORT
        );
        return false;
      }
    }
    return true;
  };

  const pickImage = async (setImageUri, imageType) => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImageUri(result.assets[0].uri);
      ToastAndroid.show(`${imageType} photo selected!`, ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(`No photo selected for ${imageType}`, ToastAndroid.SHORT);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (!frontViewUri || !sideViewUri || !backViewUri || !insideViewUri) {
      ToastAndroid.show('Please upload all four vehicle photos', ToastAndroid.SHORT);
      return;
    }

    console.log('Vehicle Photos:', {
      frontViewUri,
      sideViewUri,
      backViewUri,
      insideViewUri,
    });

    router.push('/setup/success');
  };

  const isNextButtonEnabled = frontViewUri && sideViewUri && backViewUri && insideViewUri;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarActive, { width: '95%' }]} />
        <View style={styles.progressBarInactive} />
      </View>

      <View style={styles.contentArea}>
        <Image source={folderImg} style={styles.folderImage} />
        <Text style={styles.title}>Vehicle Photos</Text>
        <Text style={styles.description}>Upload a vehicle photos</Text>

        <View style={styles.uploadButtonsGrid}>
          <TouchableOpacity
            style={styles.uploadOptionButton}
            onPress={() => pickImage(setFrontViewUri, 'Front View')}
          >
            <MaterialCommunityIcons name="cloud-upload" size={30} color="#FBB73A" />
            <Text style={styles.uploadOptionText}>Front View</Text>
            {frontViewUri && <Ionicons name="checkmark-circle" size={20} color="green" style={styles.checkmarkIcon} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadOptionButton}
            onPress={() => pickImage(setSideViewUri, 'Side View')}
          >
            <MaterialCommunityIcons name="cloud-upload" size={30} color="#FBB73A" />
            <Text style={styles.uploadOptionText}>Side View</Text>
            {sideViewUri && <Ionicons name="checkmark-circle" size={20} color="green" style={styles.checkmarkIcon} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadOptionButton}
            onPress={() => pickImage(setBackViewUri, 'Back View')}
          >
            <MaterialCommunityIcons name="cloud-upload" size={30} color="#FBB73A" />
            <Text style={styles.uploadOptionText}>Back View</Text>
            {backViewUri && <Ionicons name="checkmark-circle" size={20} color="green" style={styles.checkmarkIcon} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadOptionButton}
            onPress={() => pickImage(setInsideViewUri, 'Inside View')}
          >
            <MaterialCommunityIcons name="cloud-upload" size={30} color="#FBB73A" />
            <Text style={styles.uploadOptionText}>Inside View</Text>
            {insideViewUri && <Ionicons name="checkmark-circle" size={20} color="green" style={styles.checkmarkIcon} />}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleNext}
        style={[styles.nextButton, !isNextButtonEnabled && styles.nextButtonDisabled]}
        disabled={!isNextButtonEnabled}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGoBack} style={styles.previousButton}>
        <Text style={styles.previousButtonText}>Previous</Text>
      </TouchableOpacity>
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
  progressBarContainer: {
    flexDirection: 'row',
    height: 5,
    backgroundColor: '#333',
    borderRadius: 5,
    marginBottom: 30,
    overflow: 'hidden',
  },
  progressBarActive: {
    height: '100%',
    backgroundColor: '#FBB73A',
    borderRadius: 5,
  },
  progressBarInactive: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentArea: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
  },
  folderImage: {
    width: 80,
    height: 80,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#A19BAE',
    marginBottom: 40,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  uploadButtonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  uploadOptionButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    borderWidth: 1,
    borderColor: '#444',
    borderStyle: 'dashed',
    position: 'relative',
    marginBottom: 15,
  },
  uploadOptionText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  checkmarkIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  nextButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: '#FBB73A',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  nextButtonDisabled: {
    backgroundColor: 'rgba(255,215,0,0.5)',
  },
  nextButtonText: {
    color: '#1C1A1B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  previousButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: 'transparent',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#AAA',
  },
  previousButtonText: {
    color: '#AAA',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VehiclePhotos;
