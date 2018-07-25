import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage,
  View,
  SafeAreaView,
  Animated,
  Dimensions,
  ImageBackground,
  FlatList,
  Modal,
} from 'react-native';
import * as firebase from 'firebase';
import Swiper from 'react-native-swiper';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../../selection.json';
import PinIconImage from '../styles/piniconimage';
const Icon = createIconSetFromIcoMoon(IcoMoonConfig);
import { Fonts } from '../../utils/Fonts';
import CardSwipe from '../styles/cardSwipe';

const ARTICLES = [
  { id: "1", uri: require('../../images/image.jpg'), 
  title: 'How to improve your english skill immediately', text: 'It plays a very important part in learning any language. Effective listening ensures understanding and it helps improve accuracy when speaking , among other things. How can you improve your listening skills? By listening actively, i.e. paying attention not only on what is said, but also how it is said. So, listen'},
  { id: "2", uri: require('../../images/image.jpg'),
   title: 'How to improve your english skill immediately', text: 'It plays a very important part in learning any language. Effective listening ensures understanding and it helps improve accuracy when speaking , among other things. How can you improve your listening skills? By listening actively, i.e. paying attention not only on what is said, but also how it is said. So, listen'},
  { id: "3", uri: require('../../images/image.jpg'),
   title: 'How to improve your english skill immediately', text: 'It plays a very important part in learning any language. Effective listening ensures understanding and it helps improve accuracy when speaking , among other things. How can you improve your listening skills? By listening actively, i.e. paying attention not only on what is said, but also how it is said. So, listen'},
  { id: "4", uri: require('../../images/image.jpg'),
   title: 'How to improve your english skill immediately', text: 'It plays a very important part in learning any language. Effective listening ensures understanding and it helps improve accuracy when speaking , among other things. How can you improve your listening skills? By listening actively, i.e. paying attention not only on what is said, but also how it is said. So, listen'},
  { id: "5", uri: require('../../images/image.jpg'),
   title: 'How to improve your english skill immediately', text: 'It plays a very important part in learning any language. Effective listening ensures understanding and it helps improve accuracy when speaking , among other things. How can you improve your listening skills? By listening actively, i.e. paying attention not only on what is said, but also how it is said. So, listen'},
]
const dataFeature = [
  {key: "LF1x9J1amxF8hrGCybP", uri: 'https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2Fimage.jpg?alt=media&token=cd0cb423-ecc4-4966-98d4-55cdeb3ef24f', title: 'Get up to speed on Endlish for Work', date: '11/6/61 9.00'},
  {key: "LF1xJEirM6RZ3pRehqM", uri: 'https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2Fimage.jpg?alt=media&token=cd0cb423-ecc4-4966-98d4-55cdeb3ef24f', title: 'Speaking for fun!', date: '11/6/61 9.00'},
  {key: "LF1xNs6BA8Ozcu8akq2", uri: 'https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2Fimage.jpg?alt=media&token=cd0cb423-ecc4-4966-98d4-55cdeb3ef24f', title: 'Get up to speed on Endlish for Work', date: '11/6/61 9.00'},
  {key: "LF1xRnmrO-qTkr6nto2", uri: 'https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2Fimage.jpg?alt=media&token=cd0cb423-ecc4-4966-98d4-55cdeb3ef24f', title: 'Speaking for fun!', date: '11/6/61 9.00'},
  {key: "LF1xWOcIQXNOopR341D", uri: 'https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2Fimage.jpg?alt=media&token=cd0cb423-ecc4-4966-98d4-55cdeb3ef24f', title: 'Speaking for fun!', date: '11/6/61 9.00'},
]

const dataTips = [
  {id: "1", uri: require('../../images/icon_annou.png'), type: 'Announcement',
  title: 'Get up to speed on Endlish for Work', date: '11/6/61 9.00'},
  {id: "2", uri: require('../../images/icon_doc.png'), type: 'Document',
  title: 'Speaking for fun!', date: '11/6/61 9.00'},
  {id: "3", uri: require('../../images/icon_pen.png'), type: 'English',
  title: 'Get up to speed on Endlish for Work', date: '11/6/61 9.00'},
  {id: "4", uri: require('../../images/icon_quote.png'), type: 'Quote',
  title: 'Speaking for fun!', date: '11/6/61 9.00'},
]



const dataAds = []

const ARTICLES_length = ARTICLES.length;
const { height, width } = Dimensions.get('window')

