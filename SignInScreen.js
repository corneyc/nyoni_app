
// screens/SignInScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef(null);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // Navigation handled via onAuthStateChanged in App.js
    } catch (error) {
      let message = 'Login failed. Please try again.';
      if (error.code === 'auth/user-not-found') {
        message = 'No user found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address format.';
      }
      Alert.alert('Login Failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require('../assets/images/nyoni-logo.png')}
          style={styles.logo}
          accessible
          accessibilityLabel="Nyoni logo"
        />
        <Text style={styles.brandTitle}>Nyoni</Text>
        <Text style={styles.tagline}>Your Crown. Your Freedom.</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor="#999"
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
          blurOnSubmit={false}
          accessibilityLabel="Email input"
          accessibilityHint="Enter your email address"
        />

        <TextInput
          ref={passwordInputRef}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor="#999"
          returnKeyType="done"
          onSubmitEditing={handleSignIn}
          accessibilityLabel="Password input"
          accessibilityHint="Enter your password"
        />

        {loading ? (
          <ActivityIndicator size="large" color="#5e239d" style={{ marginVertical: 15 }} />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignIn}
            accessibilityRole="button"
            accessibilityLabel="Sign In button"
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          accessibilityRole="link"
          accessibilityLabel="Navigate to Sign Up screen"
        >
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            try {
              if (navigation?.navigate) {
                navigation.navigate('ForgotPassword');
              } else {
                throw new Error();
              }
            } catch {
              Alert.alert('Coming Soon', 'Forgot Password screen is not available yet.');
            }
          }}
          style={{ marginTop: 10 }}
        >
          <Text style={[styles.linkText, { fontSize: 14 }]}>Forgot Password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5e1ff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
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
