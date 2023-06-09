import React, { useState } from "react";
import globalStyles from "./globalStyles";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    setEmail(text)
  }

  const handlePasswordChange = (text) =>{
    setPasswordError("")
    setPassword(text)
  }

  const handleLogin = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if (isEmailValid && isPasswordValid) {
      console.warn(email, password);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.LoginContainer}>
        <Text style={[globalStyles.text, styles.header]}>Login</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#feefdd"
            value={email}
            onChangeText={handleEmailChange}
          />
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#feefdd"
            secureTextEntry
            value={password}
            onChangeText={handlePasswordChange}
          />
          {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={[globalStyles.text, styles.buttonText]}>Login</Text>
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
