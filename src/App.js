import React, {Component} from 'react';
import './App.css';
import Map from './components/Map';
import SearchBar from './components/SearchBar';
// import ErrorBoundary from './components/ErrorBoundary';
// import { useState, useEffect } from "react";

// import useScript from './hooks/googleMap';
// // import usePosition from './hooks/geoCode';
// import {useGeolocation} from './hooks/watchPos';
// import {useInput} from './hooks/userInput';

// function App() {
//   const [searchText, searchBar] = useInput({ type: "text" });
//   const API_KEY = `AIzaSyAEhu-YKPGM30XVTic6jbv8TDn5xKR53R8`;
//   const coords = useGeolocation();
//   const [loaded, error] = useScript(
//     `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
//   );
//   useEffect(() => {
//     if (loaded) {
//       let myLatLng = new window.google.maps.LatLng(coords.latitude, coords.longitude);
//       let myMap = new window.google.maps.Map(document.getElementById("map"), {
//         zoom: 20,
//         center: myLatLng
//       });

//       var marker = new window.google.maps.Marker({
//         position: myLatLng,
//         title: 'You are Here'
//       });

//       marker.setMap(myMap);
//     }
//     else{
//       return
//     }
//   }, [loaded, coords]);
  
//   useEffect(() => {

//   }, []);

  class App extends Component{
    constructor(props){
      super(props);
      this.state = {
        searchText: '',
        mapLocailty: ''
      };
    }

    // handleChange = (e) => {
    //   console.log(e.target.value);
    //   this.setState({
    //     searchText: e.target.value
    //   })
    // }

    handleClick = (e) => {
      console.log(e.target[0].value);
      if(this.state.searchText.length >= 3){
        this.setState({
          searchText: e.target[0].value
        });
      }
      else{
        return;
      }
    }

    render(){
      return (
        <div>
            <SearchBar val={this.state.searchText}
                      handleClick={this.handleClick}
            />
            <Map mapLocailty={this.state.mapLocailty}/>
        </div>
      );
    } 
  }  


export default App;
