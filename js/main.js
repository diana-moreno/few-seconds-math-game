//acceso al DOM
const startButton = document.getElementById('start');
const gameOptions = document.getElementById('game-options');
const gameBoard = document.getElementById('game-board');
const playAgain = document.getElementById('play-again');
const results = document.getElementById('results');
const addition = document.getElementById('addition');
const multiplication = document.getElementById('multiplication');
const division = document.getElementById('division');
const substraction = document.getElementById('substraction');
const userSelectOperators = document.getElementsByClassName('option-box');
const upperLimit = document.getElementById('number-limit-range');
const gameOver = document.getElementById('game-over-img');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const audioGood = document.getElementById("audio-good");
const audioWrong = document.getElementById("audio-wrong");
const clock = document.getElementById("clock");
const score = document.getElementById("score");
const numberLimit = document.getElementById("number-limit");
const gamePresentation = document.getElementById("game-presentation");
const play = document.getElementById("play");
const clockAudio = document.getElementById("clock-audio");

//declaradas variables globales
let num1 = 0;
let num2 = 0;
let operator = "";
let counter = 10;
let scoreAchieved = 0;

//función que recibe un número máximo y genera un número aleatorio
function generateRandomNumber(upperLimit) {
  let randomNum = Math.floor(Math.random() * (upperLimit) + 1);
  return randomNum;
}

//función que recibe los operadores marcados por el usuario y elige uno aleatóriamente, devolviendo su signo matemático.
function getOperator(userSelectOperators) {
  let filteredOperators = [...userSelectOperators].filter(elem => elem.checked)
  let index = Math.floor(Math.random() * filteredOperators.length)
  let nameOperator = filteredOperators[index].id
  if(nameOperator === "addition") {
    return '+';
  } else if(nameOperator === "substraction") {
    return '-';
  } else if(nameOperator === "multiplication") {
    return '*';
  } else if(nameOperator === "division") {
    return '/';
  }
}

//función que accede al DOM y muestra por pantalla la expresión matemática generada. En el caso de la división, solo se generarán divisiones cuyo resultado sea un número entero.
function setNewQuestion(upperLimit) {
  num1 = generateRandomNumber(upperLimit);
  num2 = generateRandomNumber(upperLimit);
  operator = getOperator(userSelectOperators);
  while(operator === '/' & getResult().toString().includes('.')) {
    num1 = generateRandomNumber(upperLimit);
    num2 = generateRandomNumber(upperLimit);
  }
  question.innerHTML = num1 + " " + operator + " " + num2 + " = ?"
}


//función que genera un timer que va de 10 a 0. Se descuenta 1 a cada segundo. Al terminar, esconde la pantalla actual y muestra la pantalla de resultados. Resetea el contador a 10 de nuevo por si se quiere volver a jugar.
function timer() {
  var callbackFunction = function () {
    clock.innerHTML = counter;
    timeoutId = setTimeout(callbackFunction, 1000);
    counter -= 1;
    if (counter < 0) {
    clearTimeout(timeoutId);
    clockAudio.pause();
    gameBoard.style.display = "none"
    playAgain.style.display = "inline-block"
    results.style.display = "flex"
    counter = 10;
    score.innerHTML = scoreAchieved;
    }
  }
  var timeoutId = setTimeout(callbackFunction)
}

//función que realiza la operación matemática devolviendo el resultado
function getResult() {
  if(operator === "+") {
    return num1 + num2;
  } else if(operator === "-") {
    return num1 - num2;
  } else if(operator === "*") {
    return num1 * num2;
  } else if(operator === "/") {
    return num1 / num2;
  }
}

// función que suma segundos al contador (5 para la versión fácil, 7 para la versión media, y 10 para la versión difícil) dependiendo del límite seleccionado.
function addSeconds(upperLimit) {
  if(upperLimit.value == 10) { //versión fácil
    counter += 5;
  } else if(upperLimit.value == 20) { //versión media
    counter += 7;
  } else { // versión dificil
    counter += 10;
  }
}

//función que comprueba si el usuario ha resuelto correctamente la operación. Si es así, se suman segundos al contador, aparece una nueva operación matemática para resolver y la solución anterior desaparece, y se oye un sonido de acierto. Si la solución no es correcta, el número se vuelve rojo y se oye un sonido de fallo, la operación matemática no cambiará hasta que no se resuelva correctamente.
function checkResult(upperLimit) {
  if(answer.value == getResult()) {
    playSound("coin", { volume: 3 });
    answer.value = "";
    addSeconds(upperLimit)
    setScore()
    setNewQuestion(upperLimit.value)
    answer.focus();
  } else {
    answer.style.color = "red";
    playSound("dead", { volume: 1 });
  }
}

//función que establece un sistema de puntos dependiendo de las operaciones resueltas. La división tiene más valor, después la multiplicación, resta y suma por este orden.
function setScore() {
  operator = getOperator(userSelectOperators)
  if(operator === "/") {
    scoreAchieved += 4;
  } else if(operator === "*") {
    scoreAchieved += 3;
  } else if(operator === "-") {
    scoreAchieved += 2;
  } else if(operator === "+") {
    scoreAchieved += 1;
  }
}

//función que permite comenzar el juego y reiniciarlo accediendo al DOM.
function startGame() {
  play.onclick = function() {
    gamePresentation.style.display = "none";
    gameOptions.style.display = "flex";
  }
  upperLimit.onchange = function() {
    numberLimit.innerHTML = upperLimit.value
  }
  startButton.onclick = function() {
    gameOptions.style.display = "none";
    gameBoard.style.display = "flex";
    clockAudio.volume = 0.2;
    clockAudio.play();
    setNewQuestion(upperLimit.value)
    timer()
    answer.focus();
    answer.onchange = function() {
      getResult();
      checkResult(upperLimit);
    }
  }
  playAgain.onclick = function() {
    gameOptions.style.display = "flex";
    gameBoard.style.display = "none";
    results.style.display = "none";
  }
}

startGame();
