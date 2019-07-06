// Use this file to write the logic of your game, the needed attrs and functions

//var TenSecondsMathGame = function(options) {};

// Returns a random integer between [1..numberLimit]


// Returns an object with {question, answer}


// Checks a user answer

//clase que ejecuta el código matemático del juego
/*export default*/
/*
var TenSecondsMathGame = function(options) {
  function generateRandomNumber(numMax) {
    let randomNum = Math.floor(Math.random() * (numMax) + 1);
    console.log(randomNum);
  }
  return options
};

const ten = TenSecondsMathGame(9)
console.log(ten) // 9
ten.generateRandomNumber(8) //TypeError: ten.generateRandomNumber is not a function
*/



class TenSecondsMath {
  constructor(operationSelected, upperLimit, userSolution) {
    let operation = new Operations()
    //console.log(operation.posibleOperations.addition)
    this.setNewQuestion()
    this.checkAnswer(userSolution)
  }

  setNewQuestion() {
    console.log(`${this.num1} ${this.operator} ${this.num2}`)
  }
  resolveOperation() {
    if(this.operator === '+') {
      return this.num1 + this.num2;
    } else if(this.operator === '-') {
      return this.num1 - this.num2;
    } else if(this.operator === '*') {
      return this.num1 * this.num2;
    } else if(this.operator === '/') {
      return this.num1 / this.num2;
    }
  }
  checkAnswer(solution) {
    if(this.resolveOperation() === solution) {
      console.log('Great!')
    } else {
      console.log('Try it again!')
    }
  }
}





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


function selectUserOperation() {
  let optionOperations = [...optionBox];
  let filteredOptions = optionOperations.filter(elem => elem.checked)
  if(filteredOptions.length > 1) {
    let index = Math.floor(Math.random() * filteredOptions.length)
    return filteredOptions[index].id
  } else {
    console.log(filteredOptions[0].id)
    return filteredOptions[0].id
  }
}


class Operations {
  constructor(operationSelected, upperLimit) {
    this.num1 = this.generateRandomNumber(upperLimit);
    this.num2 = this.generateRandomNumber(upperLimit);
    this.operator = operationSelected;
  }
  generateRandomNumber(numMax) {
    let randomNum = Math.floor(Math.random() * (numMax) + 1);
    return randomNum;
  }
  getOperator() {
    if(addition.checked) {
      return '+';
    } else if(substraction.checked) {
      return '-';
    } else if(multiplication.checked) {
      return '*';
    } else if(division.checked) {
      return '/';
    }
  }
  /*posibleOperations = {
    'addition' : '+',
    'substraction' : '-',
    'multiplication' : '*',
    'division' : '/',
  }*/
}

let game = new TenSecondsMath('+', 5, 6)




//función que permite comenzar el juego y reiniciarlo
function startGame() {
  startButton.onclick = function() {
    gameOptions.style.display = "none";
    gameBoard.style.display = "block";
    selectUserOperation()
    //let operation = new Operations()
  }
  restart.onclick = function() {
    gameOptions.style.display = "block";
    gameBoard.style.display = "none";
  }
}

startGame();



/*
class TenSecondsMath {
  constructor(operationSelected, upperLimit, userSolution) {
    this.num1 = this.generateRandomNumber(upperLimit);
    this.num2 = this.generateRandomNumber(upperLimit);
    this.operator = operationSelected;
    this.setNewQuestion()
    this.checkAnswer(userSolution)
  }
  generateRandomNumber(numMax) {
    let randomNum = Math.floor(Math.random() * (numMax) + 1);
    return randomNum;
  }
  setNewQuestion() {
    console.log(`${this.num1} ${this.operator} ${this.num2}`)
  }
  resolveOperation() {
    if(this.operator === '+') {
      return this.num1 + this.num2;
    } else if(this.operator === '-') {
      return this.num1 - this.num2;
    } else if(this.operator === '*') {
      return this.num1 * this.num2;
    } else if(this.operator === '/') {
      return this.num1 / this.num2;
    }
  }
  checkAnswer(solution) {
    if(this.resolveOperation() === solution) {
      console.log('Great!')
    } else {
      console.log('Try it again!')
    }
  }
}*/