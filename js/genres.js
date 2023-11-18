let api_key = "aac1ceee2a729e617896953514f6236a";
let gPeliculas = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`;
let gSeries = `https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}`;

fetch(gPeliculas)
.then(function(response) {
  return response.json()
})
.then(function(data) {
  let genero = data.genres;
  let contenedor = document.querySelector("#gpelis");
  let modifContenedor = ``;

  for(let i=0; i<genero.length; i++){
    let id = genero[i].id;
    let name = genero[i].name;
    modifContenedor += `<article class="peli">
                     <h3 class="titulo">${name}</h3>
                     <a href="./detail-genres.html?mgen-id=${id}" class="boton">Ver detalle</a>
                   </article>`;
  }
  contenedor.innerHTML = modifContenedor;
})
.catch(function(error) {
  console.log("Error: " + error);
});

fetch(gSeries)
.then(function(response) {
  return response.json()
})
.then(function(data) {
  let genero = data.genres;
  let contenedor = document.querySelector("#gseries"); 
  let modifContenedor = ``;

  for(let i=0; i<genero.length; i++){
    let id = genero[i].id;
    let name = genero[i].name;
    modifContenedor += `<article class="peli">
                     <h3 class="titulo">${name}</h3>
                     <a href="detail-genres.html?sgen-id=${id}" class="boton">Ver detalle</a>
                   </article>`;
  }
  contenedor.innerHTML = modifContenedor;
})
.catch(function(error) {
  console.log("Error: " + error);
});

