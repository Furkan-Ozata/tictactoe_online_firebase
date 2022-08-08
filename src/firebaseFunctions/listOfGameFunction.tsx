import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const joinUser2 = async tableID => {
  const {currentUser} = auth();
  const {uid} = currentUser;
  const temp = ['', '', '', '', '', '', '', '', ''];
  await firestore().collection('listOfGames').doc(tableID).update({
    user2: uid,
    temp: temp,
    sira: 'X',
  });

  await firestore().collection('Users').doc(uid).update({
    user: uid,
    tableID: tableID,
    sira: 'O',
  });

};

export {joinUser2};
