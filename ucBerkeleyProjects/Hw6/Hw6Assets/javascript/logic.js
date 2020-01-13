// hero array
var hero = ["Captain America", "Hulk", "Iron Man", "Thor", "Black Widow", "Hawkeye"]

function gifDisplay() {

    var hero = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=PzWVIo3ocW3i5iJKFy7ceDRxGL2hMfxd";

    //Ajax Call
    $.ajax({ url: queryUrl, method: "GET"}).done(function(response) {

        //Empty div holdign previous Gifs
        $('gifStorage').empty();

        for (let i = 0; i < response.data.length; i++){

            // Variables to add images by using the button created in index.HTML
            var gifDiv    = $('<div class="gifDiv">');
            var rating    = response.data[i].rating;
            var ratingDiv = $('<p>').html("Rating: " + rating);
            var animated  = response.data[i].images.fixed_height.url;
            var still     = respomse.data[i].images.fixes_height_still.url;
            var gifImg    = $('<img calss="gImage">');

            // Default gifs still
            gifImg.attr('src', still);
            gifImg.attr('data'-still, still);
            gifImg.attr('data-animate', animated);
            gifImg.attr('data-state', 'still')

            // Securing ratings appear after their respective gifs
            gifDiv.append(ratingDiv);
            gifDiv.prepend(gifImg);
            $('.gifStorage').prepend(gifDiv);

        } 

    });

};

// on Click funciton to pause/resume GIF

$('.gifStorage').on("click", ".gImage", function() {

    var state = $(this).attr('data-state');
    // If state = still, on click will resume the GIF

    if (state == 'still') {

        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }
    else {

        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

});

// new button
function renderButtons() {

    $(".buttons-original").empty();

    // Verifying buttons
    for ( i = 0; i < hero.length; i++)
        addButton = $('<button class = "button">');
        addButton.addClass("hero");
        addButton.attr("data-name", hero[i]);
        addButton.html(hero[i]);

        // Append newly created buttons to the end of existing buttons
        $(".buttons-original").append(addButton);

};

// New button created when field has a value and then clearing it 

$(".add-gif").on("click", function(event) {

    event.preventDefault();
    var gifs = $(".gifName").val().trim();
    hero.push(gifs);
    $(".gifName").val("");
    renderButtons();

});

// Call button in class of hero
$(document).on("click", ".hero", gifDisplay);
renderButtons();