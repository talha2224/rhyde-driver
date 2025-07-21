import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import folderImg from "../../assets/images/onboarding/folder.png";

const VehicleDocuments = () => {
  const [registrationDocUri, setRegistrationDocUri] = useState(null);
  const [insuranceDocUri, setInsuranceDocUri] = useState(null);
  const [registrationDocData, setRegistrationDocData] = useState(null);
  const [insuranceDocData, setInsuranceDocData] = useState(null);
  const requestMediaLibraryPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'Sorry, we need media library permissions to upload your documents!',
          [{ text: 'OK' }]
        );
        return false;
      }
    }
    return true;
  };

  const pickDocument = async (setDocumentUri, setFullData, docType) => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const image = result.assets[0];
      setDocumentUri(image.uri);
      setFullData(image);
      ToastAndroid.show(`${docType} Uploaded`, ToastAndroid.SHORT);
    } else {
      Alert.alert('Document Not Selected', `No document was selected for ${docType}.`);
    }
  };


  const handleGoBack = () => {
    router.back();
  };

  const handleNext = async () => {
    if (!registrationDocData || !insuranceDocData) {
      Alert.alert('Missing Documents', 'Please upload both Vehicle Registration and Insurance Document to continue.');
      return;
    }

    try {
      await AsyncStorage.setItem('vehicle_registration_img', JSON.stringify(registrationDocData));
      await AsyncStorage.setItem('insurance_document_img', JSON.stringify(insuranceDocData));

      ToastAndroid.show('Documents Saved', ToastAndroid.SHORT);
      router.push('/setup/vehiclephotos');
    } catch (error) {
      console.error('Error saving vehicle documents:', error);
      ToastAndroid.show('Failed to save documents', ToastAndroid.SHORT);
    }
  };


  const isNextButtonEnabled = registrationDocUri && insuranceDocUri;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarActive, { width: '90%' }]} />
        <View style={styles.progressBarInactive} />
      </View>

      <View style={styles.contentArea}>
        <Image source={folderImg} style={styles.folderImage} />
        <Text style={styles.title}>Vehicle Documents</Text>
        <Text style={styles.description}>Upload a valid vehicle's document</Text>

        <View style={styles.uploadButtonsContainer}>
          <TouchableOpacity
            style={styles.uploadOptionButton}
            onPress={() => pickDocument(setRegistrationDocUri, setRegistrationDocData, 'Vehicle Registration')}
          >
            <MaterialCommunityIcons name="cloud-upload" size={40} color="#FBB73A" />
            <Text style={styles.uploadOptionText}>Upload vehicle registration</Text>
            {registrationDocUri && (
              <Ionicons name="checkmark-circle" size={20} color="green" style={styles.checkmarkIcon} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadOptionButton}
            onPress={() => pickDocument(setInsuranceDocUri, setInsuranceDocData, 'Insurance Document')}
          >
            <MaterialCommunityIcons name="cloud-upload" size={40} color="#FBB73A" />
            <Text style={styles.uploadOptionText}>Insurance Document</Text>
            {insuranceDocUri && (
              <Ionicons name="checkmark-circle" size={20} color="green" style={styles.checkmarkIcon} />
            )}
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
  uploadButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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

export default VehicleDocuments;
