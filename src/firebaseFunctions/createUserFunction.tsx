import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import store from '../store/MainStore';
import {observe} from 'mobx';

observe;

const signInAnon = (user) => {
  if (user !== '') {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
        const {currentUser} = auth();
        const {uid} = currentUser;
        firestore().collection('Users').doc(uid).set({
          userName: user,
          id: uid,
        });
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  } else {
    Alert.alert('İsim gir');
  }
};

export {signInAnon};
