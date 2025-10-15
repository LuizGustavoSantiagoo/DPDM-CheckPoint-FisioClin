import * as React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/Login';
import Register from '../pages/Register';

const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: Login,
      options: {title: 'Log-in'},
    },
    Register: {
      screen: Register,
      options: {title: 'Register'}
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}