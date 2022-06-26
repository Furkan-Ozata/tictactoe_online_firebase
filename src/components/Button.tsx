import React,{FC} from "react";
import {TouchableOpacity,Text, StyleSheet} from 'react-native'

interface Props{
    title:string
    onPress:(p:object)=>void
   
}

const Button :FC<Props> =(props)=> {
    return(
 
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
  
    )

}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        padding:10,
        borderRadius:20,
        margin:10,
        width:300,
       
    },
    text:{
        color:'#fff',
        fontSize:25,
        fontWeight:'bold',
    }
})

export default Button