export default class FeedScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.featuresRef = firebase.database().ref(`Data/Features`);
    this.tipsRef = firebase.database().ref(`Data/Tips`);
    this.AdsRef = firebase.database().ref(`Data/Ads`);
    this.state = {email: '' ,
                  cardIndex: 0,
                  user:null,
                  Modalopen : false,
                  loading: true,
                  pressStatus: false,
                }
    
  } 

  componentDidMount(){
    // start listening for firebase updates
    this.listenForFeature(this.featuresRef);
    this.listenForTips(this.tipsRef);
    this.listenForAds(this.AdsRef);
    // user id from firebase
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`User/Firebase/${userId}/email`).on('value', snapshot => {
    this.setState({email: snapshot.val()})
 })
  }

  componentWillMount() {
    AsyncStorage.getItem('userData').then((user_data_json) => {
      let userData = JSON.parse(user_data_json);
      this.setState({
        user: userData,
        active:'true',
      });
    });


  }



//swipe right of card swipe
swipeBottom = () => {
  if(this.state.cardIndex < ARTICLES_length-1){
    this.setState({ cardIndex: this.state.cardIndex + 1 })
}else{
    this.swiper.disableBottomSwipe
    this.swiper.goBackFromBottom();
}
};

//swipe right of card swipe
swipeBack = () => {
  if(this.state.cardIndex === 0){
    
}
else{
    this.swiper.goBackFromTop();
    this.setState({ cardIndex: this.state.cardIndex - 1 })
}
};


//swipe left of card swipe
swipeTop = () => {
  console.log(this.state.cardIndex)
  if(this.state.cardIndex <= 0){

  }
  if (this.state.cardIndex === 0) {
    this.swiper.goBackFromTop();
  }
  if (this.state.cardIndex > 0) {
    this.setState({ cardIndex: this.state.cardIndex - 1 })
    this.swiper.goBackFromTop();
    this.swiper.goBackFromBottom();
}

};

//key of flatlist
_keyExtractor = (item, index) => item._key;

renderItem(item){
  return(
  <TouchableHighlight onPress={() => this._pressRow(item.id)} underlayColor = '#c9c9c9'>
  <View style = {{ flex: 1, paddingTop: 15, borderBottomWidth: 0.5, borderColor: '#c9c9c9', backgroundColor: '#fff' }}>
  <View style = {{ flex: 1, flexDirection: 'row', marginLeft:20, marginRight: 20, marginBottom: 15,}} >
  {this.getImageTypeTips(item.type)}
  <View style = {{flex: 1, flexDirection: 'column', marginLeft: 10}}>

  <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>

  <View style = {{}}>
  {this.getTypeofTips(item.type)}
  </View>
  
  <View style = {{ flexDirection: 'row', alignItems: 'baseline', alignSelf: 'flex-end'}}>
  <View>
  <Icon name="clock2" style={{ padding:5, alignSelf:'center'}} size={11} color = '#484848'/>
  </View>
  <Text style = {{ color:'#484848', fontSize: 10, alignSelf:'center', fontFamily: Fonts.MosseThai_Regular}}>{item.date}</Text>
  </View>

  </View>

  <Text style = {{fontSize: 15, fontFamily: Fonts.MosseThai_Medium, color: '#484747', marginTop:5 }}>{item.title}</Text>
  </View>
  </View>
  </View>
  </TouchableHighlight>
  )
}

//for get json data from firebase
listenForFeature(featuresRef) {
  featuresRef.on('value', (dataSnapshot) => {
    var tasks = [];
    dataSnapshot.forEach((child) => {
      tasks.push({
        title: child.val().title,
        uri: child.val().uri,
        date: child.val().date,
        type: child.val().type,
        _key: child.key
      });
    });

    this.setState({
      dataFeatures:tasks,
      loading: false,
    });
  });
  }

  listenForTips(tipsRef) {
    tipsRef.on('value', (dataSnapshot) => {
      var tasks = [];
      dataSnapshot.forEach((child) => {
        tasks.push({
          title: child.val().title,
          uri: child.val().uri,
          date: child.val().date,
          type: child.val().type,
          _key: child.key
        });
      });
  
      this.setState({
        dataTips:tasks,
        loading: false,
      });
    });
    }

    listenForAds(AdsRef) {
      AdsRef.on('value', (dataSnapshot) => {
        dataSnapshot.forEach((child) => {
          dataAds.push({
            title: child.val().title,
            uri: child.val().uri,
            date: child.val().date,
            key: child.key
          });
        });
      });
    }

  //on close a modal swipe card
_onCloseModal = () => {
  this.setState({
    Modalopen: false,
    cardIndex: 0,
  })
}

//on open a modal swipe card
_pressRow = (rowID) => {
  this.setState({
    Modalopen: true,
    pressStatus: true
  })
}

