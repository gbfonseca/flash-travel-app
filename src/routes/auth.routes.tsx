import React, { ReactElement } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { CustomDrawer, Map } from '~/screens';

const App = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackRoutes(): ReactElement {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <App.Screen name="Map" component={Map} />
    </App.Navigator>
  );
}

function AuthRoutes(): ReactElement {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Map" component={StackRoutes} />
    </Drawer.Navigator>
  );
}

export default AuthRoutes;
