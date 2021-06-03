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

var intro = document.getElementById("intro-content");

var introHeader = document.createElement("h1");
introHeader.textContent = "Javascript Code Quiz";
intro.appendChild(introHeader);

var introCopy = document.createElement("p");
introCopy.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds!";
intro.appendChild(introCopy);

var startQuizBtn = document.createElement("button");
startQuizBtn.setAttribute("id", "startQuizBtn");
startQuizBtn.textContent = "Start Quiz";
intro.appendChild(startQuizBtn);

var qIndex = 0;
var correct;
var points = 0;

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
        saveScore();
        var quizComplete = document.getElementById("quizComplete");
        var allDone = document.createElement("h2");
        allDone.textContent = "All done!";
        var finalScoreReport = document.createElement("p");
        finalScoreReport.textContent = "Your final score is " + points;
        quizComplete.appendChild(allDone);
        quizComplete.appendChild(finalScoreReport);
        // form to enter name
        var entryForm = document.createElement("form");
        var entryFormLabel = document.createElement("label");
        entryFormLabel.setAttribute("for", "player-name");
        var entryFormInput = document.createElement("input");
        entryFormInput.setAttribute("type", "text");
        entryFormInput.setAttribute("id", "player-name");
        entryFormInput.setAttribute("name", "player-name");
        var entryFormSubmit = document.createElement("button");
        entryFormSubmit.className = "btn btn-dark";
        entryFormSubmit.setAttribute("type", "submit");
        entryFormSubmit.setAttribute("value", "submit");
        entryFormSubmit.textContent = "Submit";
        quizComplete.appendChild(entryForm);
        entryForm.appendChild(entryFormLabel);
        entryForm.appendChild(entryFormInput);
        entryForm.appendChild(entryFormSubmit);

    }
}

var saveScore = function() {
    localStorage.setItem("high score", points);
}

var startQuiz = function() {
    intro.style.display = "none";

    //create dom elements for q & a
    
    getQuestion();
    

}

var startQuizBtn = document.getElementById("startQuizBtn");
startQuizBtn.addEventListener("click", startQuiz);