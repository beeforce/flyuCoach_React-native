import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, HeaderBackButton } from 'react-navigation';
import TabBarIcon from '../styles/tabBarIcon';
import FeedScreen from '../screen/FeedScreen';
import VIPsScreen from '../screen/VIPsScreen';
import SettingsScreen from '../screen/settingScreen';
import QandAScreen from '../screen/QandAScreen';
import ScheduleScreen from '../screen/ScheduleScreen';
import ProfileScreen from '../screen/profileScreen';

const FeedStack = createStackNavigator({
  Feed: FeedScreen,
});


//Feed app page
FeedStack.navigationOptions = {
  tabBarLabel: 'Feed',
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
  tabBarLabel: 'Schedule',
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
});

QandAStack.navigationOptions = {
  tabBarLabel: 'Q & A',
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
  tabBarLabel: 'Self Searching',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name= "search"
    />
  ),
};

const navigationOptions = ({ navigation }) => ({
  headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
  headerStyle: {backgroundColor: '#EEEEEE', elevation: 0, shadowOpacity: 0},
  style: { elevation: 0 }
})

//Profile
const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Profile2: {
		screen: SettingsScreen,
		navigationOptions
	}
})

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
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
