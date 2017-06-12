var cargarPagina = function(){
	obtenerNombresPokemons();
	$(document).on("click",".pokebutton",mostrarInfoPokemon);
	$('.modal').modal();
}
var obtenerNombresPokemons = function(){
	$.getJSON("http://pokeapi.co/api/v2/pokemon/",
		 function (response) {
		 var pokemons = response.results;
		 crearPokemons(pokemons);
	});
};
function crearPokemons(pokemons) {
	var $seccion = $("#pokemons");
	pokemons.forEach(function (pokemon) {
		var url= pokemon.url;
		url= url.replace("pokemon","pokemon-species");
		 var $divContenedor = $("<div/>",{"class":"pokebutton", "data-target": "modal1", "data-url":url, "data-nombre":pokemon.name});
		 var $imagen = $("<img/>",{"src":"https://dummyimage.com/150x150", "alt":"imagenPokemon"});
		 var $nombre = $('<p/>', {"class":"name"});
     $nombre.text(pokemon.name);
		 $divContenedor.append($imagen);
		 $divContenedor.append($nombre);
     $seccion.append($divContenedor);
	});
}
 var plantilla =
					'<div id="" class="modal-content">'+
					 	'<img src="https://dummyimage.com/150x150" alt="">'+
					 	'<h3 class="text-uppercase">_nombre_</h3>'+
					 	'<p>COLOR: _green_</p>'+
					 	'<p>HABITAT: _grassland_</p>'+
					 	'<p>SHAPE: _cuadruped_</p>'+
					 	'<p>GENERA: _seed_</p>'+
		 	 		'</div>'+
					'<div class="modal-footer">' +
						'<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Atrás</a>' +
	 				'</div>';

var mostrarInfoPokemon = function(){
	console.log(mostrarInfoPokemon);
	var url = $(this).data("url");
	var name= $(this).data("nombre");
	$.getJSON(url, function (response) {
			 var	descripcion = {
				 color:response.color.name,
				 habitat:response.habitat.name,
				 shape:response.shape.name,
				 genera:response.genera[0].genus
			 };
		modal(descripcion,name);
	});
};

var modal= function (descripcion,name){
var $modalContenedor = $("#modal1");
	$modalContenedor.html(plantilla.replace("_green_",descripcion.color)
	.replace("_grassland_",descripcion.habitat)
	.replace("_cuadruped_",descripcion.shape)
	.replace("_seed_",descripcion.genera)
	.replace("_nombre_", name));
}

$(document).ready(cargarPagina);
