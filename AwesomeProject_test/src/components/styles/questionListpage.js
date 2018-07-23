import React, { Component } from 'react'
import { 
  Text, 
  StyleSheet, 
  View,
  Dimensions,
  TouchableHighlight,
 } from 'react-native'
 import { Fonts } from '../../utils/Fonts';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(IcoMoonConfig);

export default class QuestionListpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
                      mainView : true,
                    }
        
      } 
      
        renderTitleText(item) {
          return (
            <View style = {{flex:1}}>
            <View style = {[styles.cardviewcontent,{ flex: 0.55, paddingHorizontal: windowWidth *0.1,}]}>
            <Text style = {styles.textTitle}>{item.title}</Text>
            </View>
            <TouchableHighlight style = {[styles.cardviewcontent,{flex:0.13,}]} underlayColor = 'transparent' onPress = {()=> {
                this.setState({
                    mainView: false
                })
            }}>
            <Text style = {styles.textTitle}>ใช่</Text>
            </TouchableHighlight>
            <TouchableHighlight style = {[styles.cardviewcontent,{flex:0.13,}]}  underlayColor = 'transparent' onPress = {()=> {
                this.setState({
                    mainView: false
                })
            }}>
            <Text style = {styles.textTitle}>ไม่ใช่</Text>
            </TouchableHighlight>
            </View>
          );
        }
      
        closeMainpage = () =>{
        //   this.props.navigation.setParams({ title: 'ข้อที่ 2' })
          this.setState({
            mainView: false
          })
        }

  render() {
    const mainView = this.state;
    console.log("Open page"+this.props.key)
        return (
            <View style = {styles.container}>
            { this.state.mainView ?
                this.renderTitleText(this.props.items) : null}
            </View>
            )
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#EEE'
      },
      cardviewcontent:{
        overflow: 'hidden',
        marginBottom: 5, 
        shadowColor: '#000000', 
        shadowOpacity : 0.24, 
        shadowRadius: 5, 
        backgroundColor: '#ffffff', 
        borderRadius: 2, 
        shadowOffset: {width: 10, height: 10},
        elevation: 4,
        marginHorizontal: windowWidth * 0.05,
        alignItems: 'center', 
        justifyContent: 'center'
      },
      textTitle:{ 
        fontSize: 18, 
        fontFamily: Fonts.MosseThai_Bold, 
        color: '#1e272e',
        lineHeight: 25,
        textAlign: 'center',
      },
})
