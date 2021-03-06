// import React, { Component } from 'react'
// import { Text, StyleSheet, View, Button, Image } from 'react-native'
// import { createStackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Platform, SafeAreaView, StyleSheet, StatusBar, View, KeyboardAvoidingView} from 'react-native';
import RootNavigation from '../navigation/RootNavigation';

export default class Homepage extends Component {

  render() {
    if (Platform.OS === 'ios'){
      return (
          <RootNavigation />
      );
    }else{
      return (
          <RootNavigation />
      );
    }
  }
}

