import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, 
  Button, 
  Alert
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import UserPage from './userinfo.js'
import ContactsPage from './contactinfo.js'
import Main from './main.js'

const Navigation = StackNavigator({
  Home: {
    screen: UserPage,
    navigationOptions: {
        header: null,
      }
  },
  Second: {
    screen: ContactsPage,
  },
  Main: {
    screen: Main,
  }
})

export default Navigation;




