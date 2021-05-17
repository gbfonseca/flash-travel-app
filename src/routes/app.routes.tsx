import React, { ReactElement } from 'react';

import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { SignIn, SignUp } from '~/screens';

const App = createStackNavigator();

function AppRoutes(): ReactElement {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <App.Screen name="SignIn" component={SignIn} />
      <App.Screen name="SignUp" component={SignUp} />
    </App.Navigator>
  );
}

export default AppRoutes;
