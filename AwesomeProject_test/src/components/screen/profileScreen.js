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
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../../selection.json';
import { Fonts } from '../../utils/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import CardSwipe from '../styles/cardSwipe';
import AwesomeAlert from 'react-native-awesome-alerts';


const Icon = createIconSetFromIcoMoon(IcoMoonConfig);

const ARTICLES = [
  { id: "1", uri: require('../../images/image.jpg'), date: '1/06/2561 18:30',
   text: 'วันนี้มีการสอน Live สด เกี่ยวกับการเดาคำศัพท์ ที่เราไม่รู้ ติดตามดู Live ได้ตามช่องทางข้างล่างเลยจ้า ตอน 21:30 ห้ามพลาดนะจ๊ะ !'},
  { id: "2", uri: require('../../images/image.jpg'), date: '2/06/2561 18:30',
   text: 'วันนี้มีการสอน Live สด เกี่ยวกับการเดาคำศัพท์ ที่เราไม่รู้ ติดตามดู Live ได้ตามช่องทางข้างล่างเลยจ้า ตอน 21:30 ห้ามพลาดนะจ๊ะ !'},
  { id: "3", uri: require('../../images/image.jpg'), date: '3/06/2561 18:30',
   text: 'วันนี้มีการสอน Live สด เกี่ยวกับการเดาคำศัพท์ ที่เราไม่รู้ ติดตามดู Live ได้ตามช่องทางข้างล่างเลยจ้า ตอน 21:30 ห้ามพลาดนะจ๊ะ !'},
  { id: "4", uri: require('../../images/image.jpg'), date: '4/06/2561 18:30',
   text: 'It plays a very important part in learning any language. Effective listening ensures understanding and it helps improve accuracy when speaking '},
  { id: "5", uri: require('../../images/image.jpg'), date: '5/06/2561 18:30',
   text: 'วันนี้มีการสอน Live สด เกี่ยวกับการเดาคำศัพท์ ที่เราไม่รู้ ติดตามดู Live ได้ตามช่องทางข้างล่างเลยจ้า ตอน 21:30 ห้ามพลาดนะจ๊ะ !'},
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
                  mincard: true,
                  maxcard: false,
                  goalSuccess: false,
                  showAlert: false
                }
    
  } 

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

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
    this.setState({ cardIndex: this.state.cardIndex + 1,
                    maxcard: false })
    if(this.state.cardIndex === 1){
      this.setState({ mincard: false})
    }
    if(this.state.cardIndex === ARTICLES_length-1){
      this.setState({ maxcard: true})
    }
} 
  else{
    this.swiper.goBackFromTop();
}
};

// //swipe right of card swipe
swipeBack = () => {
    this.swiper.goBackFromTop();

}

swipeBackTofirst = () =>{
  const cardindex_ = this.state.cardIndex;
  console.log(cardindex_)
  for(let i = 0; i <= cardindex_+1; i++){
    this.swiper.goBackFromTop();
    this.swiper.goBackFromTop();
    console.log(i)
  }

}

onSwiped = (cardIndex) =>{
  this.setState({
    cardIndex: cardIndex
  })
  const cardindex_ = this.state.cardIndex;
    console.log(cardindex_);
}


