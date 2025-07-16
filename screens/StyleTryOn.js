// screens/StyleTryOn.js
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const hairstyles = [
  {
    id: 'style1',
    name: 'Curly Afro',
    uri: 'https://i.imgur.com/yourImage1.png', // Transparent PNG
    overlayStyle: { top: 50, left: 40, width: 220, height: 220 },
  },
  {
    id: 'style2',
    name: 'Braided Crown',
    uri: 'https://i.imgur.com/yourImage2.png',
    overlayStyle: { top: 30, left: 30, width: 240, height: 180 },
  },
  {
    id: 'style3',
    name: 'Twists',
    uri: 'https://i.imgur.com/yourImage3.png',
    overlayStyle: { top: 40, left: 35, width: 210, height: 210 },
  },
];

export default function StyleTryOn({ navigation }) {
  const [selfieUri, setSelfieUri] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setPermissionGranted(status === 'granted');
      if (status !== 'granted') Alert.alert('Permission required', 'Camera permission is needed to take selfies.');
    })();
  }, []);

  const takeSelfie = async () => {
    if (!permissionGranted) {
      Alert.alert('No permission', 'Please grant camera access in settings.');
      return;
    }
    setLoading(true);
    try {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 5],
        quality: 1,
        base64: false,
      });
      if (!result.cancelled) {
        setSelfieUri(result.uri);
        setSelectedStyle(null);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open camera.');
    }
    setLoading(false);
  };

  const handleSaveBooking = () => {
    if (!selectedStyle) {
      Alert.alert('Select a style', 'Please select a hairstyle first!');
      return;
    }
    if (!selfieUri) {
      Alert.alert('No selfie', 'Please take a selfie before booking.');
      return;
    }

    // TODO: Integrate backend booking save here
    Alert.alert('Booking Saved', `You booked the style: ${selectedStyle.name}`);

    navigation.navigate('BookingConfirmation', { style: selectedStyle, selfie: selfieUri });

    // Optional: Reset after booking
    setSelfieUri(null);
    setSelectedStyle(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Take a selfie and try hairstyles!</Text>

      <View style={styles.selfieContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#7B3FE4" />
        ) : selfieUri ? (
          <>
            <Image source={{ uri: selfieUri }} style={styles.selfie} />
            {selectedStyle && (
              <Image
                source={{ uri: selectedStyle.uri }}
                style={[styles.hairstyleOverlay, selectedStyle.overlayStyle]}
              />
            )}
          </>
        ) : (
          <Text style={styles.placeholder}>No selfie taken yet</Text>
        )}
      </View>

      <Button title="Take Selfie" onPress={takeSelfie} disabled={loading || !permissionGranted} />

      {selfieUri && (
        <>
          <Text style={styles.subtitle}>Choose a hairstyle:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.styleList}>
            {hairstyles.map((style) => (
              <TouchableOpacity
                key={style.id}
                onPress={() => setSelectedStyle(style)}
                style={[
                  styles.styleOption,
                  selectedStyle?.id === style.id && styles.selectedStyleOption,
                ]}
              >
                <Image source={{ uri: style.uri }} style={styles.styleImage} />
                <Text style={styles.styleName}>{style.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Button title="Save Style & Book" onPress={handleSaveBooking} disabled={!selectedStyle} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  selfieContainer: {
    width: '100%',
    height: 400,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  selfie: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  hairstyleOverlay: {
    position: 'absolute',
    opacity: 0.8,
  },
  placeholder: {
    fontSize: 16,
    color: '#666',
  },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  styleList: {
    marginVertical: 10,
  },
  styleOption: {
    marginRight: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 5,
    borderRadius: 10,
  },
  selectedStyleOption: {
    borderColor: '#7B3FE4',
  },
  styleImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  styleName: {
    fontSize: 14,
  },
});