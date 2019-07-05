//acceso al DOM
const startButton = document.getElementById('start');
const gameOptions = document.getElementById('game-options');
const gameBoard = document.getElementById('game-board');
const restart = document.getElementById('restart');
const addition = document.getElementById('addition');
const multiplication = document.getElementById('multiplication');
const division = document.getElementById('division');
const substraction = document.getElementById('substraction');
const optionBox = document.getElementsByClassName('option-box');
const upperLimit = document.getElementById('number-limit-range');
const gameOver = document.getElementById('game-over-img');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
var audioGood = document.getElementById("audio-good");
var audioWrong = document.getElementById("audio-wrong");
var clock = document.getElementById("clock");

class MathExpression {
  constructor(upperLimit) {
    this.num1 = this.generateRandomNumber(upperLimit.value);
    this.num2 = this.generateRandomNumber(upperLimit.value);
    this.operator = this.getOperator()
    this.setNewQuestion();
  }
  generateRandomNumber(upperLimit) {
    let randomNum = Math.floor(Math.random() * (upperLimit) + 1);
    return randomNum;
  }
  getOperator() {
    let filteredOptions = [...optionBox].filter(elem => elem.checked)
    let index = Math.floor(Math.random() * filteredOptions.length)
    let nameOperator = filteredOptions[index].id
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
  setNewQuestion() {
    question.innerHTML = this.num1 + this.operator + this.num2
  }
}

class Play {
  constructor() {
    this.mathExpr = new MathExpression(upperLimit, optionBox)
    //this.getResult()
    //this.checkResult()
  }
  getResult() {
    let num1 = this.mathExpr.num1
    let num2 = this.mathExpr.num2
    let operator = this.mathExpr.operator
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
  timer(seconds) {
    let counter = seconds;
    console.log(counter)
    var callbackFunction = function () {
      clock.innerHTML = counter;
      timeoutId = setTimeout(callbackFunction, 1000);
      counter -= 1;
      if (counter < 0) {
      clearTimeout(timeoutId);
      return false;
      }
    }
    var timeoutId = setTimeout(callbackFunction, 1000)
  }
  checkResult() {
    if(answer.value == this.getResult()) {
      audioGood.play();
      answer.value = "";
      this.timer(10);
      this.nextMathExpr()
    } else {
      answer.style.color = "red";
      audioWrong.play();
    }
  }
  nextMathExpr() {
    let newMathExpr = new MathExpression(upperLimit, optionBox)
    newMathExpr.setNewQuestion()
  }
}


//función que permite comenzar el juego y reiniciarlo
function startGame() {
  startButton.onclick = function() {
    gameOptions.style.display = "none";
    gameBoard.style.display = "block";
    let newGAme = new Play()
    newGAme.getResult()
    newGAme.timer(10)
    answer.onchange = function() {
      newGAme.checkResult()
      newGAme.nextMathExpr()
    }
  }
  restart.onclick = function() {
    gameOptions.style.display = "block";
    gameBoard.style.display = "none";
  }
}

startGame();