// //swipe left of card swipe
swipeTop = () => {
  console.log(this.state.cardIndex)
  if(this.state.cardIndex <= 0){

  }
  if (this.state.cardIndex === 0) {
  }
  if (this.state.cardIndex > 0) {
    if (this.state.cardIndex === 1) {
      this.setState({ mincard: true})
    }
    this.setState({ cardIndex: this.state.cardIndex - 1 })
    this.swiper.goBackFromTop();
    this.swiper.goBackFromTop();
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
        <Icon name="bullhorn-solid" style={{ alignSelf:'center',}} size={11} color = '#fff'/>
        </View>)
    case "Document":
    return (<View 
        style={{ backgroundColor: '#2ce018' ,justifyContent: 'center', width:SCREEN_WIDTH* 0.1, height:SCREEN_WIDTH* 0.1, marginLeft: 10, borderRadius: (SCREEN_WIDTH* 0.1 + SCREEN_WIDTH* 0.1)/2}}>
        <Icon name="file-alt-solid" style={{ alignSelf:'center',}} size={11} color = '#fff'/>
        </View>)
    case "English":
    return (<View 
        style={{ backgroundColor: '#0420f7' ,justifyContent: 'center', width:SCREEN_WIDTH* 0.1, height:SCREEN_WIDTH* 0.1, marginLeft: 10, borderRadius: (SCREEN_WIDTH* 0.1 + SCREEN_WIDTH* 0.1)/2}}>
         <Icon name="book-solid" style={{ alignSelf:'center'}} size={11} color = '#fff'/>
        </View>)
    case "Quote":
    return (<View 
      style={{ backgroundColor: '#e81747' ,justifyContent: 'center', width:SCREEN_WIDTH* 0.1, height:SCREEN_WIDTH* 0.1, marginLeft: 10, borderRadius: (SCREEN_WIDTH* 0.1 + SCREEN_WIDTH* 0.1)/2}}>
      <Icon name="heart-solid" style={{ alignSelf:'center'}} size={11} color = '#fff'/>
      </View>)
}
}

