
// screens/BookingScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function BookingScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);

  useEffect(() => {
    if (route.params?.selectedStyle) setSelectedStyle(route.params.selectedStyle);
  }, [route.params]);

  const handleBooking = async () => {
    if (!name || !location || !preferredDate) {
      Alert.alert('Please fill all fields');
      return;
    }
    try {
      await addDoc(collection(db, 'bookings'), {
        userId: auth.currentUser.uid,
        name,
        location,
        preferredDate: new Date(preferredDate).toISOString(),
        selectedStyle,
        createdAt: new Date().toISOString(),
      });
      Alert.alert('Booking Created!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create booking.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={{ color: '#5e239d', fontSize: 18 }}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Book Your Appointment</Text>

      {selectedStyle ? (
        <Text style={styles.selectedStyleText}>Selected Style: {selectedStyle.name}</Text>
      ) : (
        <Text style={styles.selectedStyleText}>No style selected</Text>
      )}

      <TextInput placeholder="Your Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Location" style={styles.input} value={location} onChangeText={setLocation} />
      <TextInput placeholder="Preferred Date (YYYY-MM-DD)" style={styles.input} value={preferredDate} onChangeText={setPreferredDate} />

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  back: { alignSelf: 'flex-start', marginBottom: 20 },
  container: { flex: 1, padding: 20, backgroundColor: '#fff7ff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#5e239d' },
  selectedStyleText: { marginBottom: 20, fontSize: 18, color: '#5e239d' },
  input: { borderWidth: 1, borderColor: '#7a44c2', padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#5e239d', paddingVertical: 15, borderRadius: 30, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
});
