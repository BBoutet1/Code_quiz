

/***  List of questions and corresponding list of answer choices  ****/
var questionsList = [
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
        answers: ["Select the firt div element", "Select all div elements"]

    },
   {
        question : "What scripting language is jQuery written in?",
        answers: ["css", "Javascript","C++"]
   }

]

/*****  List of all good answers(second element of each answers array for each question) *****/
var goodAnswers=[];
for (var i=0; i<questionsList.length; i++){
    goodAnswers.push(questionsList[i].answers[1]);
 }

/*****  Question number (array index)  *****/
var i= 0;

$(document).ready(function(){

/*****  Setting the timer  *****/
var timeLeft = 1000*10*questionsList.length// the timer is a funtion of the quiz length
function setTime() {
    var timerInterval = setInterval(function() {
    timeLeft = timeLeft-1000;
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
 $("#Start, #b1, #b2, #b3, #b4").click(function(){
    
    /**** Timer started once afer Start button is clicked****/
    if (i==0){
        setTime();
     }

     /**** Getting the html score value****/
    var score = $("#score").text();
 
     /**** While  is not reached AND timer left time is not 0 ****/    
     if(i<(questionsList.length-1) && timeLeft!=0 ){
        $("h4").text(questionsList[i].question) // Question i displayed
        $("#qBtn").addClass("d-flex flex-column float-left");
        $("h6, #Start, #b3, #b4").addClass("d-none"); //Remove the instructions (h6) and start button/ No answers 3 and 4 in all questions
    
           
        /***  Saving the question number i and its answers' array  ****/
        var answersArray = questionsList[i].answers; // answers array                    
        var numAnswers = answersArray.length; // answers array length

        /***  Saving the choosed answer***/
        var chosedAnswer = $(this).text(); // selected answer
        chosedAnswer = chosedAnswer.substring(3); // removing the number to match(compare) with the good answer

        /***  Randomly reoganizing the question i answers array ***/
        var randomAnswers = []; // random answers array
        for (var j=0; j<numAnswers; j++) {
            var random = Math.floor(Math.random() * (answersArray.length-1));
            randomAnswers.push(answersArray[random]);
            answersArray.splice(random,1);
            
            /**  Writting the answers in button b1 to bk (k = 2 to 4)  **/
            var k =j+1;
            var aNum = String.fromCharCode(64+k); // answer number (from A to D)
            $("#b"+k).text(aNum+". "+randomAnswers[j]);
            $("#b"+k).addClass("text-left");
            $("#b"+k).removeClass("d-none");
        }

        /***  Comparing the seclected answer to the good answer and updating the score the score  ****/
        var goodAnswer = goodAnswers[i-1];
        if (i>0){
            if (chosedAnswer == goodAnswer) {
                $("#cardfoot").text("Correct!"); 
                 $(".card-footer").removeClass("text-danger d-none");
                 $(".card-footer").addClass("text-success"); 
                score++;   
                $("#score").text(score); // writing the new score value           
            } 
            else if (chosedAnswer != goodAnswer){
                $("#cardfoot").text("Wrong!");
                $(".card-footer").removeClass("text-success d-none"); 
                $(".card-footer").addClass("text-danger");
                timeLeft -=10000 // -10 secondes penalty for a wrong answer    
            }  
         
        }
         /*** Next question ***/
         i++;                
       } 
       /*** Quiz ended at after last question or if the left time is 0 secondes **/
        else { 
            $("#b1, #b2, #b3, #b4").addClass("d-none");
            $("h6").text("All done!")
            $("#finalScore").removeClass("d-none")
            $("#score").text(score+" / "+questionsList.length);
               /****  Saving the score ****/
            var highScores = [];
            var userScore ={
                name:"",
                uScore: 0,
            };
            $("#addName").on("click", function() {
                // This line grabs the input from the textbox
                userScore.name = $("#scoreInput").val().trim();
                userScore.uScore = score;
            });
        }
      
        setTimeout(timer, 800);
        function timer (){
        $(".card-footer").addClass("d-none");  

        }
       
        
         

    });
    
});