getTypeofTips = (type) =>{
  switch (type){
    case "Announcement":
    return (<View style = {{borderColor: '#e67e22', borderRadius: 2, borderWidth: 1, alignSelf: 'flex-start'}}>
            <Text style = {{paddingTop:2, paddingBottom:2, paddingHorizontal:5, color:'#e67e22', fontSize: 9, fontFamily: Fonts.MosseThai_Regular}}>Announcement</Text>
            </View>)
    case "Document":
    return (<View style = {{borderColor: '#2ce018', borderRadius: 2, borderWidth: 1, alignSelf: 'flex-start'}}>
             <Text style = {{paddingTop:2, paddingBottom:2, paddingHorizontal:5, color:'#2ce018', fontSize: 9, fontFamily: Fonts.MosseThai_Regular}}>Document</Text>
             </View>)
    case "English":
    return (<View style = {{borderColor: '#0469f7', borderRadius: 2, borderWidth: 1, alignSelf: 'flex-start'}}>
             <Text style = {{paddingTop:2, paddingBottom:2, paddingHorizontal:5, color:'#0469f7', fontSize: 9, fontFamily: Fonts.MosseThai_Regular}}>English</Text>
             </View>)
    case "Quote":
    return (<View style = {{borderColor: '#e81747', borderRadius: 2, borderWidth: 1, alignSelf: 'flex-start'}}>
             <Text style = {{paddingTop:2, paddingBottom:2, paddingHorizontal:5, color:'#e81747', fontSize: 9, fontFamily: Fonts.MosseThai_Regular}}>Quote</Text>
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
  {this.getTypeofTips(item.type)}
  </View>
  
  <View style = {{ flexDirection: 'row', alignItems: 'baseline', alignSelf: 'flex-end'}}>
  <View>
  <Icon name="clock2" style={{ padding:5, alignSelf:'center'}} size={11} color = '#000'/>
  </View>
  <Text style = {{ color:'#000000', fontSize: 10, alignSelf:'center', fontFamily: Fonts.MosseThai_Regular}}>{item.date}</Text>
  </View>

  </View>

  <Text style = {{fontSize: 14, fontFamily: Fonts.MosseThai_Medium, color: '#000', marginTop:5 }}>{item.title}</Text>
  {/* color = '#2c3e50' */}
  </View>
  </View>
  <View style = {{alignItems: 'flex-end'}}>
  <Icon name= 'thumbtack2' color = 'red' size={17} style={{ padding: 10 }} />
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
    const {goalSuccess} = this.state;
    const {showAlert} = this.state;
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
                <CardSwipe _onCloseModal = {this._onCloseModal} />
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
        <Text style = {{padding:8, fontFamily:Fonts.MosseThai_Medium, color: '#000'}}>matoyza007@gmail.com</Text>
        </View>
    
        <View style = {styles.cardviewcontent}>
          <View style = {{ flexDirection: 'row', marginLeft:15, marginRight: 15, 
          marginTop: 15, marginBottom: 15, justifyContent: 'space-between', alignItems: 'baseline'}} >
          <View style = {{ flexDirection: 'column', alignSelf: 'flex-start'}}>
          <Text style = {{ margin:2, fontFamily: Fonts.MosseThai_Bold, color: '#000'}}>Matoy Sukhuvimonpanich (Toy)</Text>
          <Text style = {{ margin:2, fontFamily: Fonts.MosseThai_Medium, color: '#000'}}>Uttaradit, Uttaradit school</Text>
          </View>
          <View style = {{ flexDirection: 'column', alignItems: 'baseline', alignSelf: 'flex-end'}}>
          <Text style = {{margin:2, color:'#000', fontSize: 12, fontFamily:Fonts.MosseThai_Medium}}>แก้ไขข้อมูล</Text>
          <TouchableOpacity style={{ paddingRight:5, alignSelf: 'center'}}
          onPress={() => this.props.navigation.push('Profile2',{ hideTabBar: true })}>
          <Icon name="edit2" size={22} color = '#000'/></TouchableOpacity>
          </View>
          </View>
        </View>

        <Text style = {{alignSelf: 'center', fontFamily: Fonts.MosseThai_Medium, color: '#000'}}>เป้าหมายของเรา</Text>
        <View style = {{alignSelf: 'center'}}>
        <LinearGradient 
        colors= {!this.state.goalSuccess ? ['#f7c042', '#f2892e','#f26304'] : ['#bbe84a','#7bd834', '#3e9e16'] }
        style = {styles.goalButton}>
          <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#ffffff', fontFamily: Fonts.MosseThai_Bold ,alignSelf: 'center', paddingLeft:20, paddingRight:20}}>วิศวกรโยธา มช.</Text>
          <TouchableOpacity onPress = {()=>{
            this.showAlert();
          }}>
          <LinearGradient colors={!this.state.goalSuccess ? ['#bbe84a','#7bd834', '#3e9e16'] : ['#f7c042', '#f2892e','#f26304']} style = {{backgroundColor: '#44bd32', width:50, height:50, borderRadius:25, justifyContent:'center', 
          alignItems:'center' }}>
          <Image source={!this.state.goalSuccess ? require('../../images/check_white.png') : require('../../images/cancel_white.png')} style={{ width: 20, height:20}} />
          </LinearGradient>
          </TouchableOpacity>
          </View>
        </LinearGradient>
        </View>
      
        <Text style = {{ marginLeft: 20, marginBottom: 10, fontFamily:Fonts.MosseThai_Bold, marginTop: 15, marginLeft: 15, color: '#000'}}>
        Your Pins ( {amountpin} )</Text>
        <View style = {styles.pincontent}>
        <FlatList data = {this.state.dataTips} keyExtractor={this._keyExtractor}
                        renderItem = {({item}) => this.renderItemTips(item)} />
        </View>
        </ScrollView>

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="เดี๋ยวก่อน !"
          message="น้องๆ แน่ใจแล้วว่าจะเปลี่ยนสถานะของเป้าหมายหรือไม่"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="ยกเลิก"
          confirmText="ต้องการเปลี่ยน"
          confirmButtonColor="#7bd834"
          cancelButtonColor="#DD6B55"
          messageStyle = {{fontFamily: Fonts.MosseThai_Medium, textAlign: 'center',
                           color: '#2f3640', fontSize: 15 }}
          titleStyle = {{fontFamily: Fonts.MosseThai_Bold,
                           color: '#2f3640', fontSize: 19 }}
          cancelButtonTextStyle = {{fontFamily: Fonts.MosseThai_Medium, textAlign: 'center',
                           color: '#fff', fontSize: 14 }}
          confirmButtonTextStyle = {{fontFamily: Fonts.MosseThai_Medium, textAlign: 'center',
                           color: '#fff', fontSize: 14 }}
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
            this.setState({
              goalSuccess: !goalSuccess
            })
          }}
        />
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
    width: SCREEN_WIDTH* 0.8,
    height: SCREEN_HEIGHT* 0.6,
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
    borderWidth: 0.75,
  },
  buttonContainer:{
    width:SCREEN_WIDTH*0.9,
    height: SCREEN_HEIGHT* 0.125,
    flexDirection:'column',
    justifyContent: 'space-around',
    marginBottom: 10,
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
    alignSelf: 'flex-start',
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
