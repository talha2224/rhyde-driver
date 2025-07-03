import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image, // For showing user feedback
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// Asset imports (assuming these paths are correct relative to this component)
import carImg from "../../../assets/images/home/profile/car.png";
import documentImg from "../../../assets/images/home/profile/document.png";

const VehicleInformationScreen = () => {
  const [activeTab, setActiveTab] = useState("Car Details"); // Default active tab

  // State for Vehicle Details tab
  const vehicleDetails = {
    carName: "SUV Sonic 309",
    carColor: "Yellow",
    numberOfSeats: 4,
    yearsOfUsage: "3 years",
    carImage: carImg, // Example car image
  };

  // States for Vehicle Documents tab
  const [vehicleRegistrationUri, setVehicleRegistrationUri] = useState(null);
  const [insuranceDocumentUri, setInsuranceDocumentUri] = useState(null);

  // State for Driver's License tab
  const [driversLicenseUri, setDriversLicenseUri] = useState(null);

  const handleGoBack = () => {
    router.back();
  };

  const requestMediaLibraryPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Sorry, we need media library permissions to upload your documents!",
          [{ text: "OK" }]
        );
        return false;
      }
      return true;
    }
    return true;
  };

  const pickDocument = async (setDocumentUri, docType) => {
    const hasMediaLibraryPermission = await requestMediaLibraryPermission();
    if (!hasMediaLibraryPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setDocumentUri(result.assets[0].uri);
      Alert.alert("Document Uploaded", `Your ${docType} has been selected!`);
    } else {
      Alert.alert(
        "Document Not Selected",
        `No document was selected for ${docType}.`
      );
    }
  };

  const renderCarDetailsTab = () => (
    <ScrollView contentContainerStyle={styles.tabContent}>
      <View style={styles.carDetailsGrid}>
        <View style={styles.carDetailBox}>
          <Text style={styles.carDetailLabel}>Car Name</Text>
          <Text style={styles.carDetailValue}>{vehicleDetails.carName}</Text>
        </View>
        <View style={styles.carDetailBox}>
          <Text style={styles.carDetailLabel}>Car Color</Text>
          <Text style={styles.carDetailValue}>{vehicleDetails.carColor}</Text>
        </View>
        <View style={styles.carDetailBox}>
          <Text style={styles.carDetailLabel}>Number of Seats</Text>
          <Text style={styles.carDetailValue}>
            {vehicleDetails.numberOfSeats}
          </Text>
        </View>
        <View style={styles.carDetailBox}>
          <Text style={styles.carDetailLabel}>Years of usage</Text>
          <Text style={styles.carDetailValue}>
            {vehicleDetails.yearsOfUsage}
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderVehicleDocumentsTab = () => (
    <ScrollView contentContainerStyle={styles.tabContent}>
      <View style={styles.documentUploadSection}>
        <TouchableOpacity style={styles.documentUploadBox}>
          <Image source={documentImg} style={styles.documentIcon} />
          <Text style={styles.documentUploadText}>Vehicle registration</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.documentUploadBox}>
          <Image source={documentImg} style={styles.documentIcon} />
          <Text style={styles.documentUploadText}>Insurance Document</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderDriversLicenseTab = () => (
    <ScrollView contentContainerStyle={styles.tabContent}>
      <View style={styles.licenseUploadSection}>
        <TouchableOpacity style={styles.licenseUploadBox}>
          <Image source={documentImg} style={styles.documentIcon} />
          <Text style={styles.documentUploadText}>Driver's License</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Car Details":
        return renderCarDetailsTab();
      case "Vehicle documents":
        return renderVehicleDocumentsTab();
      case "Driver's License":
        return renderDriversLicenseTab();
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1A1B" />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Vehicle Information</Text>
          <View style={{ width: 24 }} /> {/* Spacer to balance header */}
        </View>

        <View
          style={{
            backgroundColor: "#2A2A2A",
            marginHorizontal: 20,
            marginBottom: 20,
            borderRadius: 10,
          }}
        >
          <Image
            source={vehicleDetails.carImage}
            style={styles.carImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.tabContainer}>
          {["Car Details", "Vehicle documents", "Driver's License"].map(
            (tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTabButton,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.tabButtonText,
                    activeTab === tab && styles.activeTabButtonText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1A1B", // Dark background
    paddingTop: StatusBar.currentHeight + 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    paddingRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    flex: 1,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    backgroundColor: "#2A2A2A", // Darker background for tabs
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
    gap: 4,
  },
  tabButton: {
    paddingVertical: 10,
    alignItems: "center",
    paddingHorizontal: 5,
  },
  activeTabButton: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  tabButtonText: {
    color: "#918D8F",
    fontWeight: "bold",
    fontSize: 13, // Slightly smaller font for tabs
  },
  activeTabButtonText: {
    color: "#fff", // Dark text for active tab
  },
  tabContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  carImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  carDetailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  carDetailBox: {
    backgroundColor: "#2A2A2A",
    borderRadius: 15,
    padding: 15,
    width: "48%", // Two columns
    marginBottom: 15,
  },
  carDetailLabel: {
    fontSize: 14,
    color: "#AAA",
    marginBottom: 5,
  },
  carDetailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },

  // Document Upload Tab Styles
  documentUploadSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  documentUploadBox: {
    backgroundColor: "#2A2A2A",
    borderRadius: 15,
    padding: 20,
    width: "48%", // Two columns
    height: 150, // Fixed height for visual consistency
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#444",
    borderStyle: "dashed",
  },
  documentIcon: {
    width: 60, // Adjust size as needed
    height: 60,
    resizeMode: "contain",
    marginBottom: 10,
  },
  documentUploadText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  uploadedDocumentPreview: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    resizeMode: "cover",
  },

  // Driver's License Tab Styles (similar to document upload)
  licenseUploadSection: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  licenseUploadBox: {
    backgroundColor: "#2A2A2A",
    borderRadius: 15,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#444",
    borderStyle: "dashed",
  },
});

export default VehicleInformationScreen;
