
//Stored in localstorage after reset if needed
function printTopscores() {
  var topscores = JSON.parse(window.localStorage.getItem("topscores")) || [];
  console.log('topscores 3', topscores);
  // Score order highest to lowest
  topscores.sort(function (a, b) {
    return b.score - a.score;
  });
  console.log('topscores 4', topscores);
  // top score tag order and display
  topscores.forEach(function (score) {
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " " + score.score;

    var olElement = document.getElementById("topscores");
    olElement.appendChild(liTag);
  });
}

function removeTopscores() {
  window.localStorage.removeItem("topscores");
  window.location.reload();
}

document.getElementById("remove").addEventListener("click",removeTopscores);

// When page loads run funtions
printTopscores();
