import React, {FC, useState ,useEffect} from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from '../config/firebase-config';
import AppStack from './appStack';
import LoginScreen from './loginScreen'

const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(235, 25, 35)',
      background: 'rgb(25, 252, 252)',
    },
  }; 

const MainNav : FC = () => {
    
    const [user, setUser] = useState<any>(null)

    useEffect(()=>{
        onAuthStateChanged(authentication, (user) => {
            if (user) {
            //user is sign in
                setUser(user)
            } else {
              // User is signed out
              setUser(null)
            }
});

    })

    return(
        <NavigationContainer theme={MyTheme}>
            {user !== null ? <AppStack /> : <LoginScreen />}
        </NavigationContainer>
    )
}

export default MainNav