getImageTypeTips = (type) => {
  switch (type) {
    case "Announcement":
        return (<View 
        style={{ backgroundColor: '#f5a623' ,justifyContent: 'center', width:SCREEN_WIDTH* 0.09, height:SCREEN_WIDTH* 0.09, marginLeft: 10, borderRadius: (SCREEN_WIDTH* 0.09 + SCREEN_WIDTH* 0.09)/2}}>
        <Icon name="bullhorn-solid" style={{ alignSelf:'center',}} size={12} color = '#fff'/>
        </View>)
    case "Document":
    return (<View 
        style={{ backgroundColor: '#2ce018' ,justifyContent: 'center', width:SCREEN_WIDTH* 0.09, height:SCREEN_WIDTH* 0.09, marginLeft: 10, borderRadius: (SCREEN_WIDTH* 0.09 + SCREEN_WIDTH* 0.09)/2}}>
        <Icon name="file-alt-solid" style={{ alignSelf:'center',}} size={12} color = '#fff'/>
        </View>)
    case "English":
    return (<View 
        style={{ backgroundColor: '#4c18f2' ,justifyContent: 'center', width:SCREEN_WIDTH* 0.09, height:SCREEN_WIDTH* 0.09, marginLeft: 10, borderRadius: (SCREEN_WIDTH* 0.09 + SCREEN_WIDTH* 0.09)/2}}>
         <Icon name="book-solid" style={{ alignSelf:'center'}} size={12} color = '#fff'/>
        </View>)
    case "Quote":
    return (<View 
      style={{ backgroundColor: '#ff6161' ,justifyContent: 'center', width:SCREEN_WIDTH* 0.09, height:SCREEN_WIDTH* 0.09, marginLeft: 10, borderRadius: (SCREEN_WIDTH* 0.09 + SCREEN_WIDTH* 0.09)/2}}>
      <Icon name="heart-solid" style={{ alignSelf:'center'}} size={12} color = '#fff'/>
      </View>)
}
}

getTypeofTips = (type) =>{
  switch (type){
    case "Announcement":
    return (<View style = {{borderColor: '#f5a623', borderRadius: 2, borderWidth: 1, alignSelf: 'flex-start'}}>
            <Text style = {{paddingTop:2, paddingBottom:2, paddingHorizontal:5, color:'#f5a623', fontSize: 9, fontFamily: Fonts.MosseThai_Regular}}>Announcement</Text>
            </View>)
    case "Document":
    return (<View style = {{borderColor: '#2ce018', borderRadius: 2, borderWidth: 1, alignSelf: 'flex-start'}}>
             <Text style = {{paddingTop:2, paddingBottom:2, paddingHorizontal:5, color:'#2ce018', fontSize: 9, fontFamily: Fonts.MosseThai_Regular}}>Document</Text>
             </View>)
    case "English":
    return (<View style = {{borderColor: '#2832df', borderRadius: 2, borderWidth: 1, alignSelf: 'flex-start'}}>
             <Text style = {{paddingTop:2, paddingBottom:2, paddingHorizontal:5, color:'#2832df', fontSize: 9, fontFamily: Fonts.MosseThai_Regular}}>English</Text>
             </View>)
    case "Quote":
    return (<View style = {{borderColor: '#fd1b37', borderRadius: 2, borderWidth: 1, alignSelf: 'flex-start'}}>
             <Text style = {{paddingTop:2, paddingBottom:2, paddingHorizontal:5, color:'#fd1b37', fontSize: 9, fontFamily: Fonts.MosseThai_Regular}}>Quote</Text>
             </View>)
  }

}


