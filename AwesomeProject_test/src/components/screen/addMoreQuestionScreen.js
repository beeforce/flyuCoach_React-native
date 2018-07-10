import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, ScrollView} from 'react-native'
import { Fonts } from '../../utils/Fonts';
import { LinearTextGradient } from 'react-native-text-gradient';
import LinearGradient from 'react-native-linear-gradient';

export default class addMoreQuestionScreen extends Component {
    static navigationOptions = {
        headerStyle: {backgroundColor: '#fff', elevation: 0, shadowOpacity: 0},
        style: { elevation: 0 }
      };
  render() {
    return (
    <View style={styles.container} >
    <ScrollView>
    <KeyboardAvoidingView
        style={styles.container} 
        behavior={'padding'} >
      <View style = {{flex: 5}}>
        <Text style = {styles.textHeader}>สร้างคำถามใหม่</Text>
        <LinearTextGradient
        style={styles.textHeaderdesciptionFirst}
        locations={[0, 1]}
        colors={['#0000cc', '#cc66ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        >
        ก่อนสร้างคำถาม ให้น้องๆ ลองค้นหาคำถามที่ใกล้เคียงกันก่อน เพื่อความหลากหลาย และป้องกันคำถามซ้ำจนเยอะเกินไป
        </LinearTextGradient>

        <LinearTextGradient
        style={styles.textHeaderMark}
        locations={[0, 1]}
        colors={['#0000cc', '#cc66ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        >
        * คำถามของน้องๆบางคนอาจจะไม่ได้ขึ้นในระบบ
        </LinearTextGradient>

        <Text style = {styles.textQuestion}>หัวข้อคำถาม</Text>
        <TextInput style={styles.inputtextstyle}
        behavior="padding"
        multiline
        maxLength = {100}
        blurOnSubmit={true}
        // onChangeText={(email) => this.setState({email})}
        // value={this.state.email}
        returnKeyType = "next"
        onSubmitEditing = {() => this.description.focus()}
        ></TextInput>

        <Text style = {styles.textQuestion}>อธิบายขยายคำถามเพิ่มเติม</Text>
        <TextInput style={styles.inputtextstyle}
            multiline
            numberOfLines = {7}
            maxLength = {1000}
            ref = {(input) => this.description = input}
      ></TextInput>

      </View>

        <View style = {{ flex: 1,}}>
      <TouchableOpacity style={styles.submitButton}
        >
        <LinearGradient colors={['#afe03e', '#368c0b']} style = {{flex: 1, borderRadius: 27,justifyContent: 'center'}}>
          <Text style={styles.submitTextstyle}>ส่งคำถาม</Text>
        </LinearGradient>
        </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
      </ScrollView>
      </View>
    )
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    textHeader:{
        fontSize: 20,
        color: '#b30047',
        fontFamily: Fonts.MosseThai_Extra_Bold,
        marginLeft: 20,
        marginTop: 5,
    },
    textHeaderdesciptionFirst:{
        marginTop: 7,
        marginLeft: 25,
        fontFamily: Fonts.MosseThai_Bold,
        fontSize: 13,
        marginRight: 23,
        lineHeight: 20,
    },
    textHeaderMark:{
        marginTop: 15,
        marginLeft: 25,
        fontFamily: Fonts.MosseThai_Bold,
        fontSize: 13,
        marginRight: 23,
        lineHeight: 20,
    },
    textQuestion:{
        fontSize: 20,
        color: '#2c3e50',
        fontFamily: Fonts.MosseThai_Medium,
        marginLeft: 20,
        marginTop: 15,
    },
    inputtextstyle:{
      fontSize: 16,
      fontFamily: Fonts.MosseThai_Medium,
      marginLeft: 20,
      marginRight: 20,
      textAlignVertical: 'top'
    },
    inputtextstyle2:{
      fontSize: 16,
      fontFamily: Fonts.MosseThai_Medium,
      marginLeft: 20,
      marginRight: 20,
    },
    submitButton:{
        marginTop: 10,
        marginBottom: 20,
        width: windowWidth * 0.8,
        height: windowHeight * 0.08,
        alignSelf: 'center',
      },
      submitTextstyle:{
        color: '#ffffff',
        alignSelf: 'center',
        fontSize: 18,
        fontFamily: Fonts.MosseThai_Bold,
      },
})
