/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		
		navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);

    },
    onSuccess: function(position) {
        alert('SUCCESS');
		
		/*
		var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + position.timestamp                    + '<br />';
    */
	},

    // onError Callback receives a PositionError object
    //
    onError: function(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }	
	
};

	var currentLocation = null;
	var destinationLocation = Array(51.467226 , -3.165533);

	//CREATE A CALL EVERY X SECONDS (1000 = 1 Second)
	startGame();
	
	function myTimer() {
		//CHECK GPS SIGNAL IS AVAIALABLE AND THEN PASS THE LAT LONG INTO THE FUNCTION
		if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
			
			//LIMIT MY LOCATION DOWN TO ONE METER
			var myLat = (pos.coords.latitude).toFixed(6);
			var myLong = (pos.coords.longitude).toFixed(6);
			
			//SET CURRENT LOCATION ARRAY
			currentLocation = Array(myLat, myLat);
			
			distance = getDistance(currentLocation, destinationLocation);
			
			$('#circle').html(distance);
			$('#geolocation').html('lat:' + myLat + ' long:' + myLat);
			
		}, function(error) {
			// ...
		}, { maximumAge: 500, enableHighAccuracy: true });
	}
	
	//START THE GAME
	function startGame(){
		//CREATE A CALL EVERY X SECONDS (1000 = 1 Second)
		walkingAround = setInterval(function(){myTimer()},1000);			
	}
	
	
	//HAVERSIGN FUNCTIONS
	var rad = function(x) {
	  return x * Math.PI / 180;
	};
	
	//FUNCTION TO GET METERS FROM LOCATION
	//returns the number of meeters between two gps co-ordinates 
	var getDistance = function(p1, p2) {
	  var R = 6378137; // Earth’s mean radius in meter
	  var dLat = rad(p2[0] - p1[0]);
	  var dLong = rad(p2[1] - p1[1]);
	  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(rad(p1[0])) * Math.cos(rad(p2[0])) *
		Math.sin(dLong / 2) * Math.sin(dLong / 2);
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	  var d = R * c;
	  return d; // returns the distance in meter
	};	
	
	/*
	var getDistance = function(p1, p2) {
	  var R = 6378137; // Earth’s mean radius in meter
	  var dLat = rad(p2.lat() - p1.lat());
	  var dLong = rad(p2.lng() - p1.lng());
	  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
		Math.sin(dLong / 2) * Math.sin(dLong / 2);
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	  var d = R * c;
	  return d; // returns the distance in meter
	};		
	*/