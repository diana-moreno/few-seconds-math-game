// Use this file to write the interactions between your game and the user

//window.onload = function(){};

//Initialize ion library

import tenSecondsMathFinished from "./tenSecondsMathFinished.js";


const startButton = document.getElementById('start');
const gameOptions = document.getElementById('game-options');
const gameBoard = document.getElementById('game-board');
const restart = document.getElementById('restart');
const addition = document.getElementById('addition');


function getOperator() {
  if(addition.checked) {
    console.log('+')
    return '+';
  }
}


//función que permite comenzar el juego y reiniciarlo
function startGame() {
  startButton.onclick = function() {
    gameOptions.style.display = "none";
    gameBoard.style.display = "block";
    getOperator();
  }
  restart.onclick = function() {
    gameOptions.style.display = "block";
    gameBoard.style.display = "none";
  }
}

startGame()

