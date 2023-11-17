let api_key = "aac1ceee2a729e6178969535";
let url_genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`;

fetch(url_genres)
  .then(response => response.json())
  .then(function(data) {
    console.log(data);

    let genresContainer = document.querySelector("#genres");
    let modifGenresContainer = '';

    data.genres.forEach(genre => {
      let genreMovieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genre.id}`;

      fetch(genreMovieUrl)
        .then(response => response.json())
        .then(genreData => {
          console.log(genreData);
          let genreResults = genreData.results;

          let genreMoviesRandom = [];
          while (genreMoviesRandom.length < 6) {
            let genreMovieId = Math.floor(Math.random() * genreResults.length);
            let genreRepetido = false;

            for (let i = 0; i < genreMoviesRandom.length; i++) {
              if (genreMoviesRandom[i] === genreMovieId) {
                genreRepetido = true;
                break;
              }
            }

            if (!genreRepetido) {
              genreMoviesRandom.push(genreMovieId);
            }
          }

          for (let i = 0; i < 6; i++) {
            let genreId = genreMoviesRandom[i];
            let movie_id = genreResults[genreId].id;
            let movie_title = genreResults[genreId].title;
            let fecha = genreResults[genreId].release_date;
            let posterPath = genreResults[genreId].poster_path;
            let poster = "https://image.tmdb.org/t/p/w200" + posterPath;

            modifGenresContainer += `
              <article class="peli">
                <h3 class="titulo peli">${movie_title}</h3>
                <p>Fecha de estreno: ${fecha}</p>
                <img src="${poster}" alt="${movie_title}" class="pelimg">
                <a href="detail-movie.html"><button type="submit" class="boton">Ver detalle</button></a>
              </article>
            `;
          }

          modifGenresContainer += `</div>`;
          genresContainer.innerHTML = modifGenresContainer;
        })
        .catch(error => console.error(`Error al obtener películas por género: ${error}`));
    });
  })
  .catch(error => console.error(`Error al obtener géneros de películas: ${error}`));
