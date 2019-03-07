var topics = ["Luke Skywalker", "Han Solo", "Princess Leia", "Darth Vader", "Obi-Wan Kenobi", "Yoda", "R2-D2", "C-3PO"]

// "My API Key: k7r5BN1vLDpgx9L8kKqGisvZWsE5vt6F"

generateInitGif();


// $("body").append("<div id='store-gifs-here'></div>");





$(document).on("click", "#gifcreate", function () {

  $(".col-lg-9").empty();


  var character = $(this).attr("data-character");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=k7r5BN1vLDpgx9L8kKqGisvZWsE5vt6F";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    var results = response.data

    for (var i = 0; i < 10; i++) {
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

        var gifDiv = $("<div>");

        var rating = results[i].rating

        var p = $("<p>").text("Rating: " + rating);

        var characterImage = $("<img>")

        var characterImage = $("<img class='result'>");
    		characterImage.attr("src", results[i].images.fixed_height_still.url);
    		characterImage.attr("data-state", "still");
    		characterImage.attr("data-still", results[i].images.fixed_height_still.url);
    		characterImage.attr("data-animate", results[i].images.fixed_height.url);

      


        $(gifDiv).append(p);
        $(gifDiv).append(characterImage);
        $(".col-lg-9").prepend(gifDiv);

    



      }
    }

  });

});



function generateInitGif() {

  $(".CharacterButtonContainer").empty();

  for (var i = 0; i < topics.length; i++) {


    var createdButton = $("<button id=gifcreate></button>")

    createdButton.addClass("Character");

    createdButton.attr("data-character", topics[i]);


    createdButton.text(topics[i]);

    var div = $("<div>")
    div.addClass("CharacterButtonContainer")
    div.append(createdButton)
    $(".buttoncontainer").prepend(div)



  }
}

$(document).on("click", ".result", function() {
	var state = $(this).attr("data-state");

	if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


$("#add-character").on("click", function (event) {
  event.preventDefault();
  var characterValue = $("#character-input").val().trim();
  topics.push(characterValue);
  generateInitGif();

});












