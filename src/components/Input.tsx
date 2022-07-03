import React,{FC} from "react";
import {View, TextInput,StyleSheet, Dimensions} from 'react-native'



const {height, width} = Dimensions.get('screen')
interface Props{
    placeholder:string;
    onChangeText:(text:string)=>void;
}

const Input :FC<Props> =(props)=> {
    return(
    <View style= {styles.container}>
        <TextInput
        style={styles.input}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
      />
    </View>
    )

}

const styles = StyleSheet.create({
    input: {
      padding:15,
    },
    container:{
      width: width /1.1,
      alignSelf: "center",
      backgroundColor:'#e3e3e3',
      borderRadius: 5,
      marginVertical:5,
      marginTop:130

  },
  });
  

export default Input