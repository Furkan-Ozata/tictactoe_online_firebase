import React, {FC} from "react";
import { CreateUser } from "../screens";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const LoginScreen : FC = ()=> {
  const Stack = createNativeStackNavigator();
    return( 
        <Stack.Navigator>
          <Stack.Screen name="CreateUser" component={CreateUser}  options={{ headerShown: false}}/>
        </Stack.Navigator> 
    )
}

export default LoginScreen