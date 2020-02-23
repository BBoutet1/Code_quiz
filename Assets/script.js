
$(document).ready(function(){

// Starting the quizz
    $("#startQuiz").click(function(){

        //Question text
        $("h6").html("Question 1");

       //Replace the "Start Quizz button by the 1rst answer choice button"
       $("#qBtn").html("<button id=\"Ans1\" type=\"button\" class=\"btn btn-success mb-2\">Answer 1</button>");
       
       //add 3 more choice buttons to the first one.
       $("#qBtn").append("<button id=\"Ans2\" type=\"button\" class=\"btn btn-success mb-2\">Answer 2</button>");
       $("#qBtn").append("<button id=\"Ans3\" type=\"button\" class=\"btn btn-success mb-2\">Answer 3</button>");
       $("#qBtn").append("<button id=\"Ans4\" type=\"button\" class=\"btn btn-success mb-2\">Answer 4</button>");
       
       //Choice list vertical left align
       $("#qBtn").toggleClass("d-flex flex-column float-left");
     

    });
});

// Questions and answers objects
//NOTE: In the code "Answer1" is always the right answer.
/* var [
    QuestionOne{
        Question : ""
        Answer1: ""
        Answer2: ""
        Answer3: ""
        Answer4: ""
        Answer5: ""
    },
    QuestionTwo{
        Question : ""
        Answer1: ""
        Answer2: ""
        Answer3: ""
        Answer4: ""
        Answer5: ""
    },
    QuestionTree{
        Question : ""
        Answer1: ""
        Answer2: ""
        Answer3: ""
        Answer4: ""
        Answer5: ""
    },
    QuestionFour{
        Question : ""
        Answer1: ""
        Answer2: ""
        Answer3: ""
        Answer4: ""
        Answer5: ""
    },

    QuestionFive{
        Question : ""
        Answer1: ""
        Answer2: ""
        Answer3: ""
        Answer4: ""
        Answer5: ""
    },

    QuestionSix{
        Question : ""
        Answer1: ""
        Answer2: ""
        Answer3: ""
        Answer4: ""
        Answer5: ""
    },


    QuestionSeven{
        Question : ""
        Answer1: ""
        Answer2: ""
        Answer3: ""
        Answer4: ""
        Answer5: ""
    },

    QuestionEight{
        Question : ""
        Answer1: ""
        Answer2: ""
        Answer3: ""
        Answer4: ""
        Answer5: ""
    },

    QuestionNine{
        Question : ""
        Answer1: ""
        Answer2: ""
        Answer3: ""
        Answer4: ""
        Answer5: ""
    },

    QuestionNine{
        Question : ""
        Answer1: ""
        Answer2: ""
        Answer3: ""
        Answer4: ""
        Answer5: ""
    },




] */