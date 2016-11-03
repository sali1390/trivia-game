$(document).ready(function(){
    $("#nextQ").hide();
    $(".choices").hide();
    $("#seeResults").hide();
    $("#playAgain").hide();
    
    //All questions here
    var questions = [
        [
            "../assets/images/flareonHidden.png",
            ["Gilderoy Lockhart", "Sirius Black", "Dobby", "A Dementor"],
            1,
            "gif",
            "../assets/images/flareon.png"
        ],
        [
            "../assets/images/meowthHidden.png",
            ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
            2,
            "gif",
            "../assets/images/meowth.png"
        ],
        [
            "../assets/images/psyduckHidden.png",
            ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
            3,
            "gif",
            "../assets/images/psyduck.png"
        ],
        [
            "../assets/images/snorlaxHidden.png",
            ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
            0,
            "gif",
            "../assets/images/snorlax.png"
        ],
        [
            "../assets/images/mewtwoHidden.png",
            ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
            2,
            "gif",
            "../assets/images/mewtwo.png"
        ],
        [
            "../assets/images/ninetalesHidden.png",
            ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
            0,
            "gif",
            "../assets/images/ninetales.png"
        ],
        [
            "../assets/images/pidgeyHidden.png",
            ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
            3,
            "gif",
            "../assets/images/pidgey.png"
        ],
        [
            "../assets/images/pickachuHidden.png",
            ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
            1,
            "gif",
            "../assets/images/pickachu.png"
        ], 
    ];
    
    //Define variables
    var currentQuestion;
    var userChoice;
    var currentTime;
    var correctAnswer;
    var qNum = 0;
    var numCorrect = 0;
    var numIncorrect = 0;
    var unanswered = 0;
    var interval;
    
    //function to start timer and run in intervals based on count function
    function startTimer() {
        interval = setInterval(count, 1000); 
    };
    
    //function to stop timer
    function stopTimer() {
        clearInterval(interval);
    };
    
    //function to count the timer
    function count() {
        $("#timer").html("Time Remaining: " + currentTime);
        currentTime--;
        if (currentTime <= -1) {
            stopTimer();
            unanswered++;
            $("#question").html("Times Up! The correct answer is: " + correctAnswer);
        }
    };
    
    //Starts game
    $("#startButton").on("click", function(){
        startTimer();
        displayQ();
    });
    
    //Function that passes the index of the question and prints the question and choices to the page
    function printQuestion(t) {
        $(".choices").show();
        $("#question").html('<img src="' + questions[t][0] + '"/>');
        $("#choice1").html(questions[t][1][0]);
        $("#choice2").html(questions[t][1][1]);
        $("#choice3").html(questions[t][1][2]);
        $("#choice4").html(questions[t][1][3]);
        var correctAnswerIndex = [questions[t][2]];
        correctAnswer = questions[t][1][correctAnswerIndex];
    };
    
    //Displays the respective gif
    function displayGif(g) {
        $("#gif").html(questions[g][2]);
    };
    
    //Displays the next question and all revelent info such as time
    function displayQ() { 
        currentTime = 30;
        printQuestion(qNum);
        $("#startButton").hide();
        console.log("correct " + correctAnswer);
        console.log(qNum);
        $("#gif").hide();
    };
    
    //Click handler that captures the User's input
    $(".choices").on("click", function(){
        userChoice = $(this).html();
        console.log("user " + userChoice);
        stopTimer();
        checkAnswer();
    });

    //Checks if the answer is correct or incorrect and increments accordingly
    function checkAnswer() {
        if (userChoice == correctAnswer) {
            answerIsCorrect();
            numCorrect++;
            stopTimer();
            $("#gif").show();
            $("#nextQ").show();
        } else {
            answerIsIncorrect();
            numIncorrect++;
            stopTimer();
            $("#gif").show();
            $("#nextQ").show();
        }
        if (qNum >= 8) {
            $("#seeResults").show();
            $("#nextQ").hide();
        }
    };
    
    //What to do if answer is correct
    function answerIsCorrect() {
        $("#question").html('<img src="' + questions[qNum][4] + '"/>' + "<br>" + "Correct!");
        displayGif(qNum);
        qNum++;
        console.log("After check: " + qNum);
    };
    
    //What to do if answer is incorrect
    function answerIsIncorrect() {
        $("#question").html('<img src="' + questions[qNum][4] + '"/>' + "<br>" + "Nope! The correct answer is: " + correctAnswer);
        displayGif(qNum);
        qNum++;
        console.log("After check: " + qNum);
    };
    
    //Click handler to procees to next question
    $("#nextQ").on("click", function() {
        startTimer();
        displayQ();  
    });
    
    $("#seeResults").on("click", function(){
        displayResults();
    })
    
    function displayResults() {
        $("#question").html("Are you a Pokemon Master?");
        $(".choicesBlock").html("Correct Answers: " + numCorrect + "<br>" + "Incorrect Answers: " + numIncorrect + "<br>" + "Unanswered: " + unanswered);
        $("#seeResults").hide();
        $("#playAgain").show();
    }
    
});