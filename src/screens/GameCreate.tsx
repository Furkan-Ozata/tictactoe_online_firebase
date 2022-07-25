import React, {FC, useState} from 'react';
import {ScrollView, View, Text, StyleSheet, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Button, CreateButton} from '../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParams} from '../navigation/stackPramsType';
import firestore from '@react-native-firebase/firestore';



const GameCreate: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  const signout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const createGame = () => {
    const {currentUser} = auth();
    const {uid} = currentUser;
    const temp = ['', '', '', '', '', '', '', '', ''];
    firestore()
      .collection('listOfGames')
      .doc(uid)
      .set({
        user1: uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        tableID: uid,
      })
      .then(() => {
        firestore()
          .collection('markers')
          .doc(uid)
          .set({
            user1: uid,
            createdAt: firestore.FieldValue.serverTimestamp(),
            temp: temp,
            sira: 'X',
            user2: null
          })
          .then(() => {
            firestore().collection('Users').doc(uid).update({
              user: uid,
              sira: 'X',
              tableID: uid,
            });
          });
      });

    navigation.navigate('Game');
  };

  const ListOfGames = () => {
    navigation.navigate('ListOfGames');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={require('../assets/img/LOGO.png')} />
      </View>
      <CreateButton onPress={createGame} title={'Create Game'} />
      <CreateButton onPress={ListOfGames} title={'List Of Games'} />
      <Button onPress={signout} title={'Sign Out'} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
  },
  icon: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default GameCreate;
