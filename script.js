$(document).ready(function(){
  var addButton = document.getElementById('addition')
  var subButton = document.getElementById('subtraction')
  var multiplyButton = document.getElementById('multiplication')
  var divisionButton = document.getElementById('division')
  var currentQuestion;
  var timeLeft = 10;
  var score = 0;
  var interval;
  var giphy = document.getElementById('giphy')
  var imgTag = document.createElement('img')

  var questionGenerator = function () {
    var question = {};

    var num1 = Math.floor(Math.random() * 9) + 2;
    var num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
    
    if (addButton.checked) {
      question.answer = num1 + num2;
      question.equation = String(num1) + " + " + String(num2);
      imgTag.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3lnZjluOGdldnh1NG1yY2hmaG0yN3NjejRyYnE1NnJweHplMmM1NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6MbmXIt1qUsNzfu8/giphy.gif'
      imgTag.alt = 'Math Giphy'
      giphy.appendChild(imgTag)

    } else if (subButton.checked) {
      question.answer = num1 - num2;
      question.equation = String(num1) + " - " + String(num2);
      imgTag.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmF0aHRjdDI5eGJobWRpYWlkeHZxajV4Y3lzYjNvbGYyYXcxbDc2ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gEvab1ilmJjA82FaSV/giphy.gif'
      imgTag.alt = 'Math Giphy'
      giphy.appendChild(imgTag)

    } else if (multiplyButton.checked) {
      question.answer = num1 * num2;
      question.equation = String(num1) + " * " + String(num2);
      imgTag.src = 'https://media.giphy.com/media/FuSJ5C7SSHlZCxjC6q/giphy-downsized-large.gif'
      imgTag.alt = 'Math Giphy'
      giphy.appendChild(imgTag)

    } else if (divisionButton.checked) {
      question.answer = Math.floor(num1 / num2);
      question.equation = String(num1) + " / " + String(num2);
      imgTag.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGw2c3JoNzAzejl2ZDdkMHVuc3B3YWtteG92NHNnMng3d3oxZHliYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ne3xrYlWtQFtC/giphy.gif'
      imgTag.alt = 'Math Giphy'
      giphy.appendChild(imgTag)
    }
    
    return question;
  }

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  }

  addButton.addEventListener('click', renderNewQuestion);
  subButton.addEventListener('click', renderNewQuestion);
  multiplyButton.addEventListener('click', renderNewQuestion);
  divisionButton.addEventListener('click', renderNewQuestion);
  
  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  }

  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };
  
  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);  
    }
  }


  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });
  renderNewQuestion();
});

// only allow numbers to be typed in
var validateNumericInput = function (inputElement) {
  var inputValue = inputElement.value;
  inputValue = inputValue.replace(/[^0-9]/g, '');
  inputElement.value = inputValue;
}