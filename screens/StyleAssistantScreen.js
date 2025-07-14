
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function StyleAssistantScreen() {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [stylesList, setStylesList] = useState([]); // AI styles from API
  const [loadingAI, setLoadingAI] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(null);

  // Preload selfie & style on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.selfieUrl) setImage(data.selfieUrl);
          if (data.selectedStyle) setSelectedStyle(data.selectedStyle);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };
    fetchUserProfile();
  }, []);

  // Take selfie
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera access is required.');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });
      if (!result.canceled && result.assets?.length > 0) {
        setImage(result.assets[0].uri);
        setSelectedStyle(null); // reset chosen style on new selfie
        setStylesList([]);       // clear previous AI styles
      }
    } catch (error) {
      Alert.alert('Error', 'Could not access camera.');
    }
  };

  // Upload selfie to Firebase Storage
  const uploadImageToStorage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = `selfies/${auth.currentUser?.uid}_${Date.now()}.jpg`;

    const storageRef = ref(getStorage(), filename);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  // Save selfie URL to Firestore
  const handleSaveSelfie = async () => {
    if (!image) {
      Alert.alert('No Image', 'Please take a selfie first.');
      return;
    }
    try {
      setUploading(true);
      const downloadUrl = await uploadImageToStorage(image);
      await setDoc(
        doc(db, 'users', auth.currentUser.uid),
        {
          selfieUrl: downloadUrl,
          updatedAt: new Date(),
        },
        { merge: true }
      );
      Alert.alert('Success', 'Selfie uploaded and saved.');
    } catch (error) {
      Alert.alert('Upload Error', 'Could not save selfie.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  // Fetch AI style recommendations based on selfie URI
  const fetchAIRecommendations = async (selfieUri) => {
    try {
      setLoadingAI(true);
      const response = await fetch('http://localhost:3000/predict', { // Change to your API URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUri: selfieUri }),
      });
      const json = await response.json();
      if (json.recommendedStyles && Array.isArray(json.recommendedStyles)) {
        setStylesList(json.recommendedStyles);
      } else {
        Alert.alert('AI Error', 'Invalid response from AI service.');
        setStylesList([]);
      }
    } catch (error) {
      console.error('AI API error:', error);
      Alert.alert('Error', 'Failed to fetch AI style recommendations.');
      setStylesList([]);
    } finally {
      setLoadingAI(false);
    }
  };

  // Call AI API when selfie changes
  useEffect(() => {
    if (image) {
      fetchAIRecommendations(image);
    }
  }, [image]);

  // Save selected style to Firestore user profile
  const chooseStyle = async (style) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('User not authenticated');
      await setDoc(
        doc(db, 'users', userId),
        {
          selectedStyle: style,
          styleChosenAt: new Date(),
        },
        { merge: true }
      );
      setSelectedStyle(style);
      Alert.alert('Style Saved', `You chose: ${style.name}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to save style choice.');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button - only show if can go back */}
      {navigation.canGoBack() && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
          <Ionicons name="arrow-back" size={28} color="#5e239d" />
        </TouchableOpacity>
      )}

      <Text style={styles.title}>Upload Selfie</Text>

      {uploading && <ActivityIndicator size="large" color="#5e239d" />}

      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>No selfie taken yet.</Text>
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage} disabled={uploading}>
        <Text style={styles.uploadText}>{image ? 'Retake Selfie' : 'Take a Selfie'}</Text>
      </TouchableOpacity>

      {image && (
        <TouchableOpacity style={styles.continueButton} onPress={handleSaveSelfie} disabled={uploading}>
          <Text style={styles.buttonText}>Save Selfie</Text>
        </TouchableOpacity>
      )}

      <Text style={[styles.title, { marginTop: 30 }]}>AI Recommended Styles</Text>

      {loadingAI ? (
        <ActivityIndicator size="large" color="#5e239d" />
      ) : stylesList.length === 0 ? (
        <Text style={styles.placeholder}>No styles recommended yet.</Text>
      ) : (
        stylesList.map((style) => (
          <View key={style.id} style={styles.styleCard}>
            <Text style={styles.styleName}>{style.name}</Text>
            <TouchableOpacity
              style={[
                styles.chooseButton,
                selectedStyle?.id === style.id && styles.chooseButtonSelected,
              ]}
              onPress={() => chooseStyle(style)}
            >
              <Text style={styles.chooseButtonText}>
                {selectedStyle?.id === style.id ? 'Chosen' : 'Choose this style'}
              </Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <Text style={styles.subtitle}>👩🏾‍🦱 AI Style Assistant Coming Soon...</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff7ff',
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#5e239d',
  },
  image: {
    width: 240,
    height: 300,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
    marginVertical: 20,
  },
  uploadButton: {
    backgroundColor: '#7a44c2',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 10,
  },
  uploadText: {
    color: '#fff',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#5e239d',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  styleCard: {
    backgroundColor: '#f2e8ff',
    borderRadius: 12,
    padding: 15,
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  styleName: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
  chooseButton: {
    backgroundColor: '#7a44c2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  chooseButtonSelected: {
    backgroundColor: '#5e239d',
  },
  chooseButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#7a44c2',
    textAlign: 'center',
    marginTop: 10,
  },
});
