// screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Image, Text } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';

export default function SplashScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!reduceMotion) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start();
    } else {
      opacity.setValue(1);
    }
  }, [reduceMotion]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/nyoni-logo.png')}
        style={[styles.logo, { opacity }]}
        resizeMode="contain"
        accessibilityLabel="Nyoni logo"
      />
      <Animated.View style={{ opacity, alignItems: 'center' }}>
        <Text style={styles.title}>Nyoni</Text>
        <Text style={styles.subtitle}>Your Crown. Your Freedom.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e1ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5e239d',
  },
  subtitle: {
    fontSize: 16,
    color: '#7a44c2',
    marginTop: 4,
    textAlign: 'center',
  },
});
