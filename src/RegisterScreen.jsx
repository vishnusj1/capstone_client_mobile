import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = () => {
    // Here, you would send the user's registration information to your backend.
    // For now, we'll just log it to the console.
    console.log(`Registering user with email: ${email} and password: ${password}`);
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button
        title="Register"
        onPress={registerUser}
      />
    </View>
  );
}
