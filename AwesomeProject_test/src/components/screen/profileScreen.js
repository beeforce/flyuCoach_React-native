import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  FlatList,
  Modal,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Animated
} from 'react-native';
import * as firebase from 'firebase';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import * as Progress from 'react-native-progress';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../../selection.json';
import { Fonts } from '../../utils/Fonts';
import LinearGradient from 'react-native-linear-gradient';


const Icon = createIconSetFromIcoMoon(IcoMoonConfig);

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

const ARTICLES_length = ARTICLES.length;
const amountpin = 0;


export default class ProfileScreen extends React.Component {
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
                }
    
  } 

  componentDidMount(){
    // start listening for firebase updates
    this.listenForTips(this.tipsRef);
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
      amountpin = tasks.length;
  
      this.setState({
        dataTips:tasks,
        loading: false,
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
        style={{ backgroundColor: '#ff9a16' ,justifyContent: 'center', width:SCREEN_WIDTH* 0.1, height:SCREEN_WIDTH* 0.1, marginLeft: 10, borderRadius: (SCREEN_WIDTH* 0.1 + SCREEN_WIDTH* 0.1)/2}}>
        <Icon name="bullhorn-solid" style={{ alignSelf:'center',}} size={12} color = '#fff'/>
        </View>)
    case "Document":
    return (<View 
        style={{ backgroundColor: '#2ce018' ,justifyContent: 'center', width:SCREEN_WIDTH* 0.1, height:SCREEN_WIDTH* 0.1, marginLeft: 10, borderRadius: (SCREEN_WIDTH* 0.1 + SCREEN_WIDTH* 0.1)/2}}>
        <Icon name="file-alt-solid" style={{ alignSelf:'center',}} size={12} color = '#fff'/>
        </View>)
    case "English":
    return (<View 
        style={{ backgroundColor: '#330ed3' ,justifyContent: 'center', width:SCREEN_WIDTH* 0.1, height:SCREEN_WIDTH* 0.1, marginLeft: 10, borderRadius: (SCREEN_WIDTH* 0.1 + SCREEN_WIDTH* 0.1)/2}}>
         <Icon name="book-solid" style={{ alignSelf:'center'}} size={12} color = '#fff'/>
        </View>)
    case "Quote":
    return (<View 
      style={{ backgroundColor: '#e81747' ,justifyContent: 'center', width:SCREEN_WIDTH* 0.1, height:SCREEN_WIDTH* 0.1, marginLeft: 10, borderRadius: (SCREEN_WIDTH* 0.1 + SCREEN_WIDTH* 0.1)/2}}>
      <Icon name="heart-solid" style={{ alignSelf:'center'}} size={12} color = '#fff'/>
      </View>)
}
}


//render flatlist of tips
renderItemTips(item){
    return(
  <View style = {styles.cardviewcontent2}>
  <TouchableHighlight onPress={() => this._pressRow(item.id)}>
  <View style = {{ flex: 1, flexDirection: 'column', marginTop: 15, marginBottom: 10, marginLeft: 10, marginRight: 20,}} >
  <View style = {{ flex: 1, flexDirection: 'row', justifyContent: 'center'}} >
  {this.getImageTypeTips(item.type)}
  <View style = {{flex: 1, flexDirection: 'column', marginLeft: 10}}>

  <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>

  <View>
  <View style = {{borderColor: '#e67e22', borderRadius: 2, borderWidth: 1, alignSelf: 'flex-start'}}>
  <Text style = {{padding:2, color:'#e67e22', fontSize: 9,}}>{item.type}</Text>
  </View>
  </View>
  
  <View style = {{ flexDirection: 'row', alignItems: 'baseline', alignSelf: 'flex-end'}}>
  <View>
  <Icon name="clock2" style={{ padding:5, alignSelf:'center'}} size={11} color = '#000'/>
  </View>
  <Text style = {{ color:'#000000', fontSize: 10, alignSelf:'center'}}>{item.date}</Text>
  </View>

  </View>

  <Text style = {{fontSize: 14, fontFamily: Fonts.Kanit, color: '#000', marginTop:5 }}>{item.title}</Text>
  {/* color = '#2c3e50' */}
  </View>
  </View>
  <View style = {{alignItems: 'flex-end'}}>
  <Icon name= 'pin' color = 'red' size={16} style={{ padding: 10 }} />
  </View>
  </View>
  </TouchableHighlight>
  </View>
  )
}

