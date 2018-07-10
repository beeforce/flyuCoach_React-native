import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import JuneActivityList from '../styles/activityList/juneActivityList';
import { Fonts } from '../../utils/Fonts';
import { LinearTextGradient } from 'react-native-text-gradient';

export default class ScheduleScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView style={{flex:1, backgroundColor: '#fff'}}>
      <LinearTextGradient
        style={styles.textTopicQuestion}
        locations={[0, 1]}
        colors={['#7bd834', '#3e9e16']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        >
        ตารางกิจกรรม
        </LinearTextGradient>
      <View style={styles.container}>
      </View>
      <JuneActivityList />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  textTopicQuestion:{
    fontSize: 22,
    fontFamily: Fonts.MosseThai_Bold,
    marginLeft: 25,
    marginTop: 25
  },
});
