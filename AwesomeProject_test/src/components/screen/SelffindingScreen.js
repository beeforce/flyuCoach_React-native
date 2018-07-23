import React, { Component } from 'react'
import { 
  Text, 
  StyleSheet, 
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  Image,
  TouchableHighlight,
 } from 'react-native'
import { Fonts } from '../../utils/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(IcoMoonConfig);
import * as Progress from 'react-native-progress';
const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const ARTICLES =  { id: "1",
  title: 'ค้นหา 1 ใน 12 ความสามารถลับ', 
  time: 10, 
  type: 'การพัฒนาตัวเอง',
  text1: 'แบบประเมินที่จะช่วยให้น้อง สามารถรับรู็ได้ถึงความสามารถลับที่อาจซ่อนอยู่ข้างใน เพื่อปลุกความรู้ถึงความสามารถนี้ น้องๆ จะต้องตอบคำถามที่ตรง หรือ ใกล้เคียงกับตัวเองมากที่สุด',
  text2: 'แบบประเมินนี้จะถูกแบ่งออกเป็น 3 ส่วน โดยส่วนที่ 1 จะประกอบไปด้วย ส่วนของอุปนิสัย ส่วนที่ 2 จะเป็นส่วนของ งานอดิเรก และส่วนสุดท้ายจะเป็นส่วนของการเรียนและวิชาที่ตัวเองชอบมากที่สุด',
  text3: 'ขอให้น้องๆ โชคดีกับการประเมิน เพื่อค้นหาความสามารถลับของตัวเอง และนำไปปรับใช้ในชีวิตประจำวัน รวมถึงการเตรียมความพร้อมเข้าสู่สายงานอาชีพของตัวเองให้ได้มากที่สุด',
  result: 'วิศวกร',
  resultText: 'ด้วยความสามารถในการคิดวิเคราะห์อย่างเป็นระบบ และการแสวงหาคำตอบอย่างเป็นเหตุผล ทำให้น้องโดดเด่นด้านการแก้ปัญหาทางวิทยาศาสตร์เป็นอย่างมาก'}

const QuestionList = [
  { id: "1", title: 'คุณมีความรู้สึกอยากอยู่คนเดียวมากกว่า การอยู่ร่วมกับคนอื่นเยอะๆ หรือไม่ ?', 
  type: 'yesorno'
  }
  ,{ id: "2", title: 'คุณมีความรู้สึกอยากอยู่คนเดียวมากกว่า การอยู่ร่วมกับคนอื่นเยอะๆ หรือไม่ ?',
  type:'multiple'}
  ,{ id: "3", title: 'คุณมีความรู้สึกอยากอยู่คนเดียวมากกว่า การอยู่ร่วมกับคนอื่นเยอะๆ หรือไม่ ?',
  type:'multiple'}
]

const QuestionList_length = QuestionList.length;


class LogoTitle extends React.Component {

  render() {
    return (
      <Text style = {{fontSize: 18,
        fontFamily: Fonts.MosseThai_Bold,
        color: '#000',
        textAlign: 'center', flex: 1,}}>{this.props.title}</Text>
    );
  }
}

