
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Missing Email', 'Please enter your email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      Alert.alert(
        'Check Your Email',
        'A password reset link has been sent to your email.'
      );
      navigation.goBack(); // Go back to Sign In screen
    } catch (error) {
      let message = 'Something went wrong. Try again.';
      if (error.code === 'auth/user-not-found') {
        message = 'No user found with this email.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email format.';
      }
      Alert.alert('Reset Failed', message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Image
        source={require('../assets/images/nyoni-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.brandTitle}>Nyoni</Text>
      <Text style={styles.tagline}>Your Crown. Your Freedom.</Text>

      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>← Back to Sign In</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    color: '#000',
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
