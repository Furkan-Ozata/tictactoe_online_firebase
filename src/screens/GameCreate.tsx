import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, Image} from 'react-native';
import {Button, CreateButton} from '../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParams} from '../navigation/stackPramsType';
import {createGame, signout} from '../firebaseFunctions/gameCreate';

const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

export default class GameCreate extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  signoutGet = () => {
    signout();
  };

  createGameGet = async () => {
    createGame();
    navigation.navigate('Game');
  };

  ListOfGames = () => {
    navigation.navigate('ListOfGames');
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={require('../assets/img/LOGO.png')}
          />
        </View>
        <CreateButton onPress={this.createGameGet} title={'Create Game'} />
        <CreateButton onPress={this.ListOfGames} title={'List Of Games'} />
        <Button onPress={this.signoutGet} title={'Sign Out'} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
  },
  icon: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
