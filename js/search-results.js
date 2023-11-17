let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let datoFormulario = queryStringObj.get("busqueda");
let textoBusqueda = document.querySelector("#busquedatexto");
textoBusqueda.innerText = `RESULTADO PARA LA BUSQUEDA: ${datoFormulario}`;
let api_key = "aac1ceee2a729e617896953514f6236a";
let urlApi = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${datoFormulario}`;

fetch(urlApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        let results = data.results;
        let modifContenedor = ``;
        let contenedor = document.querySelector("#conte");

        if (results.length === 0) {
            modifContenedor += `
            <h3 class="titulo">ERROR: No hay resultado para su búsqueda</h3>
            `; 
            contenedor.innerHTML = modifContenedor;           
        } else {
            for (let i = 0; i < 6; i++) {
                let movie_id = results[i].id;
                let movie_title = results[i].title;
                let fecha = results[i].release_date;
                let posterPath = results[i].poster_path;
                let poster = "https://image.tmdb.org/t/p/w200" + posterPath;
               
                modifContenedor += `
                    <article class="peli">
                        <h3 class="titulo">${movie_title}</h3>
                        <a href="./detail-movie.html?id=${movie_id}" class="addPic"><img id="fotopeli" class="pelimg" src=${poster} alt="${movie_title}"></a>
                        <ul>
                            <li><b>Fecha de estreno:</b> ${fecha}
                        </ul>
                    </article> 
                `;
            }
            contenedor.innerHTML = modifContenedor;
        }
    })   
    .catch(function (error) {
        console.log("Error al obtener la información: " + error);
    });
