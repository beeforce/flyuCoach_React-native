import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

const AppNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
});

export default class RootNavigation extends React.Component {
  static navigationOptions = {
    header: null,
  }
  render() {
    // return <AppNavigator screenProps={this.props} />;
    return(
      <AppNavigator />
    );
  }
}
