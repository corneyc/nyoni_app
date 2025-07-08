
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Style Assistant</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Upload')} style={{ marginTop: 20 }}>
        <View style={{ backgroundColor: '#B66E41', padding: 15, borderRadius: 10 }}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Upload a Selfie</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Booking')} style={{ marginTop: 20 }}>
        <View style={{ backgroundColor: '#3F3CBB', padding: 15, borderRadius: 10 }}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Book a Stylist</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
