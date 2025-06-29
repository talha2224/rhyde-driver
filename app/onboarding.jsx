import { router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { slides } from '../constants/onbaording';
const { height } = Dimensions.get('window');


const Onboarding = () => {

  const [currentSlide] = useState(0);
  const slide = slides[currentSlide];

  return (
    <ScrollView style={styles.container}>

      <Image source={slide?.image} style={{ width: "100%", justifyContent: "center", alignItems: "center", marginTop: 100 }} resizeMode="cover" />

      {/* Content Area */}
      <View style={styles.contentArea}>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{slide?.title}</Text>
          <Text style={styles.description}>{slide?.description}</Text>

          <TouchableOpacity onPress={() => { router.push("/signup") }} style={styles.primaryButton} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Create an account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { router.push("/signin") }} style={[styles.primaryButton, { backgroundColor: "#1C1A1B", marginTop: 15 }]} activeOpacity={0.8}>
            <Text style={[styles.primaryButtonText, { color: "#fff" }]}>Login</Text>
          </TouchableOpacity>

        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  contentArea: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 5,
    backgroundColor: "rgba(24, 22, 23, 0.4)"
  },
  logo: {
    position: 'absolute',
    top: 90,
    right: 180,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.08,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 40,
    marginTop: 25
  },
  description: {
    fontSize: 16,
    color: '#918D8F',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: '#FBB73A',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#333',
    fontSize: 18,
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: '#1C1A1B',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  termsText: {
    color: '#A0A0A0',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    lineHeight: 16,
  },
  paginationContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    marginVertical: 20
  },
  paginationDot: {
    width: 4,
    height: 20,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
  },
  inactiveDot: {
    backgroundColor: 'gray',
  },
});

export default Onboarding;