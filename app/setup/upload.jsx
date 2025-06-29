import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Platform, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import camerImg from "../../assets/images/onboarding/camera.png";

const Upload = () => {
  const [isVerified, setIsVerified] = useState(false);

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        ToastAndroid.show('Permission required', ToastAndroid.SHORT);
        return false;
      }
      return true;
    }
    return true;
  };

  const takePhotoForVerification = async () => {
    const hasCameraPermission = await requestCameraPermission();

    if (!hasCameraPermission) {
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      console.log('Photo taken URI:', result.assets[0].uri);
      setIsVerified(true);
      ToastAndroid.show('Photo Captured', ToastAndroid.SHORT);
      router.push('/setup/vehicle');
    } else {
      ToastAndroid.show('Photo Not Captured', ToastAndroid.SHORT);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarActive, { width: '80%' }]} />
        <View style={styles.progressBarInactive} />
      </View>

      <View style={styles.contentArea}>
        <Image source={camerImg} style={styles.cameraImage} />

        <Text style={styles.title}>Photo verification</Text>
        <Text style={styles.description}>
          Upload a clear and friendly photo {'\n'}for ryders to easily identify you.
        </Text>

        <View style={styles.checklistContainer}>
          <View style={styles.checklistItem}>
            <Ionicons name="checkmark-circle" size={20} color="#FBB73A" style={styles.checklistIcon} />
            <Text style={styles.checklistText}>Avoid anything that hide your face</Text>
          </View>
          <View style={styles.checklistItem}>
            <Ionicons name="checkmark-circle" size={20} color="#FBB73A" style={styles.checklistIcon} />
            <Text style={styles.checklistText}>Make sure your photo closely matches your ID for faster approval.</Text>
          </View>
          <View style={styles.checklistItem}>
            <Ionicons name="checkmark-circle" size={20} color="#FBB73A" style={styles.checklistIcon} />
            <Text style={styles.checklistText}>Look straight at the camera with a neutral background.</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={takePhotoForVerification}
        style={styles.startVerificationButton}
      >
        <Text style={styles.startVerificationButtonText}>Start verification</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGoBack} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Upload;

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
    marginHorizontal: 0,
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
  cameraImage: {
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
  checklistContainer: {
    width: '100%',
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  checklistIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  checklistText: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
    lineHeight: 20,
  },
  startVerificationButton: {
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
  startVerificationButtonText: {
    color: '#1C1A1B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
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
  cancelButtonText: {
    color: '#AAA',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
