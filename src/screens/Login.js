import React, { useState,useEffect } from "react";
import GlobalStyles from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
        console.log('Users:', users);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleEmailChange = (text) => {
    setEmailError("");
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPasswordError("");
    setPassword(text);
  };

  // New loginUser function
  const loginUser = async () => {
    try {
      // Get the array of users
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];

      // Check if a user with the entered email and password exists
      const userExists = users.some(user => user.email === email && user.password === password);

      if (userExists) {
        console.log('User logged in successfully');
        navigation.navigate('Main'); // <-- Navigate to Home screen of the App
      } else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Failed to log in', error);
    }
  };


  const handleLogin = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if (isEmailValid && isPasswordValid) {
      loginUser(); // <-- Call loginUser instead of logging to console
      setEmail("");
      setPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.LoginContainer}>
        <Text style={[GlobalStyles.text, styles.header]}>Login</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#feefdd"
            value={email}
            onChangeText={handleEmailChange}
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#feefdd"
            secureTextEntry
            value={password}
            onChangeText={handlePasswordChange}
            autoCapitalize="none"
          />
          {passwordError ? (
            <Text style={styles.error}>{passwordError}</Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={[GlobalStyles.text, styles.buttonText]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textButton} onPress={() => navigation.navigate("Register")}>
            <Text style={[GlobalStyles.text, styles.buttonText]}>
              Don't have an account? <Text style={{ textDecorationLine: 'underline' }}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#011936",
    color: "#feefdd",
  },
  LoginContainer: {
    flex: 1,
    margin: 20,
    alignItems: "center",
  },
  header: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    top: "50%",
    marginTop: -100, // replace -100 with half of the form's height to center it vertically
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 2,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    color: "#feefdd",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 2,
    backgroundColor: "#508bd4",
    marginTop: 10,
    alignItems: "center",
  },
  textButton: {
    padding: 10,
    borderRadius: 2,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginVertical: 5,
    alignSelf: "flex-start",
  },
});

export default Login;
