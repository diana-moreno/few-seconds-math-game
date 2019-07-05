//acceso al DOM
const startButton = document.getElementById('start');
const gameOptions = document.getElementById('game-options');
const gameBoard = document.getElementById('game-board');
const restart = document.getElementById('restart');
const addition = document.getElementById('addition');
const multiplication = document.getElementById('multiplication');
const division = document.getElementById('division');
const substraction = document.getElementById('substraction');
const userSelectOperators = document.getElementsByClassName('option-box');
const upperLimit = document.getElementById('number-limit-range');
const gameOver = document.getElementById('game-over-img');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
var audioGood = document.getElementById("audio-good");
var audioWrong = document.getElementById("audio-wrong");
var clock = document.getElementById("clock");

//declaradas variables globales
let num1 = 0;
let num2 = 0;
let operator = "";
let counter = 10;

//función que recibe un número máximo y genera un número aleatorio
function generateRandomNumber(upperLimit) {
  let randomNum = Math.floor(Math.random() * (upperLimit) + 1);
  console.log(upperLimit)
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

//función que accede al DOM y muestra por pantalla la expresión matemática generada
function setNewQuestion(upperLimit) {
  num1 = generateRandomNumber(upperLimit);
  num2 = generateRandomNumber(upperLimit);
  operator = getOperator(userSelectOperators);
  question.innerHTML = num1 + operator + num2
}


//función que genera un timer que va de 10 a 0. Se descuenta 1 a cada segundo.
function timer() {
  console.log(counter)
  var callbackFunction = function () {
    clock.innerHTML = counter;
    timeoutId = setTimeout(callbackFunction, 1000);
    counter -= 1;
    if (counter < 0) {
    clearTimeout(timeoutId);
    }
  }
  var timeoutId = setTimeout(callbackFunction, 1000)
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

//función que comprueba si el usuario ha resuelto correctamente la operación. Si es así, se suman 10 segundos al contador, aparece una nueva operación matemática para resolver y la solución anterior desaparece, y se oye un sonido de acierto. Si la solución no es correcta, el número se vuelve rojo y se oye un sonido de fallo, la operación matemática no cambiará hasta que no se resuelva correctamente.
function checkResult() {
  if(answer.value == getResult()) {
    audioGood.play();
    answer.value = "";
    counter += 10;
    setNewQuestion(upperLimit.value)
  } else {
    answer.style.color = "red";
    audioWrong.play();
  }
}


//función que permite comenzar el juego y reiniciarlo accediendo al DOM.
function startGame() {
  startButton.onclick = function() {
    gameOptions.style.display = "none";
    gameBoard.style.display = "block";
    setNewQuestion(upperLimit.value)
    timer()
    answer.onchange = function() {
      getResult();
      checkResult();
    }
  }
  restart.onclick = function() {
    gameOptions.style.display = "block";
    gameBoard.style.display = "none";
  }
}

startGame();

