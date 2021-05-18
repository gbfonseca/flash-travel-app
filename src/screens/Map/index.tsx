import React, { ReactElement, useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity } from 'react-native';

import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';

import { MenuShape } from '~/assets/icons';

import {
  Container,
  MapStyled,
  Content,
  IconButton,
  BottomView,
  ButtonDraggable,
  SearchView,
  Input,
  LocationsView,
  IconBackground,
  LocationInfo,
  LocationAddress,
  LocationCity,
} from './styles';

type LocationType = {
  latitude: number;
  longitude: number;
};

function Map(): ReactElement {
  const [location, setLocation] = useState<LocationType>(null);
  const isDrawerOpen = useIsDrawerOpen();

  const navigation = useNavigation<any>();
  useEffect(() => {
    const loadPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permissão de localização foi negada');
        return;
      }
      const position = await Location.getCurrentPositionAsync({ accuracy: 5 });
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };
    loadPermissions();
  }, []);

  const handleDrawer = () => {
    if (isDrawerOpen) {
      navigation.closeDrawer();
    } else {
      navigation.openDrawer();
    }
  };

  if (!location) {
    return (
      <Container>
        <Text>Permissão de Localização Obrigatória</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <MapStyled
          provider="google"
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034,
          }}
          showsUserLocation
          showsMyLocationButton
        />
        <IconButton onPress={handleDrawer}>
          <Image source={MenuShape} />
        </IconButton>
        <BottomView>
          <TouchableOpacity
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
            }}
          >
            <ButtonDraggable />
          </TouchableOpacity>
          <SearchView>
            <Feather name="search" size={21} color="#1152FD" />
            <Input placeholder="Para onde deseja ir ?" />
          </SearchView>
          <LocationsView>
            <IconBackground>
              <Entypo name="location-pin" size={24} color="white" />
            </IconBackground>
            <LocationInfo>
              <LocationAddress>83, Midwood St</LocationAddress>
              <LocationCity>New york</LocationCity>
            </LocationInfo>
          </LocationsView>
        </BottomView>
      </Content>
    </Container>
  );
}

export default Map;
