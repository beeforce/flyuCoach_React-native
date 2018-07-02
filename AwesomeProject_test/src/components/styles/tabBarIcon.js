import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        size={20}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? '#e84393' : Colors.tabIconDefault}
      />
    );
  }
}