//   componentDidMount() {
//     firebase.database().ref(`Data/Ads`).push().set({
//       title: "Ads 1",
//       date: "15/06/2018",
//       uri: "https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2FtipsTypeImages%2Fads.jpg?alt=media&token=b034a2d4-9964-4f93-a17c-b1b3c4cbf26d",
//     });
// }


  render() {
    return (
      <View>

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
                <TouchableHighlight style = {{margin:10}} onPress ={this._onCloseModal}>
                <Image source = {require('../../images/icon_delete.png')} style = {{ width:20, height:20 }}/>
                </TouchableHighlight>
                <View style = {{flexDirection: 'row',marginLeft: SCREEN_WIDTH * 0.05, marginRight: SCREEN_WIDTH * 0.05, alignItems: 'baseline',justifyContent: 'space-between'}}>
                <View style = {{flexDirection: 'row',alignItems: 'baseline'}}>
                <Image resizeMode = 'stretch' source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2FtipsTypeImages%2Ficon_annou.png?alt=media&token=b15cf403-ed6e-4e7c-90d9-353035ee3399'}} style={{ width:25, height:25, borderRadius:(25/2),}}></Image>
                <Text style = {{marginLeft: 7, color:'#e67e22'}}>Announcement</Text>
                </View>
                <Text style = {{fontSize: 14, fontWeight: 'bold', color:'#000'}}>ย้อนกลับไปอ่านใหม่</Text>
                </View>
                <View style = {{flex:1, justifyContent: 'center' , flexDirection: 'column', alignItems: 'center',}}>
                    <View style = {{flex:3,}}>
                        <CardStack
                        style={styles.content}
                        renderNoMoreCards={() => <Text style={{fontWeight:'700', fontSize:18, color:'gray'}}>No more cards :(</Text>}
                        disableLeftSwipe
                        disableRightSwipe
                        // onSwipedLeft={this.swipeLeft}
                        // onSwipedRight = {this.swipeRight}
                        onSwipedTop = {this.swipeTop}
                        onSwipedBottom = {this.swipeBottom}
                        horizontalverticalSwipe = {false}
                        ref={swiper => {
                          this.swiper = swiper
                        }}
                      >
                      {ARTICLES.map((item) => {
                        return (
                        <Card style={[styles.card, styles.card1]} key={item.id}>
                        <View style = {{ flexDirection: 'row', marginTop: 7, marginRight: SCREEN_WIDTH* 0.15 }}>
                        <Image source={require('../../images/icon_tips.png')} resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5, marginTop: 10, marginBottom:10, marginLeft:10}} />
                        <Text style = {{fontSize: 18, fontWeight: 'bold', color: '#000000', marginTop: 7, marginLeft: 3}}>{item.id} {item.title}</Text>
                        </View>
                        <ImageBackground source={item.uri} resizeMode={'stretch'} style={{ height: 120, width: SCREEN_WIDTH* 0.8, justifyContent:'center', alignSelf: 'center', marginTop: 7}}>
                        <Text style = {{fontSize: 18, fontWeight: 'bold', color: '#fff', marginHorizontal: 30, textAlign: 'center', 
                        textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10}}>
                        {item.title}</Text>
                        </ImageBackground>
                  
                      <Text style = {{fontSize: 16, color: '#000000', marginHorizontal: SCREEN_WIDTH*0.05, marginTop: 5, marginBottom:15}}>{item.text}</Text>
                        </Card>
                      );
                    })}
                    </CardStack>
                    </View>

                    <View style={styles.buttonContainer}>
                    <View>
                      {/* <Text style = {{fontSize: 14, fontWeight: 'bold', color: '#ff4d4d',}}>Prev</Text> */}
                      <TouchableOpacity style={styles.button} onPress={()=>{
                        this.swiper.swipeTop()
                      }}>
                        <Image source={require('../../images/icon_left.png')} resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5 }} />
                      </TouchableOpacity>
                      </View>
                      <View>
                      <View style = {{flexDirection: 'row', alignItems:'center', alignSelf:'center'}}>
                      <Text style = {{fontSize: 13, fontWeight: 'bold', color: '#4cd137'}}>{this.state.cardIndex +1 }/ </Text>
                      <Text style = {{fontSize: 13, fontWeight: 'bold',}}>{ARTICLES_length} Cards</Text>
                      </View>
                      <Progress.Bar progress={(this.state.cardIndex + 1)/ ARTICLES_length} 
                      width={SCREEN_WIDTH*0.5} height={15} 
                      style = {{alignSelf: 'center', marginTop:10, borderRadius: 15, backgroundColor: '#3e9e16'}}
                      color = "rgb(115, 214, 40)"/>
                      </View>
                      <View>
                      {/* <Text style = {{fontSize: 14, fontWeight: 'bold', color: '#32ff7e',}}>Next</Text> */}
                      <TouchableOpacity style={styles.button} onPress={()=>{
                        this.swiper.swipeBottom();
                      }}>
                        <Image source={require('../../images/icon_right.png')} resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5 }} />
                      </TouchableOpacity>
                      </View>
                    </View>

                    </View>
                </Modal>

        <ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event(
            [
              { nativeEvent: { contentOffset: { y: this.scrollY } } }
            ]
            )}  >
        <View style = {styles.profileImagecontent}>
        <Image source={require('../../images/image.jpg')} style={ styles.profileImage } />
        <Text style = {{padding:8, fontFamily:Fonts.Roboto_Regular, color: '#000'}}>matoyza007@gmail.com</Text>
        </View>
    
        <View style = {styles.cardviewcontent}>
          <View style = {{ flexDirection: 'row', marginLeft:15, marginRight: 15, 
          marginTop: 15, marginBottom: 15, justifyContent: 'space-between', alignItems: 'baseline'}} >
          <View style = {{ flexDirection: 'column', alignSelf: 'flex-start'}}>
          <Text style = {{ margin:2, fontWeight: 'bold', fontFamily: Fonts.Roboto_medium, color: '#000'}}>Matoy Sukhuvimonpanich (Toy)</Text>
          <Text style = {{ margin:2, fontFamily: Fonts.Roboto_medium, color: '#000'}}>Uttaradit, Uttaradit school</Text>
          </View>
          <View style = {{ flexDirection: 'column', alignItems: 'baseline', alignSelf: 'flex-end'}}>
          <Text style = {{margin:2, color:'#000', fontSize: 12}}>แก้ไขข้อมูล</Text>
          <TouchableOpacity style={{ paddingRight:5, alignSelf: 'center'}}
          onPress={() => this.props.navigation.push('Profile2')}>
          <Icon name="edit" size={27} color = '#000'/></TouchableOpacity>
          </View>
          </View>
        </View>

        <Text style = {{alignSelf: 'center', fontWeight: 'bold', fontFamily: Fonts.Roboto_medium, color: '#000'}}>เป้าหมายของเรา</Text>
        <LinearGradient colors={['#f7c042', '#f2892e','#f26304']} style = {styles.goalButton}>
          <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#ffffff', fontWeight: 'bold', fontFamily: Fonts.Roboto_medium ,margin: 15}}>วิศวกรโยธา มช.</Text>
          <LinearGradient colors={['#bbe84a','#7bd834', '#3e9e16']} style = {{backgroundColor: '#44bd32', width:50, height:50, borderRadius:25, justifyContent:'center', 
          alignItems:'center', shadowColor: '#000', shadowOpacity : 0.24, shadowRadius: 3, elevation: 3, }}>
          <Image source={require('../../images/check_white.png')} style={{ width: 20, height:20}} />
          </LinearGradient>
          </View>
        </LinearGradient>
      
        <Text style = {{ marginLeft: 20, marginBottom: 10, fontWeight: 'bold', marginTop: 15, marginLeft: 15, color: '#000'}}>
        Your Pins ( {amountpin} )</Text>
        <View style = {styles.pincontent}>
        <FlatList data = {this.state.dataTips} keyExtractor={this._keyExtractor}
                        renderItem = {({item}) => this.renderItemTips(item)} />
        </View>
        </ScrollView>
        </View>
    );
  }
}

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE'
  },
  profileImagecontent:{
    marginTop: 25,
    alignItems:'center'
  },
  content:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  cardviewcontent:{ 
    flex: 1, 
    overflow: 'hidden',
    marginBottom: 15, 
    marginLeft:20, 
    marginRight: 20, 
    shadowColor: '#000000', 
    shadowOpacity : 0.24, 
    shadowRadius: 3, 
    backgroundColor: '#ffffff', 
    borderRadius: 5, 
    elevation: 3,
  },
  cardviewcontent2:{ 
    flex: 1, 
    overflow: 'hidden',
    marginBottom: 15, 
    marginLeft:10, 
    marginRight: 15, 
    shadowColor: '#000000', 
    shadowOpacity : 0.24, 
    shadowRadius: 3, 
    backgroundColor: '#ffffff', 
    borderRadius: 5, 
    elevation: 3,
  },
  card:{
    width: SCREEN_WIDTH* 0.9,
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
  buttonContainer:{
    width:SCREEN_WIDTH*0.9,
    height: SCREEN_HEIGHT* 0.125,
    flexDirection:'row',
    justifyContent: 'space-around',
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
  },
   profileImage:{
    width:SCREEN_WIDTH* 0.3,
    height:SCREEN_WIDTH* 0.3,
    borderRadius:(SCREEN_WIDTH* 0.3)/2,
  },
  cardviewcontent:{ 
    marginTop: 5,
    marginBottom: 8,
    borderBottomWidth: 0.5,
    borderColor: '#c9c9c9',
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000000', 
    shadowOpacity : 0.24, 
    shadowRadius: 3, 
    elevation: 3,
  },
  goalButton:{
    backgroundColor: '#e67e22',
    alignSelf: 'center',
    width: 250,
    height: 50,
    borderRadius: 27,
    marginTop: 8,
    shadowColor: '#000', 
    shadowOpacity : 0.54, 
    shadowRadius: 3, 
    elevation: 3,
  },
  pincontent:{
    marginTop: 15,
    marginLeft: 15,
  }
});
