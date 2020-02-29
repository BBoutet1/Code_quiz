

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
                "<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\" />",
                 "<href=\"stylesheet\" type=\"text/css\" href=\"style.css\" />"]
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

/***  List of all good answers from question 1 (second element of each answers array for each question) ****/
var goodAnswers=[];
for (var i=0; i<questionsList.length; i++){
    goodAnswers.push(questionsList[i].answers[1]);
 }


var i= 0; // question number

$(document).ready(function(){

/***  Starting the quiz and Initialize the score  ****/
    var score;
   
/***  Processing the selections  ****/
 $("#Start, #b1, #b2, #b3, #b4").click(function(){

    $("h6").text(questionsList[i].question) // Question display
    $("#qBtn").addClass("d-flex flex-column float-left");
    $("#Start, #b3, #b4").addClass("d-none"); // minimum question 1 and 3 -> hide buttons 3 and 4
    $(".card-footer").removeClass("d-none");
    
    if(i<(questionsList.length-1)){
        /***  Saving the question i answers list and its length  ****/
        var answersArray = questionsList[i].answers; // answer list                    
        var numAnswers = answersArray.length; // answers list length

        var chosedAnswer = $(this).text(); // selected answer
        chosedAnswer = chosedAnswer.substring(3); // removing the number in the sected answer

        /***  Processing the relation "question - answer list - selected answer  ****/
        var randomAnswers = []; 
        for (var j=0; j<numAnswers; j++) {
            /***  Randomly changing the right answer position in the choices list   ****/
            var random = Math.floor(Math.random() * (answersArray.length-1));
            randomAnswers.push(answersArray[random]);
            answersArray.splice(random,1);
            /***  Writting the answers in button   ****/

            var k =j+1; // bk is the id of the answer button k
            var aNum = String.fromCharCode(64+k); // Numbering the answers from A to D
            $("#b"+k).text(aNum+". "+randomAnswers[j]);
            $("#b"+k).addClass("text-left");
            $("#b"+k).removeClass("d-none");
    
        }

        /***  Comparing the sected answer to the right answer and counting the score  ****/
        
        var goodAnswer = goodAnswers[i-1];
        if (i>0){
            if (chosedAnswer == goodAnswer) {
              
                $(".card-footer").text("Correct!"); 

                /***  Counting the score  ****/
                if ( i<1){
                     score++;
                }
                    
            } 
            else if (chosedAnswer != goodAnswer){
                $(".card-footer").text("Wrong!");   
            }  

            console.log(score);
        }
             

                
       } 
        else if (i=(questionsList.length-1)){
            $("#b1, #b2, #b3, #b4").addClass("d-none");
            $("h6").text("All done")
            $("#finalScore").removeClass("d-none")
        }
            i++;   
  
    });
});
