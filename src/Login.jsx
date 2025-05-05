import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, Keyboard, Alert } from 'react-native';
import bgimg from '../assets/splash-icon.jpg';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    Keyboard.dismiss();
    Alert.alert("Welcome back! 🎉", `Hello, ${username}! You have logged in successfully.`);
    setUsername('');
    setPassword('');
    navigation.navigate('Home'); 
  };

  return (
    <ImageBackground
      source={bgimg}
      style={styles.image}
      resizeMode="contain"
    >
      <View style={styles.container}>
      <Text style={styles.appTitle}>Welcome to Top Do!</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff6347', // צבע שמח (אדום תפוז)
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 0,
    width: '80%',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 0,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;