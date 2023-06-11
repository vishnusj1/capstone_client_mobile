import React, { useState } from "react";
import GlobalStyles from "./GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage"; // package is used for storing user details in local storage.

import {
  View,
  TextInput,
  Text,
  CheckBox,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function Register({ navigation }) {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false); // state variable to show/hide password input

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(user.email);
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(user.password);
  };

  const registerUser = async () => {
    try {
      // Validate email and password
      if (!validateEmail()) {
        console.error("Invalid email address");
        return;
      }
      if (!validatePassword()) {
        console.error(
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
        return;
      }
      if (user.password !== confirmPassword) {
        console.error("Passwords do not match");
        return;
      }

      // Get the current array of users
      const currentUsers =
        JSON.parse(await AsyncStorage.getItem("users")) || [];

      // Check if the email is already registered
      if (
        currentUsers.some((currentUser) => currentUser.email === user.email)
      ) {
        console.error("Email is already registered");
        return;
      }

      // Add the new user to the array
      currentUsers.push(user);

      // Save the updated array of users
      await AsyncStorage.setItem("users", JSON.stringify(currentUsers));

      console.log("User registered successfully");
    } catch (error) {
      console.error("Failed to register user", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.RegisterContainer}>
        <Text style={[GlobalStyles.text, styles.header]}>Register</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#feefdd"
            onChangeText={(text) => setUser({ ...user, fname: text })} // <-- New input field
            value={user.fname}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#feefdd"
            onChangeText={(text) => setUser({ ...user, lname: text })} // <-- New input field
            value={user.lname}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#feefdd"
            onChangeText={(text) => setUser({ ...user, email: text })}
            value={user.email}
            autoCapitalize="none"
            passwordRules="" 
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#feefdd"
            onChangeText={(text) => setUser({ ...user, password: text })}
            value={user.password}
            secureTextEntry={!showPassword} // <-- Use showPassword state variable
            autoCapitalize="none"
            passwordRules="" 
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#feefdd"
            onChangeText={(text) => setConfirmPassword(text)}
            value={user.confirmPassword}
            secureTextEntry={!showPassword} // <-- Use showPassword state variable
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={[GlobalStyles.text, styles.buttonText]}>
              {showPassword ? "Hide Password" : "Show Password"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button]} onPress={registerUser}>
            <Text style={[GlobalStyles.text, styles.buttonText]}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={[GlobalStyles.text, styles.buttonText]}>
              Already Registered?{" "}
              <Text style={{ textDecorationLine: "underline" }}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#011936",
    color: "#feefdd",
  },
  RegisterContainer: {
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
