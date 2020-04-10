/***  Variables ***/
var questionsList = []; // List of all questions
var answersArray = []; //List  of answers for all questions
var questionNumber = 0; // Current question number (start from index 0)
var goodAnswers = []; // List of all good answers
var highScores = []; // List of at the maximum 5 highest scores
var name = ""; // user Initials
let score = 0; // User final score
var attempt = [] // user initials - score objet(one element array)

/*** Defining the different questions  and answers***/
function quizfunction() {
    /*** Re-initializATION ***/
    questionsList = [];
    answersArray = [];
    goodAnswers = [];


    var quizArray = [{
            question: "What is the correct  HTML5 doctype?", // the question
            answers: ["<DOCTYPE html>", "<!DOCTYPE html>", "<!DOCTYPE html5>"] // answer choices
        },
        {
            question: "Which tag start a numbered list?",
            answers: ["<al>", "<ol>", "<ul>", "<li>"]
        },
        {
            question: "Inline elements are normally displayed without starting a new line.",
            answers: ["False", "True"]
        },
        {
            question: "Which HTML is correct for referencing an external stylesheet",
            answers: ["<link src=\"stylesheet\" type=\"text/css\" href\style.css\" />",
                "<href=\"stylesheet\" type=\"text/css\" href=\"style.css\" />",
                "<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\" />"
            ]

        },

        {
            question: "Which CSS property changes the text color of an element?",
            answers: ["font-color", "color", "text-color"]
        },
        {
            question: "Is it allowed to use negative values when using padding properties?",
            answers: ["Yes", "No"]
        },
        {
            question: "In which HTML tag do we put the JavaScript?",
            answers: ["<js>", "<script>", "<src>"]
        },

        {
            question: "The external JavaScript file contains the <script> tag.",
            answers: ["True", "False"]
        },
        {
            question: "How does a FOR loop start?",
            answers: ["for(i=0, i<5, i++)", "for(i=0; i<5; i++)", "for(i=0 to 5, i++)", "for(i=0, i<5)"]
        },
        {
            question: "On how many columns is the Bootstrap grid system based ?",
            answers: ["10", "12", "25", "1024"]
        },

        {
            question: "Which Bootstrap contextual class indicates a dangerous or negative action? ",
            answers: [".text-warning", ".text-danger", ".attention", ".text-stop"]
        },

        {
            question: "The Bootstrap grid system works across multiple devices.",
            answers: ["False", "True"]
        },

        {
            question: "jQuery is a Javascript library.",
            answers: ["False", "True"]
        },
        {
            question: "Which sign is used as a shortcut for jQuery?",
            answers: ["#", "$", "%"]
        },

        {
            question: "What the following selector: $(\"div\") does?.",
            answers: ["Select the first div element", "Select all div elements"]

        },
        {
            question: "What scripting language is jQuery written in?",
            answers: ["css", "Javascript", "C++"]
        }

    ]

    for (var j = 0; j < quizArray.length; j++) {
        answersArray[j] = quizArray[j].answers;
        goodAnswers.push(quizArray[j].answers[1]);
        questionsList.push(quizArray[j].question)
    }

};

