function searchMovie() {
  $("#movie-list").html("");
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "a61bdef6",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;
        $.each(movies, function (i, data) {
          $("#movie-list").append(`
          <div class="col-md-4">
            <div class="card mb-3">
              <img src="${data.Poster}" class="card-img-top" alt="...">
              <div class="card-body bg-dark text-light text-center">
                <h5 class="card-title">${data.Title}</h5>
                <h6 class="card-subtitle mb-2 text-secondary">${data.Year}</h6>
                <div class="d-grid gap-2 col-6 mx-auto">
                  <button class="btn btn-danger fw-semibold text-secondary-emphasis show-detail" data-bs-toggle="modal"
                  data-bs-target="#exampleModal" type="button" data-id="${data.imdbID}">Show Detail</button>
                </div>
              </div>
            </div>
          </div>
          `);
        });

        $("#search-input").val("");
      } else {
        $("#movie-list").html(`
        <div class="col text-center">
            <h1>${result.Error}</h1>
            <img class="w-50" src="img/foto.jpg">
        </div>`);
      }
    },
  });
}

$("#search-button").on("click", function () {
  searchMovie();
});

$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
});

$("#movie-list").on("click", ".show-detail", function () {
  $.ajax({
    url: "http://omdbapi.com",
    dataType: "json",
    type: "get",
    data: {
      apikey: "a61bdef6",
      i: $(this).data("id")
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $(".modal-body").html(`
        <div class="container-fluid bg-dark">
          <div class="row">
            <div class="col-md-4">
              <img src="${movie.Poster}" class="img-fluid">
            </div>
            <div class="col-md-8 ">
              <ul class="list-group bg-dark">
                <li class="list-group-item bg-dark text-white-50"><h3>${movie.Title}</h3></li>
                <li class="list-group-item bg-dark text-white-50">Released : ${movie.Year}</li>
                <li class="list-group-item bg-dark text-white-50">Genre : ${movie.Genre}</li>
                <li class="list-group-item bg-dark text-white-50">Directore : ${movie.Director}</li>
                <li class="list-group-item bg-dark text-white-50">Actors : ${movie.Actors}</li>
                <li class="list-group-item bg-dark text-white-50">Plot : ${movie.Plot}</li>
              </ul>
            </div>
          </div>
      </div>
        `);
      }
    },
  });
});
