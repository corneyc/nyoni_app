import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Nyoni</Text>
      <Text style={styles.subtitle}>Where AI Meets Artistry in Hair Braiding</Text>

      <TouchableOpacity
        style={styles.outlinedButton}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.outlinedText}>SIGN IN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.outlinedButton}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.outlinedText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  outlinedButton: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 12,
  },
  outlinedText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },
});