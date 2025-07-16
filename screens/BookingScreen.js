
// screens/BookingConfirmation.js
import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function BookingConfirmation({ route, navigation }) {
  const { style, selfie } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmed!</Text>

      <Image source={{ uri: selfie }} style={styles.selfie} />
      <Image source={{ uri: style.uri }} style={[styles.selfie, styles.hairstyleOverlay]} />

      <Text style={styles.styleName}>{style.name}</Text>

      <Button title="Back to Home" onPress={() => navigation.navigate('Welcome')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  selfie: { width: 250, height: 300, resizeMode: 'contain' },
  hairstyleOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.8,
  },
  styleName: { fontSize: 18, marginTop: 15, fontWeight: '600' },
});