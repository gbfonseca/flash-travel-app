/* eslint-disable global-require */
import React, { ReactElement } from 'react';

import {
  useFonts,
  Inter_700Bold,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import { useAuth } from '~/hooks/auth';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

function Routes(): ReactElement {
  const { signed } = useAuth();
  const [fontsLoaded] = useFonts({
    InterRegular: Inter_400Regular,
    InterMedium: Inter_500Medium,
    InterSemiBold: Inter_600SemiBold,
    InterBold: Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  SplashScreen.hideAsync();
  return signed ? <AuthRoutes /> : <AppRoutes />;
}

export default Routes;
