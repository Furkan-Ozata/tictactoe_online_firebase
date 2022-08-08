import React, {Component, FC, useState} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {Button, Input} from '../components';
import {inject, observer} from 'mobx-react';
import {signInAnon} from '../firebaseFunctions/createUserFunction';

@inject('store')
@observer
export default class CreateUser extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      user: ''
    };
  }

  signInAnonGet = () => {
    signInAnon(this.state.user);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={require('../assets/img/LOGO.png')}
          />
        </View>
        <Input
          placeholder="userID"
          onChangeText={text => this.setState({user: text})}
        />
        <Button onPress={this.signInAnonGet} title={'Login'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
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
  },
});
