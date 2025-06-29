import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';

import folderImg from "../../assets/images/onboarding/folder.png";

const dropdownData = {
  makes: ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Suzuki'],
  models: ['Corolla', 'Civic', 'Mustang', 'Camaro', 'Alto'],
  colors: ['Red', 'Blue', 'Black', 'White', 'Silver']
};

const VehicleInformation = () => {
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [color, setColor] = useState('');
  const [licensePlateNumber, setLicensePlateNumber] = useState('');

  const [dropdownType, setDropdownType] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownOpen = (type) => {
    setDropdownType(type);
    setShowDropdown(true);
  };

  const handleDropdownSelect = (value) => {
    if (dropdownType === 'make') setVehicleMake(value);
    else if (dropdownType === 'model') setVehicleModel(value);
    else if (dropdownType === 'color') setColor(value);
    setShowDropdown(false);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (!vehicleMake || !vehicleModel || !color || !licensePlateNumber) {
      ToastAndroid.show('Please fill in all vehicle details to continue.',ToastAndroid.SHORT);
      return;
    }
    console.log('Vehicle Info:', {vehicleMake,vehicleModel,color,licensePlateNumber});

    router.push('/setup/vehicledocuments');
  };

  const isNextButtonEnabled = vehicleMake && vehicleModel && color && licensePlateNumber;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarActive, { width: '100%' }]} />
          <View style={styles.progressBarInactive} />
        </View>

        <View style={styles.contentArea}>
          <Image source={folderImg} style={styles.folderImage} />
          <Text style={styles.title}>Vehicle Information</Text>
          <Text style={styles.description}>
            Tell us about your vehicle - make, {'\n'}model, color, and license plate.
          </Text>

          <View style={styles.inputSection}>
            <TouchableOpacity style={styles.dropdownInput} onPress={() => handleDropdownOpen('make')}>
              <Text style={styles.dropdownText}>{vehicleMake || 'Vehicle make'}</Text>
              <MaterialCommunityIcons name="chevron-down" size={24} color="#AAA" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.dropdownInput} onPress={() => handleDropdownOpen('model')}>
              <Text style={styles.dropdownText}>{vehicleModel || 'Vehicle model'}</Text>
              <MaterialCommunityIcons name="chevron-down" size={24} color="#AAA" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.dropdownInput} onPress={() => handleDropdownOpen('color')}>
              <Text style={styles.dropdownText}>{color || 'Color'}</Text>
              <MaterialCommunityIcons name="chevron-down" size={24} color="#AAA" />
            </TouchableOpacity>

            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="License plate number"
                placeholderTextColor="#AAA"
                value={licensePlateNumber}
                onChangeText={setLicensePlateNumber}
                autoCapitalize="characters"
              />
            </View>
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

        <Modal visible={showDropdown} transparent animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <FlatList
                data={dropdownData[dropdownType + 's']}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Pressable onPress={() => handleDropdownSelect(item)} style={styles.modalItem}>
                    <Text style={styles.modalItemText}>{item}</Text>
                  </Pressable>
                )}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
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
  inputSection: {
    width: '100%',
    marginBottom: 30,
  },
  dropdownInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    backgroundColor: "#252222",
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  dropdownText: {
    color: '#FFF',
    fontSize: 16,
    flex: 1,
  },
  textInputContainer: {
    paddingVertical: 18,
    backgroundColor: "#252222",
    paddingHorizontal: 20,
    borderRadius: 10
  },
  textInput: {
    color: '#FFF',
    fontSize: 16,
    padding: 0,
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 20,
    maxHeight: 300,
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalItemText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default VehicleInformation;
