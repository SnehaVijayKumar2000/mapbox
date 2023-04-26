// Load and parse the sample dataset
fetch('UI_UX Developer Work Sample Data.xlsx')
  .then(function(response) {
    return response.arrayBuffer();
  })
  .then(function(buffer) {
    var workbook = XLSX.read(buffer, {type: 'array'});
    var sheet = workbook.Sheets['Sheet1'];
    var data = XLSX.utils.sheet_to_json(sheet);

    // Initialize the map
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3ZpamF5a3VtYXIiLCJhIjoiY2xndTIwdDF1MHl1dDNlczg5amF1ZHRsdiJ9.uW3rsUIbFhn6iKKe813Gfg';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-96, 37.8],
      zoom: 3
    });

    // Add the decade selector control
    var decadeSelector = document.getElementById('decade-selector');
    decadeSelector.addEventListener('change', function() {
      var decade = parseInt(this.value);
      updateMarkers(decade);
    });

    // Initialize the markers
    var markers = {
      type: 'FeatureCollection',
      features: []
    };
    data.forEach(function(d) {
      var decade = Math.floor(d.Year / 10) * 10;
      var marker = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [d.Longitude, d.Latitude]
        },
        properties: {
          title: d['Asset Name'],
          description: d['Business Category'],
          riskRating: d['Risk Rating']
        }
      };
      markers.features.push(marker);
    });

    // Define the color scale
    var colorScale = [
      [1, '#d1e5f0'],
      [2, '#92c5de'],
      [3, '#4393c3'],
      [4, '#2166ac'],
      [5, '#053061']
    ];

    // Update the markers based on the selected decade
    function updateMarkers(decade) {
      var filteredMarkers = {
        type: 'FeatureCollection',
        features: []
      };
      markers.features.forEach(function(marker) {
        var markerDecade = Math.floor(marker.properties.decade / 10) * 10;
        if (markerDecade === decade) {
          filteredMarkers.features.push(marker);
        }
      });
      map.getSource('markers').setData(filteredMarkers);
    }

    // Add the markers to the map
    map.on('load', function() {
      map.addSource('markers', {
        type: 'geojson',
        data: markers
      });
      map.addLayer({
        id: 'markers',
        type: 'circle',
        source: 'markers',
        paint: {
          'circle-radius': {
            base: 1.75,
            stops: [
              [12, 2],
              [22, 180]
            ]
          },
          'circle-color': {
            property: 'riskRating',
            stops: colorScale
          },
          'circle-opacity': 0.8
        }
      });

      // Add interactivity to the markers
      map.on('mouseenter', 'markers', function(e) {
        map.getCanvas().style.cursor = 'pointer';
        var coordinates = e.features[0].geometry.coordinates.slice();
        var title = e.features[0].properties.title;
        var description = e.features[0].properties.description;
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<h3>${title}</h3><p>${description}</p>`)
          .addTo(map);
      });

     

          });
          
          map.on('mouseleave', 'markers', function() {
          map.getCanvas().style.cursor = '';
          map.getCanvas().querySelector('.mapboxgl-popup').remove();
          });
          });
