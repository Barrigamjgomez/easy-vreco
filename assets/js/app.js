function initMap(){
	
	var laboratoriaChile = { lat:-33.4488897, lng:-70.6692655 }
	var map = new google.maps.Map(document.getElementById('map'), { 
		Zoom: 18,
		center:laboratoriaChile 
  });
	var marketLaboratoria = new google.maps.Marker({
		position: laboratoriaChile,
		map:map
  });


	function buscar(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(good,bad);
		}
	}
	document.getElementById("encuentrame").addEventListener("click",buscar);

  var latitud, longitud;
  var good = function (position){
		latitud = position.coords.latitude;
		longitud = position.coords.longitude;


		var miUbicacion = new google.maps.Marker({
		position : {lat:latitud, lng:longitud},
		nimation: google.maps.Animation.DROP,
		map: map
		});

		map.setZoom(18);
		map.setCenter({lat:latitud, lng:longitud});
  }

	var bad = function (error){
		alert("Tenemos un problema con encontrar tu ubicacion");
	}

//document.getElementById("encuentrame").addEventListener("click",buscar);

	var inputPartida = document.getElementById("punto-partida");
	var inputDestino = document.getElementById("punto-destino");

	new google.maps.places.Autocomplete(inputPartida);
	new google.maps.places.Autocomplete(inputDestino);

	var directionsService = new google.maps.DirectionsService();//obtener coordenadas
	var directionsDisplay = new google.maps.DirectionsRenderer();//traduce coordenadas de la ruta visible

	directionsDisplay.setMap(map);
	var trazaRuta = function(){
	   calculateAndDisplayRoute(directionsService,directionsDisplay);
	};
	document.getElementById("traza-ruta").addEventListener("click",trazaRuta);

	var calculateAndDisplayRoute = function(directionsService, directionsDisplay){
		directionsService.route({
				origin: inputPartida.value,
				destination: inputDestino.value,
				travelMode: "DRIVING"
			}, function(response, status){
				if (status === "OK"){
					directionsDisplay.setDirections(response);
				}else{
					window.alert("no encontramos una ruta");
				};
		});
	}
	 //document.getElementById("traza-ruta").addEventListener("click",trazaRuta);
}