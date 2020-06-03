$(document).ready(function(){

    //click on start button to load first question
    var i;
    var quiz=[];
    var Count;
    var imageChoice;
    
    var correct=0;
    var missed =0;
    var attempted = 0;
    
    var rightAns;
    var intervalTimer;
    var delayButtonAlert;
    var newQuest;
    var ansAttempt;
    
    
    //put data to make object
    quizBuild();        
  
    i = 0;
    
    hideStuff();
    
    //upon first click load first question
     $("#new-question").on("click",displayNewQuestion);
    
    function displayNewQuestion(){
    
        //hides button after click
        //new questions display with timers
    
        if (i > 0) {clearTimeout(newQuest);}
    
        $("#new-question").hide();
        hideStuff();
    
        //send question and options info to screen
        ansAttempt = false;
        console.log("New question " + i +  " will display now");
        quizWrite();
    
        //Initialize count & display
        Count = 30;
        intervalTimer = setInterval(countDown,1000)
    
        //function if time expires
        delayButtonAlert = setTimeout(notAttempted,30000)  

    }
    
       //function if user attempts an answer
       $(document).on("click",".answer",Attempted);
       
    
    function countDown(){
        Count -= 1;
        $("#seconds-count").html('<h3> You have '+ Count + " seconds left</h3> ") 
        return Count;
    }
    
    function hideStuff(){
    
        $(".stats").hide();
        $("#message").hide();
        $("#picture").hide();
        $("#Reveal").hide();
    }
    
    function Attempted(){
        
            //when answer is attempted, clears timers
            clearTimeout(delayButtonAlert);
            clearTimeout(intervalTimer);
        
            //answer is attempted before time runs out
            ansAttempt = true;
            $("#message").show();
            
    
            userChoice = parseInt($(this).val());
            console.log(userChoice, i);
        
            attempted += 1;
        
            if (userChoice == quiz[i].ans){
                $("#message").html('correct!');
                correct += 1;
                }
            else {
                $("#message").html('sorry!');   
                missed += 1;
            }
        
            $(".stats").show();
            displayStats();
        
            //function to display the answer with gif
            displayAnsImg();
        }
        
        function notAttempted(){
        
            //this executes after 30 seconds have passed clear timers when this is called
            if (ansAttempt != true){
    
            clearTimeout(delayButtonAlert);
            clearTimeout(intervalTimer);
        
            //other two stats will not change
            missed +=1;
        
            $(".stats").show();
            displayStats();
        
            displayAnsImg();
            }
            else {
                return
            }
        }     
    
    function displayAnsImg(){
    
         //start a 4-second timer so answers will remain for 4 seconds before a new question is displayed
    
        if (i < quiz.length){
            newQuest = setTimeout(displayNewQuestion,4000);
        }
        else {
            $("#message").html("Game Over");
            //offer the option to run the game again
    
            document.getElementById("question").style.opacity = "0.0";
            document.getElementById("option-1").style.opacity = "0.0";
            document.getElementById("option-2").style.opacity = "0.0";
            document.getElementById("option-3").style.opacity = "0.0";
            document.getElementById("option-4").style.opacity = "0.0";

            $("#seconds-count").hide();

            return;

        }
        
        imageChoice = imageInsert();
    
        $("#picture").html(imageChoice);
        $("#Reveal").html("The correct answer is: " + quizAnswer());
    
        $("#picture").show();
        $("#Reveal").show();
    
        //display the correct answer and the image ,then increment i only AFTER displaying answer and image
    
        i++; 
        console.log("Answer and image will display now");
        
    }
    
    function quizConstructor(question,choice1,choice2,choice3,choice4,ans,imageURL,attempted){
    
        this.question = question;
        this.choice1   = choice1;
        this.choice2   = choice2;
        this.choice3   = choice3;
        this.choice4   = choice4;
        this.ans       = ans;
        this.imageURL  = imageURL;
        this.attempted = attempted;
    }
    
    function quizBuild(){
    
        quiz[0] = new quizConstructor('Captain America','Bruce Banner','Steve Rodgers','Peter Parker','Clint Barton',2,"https://media.giphy.com/media/1lk1IcVgqPLkA/giphy.gif",false);
        quiz[1] = new quizConstructor('Iron Man','Tony Stark','Tchalla','Carol Danvers','Vision',1,'https://media.giphy.com/media/3lvqNXheb679S/giphy.gif',false);
        quiz[2] = new quizConstructor('Hulk','Steve Rodgers','Tony Stark','Bruce Banner','Hulk',3,'https://media.giphy.com/media/XSc4Kkc5u2WZy/giphy.gif',false);
        quiz[3] = new quizConstructor('Spider Man','Iron Man','Peter Parker','Spider Man','Superman',2,'https://media.giphy.com/media/SF9Z0shNT07T2/giphy.gif',false);
        quiz[4] = new quizConstructor('Black Widow','Black Widow','Natasha Romanoff','Captain America','Steve Rogers',2,'https://media.giphy.com/media/13ftL7TeE1tLgY/giphy.gif',false);
        quiz[5] = new quizConstructor('Captain Marvel','Captain Marvel','Captain America','Natasha Romanoff','Carol Danvers',4,'https://media.giphy.com/media/nnRG5giXc4coZ7xWCw/giphy.gif',false);
        quiz[6] = new quizConstructor('Doctor Strange','Doctor Who','Stephan Strange','Doctor Manahatten','Robert Strange',2,'https://media.giphy.com/media/3oxHQrAmG6bd6RRh4s/giphy.gif',false);
        quiz[7] = new quizConstructor('Falcon','Smith Wilson','Hawkeye','Sam Wilson','Eagle',3,'https://media.giphy.com/media/amztOQxvmZ2Sc/giphy.gif',false);
        quiz[8] = new quizConstructor('Hawkeye','Barton Rogers','Jeremy Clint','Barton Clint','Clint Barton',4,'https://media.giphy.com/media/KAIHq4s57HAZO/giphy.gif',false);
        quiz[9] = new quizConstructor('War Machine','James Rhodes','Tony Stark','Rhodes James','Machine of War',1,'https://media.giphy.com/media/rgNQDcVkS4pj2/giphy.gif',false);
    
        return quiz

    }
    
    function quizWrite(){
    
        $("#question").html("What is the Identity of " + quiz[i].question + "?");
        
        $("#option-1").html(quiz[i].choice1);
        $("#option-2").html(quiz[i].choice2);
        $("#option-3").html(quiz[i].choice3);
        $("#option-4").html(quiz[i].choice4);
     
    }
    
    //this function doesn't get called compare the value of the button to the answer instead
    function quizAnswer(){
        if (quiz[i].ans == 1){
            quizAns = quiz[i].choice1;
        }else if (quiz[i].ans == 2){
            quizAns = quiz[i].choice2;
        }else if (quiz[i].ans == 3){
            quizAns = quiz[i].choice3;
        }if (quiz[i].ans == 4){
            quizAns = quiz[i].choice4;
        }
        console.log(quizAns);
    
        return quizAns;
    }
    
    function displayStats(){
        $(".stats").html("<h4> Correct: "+correct+'<br>'+"Incorrect: " + missed + '<br>' +"Attempted: " +attempted+ '</h4>');
    }
    
    function imageInsert(){ 
    //   console.log(quiz[i].imageURL);
    
        var imageChoice = $('<img>');
        
        imageChoice.addClass('animal');
        
        imageChoice.attr('src', quiz[i].imageURL);
    
        imageChoice.attr('width','400px');
                          
       return imageChoice;
    }
    
    }) 