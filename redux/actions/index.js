import firebase from 'firebase';
import { 
  USER_STATE_CHANGE, 
  USER_POST_STATE_CHANGE, 
  USER_FOLLOWING_STATE_CHANGE } from '../constants/index';

export function fetchUser(){
  return((dispatch) => {
    firebase.firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
      if(snapshot.exists){
        dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()});
      }
      else{
        console.log('user does not exist');
      }
    })
  })
}
export function fetchUserPosts(){
  return((dispatch) => {
    firebase.firestore()
    .collection("posts")
    .doc(firebase.auth().currentUser.uid)
    .collection("userPosts")
    .orderBy("createdAt", "asc")
    .get()
    .then((snapshot) => {
      let posts = snapshot.docs.map(doc =>{
        const data = doc.data();
        const id = doc.id;
        return{id, ...data}
      })
      dispatch({type: USER_POST_STATE_CHANGE, posts});
    })
  })
}

export function fetchUserFollowing(){
  return((dispatch) => {
    firebase.firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .onSnapshot((snapshot) => {
      let following = snapshot.docs.map(doc =>{
        const id = doc.id;
        return id;
      });
      dispatch({type: USER_FOLLOWING_STATE_CHANGE, following});
    })
  })
}