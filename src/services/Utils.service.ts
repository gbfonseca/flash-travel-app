import axios from 'axios';

import { PlaceAutoComplete } from '~/models';
import IGeocodigResponse from '~/models/geocodingResponse';

import { googleAPIKEY } from '../config/google-key';

export default {
  async GeocodingAddress(address: string): Promise<IGeocodigResponse> {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address,
          key: googleAPIKEY,
        },
      },
    );

    return response.data;
  },
  async GeocodingLatLng(
    latitude: number,
    longitude: number,
  ): Promise<IGeocodigResponse> {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          latlng: `${latitude},${longitude}`,
          key: googleAPIKEY,
        },
      },
    );

    return response.data;
  },

  async PlaceAutoComplete(address: string): Promise<PlaceAutoComplete> {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      {
        params: {
          input: address,
          language: 'pt-BR',
          components: 'country:br',
          key: googleAPIKEY,
        },
      },
    );
    return response.data;
  },
};
