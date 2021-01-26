import React, { useState } from 'react'
import { View, Button, TextInput } from 'react-native';

import { firebase } from '../../lib/firebase.prod';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')

  const onSignUp = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        firebase.firestore().collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email
          })
        console.log(result)
      })
      .catch(result => {
        console.log(result)
      })
  }

  return (
    <View>
      <TextInput
        placeholder="name"
        onChangeText={(nameInput) => setName(nameInput)}
      />
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
        onPress={onSignUp}
        title="Sign Up"
      />
    </View>
  )

}

export default Register;
