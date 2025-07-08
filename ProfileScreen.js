
// screens/ProfileScreen.js
// screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error('User not authenticated');

        await setDoc(
          doc(db, 'users', uid),
          {
            testField: 'Hello from Nyoni!',
            lastLogin: new Date(),
          },
          { merge: true }
        );

        const docSnap = await getDoc(doc(db, 'users', uid));
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } catch (error) {
        console.error('Firestore error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Optionally show a confirmation alert:
      // Alert.alert('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert('Error', 'Failed to sign out.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👤 Your Profile</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#5e239d" />
      ) : userData ? (
        Object.entries(userData).map(([key, value]) => (
          <Text key={key} style={styles.item}>
            <Text style={styles.label}>{key}:</Text> {String(value)}
          </Text>
        ))
      ) : (
        <Text>No user data found.</Text>
      )}

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff7ff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5e239d',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#7a44c2',
  },
  signOutButton: {
    marginTop: 30,
    backgroundColor: '#7a44c2',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontSize: 18,
  },
});
