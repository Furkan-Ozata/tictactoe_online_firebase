import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



const signout = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};

const createGame = async () => {
  const {currentUser} = auth();
  const {uid} = currentUser;
  const temp = ['', '', '', '', '', '', '', '', ''];
  await firestore().collection('listOfGames').doc(uid).set({
    user1: uid,
    createdAt: firestore.FieldValue.serverTimestamp(),
    tableID: uid,
    temp: temp,
    sira: 'X',
    user2: null,
    
  });

  await firestore().collection('Users').doc(uid).update({
    user: uid,
    sira: 'X',
    tableID: uid,
  });
};

export {signout, createGame};
