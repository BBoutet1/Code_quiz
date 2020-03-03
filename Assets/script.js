/***  Variables ***/
var questionsList=[]; // List of all questions
var answersArray = []; //List  of answers for all questions
var goodAnswers=[]; // List of all good answers
var highScores = []; // List of at the maximum 5 highest scores
var name = ""; // user Initials
var score = 0; // User final score
var attempt = [] // user initials - score objet(one element array)

/*** Defining the different questions  and answers***/
function quizfunction(){
    /*** Re-initializATION ***/
    questionsList=[]; 
    answersArray = [];
    goodAnswers=[];

    
    var quizArray= [
        {
        question: "What is the correct  HTML5 doctype?", // the question
        answers : [   "<DOCTYPE html>","<!DOCTYPE html>","<!DOCTYPE html5>"] // answer choices
        },
        {
            question: "Which tag start a numbered list?",
            answers: [ "<al>", "<ol>","<ul>", "<li>"]
        },
        {
            question: "Inline elements are normally displayed without starting a new line.",
            answers: [ "False","True"]
        },
        {
            question: "Which HTML is correct for referencing an external stylesheet",
            answers: [ "<link src=\"stylesheet\" type=\"text/css\" href\style.css\" />",
                        "<href=\"stylesheet\" type=\"text/css\" href=\"style.css\" />",
                    "<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\" />"]
                    
        },

        {
            question : "Which CSS property changes the text color of an element?",
            answers: ["font-color", "color", "text-color"]
        },
        {
            question : "Is it allowed to use negative values when using padding properties?",
            answers: ["Yes","No"]
        },
        {
            question: "In which HTML tag do we put the JavaScript?",
            answers: [ "<js>", "<script>","<src>"]
        },

        {
            question: "The external JavaScript file contains the <script> tag.",
            answers: [ "True", "False"]
        },
        {
            question : "How does a FOR loop start?",
            answers: [ "for(i=0, i<5, i++)", "for(i=0; i<5; i++)", "for(i=0 to 5, i++)", "for(i=0, i<5)"]
        },
        {
            question : "On how many columns is the Bootstrap grid system based ?",
            answers: ["10","12","25","1024"]
        },

        {
            question : "Which Bootstrap contextual class indicates a dangerous or negative action? ",
            answers: [".text-warning", ".text-danger",".attention", ".text-stop"]
        },

        {
            question : "The Bootstrap grid system works across multiple devices.",
            answers: ["False", "True"]
        },

        {
            question : "jQuery is a Javascript library.",
            answers: ["False", "True"]
        },
        {
            question : "Which sign is used as a shortcut for jQuery?",
            answers: [ "#", "$","%"]
        },

        {
            question : "What the following selector: $(\"div\") does?.",
            answers: ["Select the first div element", "Select all div elements"]

        },
        {
            question : "What scripting language is jQuery written in?",
            answers: ["css", "Javascript","C++"]
        }

    ]

    for (var j=0; j<quizArray.length; j++){
        answersArray[j] =quizArray[j].answers;
        goodAnswers.push(quizArray[j].answers[1]);
        questionsList.push(quizArray[j].question)
    }

};

