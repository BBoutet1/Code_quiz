/***  Global variables ***/
let questionsList = []; // Array of all questions-answers object
let answersArray = []; // Array  of retrieved answers for all questions
let goodAnswers = []; // List of all good answers
let questionNumber = 0; // Currently displayed question number (start from index 0)
let highScores = []; // List of at the maximum 5 highest scores
let name = ""; // user initials
let score = 0; // User final score
let attempt = [] // saved user initials-core objects array

/*** Defining the different questions  and answers***/
function quizfunction() {
    /*** Re-initializATION ***/
    questionsList = [];
    answersArray = [];
    goodAnswers = [];

    /********************************************************************************************************
     * This jSON lsits questions-answers in objects.                                                         *
     * The right answers is the second elements of  * each asnswers array                                    *
     * Answers are randomly reorganized bifore they are displayed to the user for selection                  *                                                           
     *********************************************************************************************************/
    let quizArray = [{
            question: "How to declare a function in Javascript?", // the question
            answers: ["function=myFunction()", "function myFunction()", "myFunction()"] // answer choices
        },
        {
            question: "How does a WHILE loop start?",
            answers: ["while i = 1 to 10", "while (i <= 10)", "while (i <= 10; i++)"]
        },
        {
            question: "Which operator is used to assign a value to a variable?",
            answers: ["x", "=", "+", "/"]
        },
        {
            question: "What does the following code returns: Boolean(5 > 9)?",
            answers: ["true", "false", "1", "-1"]

        },
        {
            question: "What does the following code  returns: Number(\"1\") - 1 == 0?",
            answers: ["false", "true", "1"]
        },
        {
            question: "Which code rounds 8.30, to the nearest integer??",
            answers: ["Math.round.(8.30)", "Math.round(8.30)"]
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
            question: "Let A = (new Array(4).toString()). What is the value of A?",
            answers: ["10", ",,,", "undefined", "10,10,10,10"]
        },
        {
            question: "Which method displays a dialog box that prompts the visitor for input? ",
            answers: ["alert()", "prompt()", "confirm", "submit()"]
        },
        {
            question: "Let X = \"car\"+16 ",
            answers: ["undefined", "car16"]
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

    /* Retrieving and saving answers listfor each question */
    for (let j = 0; j < quizArray.length; j++) {
        answersArray[j] = quizArray[j].answers;
        goodAnswers.push(quizArray[j].answers[1]); // good anser in second position
        questionsList.push(quizArray[j].question)
    }

};

$(document).ready(function() {

    /* Highscores table display functionality */
    $("tbody").hide(); // initially hidden
    $(".viewTable, table").mouseenter(function() {
        $("tbody").show(); // visible on mouseenter
    });
    $(".viewTable, table").mouseleave(function() {
        $("tbody").hide();
    });

    /*  Setting the timer  */
    let timeLeft = 0; // timer remaining time
    function setTimer() {
        let timerInterval = setInterval(function() {
            // decrementing timer
            if (timeLeft > 0 && questionNumber < questionsList.length) {
                timeLeft = timeLeft - 1000;
            }
            // Converting milliseconds in minutes and secondes
            let minutes = Math.floor(timeLeft / (1000 * 60));
            let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000) + ""; // string
            //Seconds display in 2 digits
            if (seconds.length < 2) {
                seconds = "0" + seconds;
            }
            let time = minutes + ":" + seconds;
            // Time value added in html
            $(".timeSpan").text(time)
            if (timeLeft === 0) {
                clearInterval(timerInterval);
            }

        }, 1000);
    }

    /**  Blinking and red timer for the last 20 secondes  **/
    function timerBlink() {
        let timeDisplay = "visible";
        let blinkInterval = setInterval(function() {
                if (timeLeft > 0 && timeLeft < 20000 && questionNumber < (questionsList.length)) {
                    $(".timeSpan").css("color", "red");
                    timeDisplay = (timeDisplay == "visible" ? "hidden" : "visible");
                    $(".timeSpan").css("visibility", timeDisplay);
                }
                if (timeLeft === 0) {
                    clearInterval(blinkInterval);
                    $(".timeSpan").css("visibility", "visible");
                    $(".timeSpan").css("color", "black");
                }
            },
            500);
    }
    /*  start buttons and answers buttons listener  */
    $(".btn").click(function(e) {
        /* Re-itinitialization when start button is clicked*/
        buttonId = e.target.id;
        if (buttonId == "start") {
            quizfunction();
            timeLeft = 1000 * 8 * questionsList.length // the timer is a funtion of the quiz length
            setTimer();
            timerBlink();
            score = 0;
            $("#score").text(score);
            name = "";
            questionNumber = -1; //waiting for the index is 0: first question)
        }

        /************************************************************************************************************************
         * Retrieving and processing questions and answers selectiions while last question is not reached AND left time is not 0 *
         ************************************************************************************************************************/
        if (questionNumber < (questionsList.length) && timeLeft != 0) {
            /*  Comparing selected answer to the good answer and updating the score  */
            if (questionNumber >= 0) {
                let answer = $(this).text(); // selected answer
                const chosedAnswer = answer.substring(3); // removing answer list number to match the string to  the correct answer
                const goodAnswer = goodAnswers[questionNumber]; // good answer for the current question
                if (chosedAnswer == goodAnswer) {
                    //Correct answer
                    $("#cardfoot").text("Correct!");
                    $(".card-footer, #cardfoot").removeClass("text-danger d-none");
                    $(".card-footer").addClass("text-success");
                    score++;
                    $("#score").text(score); // writing the new score value           
                } else if (chosedAnswer != goodAnswer) {
                    //Wrong answer 
                    $("#cardfoot").text("Wrong!");
                    $(".card-footer, #cardfoot").removeClass("text-success d-none");
                    $(".card-footer").addClass("text-danger");
                    if (timeLeft >= 10000) {
                        timeLeft -= 10000 // -10 secondes penalty for a wrong answer  
                    } else {
                        timeLeft = 0; // prevent negative time
                    }
                }
            }

            /* Answers status (Right, Wrong )  displayed in the cad footer for 0.8 sec */
            setTimeout(function timer() {
                $(".card-footer").addClass("d-none");
            }, 800);

            /* Displaying next question  and its answers */
            questionNumber++;
            if (questionNumber < questionsList.length) {
                const answers = answersArray[questionNumber]; // answers for the next question
                const numChoices = answers.length; // number of answers choices
                let currentQuesttion = questionNumber + 1
                let stepNum = "<i>" + currentQuesttion + " of " + questionsList.length + " </i>";
                let stepQuestion = "<h4>" + questionsList[questionNumber] + "</h4>"
                $(".card-header").html(stepNum + stepQuestion)
                $(".quizIntro, #start, #b3, #b4").addClass("d-none");

                /*  Randomly reoganizing answers  */
                let randomAnswers = []; // random answers array
                for (let j = 0; j < numChoices; j++) {
                    let random = Math.floor(Math.random() * (answers.length - 1));
                    randomAnswers.push(answers[random]);
                    answers.splice(random, 1);

                    /**  Writting the answers in button b1 to bk (k = 2 to 4)  **/
                    let k = j + 1;
                    let aNum = String.fromCharCode(64 + k); // answer list number (from A to D)
                    $("#b" + k).text(aNum + ". " + randomAnswers[j]);
                    $("#b" + k).addClass("text-left");
                    $("#b" + k).removeClass("d-none");
                }

                /*  Defining width of the answers container to allow centering */
                $(".answersContainer").width(550); // expend container first
                // Find the largest button width
                const largestButton = Math.max.apply(Math, $(".btn").map(function() { return $(this).outerWidth(); }).get());
                // container width equal to the largest button width for fitting
                $(".answersContainer").width(largestButton);

                /*  Handling answers buttons (container) overflow by limiting the width to the parent container */
                const flexButton = $("main").width() - 16;
                $(".answersContainer").css("max-width", flexButton + "px ");
            }
        }
        /* 
        when the quiz ends after last question OR time is 0 secondes **/
        if (questionNumber == 16 || timeLeft == 0) {
            $("#b1, #b2, #b3, #b4").addClass("d-none");
            $(".card-header").text("All done!")
                //If all questions not answered in given time
            if (questionNumber < questionsList.length) {
                $(".card-header").text(questionsList.length - questionNumber + " questions not completed. Time out!")
            }
            /*  Saving the score in % */
            $("#finalScore, #addName").removeClass("d-none")
            const scoPercent = (score / questionsList.length) * 100
            $("#score").text(scoPercent + " % ");
            $("#back, #clear").removeClass("d-none");
        }

    });

    /* Saving the input initials with corresponding score */
    $("#addName").on("click", function(event) {
        event.preventDefault();
        /***grabing the intials from the textbox**/
        name = $("#scoreInput").val().trim();
        if (name == "") {
            /* Null initials input */
            alert("Please, enter your initials")
        } else if (name.length > 10) {
            alert("Too long, please change initials length")
        } else {
            $("#addName, #finalScore").addClass("d-none");
            $("#back, #clear").removeClass("d-none");

            /* High score table organization  in decreasing order */
            const scoPercent = (score / questionsList.length) * 100;
            const attempt = [{ uName: name, uScore: scoPercent }];
            highScores = highScores.concat(attempt);
            highScores.sort(function(a, b) {
                return b.uScore - a.uScore;
            });
            let x = 0; // score local variable
            let z = ""; // initials local variable
            let scoreRow = [];
            $("tbody").empty();

            /* No more than 5 high scores rows or delete the lowest */
            while (highScores.length > 5) {
                highScores.splice(history.length - 1, 1);
            }

            /* Generating the ordered hiscores table */
            for (let k = 0; k < highScores.length; k++) {
                let rank = k + 1;
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
        $(".timeSpan").text("0:00")
        $(".highestScore").hide();
        $("#finalScore").addClass("d-none");
        timeLeft = 0;
    });

    //Clearing highcores table and the highest score display
    $("#clear").on("click", function() {
        const noScore = "  <tr> <td colspan = \"3\"style =\"font-style: italic\"> No score has been saved </td> </tr>"
        $("tbody").html(noScore);
        $(".highestScore").empty();
        highScores = [];
        $("#finalScore").removeClass("d-none");

    });
});