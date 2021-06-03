var questionsObject = [
    {
        q: "What's 1 + 1?", 
        a: "2", 
        choice1: "4",
        choice2: "1",
        choice3: "2",
        choice4: "0"
    }, 
    {
        q: "What's 1 + 2?", 
        a: "3",
        choice1: "5",
        choice2: "3",
        choice3: "8",
        choice4: "9"
    }, 
    {
        q: "What Tobi's nickname?", 
        a: "all of the above",
        choice1: "Toblerone",
        choice2: "Tobes",
        choice3: "Tobias",
        choice4: "all of the above"
    }
]

var heroArea = document.getElementById("hero");

var qIndex = 0;
var correct;
var points = 0;
var player = [];

var getQuestion = function() {
    if (qIndex < questionsObject.length) {
        var tempDiv = document.createElement("div");
        tempDiv.className = "tempDiv";
        var question = document.createElement("p");  
        question.textContent = questionsObject[qIndex].q;
        
        document.getElementById("questions").appendChild(tempDiv);
        tempDiv.appendChild(question);

        // previous question results
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
                    console.log(correct);
                    qIndex++;
                    getQuestion();
                } else {
                    tempDiv.style.display = "none";
                    correct = false;
                    console.log(correct);
                    qIndex++;
                    getQuestion();
                }
            });
        }
    } else {
        
        var quizComplete = document.getElementById("quizComplete");
        quizComplete.style.display = "block";
        var finalScoreReport = document.getElementById("final-score");
        finalScoreReport.textContent = "Your final score is " + points;
        //saveScore();
    }
}

// view high scores link
document.getElementById("view-scores").addEventListener("click", function() {
    document.querySelector("header").style.display = "none";
    document.getElementById("hero").style.display = "none";
    document.getElementById("quiz").style.display = "none";
    document.getElementById("quizComplete").style.display = "none";
    document.getElementById("high-scores").style.display = "block";
});

//go back button
document.getElementById("back").addEventListener("click", function(){
    document.querySelector("header").style.display = "block";
    document.getElementById("hero").style.display = "block";
    document.getElementById("quiz").style.display = "none";
    document.getElementById("quizComplete").style.display = "none";
    document.getElementById("high-scores").style.display = "none";
})


var saveScore = function() {
    localStorage.setItem("high score", points);
}

var startQuiz = function() {
    heroArea.style.display = "none";

    //create dom elements for q & a
    
    getQuestion();
    

}

document.getElementById("startQuizBtn").addEventListener("click", startQuiz);