$(document).ready(function(){
  
    /** Highscores table hiden behind "-- View all high scores -"*/
    $("table").hide();

    $("#viewTable").mouseenter(function(){
        $("table").show();
      });
    
      $("#viewTable").mouseleave(function(){
        $("table").hide();
      });

/****  Start from question 1st  ****/
var i= 0;   

/*****  Setting the timer  *****/
var timeLeft = 0; 
function setTime() {
    var timerInterval = setInterval(function() {
    if(timeLeft>0 && i<questionsList.length-1){
       timeLeft = timeLeft-1000;
    }
    var minutes = Math.floor(timeLeft  / (1000 * 60)); // Conversion in minutes
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    var t= minutes+":"+seconds; // time in minutes ans secondes
    $("#time").text(t)
    
        if(timeLeft === 0) {
        clearInterval(timerInterval);
        }
   
    }, 1000);
}
    
      
/*****  Start and answer buttons listener  *****/
 $( "#Start, #b1, #b2, #b3, #b4").click(function(e){

    
    /**** Re-itinitialization through with start button clicked ****/
    buttonId = e.target.id;
    if (buttonId == "Start"){
        quizfunction();
        timeLeft =  1000*8*questionsList.length// the timer is a funtion of the quiz length
        setTime();
        score = 0;
        $("#score").text(score);
        name = "";
    }

    
     /**** While last question  is not reached AND left time is not 0 ****/    
     if(i<(questionsList.length) && timeLeft!=0 ){
         /*** Displaying question i and its answers */
        $("h4").text(questionsList[i])
        $("#qBtn").addClass("d-flex flex-column float-left");
        $("h6, #Start, #b3, #b4").addClass("d-none"); 
        
        var answers = answersArray[i];
        var numAnswers = answers.length; 

        
       /***  Saving the choosed answer***/
        var chosedAnswer = $(this).text(); // selected answer
        chosedAnswer = chosedAnswer.substring(3); // removing the number to match(compare) with the good answer
        
        var goodAnswer = goodAnswers[i-1];

        /***  Randomly reoganizing the question i answers array ***/
        var randomAnswers = []; // random answers array
        for (var j=0; j<numAnswers; j++) {
            var random = Math.floor(Math.random() * (answers.length-1));
            randomAnswers.push(answers[random]);
            answers.splice(random,1);
            
            /**  Writting the answers in button b1 to bk (k = 2 to 4)  **/
            var k =j+1;
            var aNum = String.fromCharCode(64+k); // answer number (from A to D)
            $("#b"+k).text(aNum+". "+randomAnswers[j]);
            $("#b"+k).addClass("text-left");
            $("#b"+k).removeClass("d-none");
        }
   
        /***  Comparing the seclected answer to the good answer and updating the score the score  ****/
        if (i>0){
            if (chosedAnswer == goodAnswer) {
                $("#cardfoot").text("Correct!"); 
                 $(".card-footer, #cardfoot").removeClass("text-danger d-none");
                 $(".card-footer").addClass("text-success"); 
                score++;   
                $("#score").text(score); // writing the new score value           
            } 
            else if (chosedAnswer != goodAnswer){
                $("#cardfoot").text("Wrong!");
                $(".card-footer, #cardfoot").removeClass("text-success d-none"); 
                $(".card-footer").addClass("text-danger");
                if (timeLeft>=10000){
                    timeLeft -=10000 // -10 secondes penalty for a wrong answer  
                }
                else{
                    timeLeft=0;
                }  
            }  
         
        }
         /*** Next question ***/
    
         i++;              
       } 
       /*** Quiz ended after last question OR if left time 0 secondes **/
        else { 
            $("#b1, #b2, #b3, #b4").addClass("d-none");
            $("h4").text("All done!")
            if (i<questionsList.length){
                $("h4").text(i+" questions completed. Time out!")
            }
            $("#finalScore, #addName").removeClass("d-none")
            $("#score").text(score+" / "+questionsList.length);
               /****  Saving the score ****/    
        }

        /** Answers status (Right, Wrong )  display */
        setTimeout(timer, 800);
        function timer (){
        $(".card-footer").addClass("d-none");  
        }
       
    });

    /*** Saving the initials */
    $("#addName").on("click", function(event) {
        event.preventDefault();
        /***grabing the intials from the textbox**/
        name = $("#scoreInput").val().trim();
        if(name ==""){
            /** Null entry */
            alert("Please, enter your initials")
        }
        else{               
            $("#addName, #finalScore").addClass("d-none");
            $("#back, #clear").removeClass("d-none");
            
            /** High score table in decreasing order */ 
           var attempt=[ {uName:name, uScore:score}];
           highScores = highScores.concat(attempt);
           highScores.sort(function (a, b) {
               return b.uScore - a.uScore;
             });
          
          var x = 0; // local score
          var z = "";  // local initials
          var scoreRow = [];
          $("#tb").empty();
 
        /*** No more than 6 high scores rows or delete the lowest*/
        var max =0;
        if(highScores.length>5){
            max = 5; 
        }
        else{
            max =highScores.length
        }

        /** Generationg the ordered table */
        for(var k=0; k<max; k++){
            var rank = k+1;
            z = highScores[k].uScore;
            x =highScores[k].uName;
            scoreRow[k] = "<tr><td>"+rank+"</td><td>"+x+"</td> <td>"+z+"</td></tr>"
            $("#tb").append(scoreRow[k]);
          }
          $("h4").text("Highest score");
          $("h7").empty();
          $("h7").append("<table class=\"table table-sucess\"><thead><tr><th>N°</th><th>Name</th><th>Score</th></tr></thead><tbody>"+ scoreRow[0] +"</tbody></table>");
          $("h7").show();
       
       }
   
    });

    /** Return and clear scores process*/

     $("#back, #clear").on("click", function(e) {

        $("h4").text("Coding Quiz challenge");
        $("h6, #Start").removeClass("d-none"); 
        $("#back, #clear").addClass("d-none");
        $("h5").addClass("d-none");
        $("#qBtn").removeClass("d-flex flex-column float-left");
        timeLeft = 0;
        $("#time").text("0:0")
        i =0;

        $("h7").hide();

        btnId = e.target.id;
          
        if (btnId =="clear"){
            $("h7, #tb").empty();
        }
        
        
     });
 
});

