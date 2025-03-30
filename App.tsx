import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, Text, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import SignUpScreen from './Screens/SignUpScreen';
import HomeScreen from './Screens/HomeScreen';

function App(): React.JSX.Element {
  
  return(
    <SignUpScreen/>
  )
}



export default App;