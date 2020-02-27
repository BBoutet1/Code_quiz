
//NOTE: In the code "Answer1" is always the right answer.

var questionsList = [
    {
        question: "What is the correct  HTML5 doctype?",
       answers : [   "<DOCTYPE html>","<!DOCTYPE html>","<!DOCTYPE html5>",]
    },
   {
        question: "Which tag start a numbered list?",
        answers: [ "<al>", "<ol>","<ul>", "<li>",]
    },
  {
        question: "Inline elements are normally displayed without starting a new line.",
        answers: [ "False","True",]
    },
  {
        question: "Which HTML is correct for referencing an external stylesheet",
        answers: [ "<link src=\"stylesheet\" type=\"text/css\" href\style.css\" />",
                "<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\" />",
                 "<href=\"stylesheet\" type=\"text/css\" href=\"style.css\" />",]
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
        answers: [ "True", "Faste"]
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
        answer1: ["css", "Javascript","C++"]
   }

];



var i= -1;

$(document).ready(function(){

 // Starting the quiz
 $("#b1, #b2, #b3, #b4").click(function(){
      i++;

    if(i<(questionsList.length-1)){
    
       $("h6").text(questionsList[i].question)
       $("#qBtn").addClass("d-flex flex-column float-left");
       $("#b3, #b4").addClass("d-none");
       $("#answerStatus").removeClass("d-none");
            var answersArray = questionsList[i].answers; // Storing the answers array
            var numAnswers = answersArray.length; // Storing the initial length
            var randomAnswers = []; // Randomly organized answers array

            console.log("Initial start " +answersArray)

            //moving randomly in the storage array
            for (var j=0; j<numAnswers; j++) {
                var random = Math.floor(Math.random() * (answersArray.length-1));
                randomAnswers.push(answersArray[random]);
                answersArray.splice(random,1);
                var k =j+1
                var aNum = String.fromCharCode(64+k); // answer number (capital letter)
               $("#b"+k).text(aNum+". "+randomAnswers[j]);
               $("#b"+k).addClass("text-left");
               $("#b"+k).removeClass("d-none");
               $("#answerStatus").addClass("d-none");
               $("#qBtn"+k).removeClass("text-center");

               
             
            } 
            //var x = document.getElementsByClassName("anchors")[0].id;
          /*   if (this.text() ==questionsList[1].answers){
                $("#answerStatus").text("Correct!");                     
            }
            else{
                $("#answerStatus").text("Wrong!");     
            } */
            
       } 
       else if (i=(questionsList.length-1)){
            $("#b1, #b2, #b3, #b4").addClass("d-none");
            $("h6").text("All done")
            $("#finalScore").removeClass("d-none")
            }
                
    });
});

