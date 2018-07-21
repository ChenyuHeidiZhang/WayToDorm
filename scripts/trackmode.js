// if trackmode is on
// send text message with location of the user to the contact


$('.switch').on('change', '#track-switch', function() {
  var isChecked = $(this).prop("checked");
  if (isChecked) {
    

  } 
});




var infoWindow;

if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function(position) {
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  $("#message").val("I'm in danger. Please come and get me. Location: lat: "
  	+position.coords.latitude+", lng: "+position.coords.longitude+". --Automatically sent from WayToDorm");

}, function() {
  handleLocationError(true, infoWindow, map.getCenter());
});
} else {
// Browser doesn't support Geolocation
handleLocationError(false, infoWindow, map.getCenter());
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