//render flatlist of tips
renderItemTips(item){
    return(
  <View style = {styles.cardviewcontent}>
  <TouchableHighlight onPress={() => this._pressRow(item.id)} underlayColor = '#c9c9c9'>
  <View style = {{ flex: 1, flexDirection: 'column', marginTop: 15, marginBottom: 10, marginLeft: 10, marginRight: 20,}} >
  <View style = {{ flex: 1, flexDirection: 'row', justifyContent: 'center'}} >
  {this.getImageTypeTips(item.type)}
  <View style = {{flex: 1, flexDirection: 'column', marginLeft: 10}}>

  <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>

  <View>
  {this.getTypeofTips(item.type)}
  </View>
  
  <View style = {{ flexDirection: 'row', alignItems: 'baseline', alignSelf: 'flex-end'}}>
  <View>
  <Icon name="clock2" style={{ padding:5, alignSelf:'center'}} size={11} color = '#484848'/>
  </View>
  <Text style = {{ color:'#484848', fontSize: 10, alignSelf:'center', fontFamily: Fonts.MosseThai_Regular}}>{item.date}</Text>
  </View>

  </View>

  <View style = {{flexDirection:'row'}}>
  <Text style = {{fontSize: 15, fontFamily: Fonts.MosseThai_Medium, color: '#484747', marginTop:10,flex: 5,  lineHeight: 20, }}>{item.title}</Text>
  <Text style = {{flex:1.5}}/>
  </View>

  </View>
  </View>
  <View style = {{alignItems: 'flex-end', paddingTop: 5}}>
  <PinIconImage favorite={this.state.pressStatus} />
  </View>
  </View>
  </TouchableHighlight>
  </View>
  )
}


  render() {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Modal
        transparent={true}
        animationType={'none'}
        visible={this.state.loading}
        onRequestClose={() => {console.log('close modal')}}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={this.state.loading} />
          </View>
        </View>
      </Modal>
      <Modal style = {{flex:1}} visible = {this.state.Modalopen} onRequestClose = {() => console.warn("this is close modal")}>
                <CardSwipe _onCloseModal = {this._onCloseModal}/>
      </Modal>

                <View style={{ flex: 1 }}>
                    <ScrollView
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [
                                { nativeEvent: { contentOffset: { y: this.scrollY } } }
                            ]
                        )}
                    >
                        <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
                        <Swiper height={200} autoplay showsButtons= {false} dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 8, height: 8, borderRadius: 3, marginLeft: 7, marginRight: 7}} />}
                          activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 3, marginLeft: 7, marginRight: 7}} />}
                          paginationStyle={{
                            bottom: 10
                          }}>
                        {dataFeature.map((item) => {
                          return (
                        <View style={styles.slide1} key={item.key}>
                        <ImageBackground source = {{uri: item.uri}} resizeMode={'cover'} style = {{width:width, height:230, justifyContent:'center', alignItems: 'center',}}>
                        <Text style = {{fontSize: 18, fontWeight: 'bold', color: '#fff', marginHorizontal: 30, textAlign: 'center', 
                        textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10}}>{item.title}</Text>
                        </ImageBackground>
                        </View>
                          );
                        })}
                        </Swiper>
                        <Text style = {{paddingTop: 20, paddingRight: 10, paddingBottom: 20,paddingLeft: 20, color: '#4a4a4a', fontFamily: Fonts.MosseThai_Bold, fontSize: 14}}>Featured Topics</Text>
                        <View style = {{flex:1, justifyContent: 'center', backgroundColor: '#fff'}}>
                        <FlatList data = {this.state.dataTips} keyExtractor={this._keyExtractor}
                        renderItem = {({item}) => this.renderItem(item)} />
                        </View>
                        <View style = {{flex:1, justifyContent: 'center',backgroundColor: '#f6f6f6', borderBottomColor: '#c9c9c9', borderBottomWidth: 0.5}}>
                        <Text style = {{paddingTop: 20, paddingRight: 10, paddingBottom: 20,paddingLeft: 20, color: '#4a4a4a', fontFamily: Fonts.MosseThai_Bold, fontSize: 14}}>Latest Feed</Text>
                        <FlatList data = {this.state.dataFeatures} keyExtractor={this._keyExtractor}
                        renderItem = {({item}) => this.renderItemTips(item)} />
                        </View>
                    </View>
                    </ScrollView>

                </View>
            </SafeAreaView>
    );
  }
}

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  content:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardviewcontent:{ 
    flex: 1, 
    overflow: 'hidden',
    marginBottom: 15, 
    marginLeft:20, 
    marginRight: 20, 
    borderRadius: 25,
    shadowColor: '#000000', 
    shadowOpacity : 0.24, 
    shadowRadius: 3, 
    backgroundColor: '#ffffff', 
    borderRadius: 5, 
    elevation: 3,
  },
  card:{
    width: SCREEN_WIDTH* 0.85,
    height: SCREEN_HEIGHT* 0.65,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#000000',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
  },
  card1: {
    backgroundColor: '#fff',
    borderColor: '#000000',
    borderWidth: 0.5,
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  buttonContainer:{
    width:SCREEN_WIDTH*0.9,
    height: SCREEN_HEIGHT* 0.125,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  button:{
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    zIndex: 0,
  },
  green:{
    width:SCREEN_WIDTH* 0.125,
    height:SCREEN_WIDTH* 0.125,
    backgroundColor:'#fff',
    borderRadius:(SCREEN_WIDTH* 0.125)/2,
    borderWidth:3,
    borderColor:'#17c0eb',
  },
  viewIcon:{
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    width:35,
    height:35,
    backgroundColor:'#fff',
    borderRadius:(35/2),
    borderWidth:2,
    borderColor:'transparent',
    overflow: 'hidden',
  },
  red:{
    width:SCREEN_WIDTH* 0.125,
    height:SCREEN_WIDTH* 0.125,
    backgroundColor:'#fff',
    borderRadius:(SCREEN_WIDTH* 0.125)/2,
    borderWidth:3,
    borderColor:'#17c0eb',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
