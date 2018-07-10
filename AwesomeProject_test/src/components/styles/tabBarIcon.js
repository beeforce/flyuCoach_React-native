import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(IcoMoonConfig);
import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        size={20}
        style={{ paddingBottom: -3, alignSelf: 'center' }}
        color={this.props.focused ? '#59aa08' : Colors.tabIconDefault}
      />
    );
  }
}