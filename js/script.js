var questionsObject = [
    { q: "What's 1 + 1?", a: "2", choice1: "4", choice2: "1", choice3: "2", choice4: "0" }, 
    { q: "What's 1 + 2?", a: "3", choice1: "5", choice2: "3", choice3: "8", choice4: "9" }, 
    { q: "What Tobi's nickname?", a: "all of the above", choice1: "Toblerone", choice2: "Tobes", choice3: "Tobias", choice4: "all of the above" }
]

var headerSection = document.querySelector("header");
var heroSection = document.getElementById("hero");
var quizSection = document.getElementById("quiz");
var quizContent = document.getElementById("quiz-content");
var quizResultsSection = document.getElementById("quiz-results");
var highScoresSection = document.getElementById("high-scores");
var scoreForm = document.getElementById("score-form");

var qIndex = 0;
var correct;
var points = 0;
var player = [];

var scoreFormHandler = function(event) {
    event.preventDefault();

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

var buttonChoiceHandler = function(e) {
    if (e.target.textContent === questionsObject[qIndex].a) {
        points += 5;
        correct = "Correct!";
        qIndex++;
        getQuestion();
    } else {
        correct = "Wrong!";
        qIndex++;
        getQuestion();
    }
}

var getQuestion = function() {
    var notification = document.getElementById("notification");
        notification.textContent = correct;

    if (qIndex < questionsObject.length) {
        quizContent.style.display = "block";
        var question = document.getElementById("question");
        question.textContent = questionsObject[qIndex].q;
    
        for (var i = 1; i < 5; i++) {
            var choiceBtn = document.getElementById("btn" + i);
            choiceBtn.textContent = questionsObject[qIndex]["choice" + i];
        }
        let buttonsArray = document.querySelectorAll("#quiz-content button");

        for (var button of buttonsArray) {
            button.addEventListener("click", buttonChoiceHandler);
        }
    } else {
        quizContent.style.display = "none";
        quizResultsSection.style.display = "block";
        document.getElementById("final-score").textContent = "Your final score is " + points;
        
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
        createScoreEl(savedScores[i]);
    }
}

var startQuiz = function() {
    heroSection.style.display = "none";
    quizSection.style.display = "block";
    getQuestion();
}

scoreForm.addEventListener("submit", scoreFormHandler);

document.getElementById("startQuizBtn").addEventListener("click", startQuiz);