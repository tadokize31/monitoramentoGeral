const mapOptions = {
  center: [-26.483045553149093, -49.06869237357357],
  zoom:20
}

var marcadores = [];
var camadaMarcadores = "";
var i = 0;
// var casaIcon = L.icon({
//     iconUrl: 'casa.png',
// });

// var baldIcon = L.icon({
//     iconUrl: 'baldeamento.png',
// });

// var AreaIcon = L.icon({
//     iconUrl: 'pin.png',
// });

var markerHtmlStyles = `
  background-color: red;
  width: 1.0rem;
  height: 1.0rem;
  display: block;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

iconRed = L.divIcon({
	className:'custom-div-icon',
	html:`<span style='${markerHtmlStyles}' />`
})


var markerHtmlStyles = `
  background-color: green;
  width: 1.0rem;
  height: 1.0rem;
  display: block;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

iconGreen = L.divIcon({
	className:'custom-div-icon',
	html:`<span style='${markerHtmlStyles}' />`
})

map = new L.map('map',mapOptions);
layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
map.addLayer(layer);
// marker = new L.Marker([-26.483045553149093, -49.06869237357357],{icon:icon});
// casa = new L.Marker([-26.483045553149093, -49.06869237357357],{icon:casaIcon});
// baldeamento = new L.Marker([-26.483045553149093, -49.06869237357357],{icon:baldIcon});
// var checkboxCasa = L.control({position: 'topright'});
// checkboxCasa.onAdd = function (map) {
// 	var div = L.DomUtil.create('div', 'command');
// 	div.innerHTML = '<div id="divcommand" style="background-color: black; display:none;"><div style="padding: 5px;"><input onclick="verificaEnderecoCasa()" value="" id="command" type="checkbox"/><b style="color: white; margin-left: 5px;">MINHA CASA</b></div></div>';
// 	return div;
// };
// checkboxCasa.addTo(map);

// var checkboxBaldeamento = L.control({position: 'topright'});
// checkboxBaldeamento.onAdd = function (map) {
// 	var div = L.DomUtil.create('div', 'command2');
// 	div.innerHTML = '<div id="divcommand2" style="background-color: black; display:none;"><div style="padding: 5px;"><input onclick="verificaBaldeamento()" value="" id="command2" type="checkbox"/><b style="color: white; margin-left: 5px;">MEU BALDEAMENTO</b></div></div>';
// 	return div;
// };
// checkboxBaldeamento.addTo(map);

// var checkRuasAtendo = L.control({position: 'topright'});
// checkRuasAtendo.onAdd = function (map) {
// 	var div = L.DomUtil.create('div', 'command3');
// 	div.innerHTML = '<div id="divcommand3" style="background-color: black; display:none;"><div style="padding: 5px;"><input onclick="verificaArea()" value="" id="command3" type="checkbox"/><b style="color: white; margin-left: 5px;">MINHA AREA</b></div></div>';
// 	return div;
// };
// checkRuasAtendo.addTo(map);


//Funcao que cria os marcadores dos motoristas no mapa
function create_marker(latitude,longitude,dthora,mot,ipmac,ipmacAtual){

	marker = L.marker([latitude, longitude],iconGreen);
	marker.bindPopup(mot+" "+dthora+" "+ipmac);
	marker.setIcon(iconGreen)
	marcadores.push(marker);
	// if(j==0){
	// 	map.setView([latitude,longitude])
	// }
	
	// teste = ipmacAtual.split("\r\n")
	// ipmacAtual = teste[0]

	// if(ipmacAtual == ipmac){
	// 	marker.setIcon(iconGreen)
          
	// }else{
	// 	marker.setIcon(icon)
          
	// }
	
	// temp = ipmacAtual.split(" ")
	// modelo = temp[0]+" - "+temp[1]
	// latlang = L.latLng(latitude,longitude)
	// marker.setLatLng(latlang)
	// marker.bindPopup(dthora+" "+modelo);
	// marker.addTo(map)

    // j+=1
}

function getCoords(){
	
    $.ajax({
		url: "mot.php",
		type: "POST",
		dataType: "html"
	
	}).done(function(resposta) {
		resp = resposta.split('#')
		for (let i = 0; i < resp.length; i++) {
			dados = resp[i].split(",")
			mot = dados[0]
			lat = dados[1]
			lon = dados[2]
			dtHora = dados[3]
			ipmac = dados[4]

			create_marker(lat,lon,dtHora,mot,ipmac,"")
			
		}

		camadaMarcadores = L.layerGroup(marcadores);
		camadaMarcadores.addTo(map);
	})
	setTimeout(getCoords, 30000);
	if(i!=0){
		camadaMarcadores.clearLayers();
	}
	i+=1
	
}


