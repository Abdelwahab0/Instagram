import React, {useState} from 'react';
import {View, TextInput, Image, Button} from 'react-native';

import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
require('firebase/firestore');
require("firebase/firebase-storage");

export default function Save(props) {
  const [description, setDescription] = useState("");

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;

    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase
    .storage()
    .ref()
    .child(childPath)
    .put(blob);

    const taskProgress = snapshot => {
      console.log(`Transferred ${snapshot.bytesTransferred}`)
    }

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot)
      })
    }

    const taskError = snapshot => {
      console.log(snapshot)
    }

    task.on("state_change", taskProgress, taskError, taskCompleted);

  }

  function savePostData(downloadURL){
    firebase.firestore()
    .collection('posts')
    .doc(firebase.auth().currentUser.uid)
    .collection('userPosts')
    .add({
      downloadURL,
      description,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(function (){
      props.navigation.popToTop();
    })

  }
  return (
    <View style={{flex: 1}}>
      <Image source={{uri: props.route.params.image}}/>
      <TextInput 
        placeholder="Add your description ..."
        onChangeText={(description) => setDescription(description)}
      />

      <Button 
        title="Save"
        onPress={() => uploadImage()}
      />
    </View>
  )
}
