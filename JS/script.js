// DOM elements
var questionsElement = document.querySelector("#questions");
var timerElement = document.querySelector("#time");
var optionElement = document.querySelector("#option");
var submitBtn = document.querySelector("#submit");
var beginBtn = document.querySelector("#begin");
var initialsElement = document.getElementById("initials");
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
  timerId = setInterval(clockTick, 1000);

  // show begining time
  timerElement.textContent = time;

  getQuestions();
}

function getQuestions() {
  // questions from array
  console.log("questions", questions);
  var currentQuestions = questions[currentQuestionsIndex];

  // New question
  var titleEl = document.getElementById("questions-title");
  titleEl.textContent = currentQuestions.title;

  // replace old question with new
  optionElement.innerHTML = "";

  // loop over Multiple Question Choice
  currentQuestions.option.forEach(function (option, i) {
    // create new button for each choice selection
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "option");
    choiceNode.setAttribute("value", option);

    choiceNode.textContent = i + 1 + ". " + option;

    // attach click event listener to each Anwser
    choiceNode.onclick = questionsClick;

    // display on the page
    optionElement.appendChild(choiceNode);
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
  setTimeout(function () {
    replyEl.setAttribute("class", "reply hide");
  }, 500);

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

  console.log('initials', initials);

  if (initials !== "") {
    console.log('initials', initials);
    // Saved scores from localstorage, or if not any, set to empty array
    var topscores = JSON.parse(window.localStorage.getItem("topscores")) || [];
    console.log('topscores 1', topscores);
    // Create new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    topscores.push(newScore);
    console.log('topscores 2', topscores);
    window.localStorage.setItem("topscores", JSON.stringify(topscores));

    // Move to next display page
    window.location.href = "topscore.html";
  }
}

function checkForEnter(event) {
  // represents the enter key
  if (event.key === "Enter") {
    saveTopscore();
  }
}

// submit initials
// submitBtn.onclick = saveTopscore();
submitBtn.addEventListener("click", saveTopscore);

// begin quiz
// beginBtn.onclick = beginQuiz();

beginBtn.addEventListener("click", beginQuiz);

// submitBtn.addEventListener("click", submit);

initialsElement.onkeyup = checkForEnter;

// Scores JS functions



