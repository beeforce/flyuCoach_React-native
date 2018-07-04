import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts } from '../../../utils/Fonts';

const schedule = [
  {id: "1", title: 'เรียนรู้ค้นหาตัวเอง (Live)', date: '20',
  text: 'สำหรับน้องๆ คนไหนที่ยังไม่รู้ว่าตัวเองถนัดอะไรกันแน่ สามารถเรียนได้ทุกระดับชั้น ยิ่งรู้เร็วยิ่งดี จะทำให้น้องๆ สามารถค้นหาคำตอบได้เองง่ายๆ ไม่เกิน 1 ชั่วโมง เจอกัน 16.30น. ที่ Fan page'},
  {id: "2", title: 'สามวันตะลุยโจทย์ TOEIC (อุตรดิตถ์)', date: '25-28',
  text: 'สำหรับใตนที่ต้องการซ้อมตะลุยโจทย์ภาษาอังกฤษเพื่อเตรียมสอบ TOEIC ครูฝ้ายจัดเต็มให้ 3 วัน 2 คืน สอบไม่ผ่าน คืนเงิน 100% ! สมัครลงเรียนได้ที่ลิ้งนี้เลย http://google.gl/register'}
]

export default class JuneActivityList extends Component {


  _keyExtractor = (item, index) => item.id;

  renderScheduleJune(item){
    return (
      <View style = {{flex:1}}>

        <View style = {{ flex: 1, flexDirection: 'row', paddingTop:15,marginRight: windowWidth * 0.075}}>
        <LinearGradient colors={['#bbe84a','#7bd834', '#3e9e16']} style = {styles.dateBox}>
        <Text style = {styles.textDate}>{item.date}</Text>
        <Text style = {styles.textDate}>JUN</Text>
        </LinearGradient>

        <View style = {{ flex: 5.5, paddingLeft: 10, paddingTop:15}}>
        <View style = {{ padding:13 }}>
        <Text style = {{ fontFamily: Fonts.Kanit_Semibold, color: '#000', fontSize: 16 }}>{item.title}</Text>
        <Text style = {{ fontFamily: Fonts.Prompt, color: '#000', fontSize: 14 }}>
        {item.text}</Text>
        </View>
        </View>
        
        </View>
        </View>
    );

  }

  renderScheduleJuly(item){
    return (
      <View style = {{flex:1,}}>

        <View style = {{ flex: 1, flexDirection: 'row', paddingTop:15,marginRight: windowWidth * 0.075,}}>
        <LinearGradient colors={['#f7c042', '#f2892e','#f26304']} style = {styles.dateBox}>
        <Text style = {styles.textDate}>{item.date}</Text>
        <Text style = {styles.textDate}>JUL</Text>
        </LinearGradient>

        <View style = {{ flex: 5.5, paddingLeft: 10, paddingTop:15}}>
        <View style = {{ padding:13 }}>
        <Text style = {{ fontFamily: Fonts.Kanit_Semibold, color: '#000', fontSize: 16 }}>{item.title}</Text>
        <Text style = {{ fontFamily: Fonts.Prompt, color: '#000', fontSize: 14 }}>
        {item.text}</Text>
        </View>
        </View>
        
        </View>
        </View>
    );

  }


  render() {
    return (
      <View style = {{flex: 1}}>
        {/* <LinearGradient colors={['#bced49', '#3e9e16']} style = {styles.monthBox}> */}
        <View style = {{paddingBottom: 20}}>
        <LinearGradient colors={['#bbe84a','#7bd834', '#3e9e16']} style = {styles.monthBox}>
        <View style = {{ margin:13 }}>
        <Text style = {styles.textMonth}>JUNE 2018</Text>
        </View>
        </LinearGradient>
        <FlatList data = {schedule} keyExtractor={this._keyExtractor}
                        renderItem = {({item}) => this.renderScheduleJune(item)} />
        </View>

        <View style = {{paddingBottom: 20}}>
        <LinearGradient colors={['#f7c042', '#f2892e','#f26304']} style = {styles.monthBox}>
        <View style = {{ margin:13 }}>
        <Text style = {styles.textMonth}>JULY 2018</Text>
        </View>
        </LinearGradient>
        <FlatList data = {schedule} keyExtractor={this._keyExtractor}
                        renderItem = {({item}) => this.renderScheduleJuly(item)} />
        </View>

      </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  monthBox:{
    marginTop:10,
    justifyContent: 'center', 
    alignSelf: 'flex-start', 
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  dateBox:{
    flex:1.2,
    justifyContent: 'center', 
    alignItems:'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  textMonth:{
    color: '#fff',
    fontFamily: Fonts.WendyOneRegular,
    fontSize: 15,
    marginLeft: 17,
    marginRight: 17,

  },
  textDate:{
    color: '#fff',
    fontFamily: Fonts.WendyOneRegular,
    fontSize: 14,
    alignSelf: 'center',
  },
});
