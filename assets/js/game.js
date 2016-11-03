$(document).ready(function(){
    $("#nextQ").hide();
    $(".choices").hide();
    $("#seeResults").hide();
    $("#playAgain").hide();
    
    $('.themeMusic').prop("volume", 0.3);
    
    var whosThatPokemon = document.createElement('audio');
	   whosThatPokemon.setAttribute('src', '../assets/sfx/whosThatPokemon.wav');
    
    //All questions here
    var questions = [
        [
            "../assets/images/flareonHidden.png",
            ["Diglett", "Flareon", "Squirtle", "Eevee"],
            1,
            "gif",
            "../assets/images/flareon.png"
        ],
        [
            "../assets/images/meowthHidden.png",
            ["Venonat", "Exeggcute", "Meowth", "Starmie"],
            2,
            "gif",
            "../assets/images/meowth.png"
        ],
        [
            "../assets/images/psyduckHidden.png",
            ["Ekans", "Cubone", "Rattata", "Psyduck"],
            3,
            "gif",
            "../assets/images/psyduck.png"
        ],
        [
            "../assets/images/snorlaxHidden.png",
            ["Snorlax", "Haunter", "Mr.Mime", "Weedle"],
            0,
            "gif",
            "../assets/images/snorlax.png"
        ],
        [
            "../assets/images/mewtwoHidden.png",
            ["Mew", "Tangela", "Mewtwo", "Psyduck"],
            2,
            "gif",
            "../assets/images/mewtwo.png"
        ],
        [
            "../assets/images/ninetalesHidden.png",
            ["Ninetales", "Nidoran", "Jigglypuff", "Poliwag"],
            0,
            "gif",
            "../assets/images/ninetales.png"
        ],
        [
            "../assets/images/pidgeyHidden.png",
            ["Slowpoke", "Machop", "Growlithe", "Pidgey"],
            3,
            "gif",
            "../assets/images/pidgey.png"
        ],
        [
            "../assets/images/pickachuHidden.png",
            ["Seel", "Pickachu", "Drowzee", "Ponyta"],
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
        whosThatPokemon.play();
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
//            $("#gif").show();
            $("#nextQ").show();
        } else {
            answerIsIncorrect();
            numIncorrect++;
            stopTimer();
//            $("#gif").show();
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
    
    $("#playAgain").on("click", function() {
        window.location.reload();
    })
    
    function displayResults() {
        $("#final").html("Are you a Pokemon Master?");
        $(".choicesBlock").html("Correct Answers: " + numCorrect + "<br>" + "Incorrect Answers: " + numIncorrect + "<br>" + "Unanswered: " + unanswered);
        $("#question").html('<img src="../assets/images/pokemonMaster.gif">')
        $("#seeResults").hide();
        $("#gif").hide();
        $("#playAgain").show();
    }
    
});