import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Animated,
    PanResponder,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    Modal
} from "react-native";
import * as Progress from 'react-native-progress';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(IcoMoonConfig);
import { Fonts } from '../../utils/Fonts';

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

var currentIndex = 0;

const ARTICLES = [
    { id: "1", uri: require('../../images/image.jpg'), date: '1/06/2561 18:30',
     text: 'วันนี้มีการสอน Live สด เกี่ยวกับการเดาคำศัพท์ ที่เราไม่รู้ ติดตามดู Live ได้ตามช่องทางข้างล่างเลยจ้า ตอน 21:30 ห้ามพลาดนะจ๊ะ !'},
    { id: "2", uri: require('../../images/image.jpg'), date: '1/06/2561 18:30',
     text: 'วันนี้มีการสอน Live สด เกี่ยวกับการเดาคำศัพท์ ที่เราไม่รู้ ติดตามดู Live ได้ตามช่องทางข้างล่างเลยจ้า ตอน 21:30 ห้ามพลาดนะจ๊ะ !'},
    { id: "3", uri: require('../../images/image.jpg'), date: '1/06/2561 18:30',
     text: 'วันนี้มีการสอน Live สด เกี่ยวกับการเดาคำศัพท์ ที่เราไม่รู้ ติดตามดู Live ได้ตามช่องทางข้างล่างเลยจ้า ตอน 21:30 ห้ามพลาดนะจ๊ะ !'},
    { id: "4", uri: require('../../images/image.jpg'), date: '1/06/2561 18:30',
     text: 'It plays a very important part in learning any language. Effective listening ensures understanding and it helps improve accuracy when speaking '},
    { id: "5", uri: require('../../images/image.jpg'), date: '1/06/2561 18:30',
     text: 'วันนี้มีการสอน Live สด เกี่ยวกับการเดาคำศัพท์ ที่เราไม่รู้ ติดตามดู Live ได้ตามช่องทางข้างล่างเลยจ้า ตอน 21:30 ห้ามพลาดนะจ๊ะ !'},
    { id: "6", uri: require('../../images/image.jpg'), date: '1/06/2561 18:30',
     text: 'วันนี้มีการสอน Live สด เกี่ยวกับการเดาคำศัพท์ ที่เราไม่รู้ ติดตามดู Live ได้ตามช่องทางข้างล่างเลยจ้า ตอน 21:30 ห้ามพลาดนะจ๊ะ !'},
    { id: "7", uri: require('../../images/image.jpg'), date: '1/06/2561 18:30',
     text: 'วันนี้มีการสอน Live สด เกี่ยวกับการเดาคำศัพท์ ที่เราไม่รู้ ติดตามดู Live ได้ตามช่องทางข้างล่างเลยจ้า ตอน 21:30 ห้ามพลาดนะจ๊ะ !'},
     { id: "8", uri: require('../../images/image.jpg'), date: '1/06/2561 18:30',
     text: 'วันนี้มีการสอน Live สด เกี่ยวกับการเดาคำศัพท์ ที่เราไม่รู้ ติดตามดู Live ได้ตามช่องทางข้างล่างเลยจ้า ตอน 21:30 ห้ามพลาดนะจ๊ะ !'},
     { id: "9", uri: require('../../images/image.jpg'), date: '1/06/2561 18:30',
     text: 'It plays a very important part in learning any language. Effective listening ensures understanding and it helps improve accuracy when speaking '},
    { id: "10", uri: require('../../images/image.jpg'), date: '1/06/2561 18:30',
     text: 'วันนี้มีการสอน Live สด เกี่ยวกับการเดาคำศัพท์ ที่เราไม่รู้ ติดตามดู Live ได้ตามช่องทางข้างล่างเลยจ้า ตอน 21:30 ห้ามพลาดนะจ๊ะ !'},
    { id: "11", uri: require('../../images/image.jpg'), date: '1/06/2561 18:30',
     text: 'วันนี้มีการสอน Live สด เกี่ยวกับการเดาคำศัพท์ ที่เราไม่รู้ ติดตามดู Live ได้ตามช่องทางข้างล่างเลยจ้า ตอน 21:30 ห้ามพลาดนะจ๊ะ !'},
    { id: "12", uri: require('../../images/image.jpg'), date: '1/06/2561 18:30',
     text: 'วันนี้มีการสอน Live สด เกี่ยวกับการเดาคำศัพท์ ที่เราไม่รู้ ติดตามดู Live ได้ตามช่องทางข้างล่างเลยจ้า ตอน 21:30 ห้ามพลาดนะจ๊ะ !'},
  ]

const ARTICLES_length = ARTICLES.length;

