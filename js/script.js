var questionsObject = [
    { q: "What's 1 + 1?", a: "2", choice1: "4", choice2: "1", choice3: "2", choice4: "0" }, 
    { q: "What's 1 + 2?", a: "3", choice1: "5", choice2: "3", choice3: "8", choice4: "9" }, 
    { q: "What Tobi's nickname?", a: "all of the above", choice1: "Toblerone", choice2: "Tobes", choice3: "Tobias", choice4: "all of the above" }
]

var headerSection = document.querySelector("header");
var heroSection = document.getElementById("hero");
var quizSection = document.getElementById("quiz");
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
}

var getQuestion = function() {
    quizSection.style.display = "block";
    if (qIndex < questionsObject.length) {
        var tempDiv = document.createElement("div");
        tempDiv.className = "tempDiv";
        var question = document.createElement("p");  
        question.textContent = questionsObject[qIndex].q;
        
        document.getElementById("questions").appendChild(tempDiv);
        tempDiv.appendChild(question);

        // previous question results -- move to HTML
        var results = document.createElement("p");
        results.style.display = "block";
        results.className = "results";
        results.textContent = correct;
        

        for (var j = 1; j < 5; j++) {
            var choiceBtn = document.createElement("button");
            choiceBtn.className = "btn btn-light";
            choiceBtn.textContent = questionsObject[qIndex]["choice" + j];
            tempDiv.appendChild(choiceBtn);
            tempDiv.appendChild(results);

            choiceBtn.addEventListener("click", function(e) {
                if (e.currentTarget.textContent === questionsObject[qIndex].a) {
                    tempDiv.style.display = "none";
                    points += 5;
                    correct = true;
                    qIndex++;
                    getQuestion();
                } else {
                    tempDiv.style.display = "none";
                    correct = false;
                    qIndex++;
                    getQuestion();
                }
            });
        }
    } else {
        quizResultsSection.style.display = "block";
        document.getElementById("final-score").textContent = "Your final score is " + points;
        
        // need a reset function
        qIndex = 0;
    }
}

var createScoreEl = function(scoreObj) {
    var listItem = document.createElement("li");
    listItem.classname = "score";
    //add code to enter score details - use score Obj
    listItem.textContent = scoreObj.name + " - " + scoreObj.score;
    var olElement = document.getElementById("scores-list");
    olElement.appendChild(listItem);
    player.push(scoreObj);

}

// view high scores link
document.getElementById("view-scores").addEventListener("click", function() {
    headerSection.style.display = "none";
    heroSection.style.display = "none";
    quizSection.style.display = "none";
    quizResultsSection.style.display = "none";
    highScoresSection.style.display = "block";

    loadScores();
});

//go back button
document.getElementById("back").addEventListener("click", function(){
    headerSection.style.display = "block";
    heroSection.style.display = "block";
    quizSection.style.display = "none";
    quizResultsSection.style.display = "none";
    highScoresSection.style.display = "none";
})


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
    getQuestion();
}

scoreForm.addEventListener("submit", scoreFormHandler);

document.getElementById("startQuizBtn").addEventListener("click", startQuiz);