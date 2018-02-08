function initMap(){
	
	var laboratoriaChile = { lat:-33.4488897, lng:-70.6692655 }
	var map = new google.maps.Map(document.getElementById('map'), { //llamamos al mapa de la ipe para que salga de el html
		Zoom: 18,
		center:laboratoriaChile 
  });
	var marketLaboratoria = new google.maps.Marker({ 
		position: laboratoriaChile,
		map:map,
		title:"Aqui Estas"
  });


	function buscar(){ //está funcion es la que busca la ruta donde estamos
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(good,bad);
		}
	}
	document.getElementById("encuentrame").addEventListener("click",buscar); //llama a id del boton y le da la funcion al boton con el evento que busca donde estamos ubicados 

  var latitud, longitud;
  var good = function (position){  //funcion para encontrar la ruta
		latitud = position.coords.latitude;
		longitud = position.coords.longitude;


		var miUbicacion = new google.maps.Marker({ //variable que toma el valor de google.maps
		position : {lat:latitud, lng:longitud},
		nimation: google.maps.Animation.DROP,
		map: map,
		title:"Aqui Estas"
		});

		map.setZoom(18); //zoom del mapa
		map.setCenter({lat:latitud, lng:longitud}); //centrar el mapa en la ubicación
  
    var text = '<h1>Nombre del lugar</h1>'+'<p>Descripcion del lugar</p>'+ 
             '<a "href=https://www.google.com">Pagina web</a>'; 

    var informacion = new google.maps.infoWindow({
       content:texto
    });

    marketLaboratoria.addEventListener('click', function(){
    	informacion.open(miUbicacion, marketLaboratoria)
    });
  }

	var bad = function (error){ //si no encuentraa la ruta, enviar msj a travez de alert
		alert("Tenemos un problema con encontrar tu ubicacion");
	}

//document.getElementById("encuentrame").addEventListener("click",buscar);

	var inputPartida = document.getElementById("punto-partida"); //creamos variable y llamamos el input con el id 
	var inputDestino = document.getElementById("punto-destino"); //creamos variable y llamamos el input con el id

	new google.maps.places.Autocomplete(inputPartida); //llamamos a la variable y la insertamos en google...para darle un nuevo valor de autocompletado
	new google.maps.places.Autocomplete(inputDestino);

	var directionsService = new google.maps.DirectionsService();//obtener coordenadas
	var directionsDisplay = new google.maps.DirectionsRenderer();//traduce coordenadas de la ruta visible

	directionsDisplay.setMap(map);
	var trazaRuta = function(){ //funcion que encuentra la ruta requerida
	   calculateAndDisplayRoute(directionsService,directionsDisplay);
	};
	document.getElementById("traza-ruta").addEventListener("click",trazaRuta);//evento que toma el boton y le da la funcion

	var calculateAndDisplayRoute = function(directionsService, directionsDisplay){ //funcion completa que hace las busqueda la ruta 
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
  
			/*	var position : {lat:latitud, lng:longitud},
				var text = '<h1>Nombre del lugar</h1>'+'<p>Descripcion del lugar</p>'+ 
             '<a "href=https://www.google.com">Pagina web</a>';
*/
