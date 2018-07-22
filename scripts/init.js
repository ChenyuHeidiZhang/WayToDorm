function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
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
            console.log(pos);
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
            //map.zoom = 20;
        });
    }
}

module.exports = initMap();