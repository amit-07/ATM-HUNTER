import React from 'react';
import { useEffect } from "react";

import useScript from '../hooks/googleMap';
import {useGeolocation} from '../hooks/watchPos';

const Map = (props) => {
  const API_KEY = `AIzaSyAEhu-YKPGM30XVTic6jbv8TDn5xKR53R8`;
  const coords = useGeolocation();
  const [loaded] = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
  );
  useEffect(() => {
    if (loaded) {
      let myLatLng = new window.google.maps.LatLng(coords.latitude, coords.longitude);
      let myMap = new window.google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 18,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP
      });

    const handleNearBySearchResults = (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        let placesList = document.getElementById('placeList');
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            let lat = place.geometry.location.lat();
            let lng = place.geometry.location.lng();
            let coords = {lat, lng};
            let listItem = document.createElement('li');
            listItem.textContent = place.name;
            placesList.appendChild(listItem);
            listItem.classList.add("listItems");
            createMarker(coords, place);          
          }
        }
      }
    const addNearByPlaces = (latLng) => {
        var nearByService = new window.google.maps.places.PlacesService(myMap);
        var request = {
          location: latLng,
          radius: 500,
          types: ['atm']
        };
        nearByService.nearbySearch(request, handleNearBySearchResults);
      }

    const createMarker = (latLng, placeResult) => {
        let markerOptions = {
          position: latLng,
          map: myMap,
          animation: window.google.maps.Animation.DROP,
          clickable: true
        }
        //Setting up the marker object to mark the location on the map canvas.
        let marker = new window.google.maps.Marker(markerOptions);
      
        if (placeResult) {
          var content = placeResult.name+"<br/>"+placeResult.vicinity+"<br/>"+placeResult.types;
          addInfoWindow(marker, latLng, content);
        }
        else {
          content = "You are here: " + latLng.lat() + ", " + latLng.lng();
          addInfoWindow(marker, latLng, content);
        }
      }

      const addInfoWindow = (marker, latLng, content) => {
        var infoWindowOptions = {
          content: content,
          position: latLng
        };
      
        var infoWindow = new window.google.maps.InfoWindow(infoWindowOptions);
      
        window.google.maps.event.addListener(marker, "click", function() {
          infoWindow.open(myMap);
        });
      }
      addNearByPlaces(myLatLng);
      createMarker(myLatLng);
    }
    else{
      return
    }
  }, [loaded, coords]);
  
  useEffect(() => {

  }, []);
  return (
    <div>
        <div id="map" style={{ height: "600px" }} />
        <ul id="placeList">
            <li><h2>List of NearBy Atms</h2></li>
            <hr />
        </ul>
    </div>
  );
}

export default Map;
