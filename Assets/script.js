
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

       $("h6").text(questionsList[i].question)
       $("#qBtn").addClass("d-flex flex-column float-left");
       $("#qBtn").addClass("text-left");
       $("#b3, #b4").addClass("d-none");
            for (var j=0; j<questionsList[i].answers.length; j++) {
            var k =j+1
           // b ="b"+k;
            var answer = questionsList[i].answers[j]
            $("#b"+k).text(answer);
            $("#b"+k).removeClass("d-none");
            //for (var j=questionsList[i].answers.length; j< )
         }

     
      

    });
console.log(i);


for (i=0; i<5; i++){
  console.log(Object.keys(questionsList[i]).length);


}



});

