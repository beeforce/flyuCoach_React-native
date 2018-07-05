import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        size={23}
        style={{ paddingBottom: -3 }}
        color={this.props.focused ? '#59aa08' : Colors.tabIconDefault}
      />
    );
  }
}