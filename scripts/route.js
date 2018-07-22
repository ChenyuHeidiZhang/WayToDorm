var map, infoWindow;
var origin;
var directionsService, directionDisplay;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.326731, lng: -76.619251},
    zoom: 15
  });
  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      pos = {lat: 39.329194, lng: -76.619256};      //for demo purposes only

      origin = pos;
      
      service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: pos,
        radius: '500',
        //type: ['store'],
        openNow: true
      }, callback_nearbySearch);
      function callback_nearbySearch(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker_nearbySearch(results[i].geometry.location);
          }
        }
      }
      function createMarker_nearbySearch(position) {
        //var placeLoc = position;
        var marker = new google.maps.Marker({
          map: map,
          position: position,
          icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        });
        //marker.setMap(map);
    
        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.setContent(position.name);
          infoWindow.open(map, this);
        });
      }

      directionsService = new google.maps.DirectionsService;
      directionsDisplay = new google.maps.DirectionsRenderer({
        map: map,
        panel: document.getElementById('right-panel')
      });

      //infoWindow.setPosition(pos);
      //infoWindow.setContent("Current Location");
      //infoWindow.open(map);
      map.setCenter(pos);
      createMarker(pos);

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


  $('#enter-address-btn').on('click', function() {
      var input = document.getElementById('address');
      request = {
          query: input.value,
          fields: ['name', 'geometry']
      };
      service.findPlaceFromQuery(request, callback);
  })
  function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
          var place = results[0];
          createMarker(results[0].geometry.location);
          displayRoute(origin, results[0].geometry.location, directionsService, directionsDisplay);
      } 
  }

};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function createMarker(position) {
  new google.maps.Marker({
      position: position,
      map: map
  });
}

function displayRoute(origin, destination, service, display) {
  service.route({
    origin: origin,
    destination: destination,
    waypoints: [],
    travelMode: 'WALKING',
    avoidTolls: true
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}
