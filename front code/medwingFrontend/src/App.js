/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { MapScreen } from './components/screens/map';
import {
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import { HelpScreen } from "./components/screens/help";

console.disableYellowBox = true; 

  class Nearby extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <MapScreen />
        </View>
      );
    }
  }
  
  class Instructions extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <HelpScreen />
        </View>
      );
    }
  }

  const TabNavigator = createBottomTabNavigator({
    Nearby: {
      screen: Nearby,
      path: '../assets/globe',
      navigationOptions: {
             showLabel: true,
             tabBarIcon: <Image source={require('../assets/globe.png')}/>,
             showIcon: true
      }
    },
    Instructions: {
      screen: Instructions,
      path: '../assets/help',
      navigationOptions: {
             showLabel: true,
             tabBarIcon: <Image source={require('../assets/help.png')}/>,
             showIcon: true
      }
    }
  });
  
  export default createAppContainer(TabNavigator);