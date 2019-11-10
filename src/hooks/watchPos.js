import {useEffect, useState} from 'react';

export const useGeolocation = () => {
    const [currentPosition, setCurrentPosition] = useState({
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: null,
      longitude: null,
      speed: null,
      timestamp: Date.now()
    });
    let mounted = true;
    // let watchId;
  
    const onEvent = event => {
      if (mounted) {
        setCurrentPosition({
          accuracy: event.coords.accuracy,
          altitude: event.coords.altitude,
          altitudeAccuracy: event.coords.altitudeAccuracy,
          heading: event.coords.heading,
          latitude: event.coords.latitude,
          longitude: event.coords.longitude,
          speed: event.coords.speed,
          timestamp: event.timestamp
        });
      }
    };
  
    useEffect(
      () => {
        navigator.geolocation.getCurrentPosition(onEvent);
        // watchId = navigator.geolocation.watchPosition(onEvent);
  
        return () => {
          mounted = false;
        //   navigator.geolocation.clearWatch(watchId);
        };
      },
      [0]
    );
  
    return currentPosition;
  };