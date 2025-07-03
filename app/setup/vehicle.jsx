import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import folderImg from "../../assets/images/onboarding/folder.png";

const VerifyLicense = () => {
  const [licenseImageUri, setLicenseImageUri] = useState(null);

  const requestMediaLibraryPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Sorry, we need media library permissions to upload your license!",
          [{ text: "OK" }]
        );
        return false;
      }
      return true;
    }
    return true;
  };

  const pickLicenseImage = async () => {
    const hasMediaLibraryPermission = await requestMediaLibraryPermission();

    if (!hasMediaLibraryPermission) {
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setLicenseImageUri(result.assets[0].uri);
      ToastAndroid.show("License Uploaded", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Image Not Selected", ToastAndroid.SHORT);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (!licenseImageUri) {
      Alert.alert(
        "Missing License",
        "Please upload your driver's license to continue."
      );
      return;
    }
    console.log("License Image URI:", licenseImageUri);
    router.push("/setup/vehicleinformation");
  };

  const isNextButtonEnabled = licenseImageUri !== null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarActive, { width: "80%" }]} />
          <View style={styles.progressBarInactive} />
        </View>

        <View style={styles.contentArea}>
          <Image source={folderImg} style={styles.folderImage} />
          <Text style={styles.title}>Verify Your License</Text>
          <Text style={styles.description}>
            Upload a valid driver's license so we {"\n"}know you're certified to
            drive.
          </Text>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={pickLicenseImage}
          >
            {licenseImageUri ? (
              <Image
                source={{ uri: licenseImageUri }}
                style={styles.uploadedImagePreview}
              />
            ) : (
              <>
                <MaterialCommunityIcons
                  name="cloud-upload"
                  size={40}
                  color="#FBB73A"
                />
                <Text style={styles.uploadButtonText}>Upload</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleNext}
          style={[
            styles.nextButton,
            !isNextButtonEnabled && styles.nextButtonDisabled,
          ]}
          disabled={!isNextButtonEnabled}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGoBack} style={styles.previousButton}>
          <Text style={styles.previousButtonText}>Previous</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1A1B",
    paddingTop: StatusBar.currentHeight + 20,
    paddingHorizontal: 25,
  },
  progressBarContainer: {
    flexDirection: "row",
    height: 5,
    backgroundColor: "#333",
    borderRadius: 5,
    marginBottom: 30,
    overflow: "hidden",
  },
  progressBarActive: {
    height: "100%",
    backgroundColor: "#FBB73A",
    borderRadius: 5,
  },
  progressBarInactive: {
    flex: 1,
    backgroundColor: "transparent",
  },
  contentArea: {
    flex: 1,
    marginTop: 40,
    alignItems: "center",
  },
  folderImage: {
    width: 80,
    height: 80,
    marginBottom: 30,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginVertical: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#A19BAE",
    marginBottom: 40,
    lineHeight: 22,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  uploadButton: {
    width: "80%",
    height: 150,
    backgroundColor: "#2A2A2A",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#444",
    borderStyle: "dashed",
  },
  uploadButtonText: {
    color: "#FBB73A",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  uploadedImagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    resizeMode: "cover",
  },
  nextButton: {
    width: "100%",
    paddingVertical: 18,
    backgroundColor: "#FBB73A",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  nextButtonDisabled: {
    backgroundColor: "rgba(255,215,0,0.5)",
  },
  nextButtonText: {
    color: "#1C1A1B",
    fontSize: 18,
    fontWeight: "bold",
  },
  previousButton: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "transparent",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    borderWidth: 1,
    borderColor: "#AAA",
  },
  previousButtonText: {
    color: "#AAA",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VerifyLicense;
