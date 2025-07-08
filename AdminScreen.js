
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ADMIN_UIDS = [
  'YOUR_ADMIN_UID_HERE', // <-- Replace with your Firebase Auth UID(s)
];

const AdminScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser || !ADMIN_UIDS.includes(currentUser.uid)) {
      Alert.alert('Access Denied', 'You are not authorized to view this screen.');
      navigation.replace('Welcome'); // Navigate back or to sign-in
      return;
    }

    const fetchAllBookings = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'bookings'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        Alert.alert('Error', 'Could not load bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookings();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="arrow-back" size={28} color="#5e239d" />
      </TouchableOpacity>

      <Text style={styles.title}>🛠 Admin Panel – All Bookings</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#5e239d" />
      ) : bookings.length === 0 ? (
        <Text style={styles.message}>No bookings found.</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>👤 {item.name}</Text>
              <Text style={styles.cardText}>📍 {item.location}</Text>
              <Text style={styles.cardText}>📅 {new Date(item.preferredDate).toDateString()}</Text>
              <Text style={styles.cardText}>🆔 UID: {item.userId}</Text>
              <Text style={styles.cardText}>🕒 {new Date(item.createdAt).toLocaleString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  back: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5e239d',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
  card: {
    backgroundColor: '#ffeefc',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
  },
  cardText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
  },
});
