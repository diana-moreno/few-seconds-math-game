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
  constructor(optionBox, upperLimit) {
    this.num1 = this.generateRandomNumber(upperLimit.value);
    this.num2 = this.generateRandomNumber(upperLimit.value);
    this.operator = this.getOperator(optionBox)
    this.setNewQuestion();
  }
  generateRandomNumber(upperLimit) {
    let randomNum = Math.floor(Math.random() * (upperLimit) + 1);
    return randomNum;
  }
  getOperator(optionBox) {
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



let counter = 10;


class Play {
  constructor(mathExpr) {
  }
  //getMathExpression() {
  //  this.mathExpr = new MathExpression(optionBox, upperLimit)
  //}

  getResult(mathExpr) {
    console.log(mathExpr)
    let num1 = mathExpr.num1
    let num2 = mathExpr.num2
    let operator = mathExpr.operator
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
  timer() {
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
  checkResult(mathExpr) {
    if(answer.value == this.getResult(mathExpr)) {
      audioGood.play();
          console.log(answer.value, this.getResult(mathExpr))
      answer.value = "";
          console.log(answer.value, this.getResult(mathExpr))
      counter += 10;
      this.newMathExpression();
    } else {
      answer.style.color = "red";
          console.log(answer.value, this.getResult(mathExpr))
      audioWrong.play();
    }
  }
  newMathExpression() {
    let newExpr = new MathExpression(optionBox, upperLimit)
    newExpr.this.getResult(newExpr)
    newExpr.this.checkResult(newExpr)
  }

}


//función que permite comenzar el juego y reiniciarlo
function startGame() {
  startButton.onclick = function() {
    gameOptions.style.display = "none";
    gameBoard.style.display = "block";
    let mathExpr = new MathExpression(optionBox, upperLimit)
    let newGAme = new Play(mathExpr)
    newGAme.timer()
    answer.onchange = function() {
    newGAme.getResult(mathExpr)
    newGAme.checkResult(mathExpr)

    }
  }
  restart.onclick = function() {
    gameOptions.style.display = "block";
    gameBoard.style.display = "none";
  }
}

startGame();

