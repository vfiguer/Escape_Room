// prueba 1 -------------------------------------------------------------
let timerInterval;
let usedClues = 0;
//declaramos el intervalo y las pistas usadas

function startTimer() {
  let counter = parseInt(localStorage.getItem('timer')) || 0;

  localStorage.setItem('timer', counter);

  timerInterval = setInterval(() => {
    counter++;
    localStorage.setItem('timer', counter);
  }, 1000);
}
//iniciamos el contador y lo vamos guardando en el local storage

function stopTimer() {
  clearInterval(timerInterval);
}
//parar el contador

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.href.includes("nk/prueba1.html")) {
    startTimer()
  }
}
//al cargar el documento comienza el contador

)
function submitExam() {
  stopTimer();
  //al darle al boton de entregar el tiempo dejara de pasar
  document.getElementById('processingOverlay').style.display = 'flex';
  //se mostrara el overlay de procesando para darle efecto
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
  //declaramos las respuestas
  let score = 0;
  for (let i = 1; i <= 10; i++) {
    const userAnswer = parseFloat(document.getElementById('answer' + i).value);
    if (!isNaN(userAnswer) && userAnswer === correctAnswers['answer' + i]) {
      score++;
    }
  }
  //comparamos las respuestas introducidas por el usuario y las del array
  setTimeout(() => {
    document.getElementById('processingOverlay').style.display = 'none';
    //escondemos el overlay
    if (score >= 6) {
      window.location.replace("historia2.html");
      //cambiamos la pestaña a la siguiente parte de la historia
      localStorage.setItem('clues', usedClues)
      //pasamos las pistas usadas al localStorage
    } else {
      window.location.replace("../nk/GO/GO2.html");
      //si fallamos se nos llevara a la primera pantalla de final de juego
    } 
  }, 2000);

}

function toggleHint(obj, hintId) {
  //recogemos las variables
  const hintElement = document.getElementById(hintId);
  //usamos la hintId para declarar la pista
  var questionMark = obj;
  //usamos obj para declarar el ?
  if (hintElement) {
      hintElement.style.display = (hintElement.style.display === 'none' || hintElement.style.display === '') ? 'inline' : 'none';
      questionMark.classList.add("hide")
    }
  //mostramos la pista y escondemos el ?
  usedClues++;
  //aumentamos el numero de pistas usadas
}

// prueba 2 -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.href.includes("nk/prueba2")) {
    startTimer();
    //reiniciamos el temporizador
    var body = document.body;
    body.innerHTML =
      '<div class="container"><p class="mensaje"></p><div class="tablero" id="tablero"></div></div>';
      //generamos el tablero
    var numCartas = 16;
    //el numero de cartas, un total de 16 cartas
    var tablero = document.getElementById("tablero");
    //declaramos el tablero
    var cartas = [];
    for (var i = 1; i <= numCartas / 2; i++) {
      cartas.push(i);
      cartas.push(i);
    }
    //inicializamos el array de cartas y mandamos dos de cada indice para hacer 8 parejas

    cartas.sort(function () {
      return 0.5 - Math.random();
    });
    //mezclamos el array

    for (var i = 0; i < numCartas; i++) {
      var carta = document.createElement("div");
      carta.className = "carta";
      carta.innerHTML =
        '<img class="front" src="../../img/nk/memory/atras.png"><img class="back" src="../../img/nk/memory/' +
        cartas[i] +
        '.png">';
      tablero.appendChild(carta);
    }
    //generamos las cartas y las ponemos en el tablero

    var cartasElement = document.querySelectorAll(".carta");
    //declaramos todas las cartas

    cartasElement.forEach(function (carta) {
      carta.addEventListener("click", function () {
        girarCarta(this);
      });
      //cada vez que se da click en una carta, se activara la funcion 
      //girarCarta sobre esa misma carta
    });
  }
});

var cartasVolteadas = 0;
var bloqueoCartas = false;
//variables para poder bloquear las cartas al usarse dos

function girarCarta(carta) {
  if (bloqueoCartas) {
    return;
  }
  //si esta bloqueada no entrara la funcion

  carta.classList.add("flipped");
  //a carta se le añade la clase flippes
  var cartasVolteadas = document.querySelectorAll(".flipped").length;
  //para saber si hay dos vemos cuantas cartas con la clase flipped hay
  if (cartasVolteadas === 2) {
    bloqueoCartas = true;
    //si hay dos se bloquea
    comprobar();
    //y se comprueba si son iguales
  }
}

function comprobar() {
  var flippedCards = document.querySelectorAll(".flipped");
  var img1 = flippedCards[0].querySelector(".back").getAttribute("src");
  var img2 = flippedCards[1].querySelector(".back").getAttribute("src");
  //cogemos las variables necesarias, las cartas giradas y miramos el src

  if (img1 === img2) {
    flippedCards.forEach(function (flippedCard) {
      flippedCard.classList.add("guessed");
      flippedCard.classList.remove("flipped");      
      bloqueoCartas = false;
    });
    //si las cartas son iguales se le añadira la clase guessed que hace que permanezcan giradas
    //y se eliminara la clase flipped, tambien se desbloqueara

    mensaje("Son pareja");
    //se mostrara el siguiente mensaje

    var allCards = document.querySelectorAll(".carta");
    var guessedCards = document.querySelectorAll(".guessed");
    //cogemos la cantidad de cartas que hay y cuantas han sido adivinadas

    if (allCards.length === guessedCards.length) {
      window.location.replace("historia3.html");
    }
    //si todas han sido adivinadas pasamoss a la siguiente historia

  } else {
    mensaje("No son pareja");
    //si no son iguales se muestra el siguiente mensaje
    setTimeout(function () {
      flippedCards.forEach(function (flippedCard) {
        flippedCard.classList.remove("flipped");
      });
      bloqueoCartas = false;
      //les quitamos la clase de flipped y desbloqueamos las cartas
    }, 1000);
  }
  cartasVolteadas = 0;
  //reiniciamos las cartas volteadas
}