export default class SelffindingScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
    headerTitle: <LogoTitle  title = {navigation.getParam('title', 'ข้อมูลแบบประเมิน')}/>,
    headerStyle: {backgroundColor: '#EEE', elevation: 0, shadowOpacity: 0},
    headerRight: (<View></View>)
  };
};

  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY()
    this.position2 = new Animated.ValueXY()
    this.state = {
                  mainView : true,
                  questionView: false,
                  currentIndex: 0,
                  finishView: false
                }
    
  } 

  renderTitleText(item,Everdone) {
    if (Everdone === false){
      return (
        <View style = {{flex:1}}>
        <View style = {styles.cardviewcontent}>
        <View style = {{alignItems: 'center',borderBottomWidth: 1, borderColor: '#c9c9c9'}}>
        <Text style = {styles.textTitle}>{item.title}</Text>
        <View style = {{flexDirection: 'row', alignItems: 'center', marginBottom: 10,}}>
        <View style = {{flexDirection: 'row', alignItems: 'baseline', paddingRight: 15}}>
        <Icon name="clock2" style={styles.icontype} size={11} color = '#485460'/>
        <Text style = {styles.texttime}>{item.time} นาที</Text>
        </View>
        <View style = {{flexDirection: 'row', alignItems: 'baseline'}}>
        <Icon name="tag" style={styles.icontype} size={11} color = '#485460'/>
        <Text style = {styles.texttime}>{item.type}</Text>
        </View>
        </View>
        </View>
        <View style = {{flex:1}}>
        <ScrollView
            scrollEventThrottle={5}
            onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollY } } }]
              )}  >
              <View style = {{paddingHorizontal: windowWidth *0.05, paddingTop: 15}}>
              <Text style = {styles.textDescription}>{item.text1}</Text>
              <Text style = {styles.textDescription}>{item.text2}</Text>
              <Text style = {styles.textDescription}>{item.text3}</Text>
              </View>
        </ScrollView>
        </View>
  
        </View>
        <View style = {{ flex: 0.18, marginTop: 10}}>
          <TouchableOpacity style={styles.submitButton} onPress={this.closeMainpage}>
            <LinearGradient colors={['#afe03e', '#368c0b']} style = {{flex: 1, borderRadius: 27,justifyContent: 'center'}}>
              <Text style={styles.submitTextstyle}>เริ่มต้น</Text>
            </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      );
    }else {
      return (
      <View style = {{flex:1}}>
        <View style = {styles.cardviewcontent}>
        <View style = {{alignItems: 'center',borderBottomWidth: 1, borderColor: '#c9c9c9'}}>
        <Text style = {styles.textTitle}>{item.title}</Text>
        <View style = {{flexDirection: 'row', alignItems: 'center', marginBottom: 10,}}>
        <View style = {{flexDirection: 'row', alignItems: 'baseline', paddingRight: 15}}>
        <Icon name="clock2" style={styles.icontype} size={11} color = '#485460'/>
        <Text style = {styles.texttime}>{item.time} นาที</Text>
        </View>
        <View style = {{flexDirection: 'row', alignItems: 'baseline'}}>
        <Icon name="tag" style={styles.icontype} size={11} color = '#485460'/>
        <Text style = {styles.texttime}>{item.type}</Text>
        </View>
        </View>
        </View>
        <View style = {{flex:1}}>
        <ScrollView
            scrollEventThrottle={5}
            onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollY } } }]
              )}  >
              <View style = {{paddingHorizontal: windowWidth *0.05, paddingTop: 15}}>
              <Text style = {styles.textDescription}>{item.text1}</Text>
              <Text style = {styles.textDescription}>{item.text2}</Text>
              <Text style = {styles.textDescription}>{item.text3}</Text>
              </View>
        </ScrollView>
        </View>
  
        </View>
        <View style = {{ flex: 0.18,}}>
          <TouchableOpacity style={styles.submitButton} onPress= {this.goFinishpageWithresult} >
            <LinearGradient colors={['#afe03e', '#368c0b']} style = {{flex: 1, borderRadius: 27,justifyContent: 'center'}}>
              <Text style={styles.submitTextstyle}>ดูผลลัพธ์ของตัวเอง</Text>
            </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style = {{ flex: 0.18,}}>
          <TouchableOpacity style={styles.submitButton} onPress={this.closeMainpage}>
            <LinearGradient colors={['#f7c042', '#f2892e','#f26304']} style = {{flex: 1, borderRadius: 27,justifyContent: 'center'}}>
              <Text style={styles.submitTextstyle}>ประเมินใหม่อีกครั้ง</Text>
            </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    
  }

  renderTitleTextFinish(item) {
    return (
      <View style = {{flex:1}}>
      <View style = {styles.cardviewcontent}>
      <View style = {{alignItems: 'center',borderBottomWidth: 1, borderColor: '#c9c9c9'}}>
      <Text style = {styles.textTitle}>{item.title}</Text>
      <View style = {{flexDirection: 'row', alignItems: 'center', marginBottom: 10,}}>
      <View style = {{flexDirection: 'row', alignItems: 'baseline', paddingRight: 15}}>
      <Icon name="clock2" style={styles.icontype} size={11} color = '#485460'/>
      <Text style = {styles.texttime}>{item.time} นาที</Text>
      </View>
      <View style = {{flexDirection: 'row', alignItems: 'baseline'}}>
      <Icon name="tag" style={styles.icontype} size={11} color = '#485460'/>
      <Text style = {styles.texttime}>{item.type}</Text>
      </View>
      </View>
      </View>
      <View style = {{flex:1,}}>
      <ScrollView
          scrollEventThrottle={5}
          onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.scrollY } } }]
            )}  >
            <View style = {{paddingTop: 25}}>
            <Text style = {styles.textTitle}>น้องเหมาะกับอาชีพ{"\n"}"{item.result}"</Text>
            <Text style = {[styles.textDescription,{paddingHorizontal: windowWidth *0.075}]}>{item.resultText}</Text>
            </View>
      </ScrollView>
      </View>

      </View>
      <View style = {{ flex: 0.18,}}>
        <TouchableOpacity style={styles.submitButton} onPress={() =>{
          this.props.navigation.goBack(null)
        }}>
          <LinearGradient colors={['#afe03e', '#368c0b']} style = {{flex: 1, borderRadius: 27,justifyContent: 'center'}}>
            <Text style={styles.submitTextstyle}>ย้อนกลับไปหน้าหลัก</Text>
          </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderArticles =() =>{
    return QuestionList.map((item, i) => {
        if (i < this.state.currentIndex) {
            return null
        }
        if (i == this.state.currentIndex) {
            if (item.type === 'yesorno'){
              return (
                <Animated.View key={item.id} style={this.position.getLayout()}>
                      <View style = {{flex: 1, position: 'absolute', 
                        height: SCREEN_HEIGHT * 0.67, 
                        width: SCREEN_WIDTH,}}>
                    <View style = {[styles.cardviewcontentQuestion,{ flex: 0.55, paddingHorizontal: windowWidth *0.1}]}>
                    <Text style = {styles.textTitleQuestion}>{item.title}</Text>
                    </View>
                    <TouchableHighlight style = {[styles.cardviewcontentQuestion,{flex:0.14,}]} underlayColor = 'transparent' onPress = {this.onPressAnswer}>
                    <Text style = {styles.textTitleQuestion}>ใช่</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style = {[styles.cardviewcontentQuestion,{flex:0.14,}]}  underlayColor = 'transparent' onPress = {this.onPressAnswer}>
                    <Text style = {styles.textTitleQuestion}>ไม่ใช่</Text>
                    </TouchableHighlight>
                    <View style = {{flex: 0.14}}></View>
                    </View>
                    </Animated.View>
                    )
            } else {
            return (
                <Animated.View key={item.id} style={this.position.getLayout()}>
                    <View style = {{flex: 1, position: 'absolute', 
                        height: SCREEN_HEIGHT * 0.67, 
                        width: SCREEN_WIDTH,}}>
                    <View style = {[styles.cardviewcontentQuestion,{ flex: 0.55, paddingHorizontal: windowWidth *0.1}]}>
                    <Text style = {styles.textTitleQuestion}>{item.title}</Text>
                    </View>
                    <View style = {{flex:0.14, flexDirection: 'row',  marginHorizontal: windowWidth * 0.05,}}>
                    <TouchableHighlight style = {[styles.cardviewcontentQuestionmultichoice,{flex:1, marginRight: 3}]} underlayColor = 'transparent' onPress = {this.onPressAnswer}>
                    <Text style = {styles.textanswermultichoice}>1.ไม่จริงที่สุด</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style = {[styles.cardviewcontentQuestionmultichoice,{flex:1, marginLeft: 3}]} underlayColor = 'transparent' onPress = {this.onPressAnswer}>
                    <Text style = {styles.textanswermultichoice}>2.ค่อนข้างไม่จริง</Text>
                    </TouchableHighlight>
                    </View>
                    <View style = {{flex:0.14, flexDirection: 'row',  marginHorizontal: windowWidth * 0.05,}}>
                    <TouchableHighlight style = {[styles.cardviewcontentQuestionmultichoice,{flex:1, marginRight: 3}]} underlayColor = 'transparent' onPress = {this.onPressAnswer}>
                    <Text style = {styles.textanswermultichoice}>3.เฉยๆ</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style = {[styles.cardviewcontentQuestionmultichoice,{flex:1, marginLeft: 3}]} underlayColor = 'transparent' onPress = {this.onPressAnswer}>
                    <Text style = {styles.textanswermultichoice}>4.ค่อนข้างจริง</Text>
                    </TouchableHighlight>
                    </View>
                    <TouchableHighlight style = {[styles.cardviewcontentQuestion,{flex:0.14,}]}  underlayColor = 'transparent' onPress = {this.onPressAnswer}>
                    <Text style = {styles.textanswermultichoice}>5.จริงที่สุด</Text>
                    </TouchableHighlight>
                    </View>
                </Animated.View>
            )
        }
      }
    }).reverse()
  }

  closeMainpage = () =>{
    this.props.navigation.setParams({ title: 'ข้อที่ 1' })
    this.props.navigation.setParams({ hideTabBar: true })
    this.setState({
      mainView: false,
      questionView: true
    })
  }

  onPressAnswer = () =>{
    if (this.state.currentIndex < QuestionList.length - 1){
      Animated.timing(this.position, {
      toValue: ({ x: -SCREEN_WIDTH, y: 0 }),
      duration: 150,
  }).start(
      this.goNextpage
  )
  }else{
    Animated.timing(this.position, {
      toValue: ({ x: -SCREEN_WIDTH, y: 0 }),
      duration: 150,
  }).start(
      this.goFinishpage
  )
  }
  }
  goNextpage = () =>{
    this.setState({ currentIndex: this.state.currentIndex + 1 })
    this.position.setValue({ x: SCREEN_WIDTH, y: 0 })
    Animated.timing(this.position, {
        toValue: ({ x: 0, y: 0 }),
        duration: 150
    }).start(() => {
        this.position.setValue({ x: 0, y: 0 })
        const {currentIndex} = this.state;
        const index = currentIndex+1;
        this.props.navigation.setParams({ title: 'ข้อที่ '+index })
    })
  }

  goFinishpage = () =>{
        this.props.navigation.setParams({ title: 'ผลการประเมิน'})
        this.props.navigation.setParams({ hideTabBar: false })
        this.setState({
          questionView: false,
          finishView: true
        })
  }

  goFinishpageWithresult = () =>{
    this.props.navigation.setParams({ title: 'ผลการประเมิน'})
    this.props.navigation.setParams({ hideTabBar: false })
    this.setState({
      mainView: false,
      finishView: true
    })
}

  renderProgressBar(){
    return(
    <View style = {{ flex: 0.18, marginTop: 15}}>
    <View style = {{flexDirection: 'row', alignItems:'center', alignSelf:'center', paddingBottom:3}}>
        <Text style = {{fontSize: 14, fontFamily: Fonts.MosseThai_Bold, color: '#4cd137'}}>{this.state.currentIndex + 1 }/</Text>
        <Text style = {{fontSize: 14, fontFamily: Fonts.MosseThai_Bold}}>{QuestionList_length} Steps</Text>
        </View>
        <Progress.Bar progress={(this.state.currentIndex + 1)/ QuestionList_length}
        width={windowWidth*0.6} height={15}
        borderWidth = {0}
        style = {{alignSelf: 'center', borderRadius: 15, backgroundColor: '#3e9e16',}}
        color = "rgb(115, 214, 40)"/>
        <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: windowWidth * 0.05}}>
        <TouchableOpacity>
        <Image source={require('../../images/icon_arrow_left.png')} resizeMode={'contain'} style={{ height: 25, width: 25, padding:15 }} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Image source={require('../../images/icon_arrow_right.png')} resizeMode={'contain'} style={{ height: 25, width: 25, padding: 15}} />
        </TouchableOpacity>
        </View>
      </View>
    )
  }


  
  render() {
    const { navigation } = this.props;
    const Everdone = navigation.getParam('Everdone', 'done');
    return (
      <View style = {styles.container}>
      <View style = {{flex:1}}>
        { this.state.mainView ? this.renderTitleText(ARTICLES,Everdone) : null}
        { this.state.questionView ? <View style = {{flex:1, marginBottom: 20}}>
                                    <View style = {{flex:1}}>
                                    {this.renderArticles()}
                                    </View>
                                    {this.renderProgressBar()}
                                    </View>
               : null}
        { this.state.finishView ? this.renderTitleTextFinish(ARTICLES) : null}
      </View>
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
    flex: 1, 
    overflow: 'hidden',
    marginBottom: 10, 
    shadowColor: '#000000', 
    shadowOpacity : 0.24, 
    shadowRadius: 5, 
    backgroundColor: '#ffffff', 
    borderRadius: 10, 
    shadowOffset: {width: 10, height: 10},
    elevation: 4,
    marginHorizontal: windowWidth * 0.1,
  },
  cardviewcontentQuestion:{
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
  cardviewcontentQuestionmultichoice:{
    overflow: 'hidden',
    marginBottom: 5, 
    shadowColor: '#000000', 
    shadowOpacity : 0.24, 
    shadowRadius: 5, 
    backgroundColor: '#ffffff', 
    borderRadius: 2, 
    shadowOffset: {width: 10, height: 10},
    elevation: 4,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  submitButton:{
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
  textTitle:{ 
    fontSize: 18, 
    fontFamily: Fonts.MosseThai_Bold, 
    paddingTop: 15,
    paddingBottom: 15,
    color: '#1e272e',
    lineHeight: 25,
    textAlign: 'center',
    paddingHorizontal: windowWidth*0.18
  },
  texttime:{
    fontSize: 9, 
    color: '#485460', 
    fontFamily: Fonts.MosseThai_Medium,
  },
  icontype:{ 
    padding: 3,
    alignSelf:'center'
  },
  textDescription:{
    fontSize: 15, 
    color: '#485460', 
    fontFamily: Fonts.MosseThai_Medium,
    textAlign: 'center',
    marginBottom: 15
  },
  textTitleQuestion:{ 
    fontSize: 18, 
    fontFamily: Fonts.MosseThai_Bold, 
    color: '#1e272e',
    lineHeight: 25,
    textAlign: 'center',
  },
  textanswermultichoice:{ 
    fontSize: 14, 
    fontFamily: Fonts.MosseThai_Bold, 
    color: '#1e272e',
    lineHeight: 25,
    textAlign: 'center',
  },
})
