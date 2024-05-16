 // Initialize map
 const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([0, 0]),
      zoom: 2
    })
  });

  // Add an empty vector source to hold pins
  const pinSource = new ol.source.Vector();
  const pinLayer = new ol.layer.Vector({
    source: pinSource
  });
  map.addLayer(pinLayer);

  document.getElementById('locate_Pindrop').addEventListener('click', function () {
    // Get longitude and latitude values from input fields
    let lat = parseFloat(document.getElementById("lat").value);
    let lon = parseFloat(document.getElementById("lon").value);

    // Ensure that lon and lat are valid numbers
    if (isNaN(lon) || isNaN(lat) || lon < -180 || lon > 180 || lat < -90 || lat > 90) {
      alert("Please enter valid longitude (-180 to 180) and latitude (-90 to 90) values.");
      return;
    }

    // Center the map view to the specified coordinates
    map.getView().setCenter(ol.proj.fromLonLat([lon, lat]));
    map.getView().setZoom(15); // Set desired zoom level

    // Drop a pin at the specified coordinates
    let pinFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
    });

    // Add the pin feature to the pin source
    pinSource.addFeature(pinFeature);

    let pinStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        src: './image/pinn.png' // URL to the pin icon
      })
    });

    pinFeature.setStyle(pinStyle);
  });

  document.getElementById('locate_Pinremove').addEventListener('click', function () {
    pinSource.clear(); // Clear all features from the pin source
  });