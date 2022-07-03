import React,{FC, useState} from "react";
import {View, Text, StyleSheet, Image, Alert} from 'react-native'
import { signInAnonymously, signOut} from "firebase/auth";
import { authentication ,database} from "../config/firebase-config";
import { Button, Input } from "../components";
import {ref, set, onValue, update, remove } from "firebase/database";




const CreateUser : FC = ()=>{


const [user, setUser] = useState('')

const signInAnon = ()=>{
  if(user!=='')
  {
    signInAnonymously(authentication)
    .then(() => {
      const userId = authentication.currentUser?.uid;
      set(ref(database, 'users/' + userId), {
      userName: user,
      id: userId
  
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
  }
else{
  Alert.alert('İsim gir')
}

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
