import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, 
  TouchableOpacity, Dimensions, Image, 
  Platform, ScrollView, Animated, ActivityIndicator  } from 'react-native'
import * as firebase from 'firebase';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(IcoMoonConfig);
import { Fonts } from '../../utils/Fonts';
import LinearGradient from 'react-native-linear-gradient';

var ImagePicker = require('react-native-image-picker');

//timezone
var moment = require('moment-timezone');

var options = {
  title: 'Select Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


class Signup extends Component {

  static navigationOptions = {
    headerStyle: {backgroundColor: '#f2f6fc', elevation: 0, shadowOpacity: 0},
    style: { elevation: 0 }
  };

    constructor(props) {
        super(props);
        this.state = {
                  email:'',
                  password: '',
                  repassword: '',
                  phonenumber: '',
                  Fullname: '',
                  Nickname: '',
                  Date_of_Birth: '',
                  province:'',
                  school:'',
                  goal:'',
                  curTime: '',
                  user:null,
                  pickImage: false,
                  isLoading: false
                }
      }


      settime = () =>{
        setInterval( () => {
          this.setState({
            curTime : moment().tz("Asia/Bangkok").format()
          })
        },1000)
      }

      componentDidMount() {
        this.settime
      }

    signUpUser = (email, password) =>{
        if(this.validate(email) && this.state.password.length > 6){
        try {
          firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=> {
            firebase.auth().onAuthStateChanged((user) => {
                  if(user != null){
                      console.log(user)
                      firebase.database().ref('User').child('Firebase').child(user.uid).set({
                      email: user.email,
                      create_time: this.state.curTime,
                      });
                      {this.loginFirebase(this.state.email, this.state.password)}
                    }
                  })
          })
        } catch (error) {
            console.log(error.toString());
        }
      }else{
          console.log("Email is not correct");
      }
    }

    loginFirebase = (email, password) => {
      if(!this.validate(email)){
        Alert.alert('Error !',
            'Your email is not correct',);
      }
      else if(this.state.password.length <= 5){
        Alert.alert('Error !',
            'Your password is too shot',);
      }else{
        try {
          firebase.auth().signInWithEmailAndPassword(email,password).then(function (user) {
            console.log(user);
            (user) => this.setState({isLoading: true})
          }).then((user) => {
            firebase.auth().onAuthStateChanged((user) => {
                  if(user != null){
                      console.log(user)
                      firebase.database().ref('User').child('Login').child('Firebase').child(user.uid).set({
                        Login_time: this.state.curTime,
                      });
                      this.props.navigation.navigate('Homepage', {
                        uid: user.uid,
  
                      });
                  }
              })
          }).catch((error) => {
            Alert.alert('Error !',
            'Your email or password is not correct',);
          })
            
        } catch (error) {
          console.log(error.toString());
          Alert.alert('Error !',error.toString());
        }
      }
    }


    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false){
          return false;
        }
        else {
          return true;
        }
      }

      renderProfileImage() {
        if(this.state.pickImage){
          return(
            <Image source={this.state.avatarSource} style={ styles.profileImage } />
          )
        }else{
          return(
            <View style={ styles.profileImageView }>
            <TouchableOpacity onPress = {()=> {
                  ImagePicker.showImagePicker(options, (response) => {
                  console.log('Response = ', response);

                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  }
                  else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                  }
                  else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                  }
                  else {
                    let source = { uri: response.uri };

                    // You can also display the image using data:
                    // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                    this.setState({
                      avatarSource: source,
                      pickImage: true
                    });
                  }
                })
                }}>
                <Icon name="camera" style={{alignSelf: 'center', paddingBottom: 3}} size={18} color = '#fff'/>
                <Text style ={{fontFamily: Fonts.MosseThai_Medium, fontSize: 12, color: '#fff'}}>อัพโหลด</Text>
                </TouchableOpacity>
            </View>
          )
        }
      }

      focusFullnameInput() {
        this.Fullnameref._root.focus();
    }
      focusNicknameInput() {
        this.Nicknameref._root.focus();
    }
  

    render() {
      if(this.state.isLoading){
        return(
          <View style={{flex: 1, justifyContent: 'center', alignItems:'center', backgroundColor: '#f2f6fc', overflow: 'hidden',}}>
             <ActivityIndicator size="large" color="#0000ff" style = {{ alignSelf: 'center' , flex: 1}} />
       </View>
        )
      }
      return (
        <View style={styles.container}>
        <ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event(
            [
              { nativeEvent: { contentOffset: { y: this.scrollY } } }
            ]
            )}  >

             <View style = {{justifyContent: 'center'}}>
              {this.renderProfileImage()}
                </View>

                <View style = {styles.contentcontainer}>
                <View style = {{borderBottomWidth: 1, borderColor: '#c9c9c9',}}>
                <View style = {styles.layouteachcontent} >
                <View style = {styles.viewoficonwithtext}>
                <Text style = {styles.textwithIcon}>Email</Text>
                <Icon name="envelope" style={styles.iconwithText} size={15} color = '#2c3e50'/>
                </View>
                <TextInput 
                style = {styles.textinput}
                placeholder="ใส่อีเมลของเรา"
                placeholderTextColor="#d81a36"
                keyboardType = "email-address"
                returnKeyType = "next"
                underlineColorAndroid="transparent"
                onChangeText={(email) => this.setState({email})}
                onSubmitEditing = {() => this.passwordref.focus()}
                value= {this.state.email}
                />
                </View>
                </View>

                <View style = {{borderBottomWidth: 1, borderColor: '#c9c9c9',}}>
                <View style = {styles.layouteachcontent} >
                <View style = {styles.viewoficonwithtext}>
                <Text style = {styles.textwithIcon}>Password</Text>
                <Icon name="lock" style={styles.iconwithText} size={15} color = '#2c3e50'/>
                </View>
                <TextInput 
                style = {styles.textinput}
                placeholder="ใส่รหัสผ่านของเรา"
                placeholderTextColor="#d81a36"
                keyboardType = "default"
                returnKeyType = "next"
                underlineColorAndroid="transparent"
                onChangeText={(password) => this.setState({password})}
                ref = {(input) => this.passwordref = input}
                onSubmitEditing = {() => this.repasswordref.focus()}
                secureTextEntry
                value= {this.state.password}
                />
                </View>
                </View>

                <View style = {{borderBottomWidth: 1, borderColor: '#c9c9c9',}}>
                <View style = {styles.layouteachcontent} >
                <View style = {styles.viewoficonwithtext}>
                <Text style = {styles.textwithIcon}>Confirm Password</Text>
                <Icon name="lock" style={styles.iconwithText} size={15} color = '#2c3e50'/>
                </View>
                <TextInput 
                style = {styles.textinput}
                placeholder="ใส่รหัสผ่านของเราอีกครั้ง"
                placeholderTextColor="#d81a36"
                keyboardType = "default"
                returnKeyType = "next"
                underlineColorAndroid="transparent"
                onChangeText={(repassword) => this.setState({repassword})}
                ref = {(input) => this.repasswordref = input}
                onSubmitEditing = {() => this.phonenumberref.focus()}
                secureTextEntry
                value= {this.state.repassword}
                />
                </View>
                </View>

                <View style = {{borderBottomWidth: 1, borderColor: '#c9c9c9',}}>
                <View style = {styles.layouteachcontent} >
                <View style = {styles.viewoficonwithtext}>
                <Text style = {styles.textwithIcon}>Phone Number</Text>
                <Icon name="phone" style={styles.iconwithText} size={15} color = '#2c3e50'/>
                </View>
                <TextInput 
                style = {styles.textinput}
                placeholder="ใส่เบอร์โทรศัพท์"
                placeholderTextColor="#d81a36"
                keyboardType = "numeric"
                returnKeyType = "next"
                underlineColorAndroid="transparent"
                onChangeText={(phonenumber) => this.setState({phonenumber})}
                ref = {(input) => this.phonenumberref = input}
                onSubmitEditing = {() => this.Fullnameref.focus()}
                value= {this.state.phonenumber}
                blurOnSubmit={false}
                />
                </View>
                </View>

                <View style = {{borderBottomWidth: 1, borderColor: '#c9c9c9',}}>
                <View style = {styles.layouteachcontent} >
                <View style = {styles.viewoficonwithtext}>
                <Text style = {styles.textwithIcon}>Fullname</Text>
                <Icon name="user" style={styles.iconwithText} size={15} color = '#2c3e50'/>
                </View>
                <TextInput 
                style = {styles.textinput}
                placeholder="ใส่ชื่อ นามสกุล"
                placeholderTextColor="#d81a36"
                keyboardType = "default"
                returnKeyType = "next"
                underlineColorAndroid="transparent"
                onChangeText={(Fullname) => this.setState({Fullname})}
                ref = {(input) => this.Fullnameref = input}
                onSubmitEditing = {() => this.Nicknameref.focus()}
                value= {this.state.Fullname}
                blurOnSubmit={false}
                />
                </View>
                </View>

                <View style = {{borderBottomWidth: 1, borderColor: '#c9c9c9',}}>
                <View style = {styles.layouteachcontent} >
                <View style = {styles.viewoficonwithtext}>
                <Text style = {styles.textwithIcon}>Nickname</Text>
                <Icon name="user" style={styles.iconwithText} size={15} color = '#2c3e50'/>
                </View>
                <TextInput 
                style = {styles.textinput}
                placeholder="ใส่ชื่อเล่น"
                placeholderTextColor="#d81a36"
                keyboardType = "default"
                returnKeyType = "next"
                underlineColorAndroid="transparent"
                onChangeText={(Nickname) => this.setState({Nickname})}
                ref = {(input) => this.Nicknameref = input}
                onSubmitEditing = {() => this.Date_of_Birthref.focus()}
                value= {this.state.Nickname}
                blurOnSubmit={false}
                />
                </View>
                </View>

                <View style = {{borderBottomWidth: 1, borderColor: '#c9c9c9',}}>
                <View style = {styles.layouteachcontent} >
                <View style = {styles.viewoficonwithtext}>
                <Text style = {styles.textwithIcon}>Date of Birth</Text>
                <Icon name="birthday-cake" style={styles.iconwithText} size={15} color = '#2c3e50'/>
                </View>
                <TextInput 
                style = {styles.textinput}
                placeholder="ใส่วันเดือนปีเกิด(พศ)"
                placeholderTextColor="#d81a36"
                value= {this.state.Date_of_Birth}
                keyboardType = "numeric"
                returnKeyType = "next"
                underlineColorAndroid="transparent"
                onChangeText={(Date_of_Birth) => this.setState({Date_of_Birth})}
                ref = {(input) => this.Date_of_Birthref = input}
                onSubmitEditing = {() => this.provinceref.focus()}
                />
                </View>
                </View>

                <View style = {{borderBottomWidth: 1, borderColor: '#c9c9c9',}}>
                <View style = {{flexDirection: 'row'}}>

                <View style = {{
                flex: 1,
                flexDirection: 'column',
                marginTop: 10,
                marginLeft: 15, 
                marginRight: 15, }} >
                <View style = {styles.viewoficonwithtext}>
                <Text style = {styles.textwithIcon}>Province</Text>
                <Icon name="map-marker-alt" style={styles.iconwithText} size={15} color = '#2c3e50'/>
                </View>
                <TextInput 
                style = {styles.textinput}
                placeholder="เลือกจังหวัด"
                placeholderTextColor="#d81a36"
                value= {this.state.province}
                keyboardType = "default"
                returnKeyType = "next"
                underlineColorAndroid="transparent"
                onChangeText={(province) => this.setState({province})}
                ref = {(input) => this.provinceref = input}
                onSubmitEditing = {() => this.Schoolref.focus()}
                multiline
                blurOnSubmit={true}
                />
                </View>

                <View style = {{borderLeftWidth: 1, borderColor: '#c9c9c9',flex: 2}}>
                <View style = {styles.layouteachcontent} >
                <View style = {styles.viewoficonwithtext}>
                <Text style = {styles.textwithIcon}>School</Text>
                <Icon name="school" style={styles.iconwithText} size={15} color = '#2c3e50'/>
                </View>
                <TextInput 
                style = {styles.textinput}
                placeholder="เลือกโรงเรียน"
                placeholderTextColor="#d81a36"
                value= {this.state.school}
                keyboardType = "default"
                returnKeyType = "next"
                underlineColorAndroid="transparent"
                onChangeText={(school) => this.setState({school})}
                ref = {(input) => this.Schoolref = input}
                onSubmitEditing = {() => this.goalref.focus()}
                multiline
                blurOnSubmit={true}
                />
                </View>
                </View>

                </View>
                </View>

                <View style = {{paddingBottom: 5}}>
                <View style = {styles.layouteachcontent} >
                <View style = {styles.viewoficonwithtext}>
                <Text style = {styles.textwithIcon}>Goal</Text>
                <Icon name="road" style={styles.iconwithText} size={15} color = '#2c3e50'/>
                </View>
                <TextInput 
                style = {styles.textinput}
                placeholder="ใส่เป้าหมายในชีวิต"
                placeholderTextColor="#d81a36"
                value= {this.state.goal}
                keyboardType = "default"
                returnKeyType = "done"
                underlineColorAndroid="transparent"
                onChangeText={(goal) => this.setState({goal})}
                ref = {(input) => this.goalref = input}
                />
                </View>
                </View>
              </View>

              <TouchableOpacity onPress={() => {
                this.props.navigation.goBack(null)
                // this.setState({
                //   isLoading: true
                // })
              }}>
               <LinearGradient colors={['#bbe84a','#7bd834', '#3e9e16']} style={styles.saveButton}>
                <Text style={{color: '#ffffff', fontFamily: Fonts.MosseThai_Bold , textAlign:'center', alignSelf:'center'}}>ยืนยันการสร้างบัญชี</Text>
                </LinearGradient>
                </TouchableOpacity>
        </ScrollView>
        </View>
      )
    }
  }

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_Height = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f6fc',
      overflow: 'hidden',
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
    profileImage:{
      width:SCREEN_WIDTH* 0.25,
      height:SCREEN_WIDTH* 0.25,
      borderRadius:(SCREEN_WIDTH* 0.25)/2,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    },
    profileImageView:{
      width:SCREEN_WIDTH* 0.25,
      height:SCREEN_WIDTH* 0.25,
      borderRadius:(SCREEN_WIDTH* 0.25)/2,
      backgroundColor: '#3d3d3d',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    },
    contentcontainer:{
      width: SCREEN_WIDTH * 0.88,
      alignSelf: 'center',
      marginTop: 25,
      borderRadius: 5,
      backgroundColor: '#fff',
      shadowColor: '#000', 
      shadowOpacity : 0.24, 
      shadowRadius: 3, 
      elevation: 3,
    },
    layouteachcontent:{
      flexDirection: 'column',
      paddingTop: 10,
      paddingLeft: 15, 
      paddingRight: 15, 
    },
    iconwithText:{
      paddingLeft: 8,
      paddingTop: 1, 
      alignSelf:'center'
    },
    textwithIcon:{
      alignSelf:'center',
      fontSize: 16,
      fontFamily: Fonts.MosseThai_Medium
    },
    viewoficonwithtext:{
      flexDirection : 'row',
      alignItems: 'baseline', 
      alignSelf: 'flex-start'
    },
    textinput:{
      fontFamily: Fonts.MosseThai_Bold, 
      fontSize: 14,
      paddingTop: -11,
      paddingLeft: -1,
    }
});

export default Signup;