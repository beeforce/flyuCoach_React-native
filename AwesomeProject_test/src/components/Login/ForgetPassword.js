import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, TextInput, TouchableOpacity,Image } from 'react-native'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import IcoMoonConfig from '../../selection.json'
const Icon = createIconSetFromIcoMoon(IcoMoonConfig)
import { Fonts } from '../../utils/Fonts'
import LinearGradient from 'react-native-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ForgetPassword extends Component {
  static navigationOptions = {
    headerStyle: {backgroundColor: '#f2f6fc', elevation: 0, shadowOpacity: 0},
    style: { elevation: 0 }
  };
  
  constructor(props) {
    super(props);
    this.state = {
              email:'',
              sendLinkpressed: false,
            }
  }

  render() {
    if(this.state.sendLinkpressed){
      return (
        <View style = {styles.container}>
        <Text style = {styles.textforget}> </Text>
        <View>
        <Icon name="paper-plane" style={{alignSelf: 'center',padding: 30}} size={65} color = '#000'/>
          <Text style = {{fontFamily: Fonts.MosseThai_Extra_Bold, fontSize: 19, marginTop: 20, alignSelf: 'center', color: '#6da835'}}>ส่งลิงค์เข้าอีเมลเรียบร้อยแล้ว</Text>
          
          <Text style = {{fontFamily: Fonts.MosseThai_Regular, fontSize: 14, marginTop: 10, alignSelf: 'center', textAlign: 'center'}}>คุณสามารถเข้าไปเปลี่ยนพาสเวิร์ดใหม่{"\n"}ได้ผ่านทางอีเมลได้ทันที</Text>
          <View style={{position: 'absolute',
                        top: 75,
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        left: SCREEN_WIDTH * 0.515,
                        backgroundColor: 'red'}}>
          <LinearGradient colors={!this.state.goalSuccess ? ['#bbe84a','#7bd834', '#3e9e16'] : ['#f7c042', '#f2892e','#f26304']} style = {{ flex:1, justifyContent:'center',borderRadius: 14, alignItems:'center' }}>
          <Image source={!this.state.goalSuccess ? require('../../images/check_white.png') : require('../../images/cancel_white.png')} style={{ width: 15, height:14}} />
          </LinearGradient>
        </View>
          </View>
  
          <View style = {styles.bottomContent}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
           <LinearGradient colors={['#bbe84a','#7bd834', '#3e9e16']} style={styles.saveButton}>
                  <Text style={styles.textSavebutton}>กลับหน้าหลัก</Text>
                  </LinearGradient>
                  </TouchableOpacity>
          </View>
        </View>
      )
    }else{
    return (
      <View style = {styles.container}>
      <Text style = {styles.textforget}>ลืมพาสเวิร์ดตัวเอง</Text>
      <View style = {styles.content}>
      <Icon name="paper-plane" style={{alignSelf: 'center',padding: 30}} size={65} color = '#000'/>
        <View style = {{marginHorizontal: SCREEN_WIDTH * 0.045, marginBottom: 35, borderBottomWidth: 1.5, borderColor: '#c9c9c9'}}>
        <Text style = {{fontFamily: Fonts.MosseThai_Medium, fontSize: 14,}}>Forget Password</Text>
        <TextInput 
        style = {{fontFamily: Fonts.MosseThai_Extra_Bold, fontSize: 13, paddingLeft: -1, color: '#000'}}
        placeholder="กรอกอีเมล์เพื่อรับลิงค์เปลี่ยนพาสเวิร์ดใหม่"
        placeholderTextColor= '#d81a36'
        value= {this.state.email}
        keyboardType = "email-address"
        underlineColorAndroid="transparent"
        onChangeText={(email) => this.setState({email})}
        returnKeyType = "done"/>
        </View>
        </View>

        <View style = {styles.bottomContent}>
        <TouchableOpacity onPress = {()=> {
            this.setState({
              sendLinkpressed: true
            })
          }}>
         <LinearGradient colors={['#bbe84a','#7bd834', '#3e9e16']} style={styles.saveButton}>
                <Text style={styles.textSavebutton}>ส่งลิงค์เปลี่ยนพาสเวิร์ด</Text>
                </LinearGradient>
                </TouchableOpacity>
        </View>
      </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6fc',
    overflow: 'hidden',
  },
  content:{
    width: SCREEN_WIDTH * 0.88,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000', 
    shadowOpacity : 0.24, 
    shadowRadius: 5, 
    elevation: 3,
    borderRadius: 5
  },
  textforget:{
    paddingLeft: SCREEN_WIDTH * 0.105,
    fontSize: 19,
    paddingBottom: 5,
    fontFamily: Fonts.MosseThai_Bold,
    color: '#353b48'
  },
  saveButton:{
    backgroundColor: '#A3CB38',
    width: SCREEN_WIDTH * 0.75,
    height: 50,
    alignSelf: 'center',
    borderRadius: 27,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 30,
    justifyContent: 'center',
  },
  textSavebutton:{
    color: '#ffffff', 
    fontFamily: Fonts.MosseThai_Bold , 
    textAlign:'center', 
    alignSelf:'center', 
    fontSize: 17
  },bottomContent:{
    width: SCREEN_WIDTH, 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  }
})
