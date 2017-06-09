$.getJSON("http://pokeapi.co/api/v2/pokemon/", function (response){
	var pokemons = response.results;
	crearPokemons(pokemons);
});


function crearPokemons(pokemons) {
	var $section = $("#pokemons");

	pokemons.forEach(function (pokemon) {
    var $nombre = $("<button />", {"class" : "col s3"})
		$nombre.text(pokemon.name);
		$section.append($nombre);
	});
};
