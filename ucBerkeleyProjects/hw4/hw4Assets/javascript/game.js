$(document).ready(function() {

    // random variable array player has to reach
    var rand = [];

        for (var r = 19; r < 121; r++) {

            rand.push(r);

        }

    // army building array
    var knights = [];

        for ( var k =1; k < 13; k++) {

            knights.push(k);

        }

    console.log(knights);

    //set variables
    var randNumber;
    var knightNumbers =[];
    var k1;
    var k2;
    var k3;
    var k4;
    var totalScore = 0;
    var wins = 0;
    var losses = 0;

    //picking random number
    function pickRandomNumber(arr) {

        var x = arr[Math.floor(Math.random() * arr.length)];
        randNumber = x;
        $("#randomNumber").html(randNumber);

        console.log("random number: " + randNumber);
    }

    //picking values for the knights
    function pickRandomKnights(arr) {

        for (var y = 0; y < 4; y++){

            var a = arr[Math.floor(Math.random() * arr.length)];

            knightNumbers.push(a);
        }

        console.log("knight numbers: " + knightNumbers);

    }

    // for loop to change values of the knights
    function knightValues(arr) {
        
        for (i = 0; i < arr.length; i++) {

            $("#button-" + (i+1)).attr("value", arr[i]);
            console.log(this);
            }
            k1 = arr[0];
            k2 = arr[1];
            k3 = arr[2];
            k4 = arr[3];
        }

    //game reset function
    function gameReset(x) {

    knightNumbers = [];

    pickRandomNumber(rand);

    pickRandomKnights(knights);

    knightValues(knightNumbers);

    totalScore = 0;
    $("#totalNumber").html(totalScore);

    alert(x);
}

    pickRandomNumber(rand); // random number to match
	pickRandomKnights(knights); // array of random knight values
	knightValues(knightNumbers);

		// knight button functions
		$("#button-1").on("click", function() {

			totalScore += k1;
            $("#totalNumber").html(totalScore);
            
		});

		$("#button-2").on("click", function() {

			totalScore += k2;
            $("#totalNumber").html(totalScore);
            
		});

		$("#button-3").on("click", function() {

			totalScore += k3;
            $("#totalNumber").html(totalScore);
            
		});

		$("#button-4").on("click", function() {

			totalScore += k4;
            $("#totalNumber").html(totalScore);
            
		});


        //user wins or losses
    	$("button").on("click", function() {
            if (totalScore == randNumber) {

                wins++;
                console.log(totalScore);
                $("#totalNumber").html(totalScore);
                $("#wins").html("Wins: " + wins);


                setTimeout(function() {gameReset("win!")}, 200);
            }

            else if (totalScore > randNumber){

                losses++;
                $("#totalNumber").html(totalScore);
                $("#losses").html("Losses: " + losses);

                setTimeout(function() {gameReset("lose!")}, 200);
            }
    });

}); 