/* eslint-disable react/style-prop-object */
import 'react-native-gesture-handler';
import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';

import light from './styles/themes/light';

import { AuthProvider } from './hooks/auth';
import Routes from './routes';

export default function App(): ReactElement {
  return (
    <NavigationContainer>
      <ThemeProvider theme={light}>
        <StatusBar style="dark" networkActivityIndicatorVisible />
        <View style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </View>
      </ThemeProvider>
    </NavigationContainer>
  );
}
