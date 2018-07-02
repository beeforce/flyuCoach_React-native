import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(IcoMoonConfig);

export default class PinIconImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: false
        };
    }


  render() {
    const { favorite } = this.state;
    return (
        <Icon
            name= 'pin'
            color={favorite ? 'red' : '#2c3e50'}
            size={16}
            style={{ padding: 10 }}
            onPress={() => this.setState({ favorite: !favorite })}
            />
    );
  }
}