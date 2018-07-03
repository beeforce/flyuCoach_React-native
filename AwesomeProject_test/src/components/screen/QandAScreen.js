import React from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions, ScrollView, Animated, } from 'react-native';
import { Fonts } from '../../utils/Fonts';
import ShowmoreIcon from '../styles/ShowmoreIcon';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';

const ARTICLES = [
  { id: "1", title: 'ทำอย่างไรถึงมีความมั่นใจในตัวเองคะ', 
  text: 'ต้องฝึกที่จะรักตัวเองก่อน หาสิ่งดีๆให้ รู้จักให้รางวัลกับตัวเอง และที่สำคัญหัดตั้งเป้าหมายไว้เอาแบบที่ง่ายๆก่อน ในชีวิตโค้ชเจอคนดูถูกมาเยอะแต่เรามีสิ่งหนึ่งคือความมั่นใจ และความมุ่งมั่นลึกๆที่ไม่รู้ตัว ต้องบอกตัวเองว่าต้องทำได้'},
  { id: "2",title: 'ไม่รู้ตัวเองว่าชอบอะไร ต้องทำอย่างไรดีคะ', 
  text: 'ต้องฝึกที่จะรักตัวเองก่อน หาสิ่งดีๆให้ รู้จักให้รางวัลกับตัวเอง และที่สำคัญหัดตั้งเป้าหมายไว้เอาแบบที่ง่ายๆก่อน ในชีวิตโค้ชเจอคนดูถูกมาเยอะแต่เรามีสิ่งหนึ่งคือความมั่นใจ และความมุ่งมั่นลึกๆที่ไม่รู้ตัว ต้องบอกตัวเองว่าต้องทำได้'},
  { id: "3",title: 'ขอเทคนิคจำคำศัพท์ใหม่ๆ หน่อยค่ะ', 
  text: 'ต้องฝึกที่จะรักตัวเองก่อน หาสิ่งดีๆให้ รู้จักให้รางวัลกับตัวเอง และที่สำคัญหัดตั้งเป้าหมายไว้เอาแบบที่ง่ายๆก่อน ในชีวิตโค้ชเจอคนดูถูกมาเยอะแต่เรามีสิ่งหนึ่งคือความมั่นใจ และความมุ่งมั่นลึกๆที่ไม่รู้ตัว ต้องบอกตัวเองว่าต้องทำได้'},
  { id: "4", title: 'พ่อแม่กดดันให้ลงเรียนหมอ อึกอัดใจมากค่ะ', 
  text: 'ต้องฝึกที่จะรักตัวเองก่อน หาสิ่งดีๆให้ รู้จักให้รางวัลกับตัวเอง และที่สำคัญหัดตั้งเป้าหมายไว้เอาแบบที่ง่ายๆก่อน ในชีวิตโค้ชเจอคนดูถูกมาเยอะแต่เรามีสิ่งหนึ่งคือความมั่นใจ และความมุ่งมั่นลึกๆที่ไม่รู้ตัว ต้องบอกตัวเองว่าต้องทำได้'},
  { id: "5", title: 'There is กับ Has/Have ใช้ต่างกันอย่างไรคะ',
   text: 'ต้องฝึกที่จะรักตัวเองก่อน หาสิ่งดีๆให้ รู้จักให้รางวัลกับตัวเอง และที่สำคัญหัดตั้งเป้าหมายไว้เอาแบบที่ง่ายๆก่อน ในชีวิตโค้ชเจอคนดูถูกมาเยอะแต่เรามีสิ่งหนึ่งคือความมั่นใจ และความมุ่งมั่นลึกๆที่ไม่รู้ตัว ต้องบอกตัวเองว่าต้องทำได้'},
   { id: "5", title: 'วันหยุดโค้ชฝ้ายชอบทำอะไรคะ',
   text: 'ต้องฝึกที่จะรักตัวเองก่อน หาสิ่งดีๆให้ รู้จักให้รางวัลกับตัวเอง และที่สำคัญหัดตั้งเป้าหมายไว้เอาแบบที่ง่ายๆก่อน ในชีวิตโค้ชเจอคนดูถูกมาเยอะแต่เรามีสิ่งหนึ่งคือความมั่นใจ และความมุ่งมั่นลึกๆที่ไม่รู้ตัว ต้องบอกตัวเองว่าต้องทำได้'},
   { id: "5", title: 'เที่ยงคืน เที่ยงวัน ใช้ AM/PM อย่างไรบ้างคะ',
   text: 'ต้องฝึกที่จะรักตัวเองก่อน หาสิ่งดีๆให้ รู้จักให้รางวัลกับตัวเอง และที่สำคัญหัดตั้งเป้าหมายไว้เอาแบบที่ง่ายๆก่อน ในชีวิตโค้ชเจอคนดูถูกมาเยอะแต่เรามีสิ่งหนึ่งคือความมั่นใจ และความมุ่งมั่นลึกๆที่ไม่รู้ตัว ต้องบอกตัวเองว่าต้องทำได้'},
  ]

export default class QandAScreen extends React.Component {
  
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
        isShown: false
    };
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
                        )}
                        style={{ flex: 1.8 }}
                    >
      <Text style = {styles.textTopicQuestion}>
      ทุกคำถามโค้ชมีคำตอบ</Text>
      <View style = {{ flexDirection: 'row',
      alignItems: 'baseline',
      height: 45,
      margin: 3,
      marginHorizontal: 25,}}>
      <Icon name="search" style={{ paddingRight: 10,alignSelf:'center'}} size={25} color = '#2c3e50'/>
      <TextInput style = {styles.inputtextstyle}
      ></TextInput>
      </View>
       {ARTICLES.map((item) => {
                          return (
                        <View key={item.id}>
                        <ShowmoreIcon
                        title = {item.title}
                        text = {item.text}
                        />
                        </View>
                          );
                        })}

      </ScrollView>
      <ActionButton buttonColor="rgb(102,191,13)"
                    style={{ flex: 0.2 }}
                    size = {45}
                    fixNativeFeedbackRadius = {true}
                    shadowStyle={{
                        shadowColor: "#000000",
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        shadowOffset: {
                          height: 1,
                          width: 0
                        }
                      }}
                      onPress={() => this.props.navigation.push('addQuestion')}
             />
      
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
      marginLeft: 25,
      marginTop: 25
    },
    inputtextstyle:{
      flex: 1,
      paddingLeft: 7,
      fontSize: 16,
      fontFamily: Fonts.Roboto_medium
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });
