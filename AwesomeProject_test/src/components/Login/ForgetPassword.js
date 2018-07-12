import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import IcoMoonConfig from '../../selection.json'
const Icon = createIconSetFromIcoMoon(IcoMoonConfig)
import { Fonts } from '../../utils/Fonts'

export default class ForgetPassword extends Component {
  static navigationOptions = {
    headerStyle: {backgroundColor: '#f2f6fc', elevation: 0, shadowOpacity: 0},
    style: { elevation: 0 }
  };

  render() {
    return (
      <View style = {styles.container}>
      <Text style = {styles.textforget}>ลืมพาสเวิร์ดตัวเอง</Text>
      <View style = {styles.content}>
      <Icon name="paper-plane" style={{alignSelf: 'center',padding: 35}} size={60} color = '#2d3436'/>
        <View style = {styles.textcontent}>
        <Text> textInComponent </Text>
        </View>
        </View>
      </View>
    )
  }
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6fc',
    overflow: 'hidden',
  },
  content:{
    width: SCREEN_WIDTH * 0.85,
      alignSelf: 'center',
      backgroundColor: '#fff',
      shadowColor: '#000', 
      shadowOpacity : 0.24, 
      shadowRadius: 3, 
      elevation: 3,
      borderRadius: 5
  },
  textforget:{
    paddingLeft: SCREEN_WIDTH * 0.1
  },
  textcontent:{
    paddingHorizontal: SCREEN_WIDTH * 0.025
  }
})
