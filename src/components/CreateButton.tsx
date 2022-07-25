import React,{FC} from "react";
import {TouchableOpacity,Text, StyleSheet} from 'react-native'

interface Props{
    title:string
    onPress:(p:object)=>void
}

const CreateButton :FC<Props> =(props)=> {
    return(
 
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
  
    )

}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        padding:10,
        borderRadius:30,
        margin:15,
        width:350,
        height:200
    },
    text:{
        color:'#fff',
        fontSize:25,
        fontWeight:'bold',
    }
})

export default CreateButton