function mensaje(string) {
  document.querySelector(".mensaje").textContent = string;
  //funcion para imprimir mensajes
}

// prueba 3 -------------------------------------------------------------
const colors = ['red', 'green', 'blue', 'yellow', 'magenta', 'cyan', 'orange', 'purple', 'lime'];
let sequence = [];
let playerSequence = [];
let round = 1;
let messageElement;
let fallos = 0;
//declaraciones 

function startGame() {
  sequence = [];
  playerSequence = [];
    //al iniciar se vacia la secuencia y la del jugador
  round = 1;
  //se reinicia la ronda
  isPlayerTurn = false;
  //y se le quita el  turnpo al jugador
  resetColors();
  nextRound();
  //llamamos a las dos funciones para que comienze el juego
}

function nextRound() {
  showMessage('Round ' + round);
  //se muestra el mensaje que avisa de la ronda
  addToSequence();
  playSequence();
  //seguimos con otro llamado a dos funciones, para añadir sequencia y mostrarla
}

function addToSequence() {
  const randomColorIndex = Math.floor(Math.random() * colors.length);
  sequence.push(randomColorIndex);
}
//seleccionamos un color aleatorio y lo añadimos al array de sequencia

function playSequence() {
  const intervalTime = round === 1 ? 3000 : 2000 / round;
  //se declara la velocidad de las rondas, haciendola cada vez mas rapidas
  isPlayerTurn = false;
  //se le quita el turno al usuario
  for (let i = 0; i < round; i++) {
    setTimeout(() => illuminateColor(sequence[i], i === round - 1), i * intervalTime);
  }
  //se van iluminando la sequencia con un for leyendo el array

  setTimeout(() => {
    showMessage('Tu turno');
    isPlayerTurn = true;
  }, round * intervalTime);
  //cuando acaba se le pasa el turno al usuario para que la repita
}

function illuminateColor(index, isLast) {
  const colorButton = document.getElementsByClassName('color-button')[index];
  colorButton.style.backgroundColor = colors[index];
  //se recoge las dos variables y se le aplica, se recoge el color y el boton a ilumiar y se hace que se ilumine
  setTimeout(() => {
    resetColor(colorButton);
    //reseteamos el color a gris otra vez
    if (isLast) {
      isPlayerTurn = true;
      //si es el ultimo color se pasa al usuario
    }
  }, 250);
}

function resetColor(button) {
  button.style.backgroundColor = 'gray';
  //la funcion resetColor se basa en evolver el color gris al boton en especifico
}

function resetColors() {
  const colorButtons = document.getElementsByClassName('color-button');
  for (let i = 0; i < colorButtons.length; i++) {
    colorButtons[i].style.backgroundColor = 'gray';
  }
  //resetColors es lo mismo a todos los botones
}

function checkColor(index) {
  if (isPlayerTurn) {
    const selectedColor = index;
    playerSequence.push(selectedColor);
    illuminateColor(selectedColor, playerSequence.length === round);
    //se recoge el index del color, se añade al array y se ilumina 
    const correct = checkSequence();
    //se comprueba si esta bien

    if (correct) {
      //si esta correcto 
      if (playerSequence.length === round) {
        playerSequence = [];
        round++;
        //se vacia el array del usuario y se aumenta la ronda
        setTimeout(nextRound, 1000);
        if (round === 9) {
          window.location.replace("../nk/win.html");
        }
        //al alcanzar la ruta 9 se lleva a la pantalla de victoria
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
      //si no, se comienza a aumentar la cantidad de fallos
    } 
  }
}

function checkSequence() {
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== sequence[i]) {
      return false;
      //si la secuancia del usuario no es igual devolvera falso
    }
  }
  return true;
  //si lo es devolvera verdadero
}

function showMessage(msg) {
  messageElement.textContent = msg;
  //escribir
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
//al llegar a la pagina de victoria se reinician los valores de LocalStarage y se guardan los datos en un localStorafe de Ranking
})

document.addEventListener('DOMContentLoaded', function () {
  const ultimaUbicacion = window.location.pathname;
  const currentUsername = localStorage.getItem('currentUsername')

  localStorage.setItem('ultimaUbicacion', ultimaUbicacion);
  localStorage.setItem('usuarioPartida', currentUsername);
  
  const username = localStorage.getItem('currentUsername');
  if (!username) {
    window.location.href = '../login.html';
  }
  //funcion que se activa al inicio de cada pagina que guarda la ubicacion y el username que te permitira cargarlo despues
});