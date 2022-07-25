import React, { FC } from "react";
import { Game, GameCreate, ListOfGames } from "../screens";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AppStack: FC = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="GameCreate" screenOptions={{
      title: '', headerStyle: {
        backgroundColor: 'rgb(25, 252, 252)',
      },
    }}>
      <Stack.Screen name="GameCreate" component={GameCreate} options={{ headerShown: false }} />
      <Stack.Screen name="Game" component={Game} options={{ headerShown: false }} />
      <Stack.Screen name="ListOfGames" component={ListOfGames} />
    </Stack.Navigator>
  )
}
export default AppStack