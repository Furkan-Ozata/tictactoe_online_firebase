import React, {FC, useState ,useEffect} from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
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
    
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

    return(
        <NavigationContainer theme={MyTheme}>
            {user !== null ? <AppStack /> : <LoginScreen />}
        </NavigationContainer>
    )
}

export default MainNav