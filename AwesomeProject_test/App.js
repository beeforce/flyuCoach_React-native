/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from "react";
import  { SafeAreaView, Platform, StatusBar, View } from 'react-native';
import RootStack from './src/components/Login/Login';

export default class App extends React.Component {
  render() {
    if (Platform.OS === 'ios'){
      return (
        <SafeAreaView>
        <RootStack />
        </SafeAreaView>
      );
    }else{
      return (
          <RootStack />
      );
    }
  }
}

