import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Dimensions, 
  ScrollView, 
  Animated, 
  TextInput,
  TouchableHighlight,
  Image,
  FlatList
  } from 'react-native';
import { LinearTextGradient } from 'react-native-text-gradient';
import { Fonts } from '../../utils/Fonts';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(IcoMoonConfig);



const ARTICLES = [
  { id: "1", uri: require('../../images/decision.jpg'), 
  title: 'ค้นหา 1 ใน 12 ความสามารถลับ', time: 10, type: 'การพัฒนาตัวเอง', state: false},
  { id: "2", uri: require('../../images/career.jpg'),
   title: 'อาชีพที่เหมาะกับตัวเอง', time: 10, type: 'การพัฒนาตัวเอง', state: true},
  { id: "3", uri: require('../../images/analysis.jpg'),
   title: 'คิด จัดการ ลงมือทำ เราอยู่สายไหน', time: 10, type: 'การพัฒนาตัวเอง', state: false},
]

export default class VIPsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      array: ARTICLES
  };
  }

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

  renderItemQuestion(item){
    return(
    <View style = {styles.cardviewcontent}>
    <TouchableHighlight onPress={() => {
      if (item.state === false){
      this.props.navigation.push('Selffinding',{Everdone: false,})
      }else{
        this.props.navigation.push('Selffinding',{Everdone: true,})
      }
    }} 
    underlayColor = '#EEEEEE'>
    <View style = {{ flexDirection: 'row', justifyContent: 'center'}} >
    <Image source = {item.uri} resizeMode = "cover"
    style = {{flex: 1.2, width: null,
        height: null}}></Image>
    <View style = {{flex:2, backgroundColor: '#fff'}}>
    <Text style = {styles.textTitle}>{item.title}</Text>
    <View style = {{flexDirection: 'row', paddingHorizontal: 15, justifyContent:'space-between', marginTop: 25}}>
    <View style = {{flexDirection: 'row', alignItems: 'baseline',}}>
    <Icon name="clock2" style={styles.icontype} size={14} color = '#485460'/>
    <Text style = {styles.texttime}>{item.time} นาที</Text>
    </View>
    <View style = {{flexDirection: 'row', alignItems: 'baseline'}}>
    <Icon name="tag" style={styles.icontype} size={14} color = '#485460'/>
    <Text style = {styles.texttime}>{item.type}</Text>
    </View>
    </View>
    {item.state === false ? 
    <View style = {{flex: 1 , height: 60 ,backgroundColor: '#a61e1e', marginTop: 10, justifyContent: 'center'}}>
    <Text style= {styles.textButton}>ยังไม่เคยทำ</Text>
    </View> :
    <View style = {{flex: 1 , height: 60, backgroundColor: '#417505', marginTop: 10, justifyContent: 'center'}}>
    <Text style= {styles.textButton}>ดูผลลัพธ์ของตัวเอง</Text>
    </View> }
    </View>
    </View>
    </TouchableHighlight>
    </View>
    )
  }


  render() {
    const {array} = this.state
    return (
      <View style={styles.container}>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.scrollY } } }]
        )}>
        <View style = {{ paddingHorizontal: windowWidth*0.05}}>
      <LinearTextGradient
        style={styles.textHeader}
        locations={[0, 1]}
        colors={['#3023ae', '#c86dd7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        >
        ค้นหาตัวเอง
        </LinearTextGradient>
        <View style = {styles.searchbox}>
        <Icon name="search" style={{ paddingRight: 10,alignSelf:'center',paddingTop: 2}} size={22} color = '#2c3e50'/>
        <TextInput style = {styles.inputtextstyle}
                    onChangeText={(text) => this.searchText(text)}></TextInput>
      </View>
      <FlatList data = {array} keyExtractor={(item) => item.id.toString()}
                        renderItem = {({item}) => this.renderItemQuestion(item)}
                        style = {{marginTop: 10}} />
      
      </View>
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
    backgroundColor: "#f6f6f6",
  },
  textHeader:{
    fontSize: 20,
    fontFamily: Fonts.MosseThai_Extra_Bold,
    marginTop: 30,
  },
  inputtextstyle:{
    flex: 1,
    paddingLeft: 7,
    fontSize: 16,
    fontFamily: Fonts.MosseThai_Medium
  },
  searchbox:{ 
    flexDirection: 'row',
    alignItems: 'baseline',
    height: 45,
    margin: 3,
  },
  cardviewcontent:{ 
    overflow: 'hidden',
    marginBottom: 15, 
    borderRadius: 25,
    shadowColor: '#000000', 
    shadowOpacity : 0.24, 
    shadowRadius: 5, 
    backgroundColor: '#ffffff', 
    borderRadius: 15, 
    shadowOffset: {width: 10, height: 10},
    elevation: 4,
  },
  textTitle:{ 
    fontSize: 20, 
    fontFamily: Fonts.MosseThai_Extra_Bold, 
    padding: 15,
    color: '#3a3a3a',
    lineHeight: 25
  },
  texttime:{
    fontSize: 12, 
    color: '#485460', 
    fontFamily: Fonts.MosseThai_Medium,
  },
  icontype:{ 
    paddingRight: 5,
    padding: 3,
    alignSelf:'center'
    },
    textButton:{
      fontFamily: Fonts.MosseThai_Bold,
      fontSize: 14,
      color: '#fff',
      alignSelf: 'center',
    }
});
