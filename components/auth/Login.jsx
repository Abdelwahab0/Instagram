import React, { useState } from 'react'
import { View, Button, TextInput } from 'react-native';

import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = () => {
    Firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result => {
        console.log(result)
      })
      .catch(result => {
        console.log(result)
      })
  }

  return (
    <View>
      <TextInput
        placeholder="email"
        onChangeText={(emailInput) => setEmail(emailInput)}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(passwordInput) => setPassword(passwordInput)}
      />
      <Button
        onPress={onSignIn}
        title="Sign In"
      />
    </View>
  )

}

export default Login;
