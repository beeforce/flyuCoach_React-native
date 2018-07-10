import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, HeaderBackButton } from 'react-navigation';
import TabBarIcon from '../styles/tabBarIcon';
import FeedScreen from '../screen/FeedScreen';
import VIPsScreen from '../screen/VIPsScreen';
import SettingsScreen from '../screen/settingScreen';
import QandAScreen from '../screen/QandAScreen';
import ScheduleScreen from '../screen/ScheduleScreen';
import ProfileScreen from '../screen/profileScreen';
import addMoreQuestionScreen from '../screen/addMoreQuestionScreen';
import Colors from '../constants/Colors';

const navigationOptions = ({ navigation }) => ({
  headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
  headerStyle: {backgroundColor: '#EEEEEE', elevation: 0, shadowOpacity: 0},
  style: { elevation: 0 }
})

const FeedStack = createStackNavigator({
  Feed: FeedScreen,
});


//Feed app page
FeedStack.navigationOptions = {
  tabBarLabel: ({focused}) => (
    <Text style={{color: focused ? '#59aa08' : null, alignSelf: 'center', fontSize: 11, paddingBottom:2, paddingTop: -2}}>
      Feed
    </Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name= "th-large"
    />
  ),
};

//Schedule page
const ScheduleStack = createStackNavigator({
  Schedule: ScheduleScreen,
});

ScheduleStack.navigationOptions = {
  tabBarLabel: ({focused}) => (
    <Text style={{color: focused ? '#59aa08' : null, alignSelf: 'center', fontSize: 11, paddingBottom:2, paddingTop: -2}}>
      Activity
    </Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
    focused = {focused}
    name= "calendar"
    />
  ),
  style: {
        paddingTop: 20,
      },
};

//Q&A page
const QandAStack = createStackNavigator({
  QandA: QandAScreen,
  addQuestion: {
		screen: addMoreQuestionScreen,
	}
});

QandAStack.navigationOptions = {
  tabBarLabel: ({focused}) => (
    <Text style={{color: focused ? '#59aa08' : null, alignSelf: 'center', fontSize: 11, paddingBottom:2, paddingTop: -2}}>
      Question
    </Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name= "comments"
    />
  ),
};

//VIP page
const VIPsStack = createStackNavigator({
  VIPs: VIPsScreen,
});

VIPsStack.navigationOptions = {
  tabBarLabel: ({focused}) => (
    <Text style={{color: focused ? '#59aa08' : null, alignSelf: 'center', fontSize: 11, paddingBottom:2, paddingTop: -2}}>
      Self Finding
    </Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name= "search"
    />
  ),
};

//Profile
const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Profile2: {
		screen: SettingsScreen,
		navigationOptions
	}
})

ProfileStack.navigationOptions = {
  tabBarLabel: ({focused}) => (
    <Text style={{color: focused ? '#59aa08' : null, alignSelf: 'center', fontSize: 11, paddingBottom:2, paddingTop:-2}}>
      Profile
    </Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
    focused = {focused}
    name= "address-card"
    />
  ),
};

export default createBottomTabNavigator({
  FeedStack,
  ScheduleStack,
  QandAStack,
  VIPsStack,
  ProfileStack,
});
