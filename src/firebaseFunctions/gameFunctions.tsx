import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import store from '../store/MainStore';
import {observe} from 'mobx';

observe;

const markPosition = (position: any, TableID: any) => {
  const {currentUser} = auth();
  const {uid} = currentUser;
  let tableGet: any = null;
  let sira: any = null;
  firestore()
    .collection('Users')
    .doc(uid)
    .get()
    .then(history => {
      if (history.exists) {
        const historyData: any = history.data();
        tableGet = historyData.tableID;
        sira = historyData.sira;
      }
      if (store.active_player === 'X') {
        if (uid === TableID) {
          if (!store.markers[position]) {
            let temp: any = [...store.markers];
            temp[position] = store.active_player;
            //set marker firestore
            firestore()
              .collection('listOfGames')
              .doc(tableGet)
              .update({
                temp: temp,
                sira: 'O',
              })
              .then(() => {
                console.log('markers added!');
              });
            store.markers = temp;
            store.active_player = 'O';
          }
        }
      } else if (store.active_player === 'O') {
        if (uid !== TableID) {
          if (!store.markers[position]) {
            let temp: any = [...store.markers];
            temp[position] = store.active_player;
            //set marker firestore
            firestore()
              .collection('listOfGames')
              .doc(tableGet)
              .update({
                temp: temp,
                sira: 'X',
              })
              .then(() => {
                console.log('markers added!');
              });
            store.markers = temp;
            store.active_player = 'X';
          }
        }
      }
    });
};

const resetMarkers = () => {
  const temp = ['', '', '', '', '', '', '', '', ''];
  //reset firestore markers
  const {currentUser} = auth();
  const {uid} = currentUser;
  let tableGet: any = null;

  firestore()
    .collection('Users')
    .doc(uid)
    .get()
    .then(history => {
      if (history.exists) {
        const historyData: any = history.data();
        tableGet = historyData.tableID;
      }
      firestore()
        .collection('listOfGames')
        .doc(tableGet)
        .update({
          temp: temp,
          sira: 'X',
        })
        .then(() => {
          console.log('reset markers');
        });
    })
    .catch(err => console.log(err));
  // reset markers
  store.markers = temp;
  store.active_player = 'X';
};

const deleteTable = () => {
  const {currentUser} = auth();
  const {uid} = currentUser;
  let tableGet: any = null;

  firestore()
    .collection('Users')
    .doc(uid)
    .get()
    .then(history => {
      if (history.exists) {
        const historyData: any = history.data();
        tableGet = historyData.tableID;
      }
      if (uid === tableGet) {
        console.log(tableGet);
        firestore().collection('listOfGames').doc(tableGet).delete();
      }
    })
    .catch(err => console.log(err));
};

export {markPosition, resetMarkers, deleteTable};
