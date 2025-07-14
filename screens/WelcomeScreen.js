
// screens/WelcomeScreen.js
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
        accessibilityLabel="Nyoni logo"
      />
      <Text style={styles.brandTitle}>Nyoni</Text>
      <Text style={styles.tagline}>Your Crown. Your Freedom.</Text>

      <TouchableOpacity
        style={[styles.button, styles.signInButton]}
        onPress={() => navigation.navigate('SignIn')}
        accessibilityRole="button"
        accessibilityLabel="Sign In"
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signUpButton]}
        onPress={() => navigation.navigate('SignUp')}
        accessibilityRole="button"
        accessibilityLabel="Sign Up"
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e1ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  brandTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#5e239d',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 20,
    color: '#7a44c2',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 15,
    alignItems: 'center',
  },
  signInButton: {
    backgroundColor: '#5e239d',
  },
  signUpButton: {
    backgroundColor: '#7a44c2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
