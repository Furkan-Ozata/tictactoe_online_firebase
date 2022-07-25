import React,{FC, useState} from "react";
import {View, Text, StyleSheet, Image, Alert} from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Button, Input } from "../components";



const CreateUser : FC = ()=>{

  const [user, setUser] = useState('')

const signInAnon = ()=>{

  if(user!=='')
  {
  auth()
  .signInAnonymously()
  .then(() => {
    console.log('User signed in anonymously');
    const {currentUser} = auth();
    const {uid} = currentUser;
    firestore()
      .collection('Users')
      .doc(uid)
      .set({
      userName: user,
      id: uid
      
      })
  })
  .catch(error => {
    if (error.code === 'auth/operation-not-allowed') {
      console.log('Enable anonymous in your firebase console.');
    }

    console.error(error);
  });
}else{
  Alert.alert('İsim gir')
}

}

    return(
      
      
        <View style={styles.container}>
            <View style={styles.iconContainer}>
      <Image style={styles.icon}source={require('../assets/img/LOGO.png')} />
        </View>
        <Input placeholder="userID" onChangeText={(text)=>setUser(text)}/> 
            <Button onPress={signInAnon} title={'Login'} />
            {/* <Buttom onPress={signout} title={'singout'} /> */}
        </View>
       
    )
}


const styles = StyleSheet.create({
  container:{
    paddingTop:150
  },
  icon:{
    width:300,
    height:150,
    resizeMode: "contain"
    },
  iconContainer:{
    flex:1,
    justifyContent:'center',
    alignItems: "center",

    
  }
   
  }
)

export default CreateUser;
