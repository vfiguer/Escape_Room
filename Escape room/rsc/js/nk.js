//prueba 1

function submitExam() {
    document.getElementById('processingOverlay').style.display = 'flex';

    const correctAnswers = {
      answer1: 42,  
      answer2: 3,   
      answer3: 40,   
      answer4: 63,   
      answer5: 30,   
      answer6: 7,   
      answer7: 25,   
      answer8: 31.42, 
      answer9: 12,   
      answer10: 56 
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
      } else {
        window.location.replace("../nk/GO/GO2.html");
        ;
      }
    }, 3000);
  }

  //prueba 2 
  $(document).ready(function () {
    $("body").html(
      '<div class="container"><p class="mensaje"></p><div class="tablero" id="tablero"></div></div>'
    );
  
    var numCartas = Math.floor(Math.random() * (16 - 6 + 1) + 6);
    numCartas = numCartas % 2 === 0 ? numCartas : numCartas + 1;
  
    var tablero = $("#tablero");
  
    var cartas = [];
    for (var i = 1; i <= numCartas / 2; i++) {
      cartas.push(i);
      cartas.push(i);
    }
  
    cartas = cartas.sort(function () {
      return 0.5 - Math.random();
    });
  
    for (var i = 0; i < numCartas; i++) {
      var carta = $(
        '<div class="carta" "><img class="front" src="../../img/nk/memory/atras.png"><img class="back" src="../../img/nk/memory/' +
          cartas[i] +
          '.png"></div>'
      );
      tablero.append(carta);
    }
  
    $(".carta").on("click", function () {
      girarCarta(this);
    });
  });
  
  function girarCarta(carta) {
    $(carta).addClass("flipped");
  
    var cartasVolteadas = $(".flipped").length;
  
    if (cartasVolteadas === 2) {
      comprobar();
    }
  }
  
  function comprobar() {
    let img1 = $(".flipped").eq(0).children("img").eq(1).attr("src");
    let img2 = $(".flipped").eq(1).children("img").eq(1).attr("src");
    if (img1 === img2) {
      $(".flipped").addClass("guessed");
      $(".carta").removeClass("flipped");
      mensaje("You guessed a pair");
  
      if ($(".carta").length === $(".guessed").length) {
        mensaje("You won!");
      }
  
    } else {
      mensaje("You failed");
      setTimeout(() => {
        $(".carta").removeClass("flipped");
      }, 1000);
    }
  }
  
  function mensaje(string) {
    $(".mensaje").text(string);
  }
  