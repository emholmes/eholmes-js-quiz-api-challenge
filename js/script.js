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


var qIndex = 0;
var correct;
var score = 0;
var playerScores = [];

// create list item with player info in high score view
var createScoreEl = function(playerObj) {
    var listItem = document.createElement("li");
    listItem.classname = "score";
    listItem.textContent = playerObj.name + " - " + playerObj.score;
    var olElement = document.getElementById("scores-list");
    olElement.appendChild(listItem);
    playerScores.push(playerObj);
}

// view high scores link
var viewHighScoreHandler = function() {
    document.querySelector("header").style.display = "none";
    heroSection.style.display = "none";
    quizSection.style.display = "none";
    document.getElementById("high-scores").style.display = "block";
} 

// handler for player score submit button
var scoreFormHandler = function(event) {
    event.preventDefault();

    var playerScore = score;
    var playerName = document.getElementById("player-initials").value;

    var playerObj = {
        name: playerName,
        score: playerScore
    };
    createScoreEl(playerObj);
    saveScore();

    document.getElementById("score-form").reset();

    viewHighScoreHandler();
}

// quiz timer/countdown 
var timeLeft;
var timer = document.getElementById("timer");
var timerInterval;
function startTimer() {
    timeLeft = 75;
    timer.textContent = "Time: "+ timeLeft;
    timerInterval = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
            timer.textContent = "Time: "+ timeLeft;
        }  else if (timeLeft === 0) {
            clearInterval(timerInterval);
            viewHighScoreHandler();
        }
        if (score > 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

// notification displays if user correctly answered previous question
// disappears(timeout) after 2 seconds
var hideNotification;
var notificationSection = document.querySelector(".notification");
var notificationTimeout = function() {
    hideNotification = setTimeout(function() {
        clearTimeout(hideNotification);
        notificationSection.style.display = "none";
        
    }, 2000);
}

var getQuestion = function() {
    clearTimeout(hideNotification);
    var notification = document.getElementById("notification");
    notification.textContent = correct;
    if (notification.textContent !== "") {
        notificationSection.style.display = "block";
    }
    notificationTimeout();
    if (qIndex < questionsObject.length) {
        var question = document.getElementById("question");
        question.textContent = questionsObject[qIndex].question;
    
        for (var i = 1; i < 5; i++) {
            var choiceBtn = document.getElementById("btn" + i);
            choiceBtn.textContent = i + ". " + questionsObject[qIndex]["choice" + i];
        }
        let buttonsArray = document.querySelectorAll("#quiz-content button");
        // event listener for question answer choice buttons
        for (var button of buttonsArray) {
            button.addEventListener("click", buttonChoiceHandler);
        }
    } else {
        var quizContent = document.getElementById("quiz-content");
        quizContent.style.display = "none";
        var quizResultsSection = document.getElementById("quiz-results");
        quizResultsSection.style.display = "block";
        score = timeLeft;
        document.getElementById("final-score").textContent = "Your final score is " + score + ".";
        clearInterval(timerInterval);
        // need a reset function
        qIndex = 0;
    }
}

// handler for answer choice buttons
var buttonChoiceHandler = function(e) {
    var playerChoice = e.target.textContent;
    playerChoice = playerChoice.slice(3);
    if (playerChoice === questionsObject[qIndex].answer) {
        correct = "Correct!";
        qIndex++;
        getQuestion();
    } else {
        correct = "Wrong!";
        timeLeft -= 10;
        qIndex++;
        getQuestion();
    }
}

// go back button
var goBackHandler = function() {
    window.location.reload();
}

// clear score page eventListener
var clearHighScoresHandler = function() {
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
        createScoreEl(savedScores[i], i);
    }
}
// load any existing scores once
loadScores();

var startQuiz = function() {
    startTimer();
    heroSection.style.display = "none";
    quizSection.style.display = "block";
    getQuestion();
}

// eventListener for "Start Quiz" clicks
document.getElementById("startQuizBtn").addEventListener("click", startQuiz);

// eventListener for "View high scores" clicks
document.getElementById("view-scores").addEventListener("click", viewHighScoreHandler);

// eventLlistener for final score submit button
document.getElementById("score-form").addEventListener("submit", scoreFormHandler);

// eventListener for go back button on high score view
document.getElementById("back").addEventListener("click", goBackHandler);

// eventListener to clear high scores from local storage
document.getElementById("clear").addEventListener("click", clearHighScoresHandler);