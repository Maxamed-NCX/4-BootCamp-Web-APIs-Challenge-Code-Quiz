// DOM elements
var questionsElement = document.querySelector("#questions");
var timerElement = document.querySelector("#time");
var mcqElement = document.querySelector("#mcq");
var submitBtn = document.querySelector("#submit");
var beginBtn = document.querySelector("#begin");
var initialsEl = document.querySelector("#initials");
var replybackEl = document.querySelector("#replyback");

// functions
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function beginQuiz() {
  // hidden at begin screen
  var beginScreenEl = document.getElementById("main-page");
  beginScreenEl.setAttribute("class", "hide");

  // show questions section
  questionsElement.removeAttribute("class");

  // begin timer
  timerId = setInterval(clockTick, 1000);

  // show begining time
  timerElement.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  console.log("question", questions)
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear out any old question Multiple Question Choice
  mcqElement.innerHTML = "";

  // loop over choices
  currentQuestion.mcq.forEach(function(choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // display on the page
    mcqElement.appendChild(choiceNode);
  });
}

function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerElement.textContent = time;
    replybackEl.textContent = "Wrong!";
    replybackEl.style.color = "red";
    replybackEl.style.fontSize = "400%";
  } else {
    replybackEl.textContent = "Correct!";
    replybackEl.style.color = "green";
    replybackEl.style.fontSize = "400%";
  }

  // flash right/wrong replyback
  replybackEl.setAttribute("class", "replyback");
  setTimeout(function() {
    replybackEl.setAttribute("class", "replyback hide");
  }, 1000);

  // next question
  currentQuestionIndex++;

  // time checker
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsElement.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerElement.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
} 

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "topscore.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// submit initials
submitBtn.onclick = saveHighscore;

// begin quiz
beginBtn.onclick = beginQuiz;

initialsEl.onkeyup = checkForEnter;
