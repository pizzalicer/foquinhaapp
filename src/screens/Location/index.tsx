import React, { useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Region, Marker, Polyline } from 'react-native-maps';
import { styles } from './styles';
import { getRelativeCoords } from 'react-native-reanimated';
import { colors } from '../../styles/colors';
import { API_GOOGLE } from '@env'
import { GooglePlaceData, GooglePlacesAutocomplete, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';

type ICoords = {
  latitude: number
  longitude: number
}

export function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>()
  const [marker, setMarker] = useState<Region[]>()
  const [coords, setCoords] = useState<ICoords[]>([])
  const [destination, setDestination] = useState<Region | null>(null)
  const mapRef = useRef<MapView>(null)


  useEffect(() => {
    let subscription: Location.LocationSubscription
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      })
      setMarker([
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }
      ])
      subscription = await Location.watchPositionAsync({
        accuracy: Location.LocationAccuracy.High,
        timeInterval: 1000,
        distanceInterval: 1
      }, (location) => {
        setCoords((prevState) => [...prevState, location.coords])
      })
    })();

    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
  }, []);

  async function handleDestination(data: GooglePlaceData, details: GooglePlaceDetail | null){
    if (details) {
      setDestination({
        latitude: details?.geometry.location.lat,
        longitude: details?.geometry.location.lng,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004
      })
      if (marker) {
        setMarker([...marker, {
          latitude: details?.geometry.location.lat,
          longitude: details?.geometry.location.lng,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004
        }])
      }
    }
  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);

  }
  return (
    <View style={styles.container}>
      {region ? (
        <MapView region={region} style={styles.map}
          showsUserLocation={true}> 
          {marker && marker.map((i)=> (
            <Marker key={i.latitude} coordinate={i} />
          ))}
          {coords && <Polyline
          coordinates={coords}
          strokeColor={colors.black}
          strokeWidth={7}
        />}
        </MapView>
      ) : (
        <Text style={styles.paragraph}>{text}</Text>
      )}
    </View>
  );
}