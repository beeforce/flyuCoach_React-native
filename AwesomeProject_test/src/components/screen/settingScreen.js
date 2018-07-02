import React from 'react';
import { 
StyleSheet, 
View, 
Text , 
Dimensions, 
Image, 
TouchableOpacity,
ScrollView,
Animated
 } from 'react-native';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(IcoMoonConfig);
import { Fonts } from '../../utils/Fonts';

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


export default class SettingsScreen extends React.Component {
    

  constructor(props) {
    super(props);
    this.state = {email: '' ,
                  user:null,
                  Modalopen : true,
                  loading: true,
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
                <Text style={{color: '#ffffff', fontWeight: 'bold', fontFamily: Fonts.Roboto_medium , margin: 10}}>แก้ไขภาพโปรไฟล์</Text>
                </TouchableOpacity>
                </View>

                <View style = {styles.contentcontainer}>
                <View style = {{borderBottomWidth: 0.5, borderColor: '#c9c9c9',}}>
                <View style = {styles.layouteachcontent} >
                <View style = {{ flexDirection : 'row', marginBottom: 3}}>
                <Text>Email</Text>
                <Icon name="envelope" style={{ paddingLeft: 8, }} size={16} color = '#2c3e50'/>
                </View>
                <Text style = {{fontFamily:Fonts.Roboto_medium, fontWeight: 'bold'}}>matoyza007@gmail.com</Text>
                </View>
                </View>

                <View style = {{borderBottomWidth: 0.5, borderColor: '#c9c9c9',}}>
                <View style = {styles.layouteachcontent} >
                <View style = {{ flexDirection : 'row', marginBottom: 3}}>
                <Text>Phone Number</Text>
                <Icon name="phone" style={{ paddingLeft: 8, }} size={16} color = '#2c3e50'/>
                </View>
                <Text style = {{fontFamily:Fonts.Roboto_Regular, fontWeight: 'bold'}}>0853352116</Text>
                </View>
                </View>

                <View style = {{borderBottomWidth: 0.5, borderColor: '#c9c9c9',}}>
                <View style = {styles.layouteachcontent} >
                <View style = {{ flexDirection : 'row', marginBottom: 3}}>
                <Text>Fullname</Text>
                <Icon name="user" style={{ paddingLeft: 8, }} size={16} color = '#2c3e50'/>
                </View>
                <Text style = {{fontFamily:Fonts.Roboto_Regular, fontWeight: 'bold'}}>Matoy Sukhuvimonpanich</Text>
                </View>
                </View>

                <View style = {{borderBottomWidth: 0.5, borderColor: '#c9c9c9',}}>
                <View style = {styles.layouteachcontent} >
                <View style = {{ flexDirection : 'row', marginBottom: 3}}>
                <Text>Nickname</Text>
                <Icon name="user" style={{ paddingLeft: 8, }} size={16} color = '#2c3e50'/>
                </View>
                <Text style = {{fontFamily:Fonts.Roboto_Regular, fontWeight: 'bold'}}>Toy</Text>
                </View>
                </View>

                <View style = {{borderBottomWidth: 0.5, borderColor: '#c9c9c9',}}>
                <View style = {styles.layouteachcontent} >
                <View style = {{ flexDirection : 'row', marginBottom: 3}}>
                <Text>Date of Birth</Text>
                <Icon name="birthday-cake" style={{ paddingLeft: 8, }} size={16} color = '#2c3e50'/>
                </View>
                <Text style = {{fontFamily:Fonts.Roboto_Regular, fontWeight: 'bold'}}>20/05/2008</Text>
                </View>
                </View>

                <View style = {{borderBottomWidth: 0.5, borderColor: '#c9c9c9',}}>
                <View style = {{flexDirection: 'row'}}>

                <View style = {styles.layouteachcontent} >
                <View style = {{ flexDirection : 'row', marginBottom: 3}}>
                <Text>Province</Text>
                <Icon name="map-marker-alt" style={{ paddingLeft: 8, }} size={16} color = '#2c3e50'/>
                </View>
                <Text style = {{fontFamily:Fonts.Roboto_Regular, fontWeight: 'bold'}}>Uttaradit</Text>
                </View>

                <View style = {{borderLeftWidth: 0.5, borderColor: '#c9c9c9',}}>
                <View style = {styles.layouteachcontent} >
                <View style = {{ flexDirection : 'row', marginBottom: 3}}>
                <Text>School</Text>
                <Icon name="school" style={{ paddingLeft: 8, }} size={16} color = '#2c3e50'/>
                </View>
                <Text style = {{fontFamily:Fonts.Roboto_Regular, fontWeight: 'bold'}}>Uttaradit School</Text>
                </View>
                </View>

                </View>
                </View>

                <View style = {{borderBottomWidth: 0.5, borderColor: '#c9c9c9',}}>
                <View style = {styles.layouteachcontent} >
                <View style = {{ flexDirection : 'row', marginBottom: 3}}>
                <Text>Goal</Text>
                <Icon name="road" style={{ paddingLeft: 8, }} size={16} color = '#2c3e50'/>
                </View>
                <Text style = {{fontFamily:Fonts.Roboto_Regular, fontWeight: 'bold'}}>วิศวกรโยธา มช.</Text>
                </View>
                </View>
              </View>

               <TouchableOpacity style={styles.saveButton}>
                <Text style={{color: '#ffffff', fontWeight: 'bold', fontFamily: Fonts.Roboto_medium , textAlign:'center', alignSelf:'center'}}>บันทึกการแก้ไข</Text>
              </TouchableOpacity>
        </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#EEEEEE'
  },
  goalButton:{
    backgroundColor: '#e67e22',
    alignSelf: 'center',
    borderRadius: 27,
    marginLeft: 20,
    shadowColor: '#000',
    shadowOpacity : 0.24, 
    shadowRadius: 10, 
    elevation: 3,
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
    borderWidth: 0.5, 
    borderColor: '#c9c9c9',
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: '#fff',
    shadowColor: '#000', 
    shadowOpacity : 0.24, 
    shadowRadius: 3, 
    elevation: 3,
  },
  layouteachcontent:{
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10, 
    marginLeft: 15, 
    marginRight: 15, 
  }
});
