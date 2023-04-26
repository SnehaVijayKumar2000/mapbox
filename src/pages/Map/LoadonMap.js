import { useState, useEffect } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const LoadonMap = () => {
  const [map, setMap] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Load GeoJSON data
    const fetchData = async () => {
      const res = await fetch('C:\Users\sneha\climate-risk\src\pages\Map\UI_UX_Developer_Work_Sample_Data.geojson');
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3ZpamF5a3VtYXIiLCJhIjoiY2xndTFxMWR1MjBrMDNzanNkbjVjc3pmaCJ9.MS83i4MxyiQuiaotZ2z2og';

    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 2
      });

      map.on('load', () => {
        // Add the data source to the map
        map.addSource('my-data', {
          type: 'geojson',
          data: data
        });

        // Add the layer to the map
        map.addLayer({
          id: 'my-layer',
          type: 'circle',
          source: 'my-data',
          paint: {
            'circle-color': '#ff0000',
            'circle-radius': 8
          }
        });
      });

      setMap(map);
    };

    if (!map) initializeMap();
  }, [data]);

  return (
    <div>
      <div id="map" style={{ height: '500px' }} />
    </div>
  );
};

export default LoadonMap;
