let api_key = "aac1ceee2a729e617896953514f6236a"
let pelisPopulares = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`;

fetch(pelisPopulares)
    .then(function(response) {
        return response.json();
    })

    .then(function(data) {
        console.log(data);
        let results = data.results;
        let contenedor = document.querySelector("#ppopu");
        let modifContenedor = ``
        let peliculasRandom = [];
    
        while (peliculasRandom.length < 6) {
            let peliId = Math.floor(Math.random() * results.length);
            let repetido = false;
    
            for (let i = 0; i < peliculasRandom.length; i++) {
                if (peliculasRandom[i] === peliId) {
                    repetido = true;
                    break;
                }
            }
            if (!repetido) {
                peliculasRandom.push(peliId);
            }
        }

        for (let i = 0; i < 6; i++) {
            let peliId = peliculasRandom[i];
            let movie_id = results[peliId].id;
            let movie_title = results[peliId].title;
            let fecha = results[peliId].release_date;
            let posterPath = results[peliId].poster_path
            let poster = "https://image.tmdb.org/t/p/w200" + posterPath;
                modifContenedor += `
                <article class="peli">
                <h3 class="titulo peli">${movie_title}</h3>
                <p>Fecha de estreno: ${fecha}</p>
                <img src="${poster}" alt="${movie_title}" class="pelimg">
                <a href="detail-movie.html"><button type="submit" class="boton">Ver detalle</button></a>
                </article>
                `
            }
                contenedor.innerHTML = modifContenedor;

            }

    )
    .catch(function(error) {
        console.log("Error al obtener la información: " + error);
    });

let seriesPopulares = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}`;

fetch(seriesPopulares)
    .then(function(response) {
        return response.json();
    })

    .then(function(data) {
        console.log(data);
        let results = data.results;
        let contenedor = document.querySelector("#spopu");
        let modifContenedor = ``
        let seriesRandom = [];
    
        while (seriesRandom.length < 6) {
            let serieId = Math.floor(Math.random() * results.length);
            let repetido = false;
    
            for (let i = 0; i < seriesRandom.length; i++) {
                if (seriesRandom[i] === serieId) {
                    repetido = true;
                    break;
                }
            }
            if (!repetido) {
                seriesRandom.push(serieId);
            }
        }

        for (let i = 0; i < 6; i++) {
            let serieId = seriesRandom[i];
            let movie_id = results[serieId].id;
            let movie_title = results[serieId].name;
            let fecha = results[serieId].first_air_date;
            let posterPath = results[serieId].poster_path
            let poster = "https://image.tmdb.org/t/p/w200" + posterPath;
                modifContenedor += `
                <article class="peli">
                <h3 class="titulo peli">${movie_title}</h3>
                <p>Fecha de estreno: ${fecha}</p>
                <img src="${poster}" alt="${movie_title}" class="pelimg">
                <a href="detail-movie.html"><button type="submit" class="boton">Ver detalle</button></a>
                </article>
                `
            }
                contenedor.innerHTML = modifContenedor;

            }

    )
    .catch(function(error) {
        console.log("Error al obtener la información: " + error);
    });

