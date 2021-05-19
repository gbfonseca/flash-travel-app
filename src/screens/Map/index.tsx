import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity } from 'react-native';

import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import * as Location from 'expo-location';
import {
  GooglePlacesAutocomplete,
  GooglePlaceData,
} from 'react-native-google-places-autocomplete';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { Flag, MenuShape, Pin } from '~/assets/icons';
import { customMapStyle } from '~/config/custom-style-map';
import { googleAPIKEY } from '~/config/google-key';

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
  const [destination, setDestination] = useState(null);

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

  const handleSetDestination = (data: GooglePlaceData) => {
    // console.log(data);
    setDestination(data.description);
  };

  const RouteMemo = useMemo(() => {
    return (
      <MapViewDirections
        origin={location}
        destination={destination}
        apikey={googleAPIKEY}
        mode="DRIVING"
        precision="low"
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
          onPress={(value) =>
            setDestination({
              latitude: value.nativeEvent.coordinate.latitude,
              longitude: value.nativeEvent.coordinate.longitude,
            })
          }
          showsUserLocation
          showsMyLocationButton
        >
          {destination && (
            <>
              <Marker draggable coordinate={location} image={Pin} />
              {/* <Marker draggable coordinate={destination} image={Flag} /> */}
              {RouteMemo}
            </>
          )}
        </MapStyled>
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
            <GooglePlacesAutocomplete
              placeholder="Para onde deseja ir ?"
              suppressDefaultStyles
              isRowScrollable={false}
              query={{
                key: googleAPIKEY,
                language: 'pt-BR',
                components: 'country:br',
                location: 'latitude,longitude',
              }}
              styles={{
                description: { display: 'none' },
                textInputContainer: {
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                textInput: {
                  marginLeft: 10,
                  height: 50,
                  fontSize: 17,
                  color: '#515151',
                  width: '100%',
                },
                powered: { display: 'none' },
                container: { width: '100%', elevation: 0 },
              }}
              renderRow={(item: GooglePlaceData) => (
                <LocationsView onPress={() => handleSetDestination(item)}>
                  <IconBackground>
                    <Entypo name="location-pin" size={24} color="white" />
                  </IconBackground>
                  <LocationInfo>
                    <LocationAddress>{item.description}</LocationAddress>
                    <LocationCity>
                      {item.structured_formatting.secondary_text}
                    </LocationCity>
                  </LocationInfo>
                </LocationsView>
              )}
            />
          </SearchView>
          {/* <LocationsView>
            <IconBackground>
              <Entypo name="location-pin" size={24} color="white" />
            </IconBackground>
            <LocationInfo>
              <LocationAddress>83, Midwood St</LocationAddress>
              <LocationCity>New york</LocationCity>
            </LocationInfo>
          </LocationsView> */}
        </BottomView>
      </Content>
    </Container>
  );
}

export default Map;
