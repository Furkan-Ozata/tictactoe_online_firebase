import { onValue, ref, set, update } from "firebase/database";
import React, { FC, useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { authentication, database } from "../config/firebase-config";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../navigation/stackPramsType";


const ListOfGames: FC = () => {

  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [listUsers, setListUsers] = useState([
    '', '', '',
    '', '', '',
    '', '', '',
    '', '', '',
  ])
  const [count, setCount] = useState(0)
  const [userNameCek, setuserNameCek] = useState(0)

  const startFunction = () => {

    if (count === 0) {
      const userId = authentication.currentUser?.uid;
      onValue(ref(database, '/users/' + userId), (snapshot) => {
        const userName = (snapshot.val() && snapshot.val().userName) || '';
        setuserNameCek(userName)
      })

      setCount(1)
      userName()


    }


  }

  const joinUser1 = (a: any) => {
    const userId = authentication.currentUser?.uid;
    var userName1 = '';
    onValue(ref(database, '/markers/' + a), (snapshot) => {
      const userName = (snapshot.val() && snapshot.val().userName1) || '';
      userName1 = userName;
    })

    if (userName1 === '') {
      update(ref(database, '/listOfGame/' + a), {
        user1: userId,
        table: a,
        userName1: userNameCek
      });
      update(ref(database, '/users/' + userId), {
        table: a,
        userNumber: 'user1'
      });
      update(ref(database, '/markers/' + a), {
        user1: userId,
        userName1: userNameCek
      });
      navigation.navigate('Game')
    }
  }

  const joinUser2 = async (a: any) => {
    const userId = authentication.currentUser?.uid;
    var userName2 = '';
    onValue(ref(database, '/markers/' + a), (snapshot) => {
      const userName = (snapshot.val() && snapshot.val().userName2) || '';
      userName2 = userName;
    })

    if (userName2 === '') {
      update(ref(database, '/listOfGame/' + a), {
        user2: userId,
        table: a,
        userName2: userNameCek
      });
      update(ref(database, '/users/' + userId), {
        table: a,
        userNumber: 'user2'
      });
      update(ref(database, '/markers/' + a), {
        user2: userId,
        userName2: userNameCek
      });
      navigation.navigate('Game')
    }
  }

  const userName = () => {

    onValue(ref(database, '/listOfGame'), (snapshot) => {
      const listOfGame = snapshot.val() || '';

      setListUsers(listOfGame);
    }, {
      onlyOnce: true
    });

  };


  useEffect(() => {

    const getListOfGame = onValue(ref(database, '/listOfGame'), (snapshot) => {
      const listOfGame = snapshot.val() || '';

      setListUsers(listOfGame);

    })
    return () => {
      getListOfGame()
    }
  }, [])

  return (

    <ScrollView>
      {startFunction()}
      <View style={styles.header_view}>
        <Text style={styles.header_text} >Masa 1</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => { joinUser1(1) }}>{(listUsers[1] !== undefined) ? <Text style={styles.button_text}>{listUsers[1].userName1}</Text> : null}</TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { joinUser2(1) }}>{(listUsers[1] !== undefined) ? <Text style={styles.button_text}>{listUsers[1].userName2}</Text> : null}</TouchableOpacity>
      </View>
      <View style={styles.header_view}>
        <Text style={styles.header_text} >Masa 2</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => { joinUser1(2) }}>{(listUsers[2] !== undefined) ? <Text style={styles.button_text}>{listUsers[2].userName1}</Text> : null}</TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { joinUser2(2) }}>{(listUsers[2] !== undefined) ? <Text style={styles.button_text}>{listUsers[2].userName2}</Text> : null}</TouchableOpacity>
      </View>
      <View style={styles.header_view}>
        <Text style={styles.header_text} >Masa 3</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => { joinUser1(3) }}>{(listUsers[3] !== undefined) ? <Text style={styles.button_text}>{listUsers[3].userName1}</Text> : null}</TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { joinUser2(3) }}>{(listUsers[3] !== undefined) ? <Text style={styles.button_text}>{listUsers[3].userName2}</Text> : null}</TouchableOpacity>
      </View>
      <View style={styles.header_view}>
        <Text style={styles.header_text} >Masa 4</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => { joinUser1(4) }}>{(listUsers[4] !== undefined) ? <Text style={styles.button_text}>{listUsers[4].userName1}</Text> : null}</TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { joinUser2(4) }}>{(listUsers[4] !== undefined) ? <Text style={styles.button_text}>{listUsers[4].userName2}</Text> : null}</TouchableOpacity>
      </View>
      <View style={styles.header_view}>
        <Text style={styles.header_text} >Masa 5</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => { joinUser1(5) }}>{(listUsers[5] !== undefined) ? <Text style={styles.button_text}>{listUsers[5].userName1}</Text> : null}</TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { joinUser2(5) }}>{(listUsers[5] !== undefined) ? <Text style={styles.button_text}>{listUsers[5].userName2}</Text> : null}</TouchableOpacity>
      </View>
      <View style={styles.header_view}>
        <Text style={styles.header_text} >Masa 6</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => { joinUser1(6) }}>{(listUsers[6] !== undefined) ? <Text style={styles.button_text}>{listUsers[6].userName1}</Text> : null}</TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { joinUser2(6) }}>{(listUsers[6] !== undefined) ? <Text style={styles.button_text}>{listUsers[6].userName2}</Text> : null}</TouchableOpacity>
      </View>
    </ScrollView>

  )



}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#009FF9",
    padding: 30,
    marginTop: 20,
    marginRight: 30,
    marginLeft: 20,
    width: 150,
    height: 80,
    borderRadius: 10,

  },
  container: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10

  },
  button_text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff'
  },
  header_text: {

    textAlignVertical: "center",
    textAlign: "center",
    width: '100%',
    fontSize: 22,
    color: '#FF0045',
    fontStyle: 'italic'
  },
  header_view: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    paddingTop: 10,
    borderTopWidth: 2,
  }
})

export default ListOfGames;