$(function() {
	// while(){
	// 	setTimeout(getCoords, 5000);
	// }
	getCoords()
});


// function getDistanceFromLatLng(lat1, lng1, lat2, lng2, miles) { // miles optional
//         if (typeof miles === "undefined"){miles=false;}
//         function deg2rad(deg){return deg * (Math.PI/180);}
//         function square(x){return Math.pow(x, 2);}
//         var r=6371; // radius of the earth in km
//         lat1=deg2rad(lat1);
//         lat2=deg2rad(lat2);
//         var lat_dif=lat2-lat1;
//         var lng_dif=deg2rad(lng2-lng1);
//         var a=square(Math.sin(lat_dif/2))+Math.cos(lat1)*Math.cos(lat2)*square(Math.sin(lng_dif/2));
//         var d=2*r*Math.asin(Math.sqrt(a));
//         if (miles){return d * 0.621371;} //return miles
//         else{return d;} //return km
//   }

// function getCoords(initiate){
	
// 	document.getElementById("motorista").disabled = "true";
	
	
// 	if(document.getElementById("motorista").value != 0){
// 		if (initiate !== true) {
// 			if(navigator.geolocation){
// 				const options = {
// 					enableHighAccuracy: true,
// 					timeout: Infinity,
// 					maximumAge: 5000
// 				  };
// 				navigator.geolocation.getCurrentPosition(success, error, options);
// 			}else{
// 				alert("Navegador não suporta o sistema, por favor escolha outro")
// 			}
			
// 		}
// 		setTimeout(getCoords, 5000);
// 	}
// 	map.removeLayer(marker)

// }

// function success(pos) {
// 	var dados = {
//         "mot": document.getElementById("motorista").value
//     }
// 	$.ajax({
// 		url: "mot.php",
// 		type: "POST",
// 		data: dados,
// 		dataType: "html"
	
// 	}).done(function(resposta) {
		
// 		resp = resposta.split('#')
// 		coords = resp[0].split(',')
// 		enderecoCasa = resp[1]
// 		ipmac = resp[2]
// 		latitude = coords[0]
// 		longitude = coords[1]
// 		dtHora = coords[2]
// 		ipmacAtual = coords[3]
// 		console.log(ipmac,ipmacAtual)
// 		document.getElementById("divcommand").style.display = divCasa
// 		document.getElementById("command").value = enderecoCasa
// 		document.getElementById("divcommand2").style.display = divBaldeamento
// 		document.getElementById("divcommand3").style.display = divArea
// 		create_marker(latitude, longitude,dtHora,ipmac,ipmacAtual)
		
// 	})
	
//     //coordsBald = [-26.479563715836637, -48.98846753451327] //localização baldeamento
//     //coordsDisk = [-26.483045553149093, -49.06869237357357] //localização disktenha
//     //distancia = getDistanceFromLatLng(crd.latitude,crd.longitude,coordsBald[0],coordsBald[1])
// 	//
// }

// function error(err) {
//     if(err.code == 1){
// 		alert("Permita a localização para continuar usando o sistema")
		
//     }else if(err.code == 2){
//         alert("Erro externo por favor contate o TI")
//     }else{
//         alert("Erro na pagina, reinicie")
//     }
    
// }


// function verificaEnderecoCasa() {
// 	check = document.getElementById("command")
// 	if(check.checked){
// 		divCasa = "none";
// 		if(i==0){
// 			endereco = check.value
// 			addresToCoords(endereco)		
// 		}
// 	}	
//     i += 1;
// }

// function addresToCoords(endereco){
// 	var retorno = ""
// fetch("https://api.geoapify.com/v1/geocode/search?text="+endereco+"&format=json&apiKey=d208aadfbe5d4109ab887e8e9412d81c")
//   .then(response => response.json())
//   .then(result => {
// 		latitude = result["results"][0]["lat"]
// 		longitude = result["results"][0]["lon"]
// 		latlang = L.latLng(latitude,longitude)
// 		map.setView([latitude,longitude])
// 		casa.setLatLng(latlang)
// 		casa.addTo(map)
	  
//   })
//   .catch(error => alert("ENDERECO DO MOTORISTA COM ERROS"));
  
// }

