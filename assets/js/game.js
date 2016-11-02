$(document).ready(function(){
    $("#nextQ").hide();
    $(".choices").hide();
    
    var questions = [
         [
            "Who is Harry Potter's godfather?", 
            ["Gilderoy Lockhart", "Sirius Black", "Dobby", "A Dementor"],
            1,
            "gif"
        ],
        [
            "question 2",
            ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
            2,
            "gif"
        ],
        [
            "question 3",
            ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
            3,
            "gif"
        ],
        [
            "question 4",
            ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
            0,
            "gif"
        ],
        [
            "question 5",
            ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
            2,
            "gif"
        ],
        [
            "question 6",
            ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
            0,
            "gif"
        ],
        [
            "question 7",
            ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
            3,
            "gif"
        ],
        [
            "question 8",
            ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
            1,
            "gif"
        ], 
    ];
    
    console.log(questions);
    
    //Define variables for question, user's choice, and time
    var currentQuestion;
    var userChoice;
    var currentTime;
    var correctAnswer;
    var qNum = 0;
    
    //function to start timer and run in intervalls
    function startTimer() {
        setInterval(count, 1000); 
    }
    
    //function to count the timer
    function count() {
        $("#timer").html("Time Remaining: " + currentTime);
        currentTime--;
    }
    
    $("#startButton").on("click", function(){
        setInterval(count, 1000);
        startGame();
    });
    
    function printQuestion(t){
        $(".choices").show();
        $("#question").html(questions[t][0]);
        $("#choice1").html(questions[t][1][0]);
        $("#choice2").html(questions[t][1][1]);
        $("#choice3").html(questions[t][1][2]);
        $("#choice4").html(questions[t][1][3]);
        var correctAnswerIndex = [questions[t][2]];
        correctAnswer = questions[t][1][correctAnswerIndex];
        
        console.log(correctAnswerIndex);
    }
    function startGame() { 
        currentTime = 30;
        printQuestion(qNum);
        $("#startButton").hide();
        console.log("correct " + correctAnswer);
        qNum++;
    }
    
    $(".choices").on("click", function(){
        userChoice = $(this).html();
        console.log("user " + userChoice);
        clearInterval(count);
        checkAnswer();
    })
    
    if ()
    
    function checkAnswer() {
        if (userChoice == correctAnswer) {
            answerIsCorrect();
            $("#nextQ").show();
        } else {
            answerIsIncorrect();
            $("#nextQ").show();
        }
    }
    
    function answerIsCorrect() {
        $("#question").html("Correct!");
        $("#choices").html("gif");
    }
    
    function answerIsIncorrect() {
        $("#question").html("Nope!");
        $("<div>").attr("class", "answerText").html("The correct answer is: " + correctAnswer);
        $("#choices").html("gif");
    }
    
    $("#nextQ").on("click", function(){
        currentTime = 30;
        printQuestion(qNum);
        qNum++;
    });
    
});