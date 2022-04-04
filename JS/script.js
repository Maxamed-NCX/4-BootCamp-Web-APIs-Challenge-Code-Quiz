// DOM elements
var questionsElement = document.querySelector("#questions");
var timerElement = document.querySelector("#time");
var mcqElement = document.querySelector("#mcq");
var submitBtn = document.querySelector("#submit");
var beginBtn = document.querySelector("#begin");
var initialsElement = document.querySelector("#initials");
var replyEl = document.querySelector("#reply");

// functions
var currentQuestionsIndex = 0;
var time = questions.length * 20;
var timerId;

function beginQuiz() {
  // hidden at begin screen
  var beginScreenEl = document.getElementById("main-page");
  beginScreenEl.setAttribute("class", "hide");

  // show questions section
  questionsElement.removeAttribute("class");

  // begin timer
  timerId = setInterval(clockTick, 2000);

  // show begining time
  timerElement.textContent = time;

  getQuestions();
}

function getQuestions() {
  // questions from array
  console.log("questions", questions)
  var currentQuestions = questions[currentQuestionsIndex];

  // New question
  var titleEl = document.getElementById("questions-title");
  titleEl.textContent = currentQuestions.title;

  // replace old question with new 
  mcqElement.innerHTML = "";

  // loop over Multiple Question Choice
  currentQuestions.mcq.forEach(function(choice, i) {
    // create new button for each choice selection
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each Anwser
    choiceNode.onclick = questionsClick;

    // display on the page
    mcqElement.appendChild(choiceNode);
  });
}

function questionsClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionsIndex].answer) {
    // penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    // Display updated time on page
    timerElement.textContent = time;
    replyEl.textContent = "Inccorect!";
    replyEl.style.color = "red";
    replyEl.style.fontSize = "400%";
  } else {
    replyEl.textContent = "Correct!";
    replyEl.style.color = "green";
    replyEl.style.fontSize = "400%";
  }

  // Display Correct or Incorrect Reply
  replyEl.setAttribute("class", "reply");
  setTimeout(function() {
    replyEl.setAttribute("class", "reply hide");
  }, 2000);

  // Next Multiple Choice Question
  currentQuestionsIndex++;

  // Time check
  if (currentQuestionsIndex === questions.length) {
    endQuiz();
  } else {
    getQuestions();
  }
}

function endQuiz() {
  // End timer
  clearInterval(timerId);

  // display last end page
  var endPageElement = document.getElementById("end-page");
  endPageElement.removeAttribute("class");

  // show final score
  var finalScoreElement = document.getElementById("final-score");
  finalScoreElement.textContent = time;

  // hide questions section
  questionsElement.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerElement.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    endQuiz();
  }
} 

function saveTopscore() {
  // Record value input 
  var initials = initialsElement.value.trim();

  if (initials !== "") {
    // Saved scores from localstorage, or if not any, set to empty array
    var topscores =
      JSON.parse(window.localStorage.getItem("Topscores")) || [];

    // Create new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    topscores.push(newScore);
    window.localStorage.setItem("Topscores", JSON.stringify(topscores));

    // Move to next display page
    window.location.href = "topscore.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveTopscore();
  }
}

// submit initials
submitBtn.onclick = saveTopscore;

// begin quiz
beginBtn.onclick = beginQuiz;

beginbtnElement.addEventListener("click", beginQuiz);

submitBtn.addEventListener("click", submit);

initialsElement.onkeyup = checkForEnter;



// Scores JS functions

//Stored in localstorage after reset if needed
function printTopScores() {
  var topscores= JSON.parse(window.localStorage.getItem ("topscores")) || [];

  // Score order highest to lowest
  topscores.sort(function (a, b) {
    return b.score -a.score;
  });

// top score tag order and display
topscores.forEach(function(score) {
  var liTag = document.createElement("li");
  liTag.textContent = score.intials3 + " " + score.score;

  var liTag=document.getElementById("topscores");
  olElement.appendChild(liTag);
});
}

function removeTopscores () {
  window.localStorage.removeItem ("topscores");
  window.location.reload();
}

document.getElementById("remove").onclick = removeTopscores;

// When page loads run funtions
printTopscores();
