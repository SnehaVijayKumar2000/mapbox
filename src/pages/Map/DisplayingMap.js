import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import { Select, MenuItem } from '@material-ui/core';


mapboxgl.accessToken = 'pk.eyJ1Ijoic3ZpamF5a3VtYXIiLCJhIjoiY2xndTFxMWR1MjBrMDNzanNkbjVjc3pmaCJ9.MS83i4MxyiQuiaotZ2z2og';
const initialSelectedDecade = "2030s";
const decadeOptions = [
  "2030s",
  "2040s",
  "2050s",
  "2060s",
  "2070s"
];

function DisplayingMap() {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [selectedDecade, setSelectedDecade] = useState(initialSelectedDecade);
  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-122.4194, 37.7749],
        zoom: 19
      });
      // Add a GeoJSON data source to the map
      map.on("load", () => {
        map.addSource("my-data", {
          type: "geojson",
          data: "C:\Users\sneha\climate-risk\src\pages\Map\UI_UX_Developer_Work_Sample_Data.geojson"
        });
  
        // Add a circle layer to the map using the data source
        map.addLayer({
          id: "my-layer",
          type: "circle",
          source: "my-data",
          paint: {
            "circle-radius": 5,
            "circle-color": "#FF0000"
          },
          filter: ["==", ["get", "decade"], initialSelectedDecade]
        });
  
        // Save the map object to state
        setMap(map);
      });
  
      // // Clean up
      // return () => {
      //   map.remove();
      // };
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      });

      map.addControl(geocoder);

      setMap(map);
       // Clean up
       return () => {
        map.remove();

        setMap(map);
      };
    };

    console.log(map,"mappppp")

    initializeMap()
  }, [map]);
  
  useEffect(() => {
    // Update the filter on the "my-layer" layer whenever the selected decade changes
    if (map) {
      map.setFilter("my-layer", ["==", ["get", "decade"], selectedDecade]);
    }
  }, [selectedDecade]);
  
  return (
    <div>
      {/* <Select
       value={selectedDecade}
       onChange={(event) => setSelectedDecade(event.target.value)}
     >
      {decadeOptions.map((decade) => (
        <MenuItem value={decade} key={decade}>
            {decade}
          </MenuItem>
        ))}
      </Select> */}
       {/* <div id="map" style={{ height: "400px" }}></div> */}
      <div className="map-container" ref={mapContainer} />
  //  </div>
  );
  
}
  
   
export default DisplayingMap;
// {
//   return(
// <div>
//       DisplayingMap
//      </div>
//   )
// }

