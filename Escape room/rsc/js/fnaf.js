function getRandomValidArea(character) {
  if (character === 'foxy') {
    var sequence = ['2A', '2B', 'you'];
    return sequence.shift(); 
  }

  var validAreas = [];

  if (character === 'bonnie') {
    validAreas = ['1B', '2A', '2B', 'you'];
  } else if (character === 'chica') {
    validAreas = ['1B', '4A', '4B', 'you'];
  } else if (character === 'freddy') {
    validAreas = ['1B', '2A', '2B', '4A', '4B', 'you'];
  }

  var randomIndex = Math.floor(Math.random() * validAreas.length);
  return validAreas[randomIndex];
}

function moveRandomCharacter(character) {
  var randomImage = document.getElementById(character + 'Div');
  var randomAreaId = getRandomValidArea(character);
  var randomArea = document.querySelector('map area[alt="' + randomAreaId + '"]');

  if (randomArea) {
    var coordsArray = randomArea.getAttribute('coords').split(',');

    var areaLeft = parseInt(coordsArray[0]);
    var areaTop = parseInt(coordsArray[1]);

    randomImage.style.top = areaTop + 'px';
    randomImage.style.left = areaLeft + 'px';
  } else {
    console.error('Random area not found for character: ' + character);
  }
}

moveRandomCharacter('foxy');

setInterval(function () {
  var characters = ['bonnie', 'chica', 'foxy', 'freddy'];
  var randomCharacter = characters[Math.floor(Math.random() * characters.length)];
  moveRandomCharacter(randomCharacter);
}, 500);