class CardSwipe extends Component {

    constructor(props) {
        super(props)

        this.remainindex = currentIndex - ARTICLES_length;
        this.lastCountindex = ARTICLES_length % 4;
        this.position = new Animated.ValueXY()
        this.position2 = new Animated.ValueXY({ x: 0 , y: 10})
        this.position3 = new Animated.ValueXY({ x: 0 , y: 20})
        this.position4 = new Animated.ValueXY({ x: 0 , y: 30})
        this.swipedCardPosition = new Animated.ValueXY({ x: 0, y: -SCREEN_HEIGHT })
        this.state = {
            currentIndex: 0,
            disablerollBack: true,
            disableButtonwhensetState: false,
        }

    }

    componentWillMount() {

        this.PanResponder = PanResponder.create({

            onStartShouldSetPanResponder: (e, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {

                if (gestureState.dy > 0 && (this.state.currentIndex > 0)) {
                    this.swipedCardPosition.setValue({
                        x: 0, y: -SCREEN_HEIGHT
                    })
                }
                else {

                    this.position.setValue({ y: gestureState.dy })

                }
            },
            onPanResponderRelease: (evt, gestureState) => {

                if (this.state.currentIndex > 0 && gestureState.dy > 50 && gestureState.vy > 0) {
                    if (this.state.currentIndex === ARTICLES_length-1){
                        this.setState({
                            disablerollBack: true
                            })
                    }
                    if(this.state.currentIndex % 4 === 0){
                        this.remainindex = -1;
                    }else{
                        this.remainindex--;
                    }
                    Animated.timing(this.swipedCardPosition, {
                        toValue: ({ x: 0, y: 0 }),
                        duration: 200
                    }).start(() => {

                        this.setState({ currentIndex: this.state.currentIndex - 1 })
                        this.swipedCardPosition.setValue({ x: 0, y: -SCREEN_HEIGHT })

                    })
                }
                else if (-gestureState.dy > 150 && -gestureState.vy > 0 && this.state.currentIndex < ARTICLES.length - 1) {

                    Animated.timing(this.position, {
                        toValue: ({ x: 0, y: -SCREEN_HEIGHT }),
                        duration: 200,
                      }).start(this.goNextpage)
              }
                else {
                    Animated.parallel([
                        Animated.spring(this.position, {
                            toValue: ({ x: 0, y: 0 })
                        }),
                        Animated.spring(this.swipedCardPosition, {
                            toValue: ({ x: 0, y: -SCREEN_HEIGHT })
                        })

                    ]).start()

                }
            }
        })

    }
    renderArticles = () => {

        return ARTICLES.map((item, i) => {
            if(this.remainindex <= -4){
                this.remainindex = -4;
                if (i == this.state.currentIndex - 1) {

                    return (
                        <Animated.View key={item.id} style={this.swipedCardPosition.getLayout()}
                            {...this.PanResponder.panHandlers}
                        >
                            <View style={styles.card3}>
    
                             {this.renderCard(ARTICLES[i])}
                                
                            </View>
                        </Animated.View>
                    )
                }
                else if (i < this.state.currentIndex) {
                    return null
                }
                if (i == this.state.currentIndex) {
    
                    return (
    
                        <Animated.View key={item.id} style={this.position.getLayout()}
                            {...this.PanResponder.panHandlers}
                        >
                             <View style={styles.card1}>
    
                               {this.renderCard(ARTICLES[i])}
    
                            </View>
                        </Animated.View>
                    )
                }
                if (i == this.state.currentIndex+1) {
    
                    return (
                        <Animated.View key={item.id}
                        style={this.position2.getLayout()}
    
                        >
                             <View style={styles.card2}>
    
                             {this.renderCard(ARTICLES[i])}
                            </View>
                        </Animated.View>
                    )
                }
    
                if (i == this.state.currentIndex+2) {
    
                    return (
                        <Animated.View key={item.id}
                         style={this.position3.getLayout()}
                        >
                             <View style={styles.card4}>
                             {this.renderCard(ARTICLES[i])}
                            </View>
                        </Animated.View>
                    )
                }
    
                if (i == this.state.currentIndex+3) {
    
                    return (
                        <Animated.View key={item.id}
                        style={this.position4.getLayout()}
                        >
                             <View style={styles.card5}>
    
                             {this.renderCard(ARTICLES[i])}
                            </View>
                        </Animated.View>
                    )
                }
            

            }
            else if (this.remainindex === -3){
                if (i == this.state.currentIndex - 1) {

                    return (
                        <Animated.View key={item.id} style={this.swipedCardPosition.getLayout()}
                            {...this.PanResponder.panHandlers}
                        >
                            <View style={styles.card3}>
    
                             {this.renderCard(ARTICLES[i])}
                                
                            </View>
                        </Animated.View>
                    )
                }
                else if (i < this.state.currentIndex) {
                    return null
                }
                if (i == this.state.currentIndex) {
    
                    return (
    
                        <Animated.View key={item.id} style={this.position.getLayout()}
                            {...this.PanResponder.panHandlers}
                        >
                             <View style={styles.card1}>
    
                               {this.renderCard(ARTICLES[i])}
    
                            </View>
                        </Animated.View>
                    )
                }
                if (i == this.state.currentIndex+1) {
    
                    return (
                        <Animated.View key={item.id}
                        style={this.position2.getLayout()}
    
                        >
                             <View style={styles.card2}>
    
                             {this.renderCard(ARTICLES[i])}
                            </View>
                        </Animated.View>
                    )
                }
    
                if (i == this.state.currentIndex+2) {
    
                    return (
                        <Animated.View key={item.id}
                         style={this.position3.getLayout()}
                        >
                             <View style={styles.card4}>
                             {this.renderCard(ARTICLES[i])}
                            </View>
                        </Animated.View>
                    )
                }
            }
            else if (this.remainindex === -2){
                if (i == this.state.currentIndex - 1) {

                    return (
                        <Animated.View key={item.id} style={this.swipedCardPosition.getLayout()}
                            {...this.PanResponder.panHandlers}
                        >
                            <View style={styles.card3}>
    
                             {this.renderCard(ARTICLES[i])}
                                
                            </View>
                        </Animated.View>
                    )
                }
                else if (i < this.state.currentIndex) {
                    return null
                }
                if (i == this.state.currentIndex) {
    
                    return (
    
                        <Animated.View key={item.id} style={this.position.getLayout()}
                            {...this.PanResponder.panHandlers}
                        >
                             <View style={styles.card1}>
    
                               {this.renderCard(ARTICLES[i])}
    
                            </View>
                        </Animated.View>
                    )
                }
                if (i == this.state.currentIndex+1) {
    
                    return (
                        <Animated.View key={item.id}
                        style={this.position2.getLayout()}
    
                        >
                             <View style={styles.card2}>
    
                             {this.renderCard(ARTICLES[i])}
                            </View>
                        </Animated.View>
                    )
                }
            }
            else if (this.remainindex === -2){
                if (i == this.state.currentIndex - 1) {

                    return (
                        <Animated.View key={item.id} style={this.swipedCardPosition.getLayout()}
                            {...this.PanResponder.panHandlers}
                        >
                            <View style={styles.card3}>
    
                             {this.renderCard(ARTICLES[i])}
                                
                            </View>
                        </Animated.View>
                    )
                }
                else if (i < this.state.currentIndex) {
                    return null
                }
                if (i == this.state.currentIndex) {
    
                    return (
    
                        <Animated.View key={item.id} style={this.position.getLayout()}
                            {...this.PanResponder.panHandlers}
                        >
                             <View style={styles.card1}>
    
                               {this.renderCard(ARTICLES[i])}
    
                            </View>
                        </Animated.View>
                    )
                }
            }
            else if (this.remainindex === -1){
                if (i == this.state.currentIndex - 1) {

                    return (
                        <Animated.View key={item.id} style={this.swipedCardPosition.getLayout()}
                            {...this.PanResponder.panHandlers}
                        >
                            <View style={styles.card3}>
    
                             {this.renderCard(ARTICLES[i])}
                                
                            </View>
                        </Animated.View>
                    )
                }
                else if (i < this.state.currentIndex) {
                    return null
                }
                if (i == this.state.currentIndex) {
    
                    return (
    
                        <Animated.View key={item.id} style={this.position.getLayout()}
                            {...this.PanResponder.panHandlers}
                        >
                             <View style={styles.card1}>
    
                               {this.renderCard(ARTICLES[i])}
    
                            </View>
                        </Animated.View>
                    )
                }
            }
            // else {

            //     return (
            //         <Animated.View key={item.id}

            //         >
            //              <View style={styles.card2}>

            //              {this.renderCard(ARTICLES[i])}
            //             </View>
            //         </Animated.View>
            //     )

            // }
        }).reverse()

    }

    renderCard = (item) =>{
        return (
        <View>
        <View style = {{ flexDirection: 'row', paddingTop: 10, justifyContent: 'space-between', paddingHorizontal: SCREEN_WIDTH * 0.015}}>
        <View style = {{ flexDirection: 'row', alignItems: 'baseline', alignSelf: 'flex-start' }}>  
        <Icon name="clock2" style={{ padding:5, alignSelf:'center'}} size={11} color = '#434343'/>
        <Text style = {{ color:'#434343', fontSize: 11, alignSelf:'center',fontFamily: Fonts.MosseThai_Medium,}}>{item.date}</Text>
        </View>
        </View>
        <Text style = {{paddingHorizontal: SCREEN_WIDTH * 0.04 ,fontSize: 20, color: '#484848', fontFamily: Fonts.MosseThai_Medium, paddingTop: 5, paddingBottom:15, lineHeight: 30}}>{item.text}</Text>
        {/* <Image source={item.uri} resizeMode={'stretch'} style={{paddingHorizontal: 20, height: SCREEN_WIDTH* 0.45, width: SCREEN_WIDTH* 0.75, justifyContent:'center', alignSelf: 'center', marginTop: 7}}>
        </Image> */}
        </View>
        );

    }

    swipeBackTofirst = () =>{
        if (this.state.currentIndex > 0){
            this.remainindex = -4;
            Animated.timing(this.position, {
                toValue: ({ x: 0, y: -SCREEN_HEIGHT }),
                duration: 400
                }).start(() => {
                this.setState({ currentIndex: 0,
                                disablerollBack: true })
                this.position.setValue({ x: 0, y: 0 })
                 })
                }
      
      }

      renderTextGobacktoFirstcard() {
          if (!this.state.disablerollBack){
          return(
            <TouchableOpacity onPress = {this.swipeBackTofirst} disabled={this.state.disablerollBack}>
            <Text style = {{fontSize: 15, fontFamily: Fonts.MosseThai_Bold, color:'#000', paddingTop:3}}>ย้อนกลับไปอ่านใหม่</Text>
            </TouchableOpacity>
            );
        }else{
            return null;
        }
      }

      goNextpage = () =>{
        this.remainindex++;
        if (this.remainindex === 0){
            this.remainindex = this.state.currentIndex - ARTICLES_length-1;
        }
        this.setState({ currentIndex: this.state.currentIndex + 1,
                        disableButtonwhensetState: false })
        if (this.state.currentIndex + 1 === ARTICLES_length){
        this.setState({
            disablerollBack: false
            })
      }
      this.position.setValue({ x: 0, y: 25 })
      Animated.spring(this.position, {
        toValue: ({ x: 0, y: 0 }),
        friction: 15,
        tension: 100,
      }).start(() => {
        this.position.setValue({ x: 0, y: 0 })
      })
    }

    goPreviouspage = () =>{

    }

    render() {
        return (
            <View style={styles.container}>
            <View style ={{ paddingTop:15, backgroundColor: '#f6f6f6'}}>
                <TouchableHighlight style = {{alignSelf: 'flex-start'}} onPress ={this.props._onCloseModal} underlayColor = 'transparent'>
                <Icon name="times" style={{ padding:5, alignSelf:'center'}} size={23} color = '#000'/>
                </TouchableHighlight>
                </View>
                <View style = {{flexDirection: 'row', alignItems: 'baseline',justifyContent: 'space-between', paddingHorizontal: SCREEN_WIDTH * 0.025}}>
                <View style = {{flexDirection: 'row',alignItems: 'baseline', alignSelf: 'center'}}>
                <View 
                style={{ backgroundColor: '#f5a623' ,justifyContent: 'center', width:SCREEN_WIDTH* 0.08, height:SCREEN_WIDTH* 0.08, borderRadius: (SCREEN_WIDTH* 0.08 + SCREEN_WIDTH* 0.08)/2}}>
                <Icon name="bullhorn-solid" style={{ alignSelf:'center',}} size={11} color = '#fff'/>
                </View>
                <Text style = {{paddingLeft: 7, color:'#f5a623', fontSize: 16, alignSelf:'center', justifyContent:'center', fontFamily: Fonts.MosseThai_Medium}}>Announcement</Text>
                </View>
                {this.renderTextGobacktoFirstcard()}
                </View>
            <View style = {{flex:3, paddingTop: 10}}>
            {this.renderArticles()}
            </View>
            <View style = {{flexDirection: 'row', alignItems:'center', alignSelf:'center', paddingBottom:3}}>
                <Text style = {{fontSize: 12, fontFamily: Fonts.MosseThai_Bold, color: '#417505'}}>{this.state.currentIndex + 1 }</Text>
                <Text style = {{fontSize: 12, fontFamily: Fonts.MosseThai_Bold}}>/{ARTICLES_length} Cards</Text>
                </View>
                <Progress.Bar progress={(this.state.currentIndex + 1)/ ARTICLES_length} 
                width={SCREEN_WIDTH*0.6} height={15}
                borderWidth = {0}
                style = {{alignSelf: 'center', borderRadius: 15, backgroundColor: '#264303',}}
                color = 'rgb(126,211,33)'/>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={ () =>{
                if (this.state.currentIndex === ARTICLES_length-1){
                    this.setState({
                        disablerollBack: true
                        })
                }
                if (this.state.currentIndex > 0){
                    if(this.state.currentIndex % 4 === 0){
                        this.remainindex = -1;
                    }else{
                        this.remainindex--;
                    }
                Animated.timing(this.swipedCardPosition, {
                toValue: ({ x: 0, y: 0 }),
                duration: 150
                }).start(() => {
                this.setState({ currentIndex: this.state.currentIndex - 1 })
                this.swipedCardPosition.setValue({ x: 0, y: -SCREEN_HEIGHT })
                        })
                    }
                }}>
                <Image source={require('../../images/icon_arrow_left.png')} resizeMode={'contain'} style={{ height: 25, width: 25, padding:15 }} />
                </TouchableOpacity>
                { this.state.disableButtonwhensetState === false ? <TouchableOpacity disabled = {this.state.disableButtonwhensetState} onPress={()=>{
                if (this.state.currentIndex < ARTICLES.length - 1){
                    this.setState({
                        disableButtonwhensetState: true
                    })
                    Animated.timing(this.position, {
                    toValue: ({ x: 0, y: -SCREEN_HEIGHT }),
                    duration: 200,
                  }).start(this.goNextpage)
                }
                }}>
                <Image source={require('../../images/icon_arrow_right.png')} resizeMode={'contain'} style={{ height: 25, width: 25, padding: 15}} />
                </TouchableOpacity> : null}
                </View>
           
            </View>
        );
    }
}
export default CardSwipe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SCREEN_WIDTH * 0.05,
        paddingBottom: SCREEN_HEIGHT * 0.05,
        backgroundColor: '#f6f6f6'
    },
    card1: { 
        flex: 1,
        position: 'absolute', 
        height: SCREEN_HEIGHT * 0.6, 
        width: SCREEN_WIDTH * 0.85,
        paddingHorizontal: SCREEN_WIDTH * 0.01, 
        backgroundColor: 'white', 
        shadowOffset: {width: 4, height: 4},
        alignSelf: 'center',
        shadowColor: '#000000', 
        shadowOpacity : 0.24,
        shadowRadius: 3, 
        elevation: 3.15, 
    },
    card2: {
        position: 'absolute', 
        height: SCREEN_HEIGHT * 0.6, 
        width: SCREEN_WIDTH * 0.81, 
        paddingHorizontal: 20,
        backgroundColor: 'white', 
        paddingHorizontal: SCREEN_WIDTH * 0.01, 
        // marginTop: 10,
        shadowOffset: {width: 4, height: 4},
        alignSelf: 'center',
        shadowRadius: 3, 
        shadowColor: '#000000', 
        shadowOpacity: 0.24,
        elevation: 3.1
    },
    card4: {
        position: 'absolute', 
        height: SCREEN_HEIGHT * 0.6, 
        width: SCREEN_WIDTH * 0.77, 
        paddingHorizontal: 20,
        backgroundColor: 'white', 
        paddingHorizontal: SCREEN_WIDTH * 0.01, 
        // marginTop: 20,
        alignSelf: 'center',
        shadowOffset: {width: 4, height: 4},
        shadowRadius: 3, 
        shadowColor: '#000000', 
        shadowOpacity: 0.24,
        elevation: 3.05, 
    },
    card5: {
        position: 'absolute', 
        height: SCREEN_HEIGHT * 0.6, 
        width: SCREEN_WIDTH * 0.73, 
        paddingHorizontal: 20,
        backgroundColor: 'white', 
        paddingHorizontal: SCREEN_WIDTH * 0.01, 
        alignSelf: 'center',
        shadowOffset: {width: 4, height: 4},
        shadowColor: 'black',
        shadowOpacity: 2.4,
        elevation: 3, 
    },
    card3: {
        flex: 1,
        position: 'absolute', 
        height: SCREEN_HEIGHT * 0.6, 
        width: SCREEN_WIDTH * 0.85, 
        paddingHorizontal: 20,
        backgroundColor: 'white', 
        paddingHorizontal: SCREEN_WIDTH * 0.01, 
        alignSelf: 'center',
        shadowOffset: {width: 4, height: 4},
        shadowColor: '#000000', 
        shadowOpacity : 0.24, 
        shadowRadius: 3, 
        elevation: 3.15, 
    }
});