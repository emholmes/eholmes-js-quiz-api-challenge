var questionsObject = [
    { question: "Which are primitive data types in javascript?", answer: "all of the above", choice1: "number", choice2: "string", choice3: "boolean", choice4: "all of the above" }, 
    { question: "What method stops the setInterval() method's function from continuing to be called?", answer: "clearInterval()", choice1: "stop()", choice2: "stopInterval()", choice3: "clearSet()", choice4: "clearInterval()" }, 
    { question: "Which of the following are 'falsy' values in javascript?", answer: "all of the above", choice1: "NaN", choice2: "null", choice3: "undefined", choice4: "all of the above" }, 
    { question: "Select the answer with the correct syntax of a for statement.", answer: "for (var i = 0; i < 10; i++) {}", choice1: "for (var i = 0; i < 10; i++) {}", choice2: "for (var i = 0, i < 10, i++) {}", choice3: "for (i = 0; i++) {}", choice4: "for (if i = 0; i < 10; i++) {}" }, 
    { question: "Javascript is a _________ programming language.", answer: "dynamic", choice1: "styling", choice2: "java", choice3: "styling", choice4: "dynamic" }, 
    { question: "What method adds a value to the end of an array?", answer: "push()", choice1: "toEnd()", choice2: "push()", choice3: "join()", choice4: "pop()" }
]

var headerSection = document.querySelector("header");
var heroSection = document.getElementById("hero");
var quizSection = document.getElementById("quiz");
var quizContent = document.getElementById("quiz-content");
var quizResultsSection = document.getElementById("quiz-results");
var highScoresSection = document.getElementById("high-scores");
var scoreForm = document.getElementById("score-form");
var notification = document.getElementById("notification");

var qIndex = 0;
var correct;
var points = 0;
var player = [];

var scoreFormHandler = function(event) {
    event.preventDefault();

    notification.textContent = "";
    notification.style.borderTop = "none";
    var playerScore = points;
    var playerName = document.querySelector("input[name='player-initials']").value;

    var scoreObj = {
        name: playerName,
        score: playerScore
    };
    createScoreEl(scoreObj);

    saveScore();

    scoreForm.reset();

    viewHighScoreHandler();

}


var timeLeft;
var timer = document.getElementById("timer");
var timerInterval;
function startTimer() {
    timeLeft = 75;
    timer.textContent = "Time: "+ timeLeft;
    // execute function ever 1000 ms
    timerInterval = setInterval(function() {
        // qIndex max length 2
        if (timeLeft > 0) {
            timeLeft--;
            timer.textContent = "Time: "+ timeLeft;
        }  else if (timeLeft === 0) {
            clearInterval(timerInterval);
            viewHighScoreHandler();
        }
        if (points > 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}



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
    
    notification.textContent = correct;
    
    if (notification.textContent !== "") {
        notificationSection.style.display = "block";
    }
    notificationTimeout();
    if (qIndex < questionsObject.length) {
        quizContent.style.display = "block";
        var question = document.getElementById("question");
        question.textContent = questionsObject[qIndex].question;
    
        for (var i = 1; i < 5; i++) {
            var choiceBtn = document.getElementById("btn" + i);
            choiceBtn.textContent = i + ". " + questionsObject[qIndex]["choice" + i];
        }
        let buttonsArray = document.querySelectorAll("#quiz-content button");

        for (var button of buttonsArray) {
            button.addEventListener("click", buttonChoiceHandler);
        }
    } else {
        quizContent.style.display = "none";
        quizResultsSection.style.display = "block";
        points = timeLeft;
        document.getElementById("final-score").textContent = "Your final score is " + points + ".";
        clearInterval(timerInterval);
        // need a reset function
        qIndex = 0;
    }
}


var createScoreEl = function(scoreObj) {
    var listItem = document.createElement("li");
    listItem.classname = "score";
    listItem.textContent = scoreObj.name + " - " + scoreObj.score;
    var olElement = document.getElementById("scores-list");
    olElement.appendChild(listItem);
    player.push(scoreObj);
}

// view high scores link
var viewHighScoreHandler = function() {
    headerSection.style.display = "none";
    heroSection.style.display = "none";
    quizSection.style.display = "none";
    quizResultsSection.style.display = "none";
    highScoresSection.style.display = "block";
} 

document.getElementById("view-scores").addEventListener("click", viewHighScoreHandler);

//go back button
document.getElementById("back").addEventListener("click", function(){
    qIndex = 0;
    correct = "";
    points = 0;
    timer.textContent = "Time: 0";
    clearInterval(timerInterval);
    headerSection.style.display = "block";
    heroSection.style.display = "block";
    quizSection.style.display = "none";
    quizResultsSection.style.display = "none";
    highScoresSection.style.display = "none";
});

// clear score page
document.getElementById("clear").addEventListener("click", function(){
    localStorage.clear();
    var listItems = document.querySelectorAll("#scores-list li");
    for (var item of listItems) {
        item.remove();
    }
});


var saveScore = function() {
    localStorage.setItem("scores", JSON.stringify(player));
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

loadScores();

var startQuiz = function() {
    startTimer();
    heroSection.style.display = "none";
    quizSection.style.display = "block";
    getQuestion();
}

scoreForm.addEventListener("submit", scoreFormHandler);

document.getElementById("startQuizBtn").addEventListener("click", startQuiz);