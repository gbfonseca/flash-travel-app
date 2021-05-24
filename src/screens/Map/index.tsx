import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';

import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import * as Location from 'expo-location';
import { ScrollView } from 'react-native-gesture-handler';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { Flag, MenuShape, OriginDestiny, Pin } from '~/assets/icons';
import { customMapStyle } from '~/config/custom-style-map';
import { googleAPIKEY } from '~/config/google-key';
import { PlaceAutoComplete } from '~/models';
import { Prediction } from '~/models/PlaceAutoComplete';
import UtilsService from '~/services/Utils.service';

import {
  Container,
  MapStyled,
  Content,
  IconButton,
  BottomView,
  ButtonDraggable,
  SearchView,
  LocationsView,
  IconBackground,
  LocationInfo,
  LocationAddress,
  LocationCity,
  Input,
  ContentSearch,
  ShowMapButton,
  ShowMapText,
} from './styles';

type LocationType = {
  latitude: number;
  longitude: number;
};

function Map(): ReactElement {
  const [location, setLocation] = useState<LocationType>(null);
  const [locationAddress, setLocationAddress] = useState<string>(null);
  const [destination, setDestination] = useState<LocationType>(null);
  const [destinationAddress, setDestinationAddress] = useState<string>(null);
  const [expand, setExpand] = useState(false);
  const [places, setPlaces] = useState<PlaceAutoComplete>(null);
  const [focus, setFocus] = useState('destiny');

  const isDrawerOpen = useIsDrawerOpen();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const handlePlaceAutoComplete = async (value: string) => {
    if (value.length > 4) {
      const response = await UtilsService.PlaceAutoComplete(value);
      setPlaces(response);
    }
  };

  const handleSetDestination = async (data: Prediction) => {
    try {
      const response = await UtilsService.GeocodingAddress(data.description);
      const { location: geocodigLocation } = response.results[0].geometry;
      setDestination({
        latitude: geocodigLocation.lat,
        longitude: geocodigLocation.lng,
      });
      setDestinationAddress(data.description);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetOrigin = async (data: Prediction) => {
    try {
      const response = await UtilsService.GeocodingAddress(data.description);
      const { location: geocodigLocation } = response.results[0].geometry;
      setLocation({
        latitude: geocodigLocation.lat,
        longitude: geocodigLocation.lng,
      });
      setLocationAddress(data.description);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDestinationOnMarker = async (value) => {
    try {
      const { coordinate } = value.nativeEvent;
      const response = await UtilsService.GeocodingLatLng(
        coordinate.latitude,
        coordinate.longitude,
      );
      const { location: geocodigLocation } = response.results[0].geometry;
      const { formatted_address } = response.results[0];
      setDestination({
        latitude: geocodigLocation.lat,
        longitude: geocodigLocation.lng,
      });
      setDestinationAddress(formatted_address);
    } catch (error) {
      console.log(error);
    }
  };

  const RouteMemo = useMemo(() => {
    return (
      <MapViewDirections
        origin={location}
        destination={destination}
        apikey={googleAPIKEY}
        mode="DRIVING"
        precision="high"
        strokeWidth={3}
        strokeColor="#1152FD"
        onStart={(params) => {
          console.log(
            `Started routing between "${params.origin}" and "${params.destination}"`,
          );
        }}
      />
    );
  }, [destination, location]);

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
          customMapStyle={customMapStyle}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034,
          }}
          onPress={(value) => handleDestinationOnMarker(value)}
          showsUserLocation
          showsMyLocationButton
        >
          {destination && (
            <>
              <Marker draggable coordinate={location} image={Pin} />
              <Marker draggable coordinate={destination} image={Flag} />
              {RouteMemo}
            </>
          )}
        </MapStyled>
        <IconButton onPress={handleDrawer}>
          <Image source={MenuShape} />
        </IconButton>
        <BottomView expand={expand}>
          <TouchableOpacity
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
            }}
            onPress={() => setExpand((prevState) => !prevState)}
          >
            <ButtonDraggable />
          </TouchableOpacity>
          <ContentSearch expand={expand}>
            {expand && (
              <Image source={OriginDestiny} style={{ marginRight: 10 }} />
            )}
            <View style={{ width: '90%' }}>
              {expand && (
                <SearchView expand={expand}>
                  <Input
                    placeholder="Onde você está?"
                    value={locationAddress}
                    onChangeText={async (value) => {
                      handlePlaceAutoComplete(value);
                      setLocationAddress(value);
                    }}
                    onFocus={() => setFocus('origin')}
                  />
                </SearchView>
              )}
              <SearchView expand={expand} style={{ borderBottomWidth: 0 }}>
                {!expand && <Feather name="search" size={24} color="#1152FD" />}
                <Input
                  placeholder="Para onde deseja Ir?"
                  value={destinationAddress}
                  onChangeText={async (value) => {
                    handlePlaceAutoComplete(value);
                    setDestinationAddress(value);
                  }}
                  onFocus={() => setFocus('destiny')}
                />
              </SearchView>
            </View>
          </ContentSearch>
          {expand && (
            <ShowMapButton>
              <FontAwesome name="map-pin" size={24} color="#1152FD" />
              <ShowMapText>Visualizar no Mapa</ShowMapText>
            </ShowMapButton>
          )}
          <ScrollView style={{ width: '90%' }}>
            {places?.predictions.map((place) => (
              <LocationsView
                key={place.description}
                onPress={() => {
                  if (focus === 'destiny') {
                    handleSetDestination(place);
                  } else {
                    handleSetOrigin(place);
                  }
                }}
              >
                <IconBackground>
                  <Entypo name="location-pin" size={24} color="white" />
                </IconBackground>
                <LocationInfo>
                  <LocationAddress>{place.description}</LocationAddress>
                  <LocationCity>
                    {place?.terms?.pop()?.value}, {place?.terms?.pop()?.value}
                  </LocationCity>
                </LocationInfo>
              </LocationsView>
            ))}
          </ScrollView>
        </BottomView>
      </Content>
    </Container>
  );
}

export default Map;