$(document).ready(function() {

    /** Highscores table hiden initially behind **/
    $("tbody").hide();

    $(".viewTable, table").mouseenter(function() {
        $("tbody").show();
    });

    $(".viewTable, table").mouseleave(function() {
        $("tbody").hide();
    });

    /**  Setting the timer  **/
    var timeLeft = 0;

    function setTime() {
        var timerInterval = setInterval(function() {
            if (timeLeft > 0 && questionNumber < questionsList.length - 1) {
                timeLeft = timeLeft - 1000;
            }
            var minutes = Math.floor(timeLeft / (1000 * 60)); // Conversion in minutes
            var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            var t = minutes + ":" + seconds; // time in minutes ans secondes
            $(".timeLeft").text(t)

            if (timeLeft === 0) {
                clearInterval(timerInterval);
            }

        }, 1000);
    }



    /*****  start and answer buttons listener  *****/
    $(".btn").click(function(e) {

        /**** Re-itinitialization with start button click****/
        buttonId = e.target.id;
        if (buttonId == "start") {
            quizfunction();
            timeLeft = 1000 * 8 * questionsList.length // the timer is a funtion of the quiz length
            setTime();
            score = 0;
            $("#score").text(score);
            name = "";
            questionNumber = -1; //waiting the first question where index is 0)
        }

        /**** While last question  is not reached AND left time is not 0 ****/
        if (questionNumber < (questionsList.length - 1) && timeLeft != 0) {
            /***  Comparing the seclected answer to the good answer and updating the score the score  ****/
            if (questionNumber >= 0) {
                var answer = $(this).text(); // selected answer
                const chosedAnswer = answer.substring(3); // removing the number to match(compare) with the good answer
                const goodAnswer = goodAnswers[questionNumber]; // good answer
                if (chosedAnswer == goodAnswer) {
                    $("#cardfoot").text("Correct!");
                    $(".card-footer, #cardfoot").removeClass("text-danger d-none");
                    $(".card-footer").addClass("text-success");
                    score++;
                    $("#score").text(score); // writing the new score value           
                } else if (chosedAnswer != goodAnswer) {
                    $("#cardfoot").text("Wrong!");
                    $(".card-footer, #cardfoot").removeClass("text-success d-none");
                    $(".card-footer").addClass("text-danger");
                    if (timeLeft >= 10000) {
                        timeLeft -= 10000 // -10 secondes penalty for a wrong answer  
                    } else {
                        timeLeft = 0;
                    }
                }
            }

            /*** Displaying next question  and its answers */
            if (questionNumber < questionsList.length - 1) {
                const answers = answersArray[questionNumber + 1]; // ansers array
                const numAnswers = answers.length;
                $(".card-header").text(questionsList[questionNumber + 1])
                $(".quizIntro, #start, #b3, #b4").addClass("d-none");

                /***  Randomly reoganizing the question i answers array ***/
                var randomAnswers = []; // random answers array
                for (var j = 0; j < numAnswers; j++) {
                    var random = Math.floor(Math.random() * (answers.length - 1));
                    randomAnswers.push(answers[random]);
                    answers.splice(random, 1);

                    /**  Writting the answers in button b1 to bk (k = 2 to 4)  **/
                    var k = j + 1;
                    var aNum = String.fromCharCode(64 + k); // answer number (from A to D)
                    $("#b" + k).text(aNum + ". " + randomAnswers[j]);
                    $("#b" + k).addClass("text-left");
                    $("#b" + k).removeClass("d-none");
                }
                /*  Defining width of the answers buttons (container) to allow centering */
                $(".answersContainer").width(550); // expend button container first
                // Largest button width
                const largestButton = Math.max.apply(Math, $(".btn").map(function() { return $(this).outerWidth(); }).get());
                $(".answersContainer").width(largestButton); // container width equal to the largest button width

                /*  Handling answers buttons (container) overflow  */
                const flexButton = $("main").width() - 30;
                $(".answersContainer").css("max-width", flexButton + "px ");


            }

            //moving to the next question
            questionNumber++;

            /** Answers status (Right, Wrong )  displayed in the cad footer for 0.8 sec */
            setTimeout(timer, 800);

            function timer() {
                $(".card-footer").addClass("d-none");
            }

        }
        /*** Quiz ended after last question OR if left time 0 secondes **/
        else {
            $("#b1, #b2, #b3, #b4").addClass("d-none");
            $(".card-header").text("All done!")
                //If all questions not answered in given time
            if (questionNumber < questionsList.length - 2) {
                $(".card-header").text(questionsList.length - questionNumber + " questions not completed. Time out!")
            }
            /****  Saving the score ****/
            $("#finalScore, #addName").removeClass("d-none")
            const scoPercent = (score / questionsList.length) * 100
            $("#score").text(scoPercent + " % ");
            $("#back, #clear").removeClass("d-none");
        }

    });


    /*** Saving the initials */
    $("#addName").on("click", function(event) {
        event.preventDefault();
        /***grabing the intials from the textbox**/
        name = $("#scoreInput").val().trim();
        if (name == "") {
            /** Null initial input */
            alert("Please, enter your initials")
        } else if (name.length > 15) {
            alert("oo long, please change initials")
        } else {
            $("#addName, #finalScore").addClass("d-none");
            $("#back, #clear").removeClass("d-none");

            /** High score table organized  in decreasing order */
            const scoPercent = (score / questionsList.length) * 100;
            const attempt = [{ uName: name, uScore: scoPercent }];
            highScores = highScores.concat(attempt);
            highScores.sort(function(a, b) {
                return b.uScore - a.uScore;
            });
            var x = 0; // score local variable
            var z = ""; // initials local variable
            var scoreRow = [];
            $("tbody").empty();

            /*** No more than 5 high scores rows or delete the lowest*/
            while (highScores.length > 5) {
                highScores.splice(history.length - 1, 1);
            }

            /** Generationg the ordered hiscore table */
            for (var k = 0; k < highScores.length; k++) {
                var rank = k + 1;
                z = highScores[k].uScore;
                x = highScores[k].uName;
                scoreRow[k] = "<tr><td>" + rank + "</td><td>" + x + "</td> <td>" + z + " %" + "</td></tr>"
                $("tbody").append(scoreRow[k]);
            }

            /** Presenting the highest score **/
            $(".card-header").text("Highest score");
            //Removing previous highest score
            $(".highestScore").empty();
            //Inserting last highest score
            $(".highestScore").append("<table class=\"table table-sucess\"><thead><tr><th>N°</th><th>Name</th><th>Score</th></tr></thead><tbody>" + scoreRow[0] + "</tbody></table>");
            $(".highestScore").show();
        }
    });

    /** Go back to re-start the quizz **/
    $("#back").on("click", function() {
        $(".card-header").text("Coding Quiz challenge");
        $(".quizIntro, #start").removeClass("d-none");
        $("#back, #clear").addClass("d-none");
        $(".answersContainer").removeClass("d-flex flex-column float-left");
        $(".timeLeft").text("0:00")
        $(".highestScore").hide();
        $("#finalScore").addClass("d-none");
        timeLeft = 0;
    });

    //Clearing highcores table and the highest score display
    $("#clear").on("click", function() {
        $("tbody, .highestScore").empty();
        highScores = [];
        $("#finalScore").removeClass("d-none");
    });
});