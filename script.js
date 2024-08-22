document
    .getElementById("searchButton")
    .addEventListener("click", searchMovies);

let api_key = "f615a7f7b948f52a092dbdb1295d2232";
let urlBase = "https://api.themoviedb.org/3/search/movie";
let urlImg = "https://image.tmdb.org/t/p/w500";

let resultContainer = document.getElementById("results");

function searchMovies() {
    resultContainer.innerHTMl = "Cargando...";
    let searchInput = document.getElementById("searchInput").value;

    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
        .then((response) => response.json())
        .then((response) => displayMovies(response.results));
}

function displayMovies(movies) {
    resultContainer.innerHTMl = "";

    if (movies.length === 0) {
        resultContainer.innerHTMl =
            "<p>No se encontraron resultados para tu búsqueda </p>";
        return;
    }

    movies.forEach((movie) => {
        let movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        let title = document.createElement("h2");
        title.textContent = movie.title;

        let releaseDate = document.createElement("p");
        releaseDate.textContent =
            "La fecha de lanzamiento fue: " + movie.release_date;

        let overview = document.createElement("p");
        overview.textContent = movie.overview;

        let posterPath = urlImg + movie.poster_path;
        let poster = document.createElement("img");
        poster.src = posterPath;

        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(overview);

        resultContainer.appendChild(movieDiv);
    });
}