// prueba 1 -------------------------------------------------------------
let timerInterval;
let usedClues = 0;
function startTimer() {
  let counter = parseInt(localStorage.getItem('timer')) || 0;

  localStorage.setItem('timer', counter);
  
  timerInterval = setInterval(() => {
    counter++;
    localStorage.setItem('timer', counter);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.href.includes("nk/prueba1.html")) {
    startTimer()
  }
}
)
function submitExam() {
  stopTimer();
  document.getElementById('processingOverlay').style.display = 'flex';

  const correctAnswers = {
    answer1: 42,
    answer2: 5,
    answer3: 40,
    answer4: 63, 
    answer5: 30,
    answer6: 7,
    answer7: 25,
    answer8: 31.42,
    answer9: 12,
    answer10: 64
  };

  let score = 0;
  for (let i = 1; i <= 10; i++) {
    const userAnswer = parseFloat(document.getElementById('answer' + i).value);
    if (!isNaN(userAnswer) && userAnswer === correctAnswers['answer' + i]) {
      score++;
    }
  }

  setTimeout(() => {
    document.getElementById('processingOverlay').style.display = 'none';
    if (score >= 6) {
      window.location.replace("historia2.html");
      localStorage.setItem('clues', usedClues)
    } else {
      window.location.replace("../nk/GO/GO2.html");
    }
  }, 3000);
}

function toggleHint(hintId) {
  const hintElement = document.getElementById(hintId);
  if (hintElement) {
      hintElement.style.display = (hintElement.style.display === 'none' || hintElement.style.display === '') ? 'inline' : 'none';
  }
  usedClues++;
}

// prueba 2 -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.href.includes("nk/prueba2")) {
    startTimer();
    var body = document.body;
    body.innerHTML =
      '<div class="container"><p class="mensaje"></p><div class="tablero" id="tablero"></div></div>';

    var numCartas = 16;

    var tablero = document.getElementById("tablero");

    var cartas = [];
    for (var i = 1; i <= numCartas / 2; i++) {
      cartas.push(i);
      cartas.push(i);
    }

    cartas.sort(function () {
      return 0.5 - Math.random();
    });

    for (var i = 0; i < numCartas; i++) {
      var carta = document.createElement("div");
      carta.className = "carta";
      carta.innerHTML =
        '<img class="front" src="../../img/nk/memory/atras.png"><img class="back" src="../../img/nk/memory/' +
        cartas[i] +
        '.png">';
      tablero.appendChild(carta);
    }

    var cartasElement = document.querySelectorAll(".carta");
    cartasElement.forEach(function (carta) {
      carta.addEventListener("click", function () {
        girarCarta(this);
      });
    });
  }
});

var cartasVolteadas = 0;
var bloqueoCartas = false;

function girarCarta(carta) {
  if (bloqueoCartas) {
    return;
  }

  carta.classList.add("flipped");

  var cartasVolteadas = document.querySelectorAll(".flipped").length;

  if (cartasVolteadas === 2) {
    bloqueoCartas = true;
    comprobar();
  }
}

function comprobar() {
  var flippedCards = document.querySelectorAll(".flipped");
  var img1 = flippedCards[0].querySelector(".back").getAttribute("src");
  var img2 = flippedCards[1].querySelector(".back").getAttribute("src");

  if (img1 === img2) {
    flippedCards.forEach(function (flippedCard) {
      flippedCard.classList.add("guessed");
      flippedCard.classList.remove("flipped");      
      bloqueoCartas = false;

    });

    mensaje("Son pareja");

    var allCards = document.querySelectorAll(".carta");
    var guessedCards = document.querySelectorAll(".guessed");
    if (allCards.length === guessedCards.length) {
      window.location.replace("historia3.html");

    }
  } else {
    mensaje("No son pareja");
    setTimeout(function () {
      flippedCards.forEach(function (flippedCard) {
        flippedCard.classList.remove("flipped");
      });
      bloqueoCartas = false;
    }, 1000);
  }
  cartasVolteadas = 0;
}

function mensaje(string) {
  document.querySelector(".mensaje").textContent = string;
}

// prueba 3 -------------------------------------------------------------
const colors = ['red', 'green', 'blue', 'yellow', 'magenta', 'cyan', 'orange', 'purple', 'lime'];
let sequence = [];
let playerSequence = [];
let round = 1;
let messageElement;
let fallos = 0;

function startGame() {
  sequence = [];
  playerSequence = [];
  round = 1;
  isPlayerTurn = false;
  resetColors();
  nextRound();
}

function nextRound() {
  showMessage('Round ' + round);

  addToSequence();
  playSequence();
}

function addToSequence() {
  const randomColorIndex = Math.floor(Math.random() * colors.length);
  sequence.push(randomColorIndex);
}

function playSequence() {
  const intervalTime = round === 1 ? 3000 : 2000 / round;
  isPlayerTurn = false;

  for (let i = 0; i < round; i++) {
    setTimeout(() => illuminateColor(sequence[i], i === round - 1), i * intervalTime);
  }

  setTimeout(() => {
    showMessage('Tu turno');
    isPlayerTurn = true;
  }, round * intervalTime);
}

function illuminateColor(index, isLast) {
  const colorButton = document.getElementsByClassName('color-button')[index];
  colorButton.style.backgroundColor = colors[index];

  setTimeout(() => {
    resetColor(colorButton);
    if (isLast) {
      isPlayerTurn = true;
    }
  }, 250);
}

function resetColor(button) {
  button.style.backgroundColor = 'gray';
}

function resetColors() {
  const colorButtons = document.getElementsByClassName('color-button');
  for (let i = 0; i < colorButtons.length; i++) {
    colorButtons[i].style.backgroundColor = 'gray';
  }
}

function checkColor(index) {
  if (isPlayerTurn) {
    const selectedColor = index;
    playerSequence.push(selectedColor);
    illuminateColor(selectedColor, playerSequence.length === round);

    const correct = checkSequence();
    if (correct) {
      if (playerSequence.length === round) {
        playerSequence = [];
        round++;
        setTimeout(nextRound, 1000);
        if (round === 8) {
          window.location.replace("../nk/win.html");
        }
      }
    } else {
      if (fallos === 0) {
        showMessage('Te quedan tres intentos antes de que la alarma suene');
      }
      if (fallos === 1) {
        showMessage('Te quedan dos intentos antes de que la alarma suene');
      }
      if (fallos === 2) {
        showMessage('Esta es tu ultima oportunidad');
      }
      if (fallos === 3) {
        window.location.replace("../nk/GO/GO3-2.html");
      }
      fallos++;
    }
  }
}

function checkSequence() {
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== sequence[i]) {
      return false;
    }
  }
  return true;
}

function showMessage(msg) {
  messageElement.textContent = msg;
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.href.includes("nk/prueba3.html")) {
    messageElement = document.getElementById('message');
    resetColors();
  }
});

document.addEventListener("DOMContentLoaded", function () {

if (window.location.href.includes("win.html")) {
  const timer = parseInt(localStorage.getItem('timer')) || 0;
  const username = localStorage.getItem('currentUsername');

  if (username && timer) {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.push({ username, tiempo: timer });
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }
}
})

document.addEventListener('DOMContentLoaded', function () {
  const ultimaUbicacion = window.location.pathname;
  localStorage.setItem('ultimaUbicacion', ultimaUbicacion);
  const username = localStorage.getItem('currentUsername');
  if (!username) {
    window.location.href = '../login.html';
  }
});