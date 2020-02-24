
//NOTE: In the code "Answer1" is always the right answer.

var questionsList = [
    {
        question: "What is the correct  HTML5 doctype?",
        answer1: "<!DOCTYPE html>",
        answer2: "<DOCTYPE html>",
        answer3: "<!DOCTYPE html5>",
        answer4: "",
        answer5: "",
    },
   {
        question: "Which tag start a numbered list?",
        answer1: "<ol>",
        answer2: "<al>",
        answer3: "<ul>",
        answer4: "<li>",
        answer5: "",
    },
  {
        question: "Inline elements are normally displayed without starting a new line.",
        answer1: "True",
        answer2: "False",
        answer3: "",
        answer4: "",
        answer5: "",
    },
  {
        question: "Which HTML is correct for referencing an external stylesheet",
        answer1: "<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\" />",
        answer2: "<link src=\"stylesheet\" type=\"text/css\" href\style.css\" />",
        answer3: "<href=\"stylesheet\" type=\"text/css\" href=\"style.css\" />",
        answer4: "<src>style.css </src>",
        answer5: "",
    },

   {
        question : "Which CSS property changes the text color of an element?",
        answer1: "color",
        answer2: "font-color",
        answer3: "text-color",
        answer4: "",
        answer5: "",
    },
    {
        question : "Is it allowed to use negative values when using padding properties",
        answer1: "No",
        answer2: "Yes",
        answer3: "",
        answer4: "",
        answer5: "",
    },
   {
        question: "In which HTML element do we put the JavaScript?",
        answer1: "<script>",
        answer2: "<js>",
        answer3: "<src>",
        answer4: "",
        answer5: "",
    },

    {
        question: "The external JavaScript file contains the <script> tag.",
        answer1: "Faste",
        answer2: "True",
        answer3: "",
        answer4: "",
        answer5: "",
    },

   {
        question : "How does a FOR loop start?",
        answer1: "for(i=0; i<5; i++)",
        answer1: "for(i=0, i<5, i++)",
        answer2: "for(i=0 to 5, i++)",
        answer3: "for(i=0, i<5)",
        answer4: "",
        answer5: "",
    },

    {
        question : "On how many columns is the Bootstrap grid system based ",
        answer1: "12",
        answer2: "10",
        answer3: "25",
        answer4: "1024",
        answer5: "",
    },

    {
        question : "Which Bootstrap contextual class indicates a dangerous or negative action? ",
        answer1: ".text-danger",
        answer2: ".text-warning",
        answer3: ".attention",
        answer4: ".text-stop",
        answer5: "",
    },

   {
        question : "The Bootstrap grid system works across multiple devices.",
        answer1: "True",
        answer2: "False",
        answer3: ".attention",
        answer4: ".text-stop",
        answer5: "",
    },

 {
        question : "jQuery is a Javascript library.",
        answer1: "True",
        answer2: "False",
        answer3: "",
        answer4: "",
        answer5: "",
    },
    {
        question : "Which sign does jQuery use as a shortcut for jQuery?.",
        answer1: "$",
        answer2: "#",
        answer3: "%",
    },

 {
        question : "What the following selector: $(\"div\") does?.",
        answer1: "Select all div elements",
        answer2: "Select the firt div element",

    },


   {
        question : "What scripting language is jQuery written in?",
        answer1: "Javascript",
        answer2: "css",
        answer3: "C++",
        answer4: "",
        answer5: "",
    }

];



var i= 0;

$(document).ready(function(){

 // Starting the quiz
 $("#b1, #b2, #b3, #b4").click(function(){
      //i++;

       $("h6").text(questionsList[i].question)
       $("#b1").text(questionsList[i].answer1);
       $("#b2").text(questionsList[i].answer2);
       $("#b3").text(questionsList[i].answer3);
       $("#b4").text(questionsList[i].answer4);
       
       //Choice list vertical left align
       $("#qBtn").addClass("d-flex flex-column float-left");
       $("#b1, #b2, #b3, #b4").addClass("text-left")
       $("#b3, #b2, #b3, #b4").removeClass("d-none")

     
       i++;

       return i;


    });
console.log(i)



});

