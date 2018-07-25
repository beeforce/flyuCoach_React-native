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
      <ScrollView style={{flex:1, backgroundColor: '#f6f6f6'}}>
      <LinearTextGradient
        style={styles.textTopicQuestion}
        locations={[0, 1]}
        colors={['#429321', '#b4ec51']}
        start={{ x: 0, y: 1.5 }}
        end={{ x: 0, y: 0.5 }}
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
