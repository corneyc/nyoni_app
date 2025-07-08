
// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/nyoni-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.brandTitle}>Nyoni</Text>
      <Text style={styles.tagline}>Your Crown. Your Freedom.</Text>

      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.getStartedText}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e1ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  brandTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#5e239d',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 20,
    color: '#7a44c2',
    marginBottom: 35,
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: '#5e239d',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