// function verificaBaldeamento(){
// 	check = document.getElementById("command2")
// 	if(check.checked){
// 		divBaldeamento = "none";
// 		var dados = {
// 			"cod": document.getElementById("motorista").value
// 		}
// 		$.ajax({
// 			url: "baldeamento.php",
// 			type: "POST",
// 			data: dados,
// 			dataType: "html"
		
// 		}).done(function(resposta) {

// 			resp = resposta.split(',')
// 			latitude = resp[0]
// 			longitude = resp[1]
// 			map.setView([latitude,longitude])
// 			latlang = L.latLng(latitude,longitude)
// 			baldeamento.setLatLng(latlang)
// 			baldeamento.addTo(map)

			
// 		})
// 	}
// }

// function verificaArea(){
// 	check = document.getElementById("command3")
// 	if(check.checked){
// 		divArea = "none";
// 		var dados = {
// 			"cod": document.getElementById("motorista").value
// 		}
// 		$.ajax({
// 			url: "ruasAtendo.php",
// 			type: "POST",
// 			data: dados,
// 			dataType: "html"
		
// 		}).done(function(resposta) {
// 			if(resposta == ""){
// 				alert("Não existe area pra esse motorista no sistema")
// 			}
// 			else{
// 				coords = resposta.split("#")
// 				for (var i = 0; i < coords.length; i++) {
// 					temp = coords[i].split(",")
// 					latitude = temp[0]
// 					longitude = temp[1]
// 					areaAtendo = new L.Marker([latitude,longitude],{icon:AreaIcon});
// 					areaAtendo.addTo(map)
					
// 				}
// 				verificaColetas()
// 				verificaEntregas()
// 			}

// 		})
// 	}
// }

// function verificaColetas(){
// 		var dados = {
// 			"cod": document.getElementById("motorista").value
// 		}
// 		$.ajax({
// 			url: "coletas.php",
// 			type: "POST",
// 			data: dados,
// 			dataType: "html"
		
// 		}).done(function(resposta) {
// 			coletas = resposta.split("#")
// 			for (var i = 0; i < coletas.length; i++) {
// 				temp = coletas[i].split(",")
// 				pedido = temp[0]
// 				endereco = temp[1]
// 				numero  =temp[2]
// 				cidade = temp[3]
// 				uf = temp[4]
// 				coordsColetas(endereco+" "+numero+" ,"+cidade+"-"+uf,pedido)
// 			}

// 		})
// }


// function coordsColetas(endereco,pedido){
// fetch("https://api.geoapify.com/v1/geocode/search?text="+endereco+"&format=json&apiKey=d208aadfbe5d4109ab887e8e9412d81c")
//   .then(response => response.json())
//   .then(result => {
// 		latitude = result["results"][0]["lat"]
// 		longitude = result["results"][0]["lon"]
// 		coletas = new L.Marker([latitude,longitude],{icon:iconBlue});
// 		coletas.addTo(map).on('click', function onclick(){
// 			window.open('https://www4.disktenha.com.br/romaneio/?id='+pedido,'_blank')
// 		  });
		
	  
//   })
//   .catch(error => alert("COLETA NÃO ENCONTRADA NO ENDEREÇO: "+endereco));
  
// }

// function verificaEntregas(){
// 	var dados = {
// 		"cod": document.getElementById("motorista").value
// 	}
// 	$.ajax({
// 		url: "entregas.php",
// 		type: "POST",
// 		data: dados,
// 		dataType: "html"
	
// 	}).done(function(resposta) {
// 		entregas = resposta.split("#")
// 		for (var i = 0; i < entregas.length; i++) {
// 			temp = entregas[i].split(",")
// 			pedido = temp[0]
// 			endereco = temp[1]
// 			numero  =temp[2]
// 			cidade = temp[3]
// 			uf = temp[4]
// 			coordsEntregas(endereco+" "+numero+" ,"+cidade+"-"+uf,pedido)
// 		}

// 	})
// }


// function coordsEntregas(endereco,pedido){
// fetch("https://api.geoapify.com/v1/geocode/search?text="+endereco+"&format=json&apiKey=d208aadfbe5d4109ab887e8e9412d81c")
// .then(response => response.json())
// .then(result => {
// 	latitude = result["results"][0]["lat"]
// 	longitude = result["results"][0]["lon"]
// 	coletas = new L.Marker([latitude,longitude],{icon:iconPurple});
// 	coletas.addTo(map).on('click', function onclick(){
// 		window.open('https://www4.disktenha.com.br/romaneio/?id='+pedido,'_blank')
// 	  });
	
  
// })
// .catch(error => alert("ENTREGA NÃO ENCONTRADA NO ENDEREÇO: "+endereco));

// }


