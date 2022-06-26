import React,{FC, useState} from "react";
import {View, Text, StyleSheet, Image} from 'react-native'
import { signInAnonymously, signOut} from "firebase/auth";
import { authentication } from "../config/firebase-config";
import { Button, Input } from "../components";



const CreateUser : FC = ()=>{


const [user, setUser] = useState('')

const signInAnon = ()=>{
    signInAnonymously(authentication)
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });

}
// const signout = ()=>{

//   signOut(authentication).then(()=>{

//   }).catch((error)=>{
//     console.log(error)
//   })
// }

    return(
      
      
        <View style={styles.container}>
            <View style={styles.iconContainer}>
      <Image style={styles.icon}source={require('../assets/img/LOGO.png')} />
        </View>
            <Input placeholder="userID" onChangeText={(text)=>console.log(text)}/> 
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
