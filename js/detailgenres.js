let api_key = "aac1ceee2a729e617896953514f6236a";
let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let generoFromPeli = queryStringObj.get("mgen-id");
let generoFromSerie = queryStringObj.get("sgen-id");
let generoPeli = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${generoFromPeli}`;
let generoSerie = `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&with_genres=${generoFromSerie}`;
let genTitulo = document.querySelector("#gent");
let nombre = JSON.parse(localStorage.getItem("name"));
let modifContenedor = ``; 

if (generoFromPeli != null) {
    fetch(generoPeli)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let results = data.results;
            let contenedor = document.querySelector("#genes");

            for (let i = 0; i < 6; i++) {
                let movie_id = results[i].id;
                let movie_title = results[i].title;
                let fecha = results[i].release_date;
                let posterPath = results[i].poster_path;
                let poster = "https://image.tmdb.org/t/p/w200" + posterPath;
                modifContenedor += `
                    <article class="peli">
                        <h3 class="titulo peli">${movie_title}</h3>
                        <p>Fecha de estreno: ${fecha}</p>
                        <a href="detail-movie.html?id=${movie_id}"><img src="${poster}" alt="${movie_title}" class="pelimg"></a>
                    </article>
                `;
            }
            contenedor.innerHTML = modifContenedor;
        })
        .catch(function (error) {
            console.log("Error: " + error);
        });
} else {
    fetch(generoSerie)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let results = data.results;
            let contenedor = document.querySelector("#genes");

            for (let i = 0; i < 6; i++) {
                let movie_id = results[i].id;
                let movie_title = results[i].name;
                let fecha = results[i].first_air_date;
                let posterPath = results[i].poster_path;
                let poster = "https://image.tmdb.org/t/p/w200" + posterPath;
                modifContenedor += `
                    <article class="peli three">
                        <h3 class="titulo peli">${movie_title}</h3>
                        <p>Fecha de estreno: ${fecha}</p>
                        <a href="detail-serie.html?id=${movie_id}"><img src="${poster}" alt="${movie_title}" class="pelimg"></a>
                    </article>
                `;
            }
            contenedor.innerHTML = modifContenedor;
        })
        .catch(function (error) {
            console.log("Error: " + error);
        });
}