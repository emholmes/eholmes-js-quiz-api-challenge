// object holding all questions and answers
var questionsObject = [
    { question: "Which are primitive data types in javascript?", answer: "all of the above", choice1: "number", choice2: "string", choice3: "boolean", choice4: "all of the above" }, 
    { question: "What method stops the setInterval() method's function from continuing to be called?", answer: "clearInterval()", choice1: "stop()", choice2: "stopInterval()", choice3: "clearSet()", choice4: "clearInterval()" }, 
    { question: "Select the answer with the correct syntax of a for statement.", answer: "for (var i = 0; i < 10; i++) {}", choice1: "for (var i = 0; i < 10; i++) {}", choice2: "for (var i = 0, i < 10, i++) {}", choice3: "for (i = 0; i++) {}", choice4: "for (if i = 0; i < 10; i++) {}" }, 
    { question: "Which of the following are 'falsy' values in javascript?", answer: "all of the above", choice1: "NaN", choice2: "null", choice3: "undefined", choice4: "all of the above" }, 
    { question: "Javascript is a _________ programming language.", answer: "dynamic", choice1: "styling", choice2: "java", choice3: "markup", choice4: "dynamic" }, 
    { question: "What method adds a value to the end of an array?", answer: "push()", choice1: "toEnd()", choice2: "push()", choice3: "join()", choice4: "pop()" }
]

var heroSection = document.getElementById("hero");
var quizSection = document.getElementById("quiz");

var questionIndex = 0;
var notificationMessage;
var finalScore = 0;
var playerScores = [];

// create list item with player info in high score view
var createScoreRow = function(playerObj) {
    var listItem = document.createElement("li");
    listItem.classname = "score";
    listItem.textContent = playerObj.name + " - " + playerObj.score;
    var olElement = document.getElementById("scores-list");
    olElement.appendChild(listItem);
    playerScores.push(playerObj);
}

// view high scores link
var viewHighScores = function() {
    document.querySelector("header").style.display = "none";
    heroSection.style.display = "none";
    quizSection.style.display = "none";
    document.getElementById("high-scores").style.display = "block";
} 

// handler for player score submit button
var submitScoreForm = function(event) {
    event.preventDefault();

    var playerScore = finalScore;
    var playerName = document.getElementById("player-initials").value;

    var playerObj = {
        name: playerName,
        score: playerScore
    };
    createScoreRow(playerObj);
    saveScore();

    document.getElementById("score-form").reset();

    viewHighScores();
}

// quiz timer/countdown 
var timeLeft;
var timer = document.getElementById("timer");
var timerInterval;
var startTimer = function() {
    timeLeft = 75;
    timer.textContent = "Time: "+ timeLeft;
    timerInterval = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
            timer.textContent = "Time: "+ timeLeft;
        }  else if (timeLeft === 0) {
            clearInterval(timerInterval);
            viewHighScores();
        }
        if (finalScore > 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

// notification displays if user correctly answered previous question
// disappears(timeout) after 2 seconds
var notificationTimeout;
var notificationSection = document.querySelector(".notification");
var hideNotificationWithDelay = function(delay) {
    notificationTimeout = setTimeout(function() {
        clearTimeout(notificationTimeout);
        notificationSection.style.display = "none";
        
    }, delay);
}

var displayNotification = function() {
    clearTimeout(notificationTimeout);
    var notification = document.getElementById("notification");
    notification.textContent = notificationMessage;
    if (notification.textContent !== "") {
        notificationSection.style.display = "block";
    }
    hideNotificationWithDelay(2000);
}

var displayQuestion = function() {
    displayNotification();
    if (questionIndex < questionsObject.length) {
        var question = document.getElementById("question");
        question.textContent = questionsObject[questionIndex].question;
    
        for (var i = 1; i < 5; i++) {
            var choiceBtn = document.getElementById("btn" + i);
            choiceBtn.textContent = i + ". " + questionsObject[questionIndex]["choice" + i];
        }
        let buttonsArray = document.querySelectorAll("#quiz-content button");
        // event listener for question answer choice buttons
        for (var button of buttonsArray) {
            button.addEventListener("click", clickedAnswerButton);
        }
    } else {
        var quizContent = document.getElementById("quiz-content");
        quizContent.style.display = "none";
        var quizResultsSection = document.getElementById("quiz-results");
        quizResultsSection.style.display = "block";
        finalScore = timeLeft;
        document.getElementById("final-score").textContent = "Your final score is " + finalScore + ".";
        clearInterval(timerInterval);
        // need a reset function
        questionIndex = 0;
    }
}

// handler for answer choice buttons
var clickedAnswerButton = function(e) {
    var playerChoice = e.target.textContent;
    playerChoice = playerChoice.slice(3);
    if (playerChoice === questionsObject[questionIndex].answer) {
        notificationMessage = "Correct!";
        questionIndex++;
        displayQuestion();
    } else {
        notificationMessage = "Wrong!";
        timeLeft -= 10;
        questionIndex++;
        displayQuestion();
    }
}

// go back button
var clickedGoBackButton = function() {
    window.location.reload();
}

// clear score page eventListener
var clickedClearHighScores = function() {
    localStorage.clear();
    var listItems = document.querySelectorAll("#scores-list li");
    for (var item of listItems) {
        item.remove();
    }
}

// save players submitted score to local storage
var saveScore = function() {
    localStorage.setItem("scores", JSON.stringify(playerScores));
}

var loadScores = function () {
    var savedScores = localStorage.getItem("scores");
    if (!savedScores) {
        return false;
    } 
    savedScores = JSON.parse(savedScores);

    for (var i = 0; i < savedScores.length; i++) {
        createScoreRow(savedScores[i], i);
    }
}
// load any existing scores once
loadScores();

var startQuiz = function() {
    startTimer();
    heroSection.style.display = "none";
    quizSection.style.display = "block";
    displayQuestion();
}

// eventListener for "Start Quiz" clicks
document.getElementById("startQuizBtn").addEventListener("click", startQuiz);

// eventListener for "View high scores" clicks
document.getElementById("view-scores").addEventListener("click", viewHighScores);

// eventLlistener for final score submit button
document.getElementById("score-form").addEventListener("submit", submitScoreForm);

// eventListener for go back button on high score view
document.getElementById("back").addEventListener("click", clickedGoBackButton);

// eventListener to clear high scores from local storage
document.getElementById("clear").addEventListener("click", clickedClearHighScores);