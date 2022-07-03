import React, { FC, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native'
import { signOut } from "firebase/auth";
import { authentication, database } from "../config/firebase-config";
import { Button, CreateButton } from "../components";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../navigation/stackPramsType";
import { ref, set, onValue, update } from "firebase/database";









const GameCreate: FC = () => {





  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();



  const createTable = () => {
    const userId = authentication.currentUser?.uid;
    set(ref(database, 'listOfGame/' + userId), {
      user1: userId

    });
  }



  const signout = () => {

    signOut(authentication).then(() => { }

    ).catch((error) => {
      console.log(error)
    })
  }

  const createGame = () => {
    createTable();
    navigation.navigate('Game')

  }

  const ListOfGames = () => {
    navigation.navigate('ListOfGames')

  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={require('../assets/img/LOGO.png')} />
      </View>
      {/* <CreateButton onPress={createGame} title={"Create Game"}/> */}
      <CreateButton onPress={ListOfGames} title={"List Of Games"} />
      <Button onPress={signout} title={'Sign Out'} />
    </ScrollView>



  )

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60
  },
  icon: {
    width: 300,
    height: 150,
    resizeMode: "contain"
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    marginBottom: 20


  }
})

export default GameCreate;