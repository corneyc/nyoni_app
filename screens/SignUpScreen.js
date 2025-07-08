
// screens/SignUpScreen.js
// screens/SignUpScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // User is signed in now, the app will automatically redirect due to onAuthStateChanged
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/nyoni-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.brandTitle}>Nyoni</Text>
      <Text style={styles.tagline}>Your Crown. Your Freedom.</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.linkText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e1ff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  brandTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#5e239d',
  },
  tagline: {
    fontSize: 18,
    color: '#7a44c2',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderColor: '#7a44c2',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#5e239d',
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  linkText: {
    color: '#7a44c2',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
