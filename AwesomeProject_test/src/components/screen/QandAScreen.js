import React from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions, ScrollView, Animated } from 'react-native';
import { Fonts } from '../../utils/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';



export default class QandAScreen extends React.Component {
  
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
      <ScrollView
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [
                                { nativeEvent: { contentOffset: { y: this.scrollY } } }
                            ]
                        )}
                    >
      <Text style = {styles.textTopicQuestion}>
      ทุกคำถามโค้ชมีคำตอบ</Text>
      <View style = {{ flexDirection: 'row',
      alignItems: 'baseline',
      height: 45,
      margin: 3,
      marginHorizontal: 20,}}>
      <Icon name="search" style={{ paddingRight: 10,alignSelf:'center'}} size={25} color = '#2c3e50'/>
      <TextInput style = {styles.inputtextstyle}
      ></TextInput>
      </View>
      
      <LinearGradient colors={['#f70c5a', '#c60b49', '#910836']} style = {{marginTop: 10, justifyContent: 'center', height: 40, borderRadius: 10, marginHorizontal: 20,}}>
          <View style = {{flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-around'}}>
          <Text style={{alignSelf:'flex-start',color: '#fff'}}>ทำอย่างไรถึงมีความมั่นใจในตัวเองคะ</Text>
          <Icon name="caret-down" style={{ paddingRight: 10, alignSelf:'flex-end', marginBottom: 3}} size={15} color = '#fff' />
          </View>
        </LinearGradient>

        <LinearGradient colors={['#72d60e', '#488709', '#325e06']} style = {{marginTop: 5, justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginHorizontal: 20}}>
          <View style = {{alignSelf: 'flex-start', marginTop:10, marginLeft:20, marginBottom:10, marginRight:20}}>
          <Text style={{alignSelf:'flex-start',color: '#fff'}}>ต้องฝึกที่จะรักตัวเองก่อน หาสิ่งดีๆให้ รู้จักให้รางวัลกับตัวเอง และที่สำคัญหัดตั้งเป้าหมายไว้เอาแบบที่ง่ายๆก่อน ในชีวิตโค้ชเจอคนดูถูกมาเยอะแต่เรามีสิ่งหนึ่งคือความมั่นใจ และความมุ่งมั่นลึกๆที่ไม่รู้ตัว ต้องบอกตัวเองว่าต้องทำได้</Text>
          </View>
        </LinearGradient>

      </ScrollView>
      </View>
        );
      }
    }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    container: {
      flex : 1,
      backgroundColor: "#fff",
    },
    textTopicQuestion:{
      color: '#d60842',
      fontSize: 17,
      fontWeight:'bold',
      fontFamily: Fonts.Bitter,
      marginLeft: 20,
      marginTop: 20
    },
    inputtextstyle:{
      flex: 1,
      paddingLeft: 7,
      fontSize: 16,
      fontFamily: Fonts.Roboto_medium
    },
  });
