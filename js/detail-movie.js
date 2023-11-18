let api_key = "aac1ceee2a729e617896953514f6236a";
let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let capturaId = queryStringObj.get("id");
let detalle = `https://api.themoviedb.org/3/movie/${capturaId}?api_key=${api_key}`;

console.log(capturaId);

fetch(detalle)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        let respuesta = data;
        let contenedor = document.querySelector("#caja");
        let id = respuesta.id;
        let movie_title = respuesta.title;
        let fecha = respuesta.release_date;
        let posterPath = respuesta.poster_path;
        let genero = respuesta.genres;
        let duracion = respuesta.runtime;
        let sinopsis = respuesta.overview;
        let calificacion = respuesta.vote_average;
        let modifContenedor = ``;
        let modifGeneros = ``;
        for (let i = 0; i < genero.length; i++){
            let gen = genero[i].name
            let genId = genero[i].id
            if (genero.length === 0){
                modifGeneros = `<p>Sin género</p>`
            }
            else{
            modifGeneros += `<a class="link" id="gen" href="./detail-genres.html?mgen-id=${genId}">${gen} </a>`
            }}

        let poster = "https://image.tmdb.org/t/p/w200" + posterPath;

        modifContenedor += `
            <article class="detail_article">
                <a href="favorite.html" class="add_fav">Agregar a favoritos</a>
                <img src="${poster}" alt="Portada" class="detail_img">
                <div class="details">
                    <h2 class="detail_title">${movie_title} | (${calificacion} 🌟)</h2>
                    <ul>
                        <li><b>Fecha de estreno:</b> ${fecha}</li>
                        <li><b>Duración:</b> ${duracion}min</li>
                        <li><b>Sinopsis:</b> ${sinopsis}</li>
                        <li>
                            <b>Géneros: ${modifGeneros}</b> 
                        </li>
                    </ul>
                </div>
            </article>
        `;

        contenedor.innerHTML = modifContenedor; 
    })
    .catch(function(error) {
        console.log("Error al obtener la información: " + error);
    });



let recomendados = `https://api.themoviedb.org/3/movie/${capturaId}/recommendations?api_key=${api_key}`
let botonreco = document.querySelector("#botonreco")
let seccion_reco = document.querySelector("#recom")

seccion_reco.style.display = 'none';
botonreco.addEventListener('click', function(){
        if(seccion_reco.style.display == "none"){
            seccion_reco.style.display = 'flex';
            botonreco.textContent = "Ocultar similares...";
        }  
        else{
            seccion_reco.style.display = "none"
            botonreco.textContent = "Mostrar similares";
        }  
})

fetch(recomendados)
    .then(function(response){
    return response.json();
    })
    .then(function(data){
    console.log(data);
    let results = data.results;
    let reco_div = document.querySelector("#recom")
    let modifContenedor = ""
    if (results.length != 0) {
        for (let i = 0; i < 5; i++) {
            let movie_id = results[i].id;
            let movie_title = results[i].title
            let fecha = results[i].release_date;
            let posterPath = results[i].poster_path
            let poster = "https://image.tmdb.org/t/p/w200" + posterPath
            modifContenedor += `
                <article class="peli">
                    <h3 class="titulo peli">${movie_title}</h3>
                    <p>Fecha de estreno: ${fecha}</p>
                    <img src="${poster}" alt="${movie_title}" class="pelimg">
                    <a href="detail-movie.html?id=${movie_id}"><button type="submit" class="boton">Ver detalle</button></a>
                </article>
                `;
            }
    }
    else {
        let reco_div = document.querySelector("#recom");
        modifContenedor += `<p>No hay recomendaciones disponibles.</p>`
    }
    reco_div.innerHTML = modifContenedor

    })
    .catch(function(error){
    console.log('Error al obtener la información: ' + error);
    })
