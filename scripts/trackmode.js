// if trackmode is on
// send text message with location of the user to the contact


$('.switch').on('change', '#track-switch', function() {
  var isChecked = $(this).prop("checked");
  if (isChecked) {

  } 
});


function sendText(){
  var app = {
    sendSms: function() {
      var number = document.getElementById('number2').value.toString(); /* iOS: ensure number is actually a string */
      var message = document.getElementById('message').value;
      console.log("number=" + number + ", message= " + message);

      //CONFIGURATION
      var options = {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
              intent: 'INTENT'  // send SMS with the native android SMS messaging
              //intent: '' // send SMS without open any other app
          }
      };

      var success = function () { alert('Message sent successfully'); };
      var error = function (e) { alert('Message Failed:' + e); };
      sms.send(number, message, options, success, error);
    }
  };

  var app = {
  checkSMSPermission: function() {
      var success = function (hasPermission) { 
          if (hasPermission) {
              sms.send("2333333");
          }
          else {
              // show a helpful message to explain why you need to require the permission to send a SMS
              // read http://developer.android.com/training/permissions/requesting.html#explain for more best practices
          }
      };
      var error = function (e) { alert('Something went wrong:' + e); };
      sms.hasPermission(success, error);
  },
  requestSMSPermission: function() {
      var success = function (hasPermission) { 
          if (!hasPermission) {
              sms.requestPermission(function() {
                  console.log('[OK] Permission accepted')
              }, function(error) {
                  console.info('[WARN] Permission not accepted')
                  // Handle permission not accepted
              })
          }
      };
      var error = function (e) { alert('Something went wrong:' + e); };
      sms.hasPermission(success, error);
    }
  };
}



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


$("#text-button").on('click', sendText())
$("#text-button2").on('click', sendText())
