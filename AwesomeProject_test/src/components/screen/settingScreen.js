import React from 'react';
import { 
StyleSheet, 
View, 
Text , 
Dimensions, 
Image, 
TouchableOpacity,
ScrollView,
Animated,
TextInput,
 } from 'react-native';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(IcoMoonConfig);
import { Fonts } from '../../utils/Fonts';
import LinearGradient from 'react-native-linear-gradient';

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


export default class SettingsScreen extends React.Component {
    

  constructor(props) {
    super(props);
    this.state = {email:'matoyza007@gmail.com',
                  phonenumber: '0823165489',
                  Fullname: 'Matoy Sukhuvimonpanich',
                  Nickname: 'Toy',
                  Date_of_Birth: '20/05/2008',
                  province:'Uttaradit',
                  school:'Uttaradit School',
                  goal:'วิศวกรโยธา มช.',
                  user:null,
                  pickImage: false,
                }
    
  } 

  renderProfileImage() {
    if(this.state.pickImage){
      return(
        <Image source={this.state.avatarSource} style={ styles.profileImage } />
      )
    }else{
      return(
        <Image source={require('../../images/image.jpg')} style={ styles.profileImage } />
      )
    }
  }

render() {
    return (
        <View style={styles.container}>
        <ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event(
            [
              { nativeEvent: { contentOffset: { y: this.scrollY } } }
            ]
            )}  >

             <View style = {{flexDirection: 'row', alignItems: 'baseline',justifyContent: 'center'}}>
              {this.renderProfileImage()}
                <TouchableOpacity style={styles.goalButton} onPress = {()=> {
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
                <LinearGradient colors={['#fad961', '#f76b1c']} style={styles.goalButton} >
                <Text style={{color: '#ffffff', fontFamily: Fonts.MosseThai_Bold , padding: 15}}>แก้ไขภาพโปรไฟล์</Text>
                </LinearGradient>
                </TouchableOpacity>
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
                value= {this.state.email}
                placeholderTextColor="#2c3e50"
                keyboardType = "email-address"
                returnKeyType = "next"
                underlineColorAndroid="transparent"
                onChangeText={(email) => this.setState({email})}
                onSubmitEditing = {() => this.phonenumber.focus()}
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
                value= {this.state.phonenumber}
                placeholderTextColor="#2c3e50"
                keyboardType = "numeric"
                returnKeyType = "next"
                underlineColorAndroid="transparent"
                onChangeText={(phonenumber) => this.setState({phonenumber})}
                ref = {(input) => this.phonenumber = input}
                onSubmitEditing = {() => this.Fullname.focus()}
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
                value= {this.state.Fullname}
                placeholderTextColor="#2c3e50"
                keyboardType = "default"
                returnKeyType = "next"
                underlineColorAndroid="transparent"
                onChangeText={(Fullname) => this.setState({Fullname})}
                ref = {(input) => this.Fullname = input}
                onSubmitEditing = {() => this.Nickname.focus()}
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
                value= {this.state.Nickname}
                placeholderTextColor="#2c3e50"
                keyboardType = "default"
                returnKeyType = "next"
                underlineColorAndroid="transparent"
                onChangeText={(Nickname) => this.setState({Nickname})}
                ref = {(input) => this.Nickname = input}
                onSubmitEditing = {() => this.Date_of_Birth.focus()}
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
                value= {this.state.Date_of_Birth}
                placeholderTextColor="#2c3e50"
                placeholder = "DD/MM/YYYY"
                keyboardType = "numeric"
                returnKeyType = "next"
                underlineColorAndroid="transparent"
                onChangeText={(Date_of_Birth) => this.setState({Date_of_Birth})}
                ref = {(input) => this.Date_of_Birth = input}
                onSubmitEditing = {() => this.province.focus()}
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
                value= {this.state.province}
                placeholderTextColor="#2c3e50"
                keyboardType = "default"
                returnKeyType = "next"
                underlineColorAndroid="transparent"
                onChangeText={(province) => this.setState({province})}
                ref = {(input) => this.province = input}
                onSubmitEditing = {() => this.School.focus()}
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
                value= {this.state.school}
                placeholderTextColor="#2c3e50"
                keyboardType = "default"
                returnKeyType = "next"
                underlineColorAndroid="transparent"
                onChangeText={(school) => this.setState({school})}
                ref = {(input) => this.School = input}
                onSubmitEditing = {() => this.goal.focus()}
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
                value= {this.state.goal}
                placeholderTextColor="#2c3e50"
                keyboardType = "default"
                returnKeyType = "done"
                underlineColorAndroid="transparent"
                onChangeText={(goal) => this.setState({goal})}
                ref = {(input) => this.goal = input}
                />
                </View>
                </View>
              </View>

              <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
               <LinearGradient colors={['#b4ec51','#429321']} style={styles.saveButton}>
                <Text style={{color: '#ffffff', fontSize: 17,  fontFamily: Fonts.MosseThai_Bold , alignSelf:'center'}}>บันทึกการแก้ไข</Text>
                </LinearGradient>
                </TouchableOpacity>
        </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f6f6f6',
      overflow: 'hidden',
  },
  goalButton:{
    alignSelf: 'center',
    borderRadius: 27,
    marginLeft: 20,
  },
  saveButton:{
    backgroundColor: '#A3CB38',
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_WIDTH * 0.14,
    alignSelf: 'center',
    borderRadius: 27,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 30,
    justifyContent: 'center',
    shadowColor: '#000', 
    shadowOpacity : 0.24, 
    shadowRadius: 10, 
    elevation: 3,
  },
  profileImage:{
    width:SCREEN_WIDTH* 0.25,
    height:SCREEN_WIDTH* 0.25,
    borderRadius:(SCREEN_WIDTH* 0.25)/2,
    shadowColor: '#000',  
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
  contentcontainer:{
    width: SCREEN_WIDTH * 0.9,
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
    alignSelf:'center',
    color: '#626262'
  },
  textwithIcon:{
    alignSelf:'center',
    fontSize: 16,
    fontFamily: Fonts.MosseThai_Medium,
    color: '#626262'
  },
  viewoficonwithtext:{
    flexDirection : 'row',
    alignItems: 'baseline', 
  },
  textinput:{
    fontFamily: Fonts.MosseThai_Bold, 
    fontSize: 16,
    paddingTop: -11,
    paddingLeft: -1,
  }
});
