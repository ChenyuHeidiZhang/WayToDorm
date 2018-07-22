$('.btn').on('click', function() {
    var input = document.getElementById('address');
    service = new google.maps.places.PlacesService(map);
    request = {
        query: input.value,
        fields: ['name', 'geometry']
    };
    service.findPlaceFromQuery(request, callback);
})
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log('OK');
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }        
};