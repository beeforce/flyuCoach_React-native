import React from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions, ScrollView, Animated, } from 'react-native';
import { Fonts } from '../../utils/Fonts';
import ShowmoreIcon from '../styles/ShowmoreIcon';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(IcoMoonConfig);
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
   { id: "6", title: 'วันหยุดโค้ชฝ้ายชอบทำอะไรคะ',
   text: 'ต้องฝึกที่จะรักตัวเองก่อน หาสิ่งดีๆให้ รู้จักให้รางวัลกับตัวเอง และที่สำคัญหัดตั้งเป้าหมายไว้เอาแบบที่ง่ายๆก่อน ในชีวิตโค้ชเจอคนดูถูกมาเยอะแต่เรามีสิ่งหนึ่งคือความมั่นใจ และความมุ่งมั่นลึกๆที่ไม่รู้ตัว ต้องบอกตัวเองว่าต้องทำได้'},
   { id: "7", title: 'เที่ยงคืน เที่ยงวัน ใช้ AM/PM อย่างไรบ้างคะ',
   text: 'ต้องฝึกที่จะรักตัวเองก่อน หาสิ่งดีๆให้ รู้จักให้รางวัลกับตัวเอง และที่สำคัญหัดตั้งเป้าหมายไว้เอาแบบที่ง่ายๆก่อน ในชีวิตโค้ชเจอคนดูถูกมาเยอะแต่เรามีสิ่งหนึ่งคือความมั่นใจ และความมุ่งมั่นลึกๆที่ไม่รู้ตัว ต้องบอกตัวเองว่าต้องทำได้'},
  ]

export default class QandAScreen extends React.Component {
  
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
        isShown: false,
        question: '',
        array: ARTICLES,
    };
}

// searchQuestion () {
//   this.setState({array: []})
//   for(var i = 0; i < ARTICLES.length; i++)
// {
//   if(ARTICLES[i].id == '1')
//   {
//     this.state.array.push(ARTICLES[i]);
//   }
// }
// }

searchText = (e) => {
  console.log('ontextChange')
  console.log(e)
  let text = e.toLowerCase()
  let trucks = ARTICLES
  let filteredName = trucks.filter((item) => {
    return item.title.toLowerCase().match(text)
  })
  if (!text || text === '') {
    this.setState({
      array: ARTICLES
    })
  } else if (Array.isArray(filteredName)) {
    this.setState({
      noData: false,
      array: filteredName
    })
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
                        )}
                        style={{ flex: 1.8 }}
                    >
      <Text style = {styles.textTopicQuestion}>
      ทุกคำถาม-โค้ชมีคำตอบ</Text>
      <View style = {{ flexDirection: 'row',
      alignItems: 'baseline',
      height: 45,
      margin: 3,
      marginHorizontal: 25,}}>
      <Icon name="search" style={{ paddingRight: 10,alignSelf:'center', paddingTop:2}} size={22} color = '#2c3e50'/>
      <TextInput style = {styles.inputtextstyle}
                  onChangeText={(text) => this.searchText(text)}
      ></TextInput>
      </View>
       {this.state.array.map((item) => {
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
                      onPress={() => this.props.navigation.push('addQuestion',{ hideTabBar: true })}
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
      backgroundColor: "#f6f6f6",
    },
    textTopicQuestion:{
      color: '#d60842',
      fontSize: 20,
      fontFamily: Fonts.MosseThai_Extra_Bold,
      marginLeft: 25,
      marginTop: 25
    },
    inputtextstyle:{
      flex: 1,
      paddingLeft: 7,
      fontSize: 16,
      fontFamily: Fonts.MosseThai_Medium
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });
