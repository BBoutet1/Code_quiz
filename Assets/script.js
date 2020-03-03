/***  List of questions ***/
var questionsList=[];
/***  List of all answers by question  ***/
var answersArray = [];
/***  List answers of good answer by question  ***/
var goodAnswers=[];
var sortedHighscors=[];

/** Highscores array **/
var highScores = [];

/** User initials **/
var name = "";

/** User final score */
var score = 0;

/** user & score */
var attempt = []


/*** Defining the different list ***/
function quizfunction(){
    questionsList=[]; // initialisation (empty)
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

    /**** Timer started once afer "Start Quiz" button is clicked****/
    buttonId = e.target.id;


    /**** Starting the timer & calling the answers lists ****/
    if (buttonId == "Start"){
        quizfunction();
        timeLeft =  1000*8*questionsList.length// the timer is a funtion of the quiz length
        setTime();
        score = 0;
        $("#score").text(score);
        name = "";
    }

     /**** Getting the html score value****/
    

     /**** While last question  is not reached AND left time is not 0 ****/    
     if(i<(questionsList.length) && timeLeft!=0 ){
        $("h4").text(questionsList[i]) // Question i displayed
        $("#qBtn").addClass("d-flex flex-column float-left");
        $("h6, #Start, #b3, #b4").addClass("d-none"); //Remove the instructions (h6) and start button/ No answers 3 and 4 in all questions
        
        var answers = answersArray[i];
        var numAnswers = answers.length; // answers array length

        
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
            console.log("start: "+ name + "  |  "+ score);
            $("#b1, #b2, #b3, #b4").addClass("d-none");
            $("h4").text("All done!")
            if (i<questionsList.length){
                $("h4").text(i+" questions completed. Time out!")
            }
            $("#finalScore, #addName").removeClass("d-none")
            $("#score").text(score+" / "+questionsList.length);
               /****  Saving the score ****/
          
            
           
           
        }
        setTimeout(timer, 800);
        function timer (){
        $(".card-footer").addClass("d-none");  
        }
       
    });
    $("#addName").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        name = $("#scoreInput").val().trim();
        if(name ==""){
            alert("Please, enter your initials")
        }
        else{
                   
            $("#addName, #finalScore").addClass("d-none");
            $("#back, #clear").removeClass("d-none");
                   
           var attempt=[ {uName:name, uScore:score}];
           highScores = highScores.concat(attempt); 
           console.log(attempt);
           console.log(highScores);
           
           
           highScores.sort(function (a, b) {
               return b.uScore - a.uScore;
             });
           console.log(highScores);
          
          var x = 0;
          var z = ""; 
          var scoreRow = [];
          $("#tb").empty();
 
        /*** No more than 6 high score row*/
        var max =0;
        if(highScores.length>5){
            max = 5;
            
        }
        else{
            max =highScores.length
        }
        for(var k=0; k<max; k++){
            //console.log(highScores[1].uName);
            var rank = k+1;
            z = highScores[k].uScore;
            x =highScores[k].uName;
            scoreRow[k] = "<tr><td>"+rank+"</td><td>"+x+"</td> <td>"+z+"</td></tr>"
            $("#tb").append(scoreRow[k]);
          }
          $("h4").text("Highest cores");
          $("h7").append("<table class=\"table table-sucess\"><thead><tr><th>N°</th><th>Name</th><th>Score</th></tr></thead><tbody>"+ scoreRow[0] +"</tbody></table>");

       
       }
   
    });

    $("#back, #clear").on("click", function(e) {
        $("h4").text("Coding Quiz challenge");
        $("h6, #Start").removeClass("d-none"); 
        $("#back, #clear").addClass("d-none");
        $("h5").addClass("d-none");
        $("#qBtn").removeClass("d-flex flex-column float-left");
        timeLeft = 0;
        $("#time").text("0:0")
        i =0;

        var test =0;
        butId = e.target.id;
        console.log(butId);
        console(butId =="Clear");

        /**** Starting the timer & calling the answers lists ****/
        if (butId =="Clear"){
            $("h7, #tb").empty();
            var test=10;
            
        }
        
     });
 
});

