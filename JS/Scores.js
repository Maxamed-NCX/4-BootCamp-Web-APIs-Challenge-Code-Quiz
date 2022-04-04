// Scores JS functions

//Stored in localstorage after reset if needed
function printTopScores() {
  var topscores= JSON.parse(window.localStorage.getItem ("highscores")) || [];

  // Score order highest to lowest
  topscores.sort(function (a, b) {
    return b.score -a.score;
  });

// top score tag order and display
topscores.forEach(function(score) {
  var liTag = document.createElement("li");
  liTag.textContent = score.intials3 + " " + score.score;

  var liTag=document.getElementById("highscores");
  olElement.appendChild(liTag);
});
}

function removeHighscores () {
  window.localStorage.removeItem ("highscores");
  window.location.reload();
}

document.getElementById("remove").onclick = removeHighscores;

// When page loads run funtions
printHighscores();

