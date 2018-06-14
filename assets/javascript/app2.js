// Array of objects (with arrays inside the objects) -------

const questions = [
  {
    question: "What PS4 exclusive featured a character who wore a necklace engraved with 'Sic Parvus Magna'?",
    answer: ["The Last of Us", "Crash Bandicoot", "Uncharted", "Portal"],
    correctAnswer: "Uncharted",
  },
  {
    question: "Who developed the hit Japanese game series Metal Gear Solid?",
    answer: ["Satoshi Nakomura","Hideo Kojima","Light Yagami","Tatsumi Kimishima"],
    correctAnswer: "Hideo Kojima",
  },
  {
    question: "What game company is responsible for the Super Mario series?",
    answer: ["Ubisoft","Projekt Red","EA","Nintendo"],
    correctAnswer: "Nintendo",
  },
  {
    question: "What year does the newest Cyberpunk game take place in?",
    answer: ["2077","2120","4050","2025"],
    correctAnswer: "2077",
  },
  {
    question: "In the Kingdom Hearts series, it is said that if you give this special fruit to someone your hearts will always be connected. What is the name of this fruit?",
    answer: ["Kairi Fruit","Paopu Fruit","Golden Fruit","Stardust"],
    correctAnswer: "Paopu Fruit",
  },
  {
    question: "In the Harry Potter series, which house was Newt Scamander sorted into at Hogwarts?",
    answer: ["Slitherin","Raverclaw","Hufflepuff","Gryfinndor"],
    correctAnswer: "Hufflepuff",
  },
  {
    question: "From the Star Wars saga, which of these is a valid famous quote?",
    answer: ["These are not the jedi we're looking for","These are not the droids we're looking for","These are not the wookies we're looking for","None of the above"],
    correctAnswer: "These are not the droids we're looking for",
  },
  {
    question: "Which video game is the character Marcus Holloway in?",
    answer: ["Far Cry","Left for Dead 2","Hitman","Watchdogs 2"],
    correctAnswer: "Watchdogs 2",
  },
  {
    question: "Statistically, which is the most popular gaming platform to develop for in 2018?",
    answer: ["PS4/Pro","XBox One/X","PC","VR Headsets"],
    correctAnswer: "PC",
  },
  {
    question: "Which is the most popular TCG of all time?",
    answer: ["Pokemon","Magic: The Gathering","Yugioh","Digimon"],
    correctAnswer: "Magic: The Gathering",
  }
];

// Elements -----------------

const scoreCounter = document.getElementById('score');
const timerCounter = document.getElementById('timer');
const question = document.getElementById('question');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
const parent = document.querySelector('section.qa');
const allButtons = document.querySelectorAll('.btn');

// Counters & other things ----------------

let correct = [];
let incorrect = [];
let unanswered = [];
let score = 0;
let countdown = 60;
let answer = '';
let response = '';

let interval;
let timerRunning = false;
let answerClicked = false;
let questionIndex = 0;

// ----------------------------------------
// TIMER: ---------------------------------
// ----------------------------------------

const timer = {
  run: function() {
    timerRunning = true;
    countdown = 60;
    clearInterval(interval);
    interval = setInterval(timer.decrement, 1000);
  },

  decrement: function() {
    countdown--;
    timerCounter.innerHTML = "Timer: " + "00:" + countdown;
      if (countdown > 10) {
        timerCounter.style.color = '#fff';
      }
      if (countdown <= 10) {
        timerCounter.style.color = 'tomato';
      }
      if (countdown === 0) {
        timer.stopRunning();
        triviaGame.askQuestion();
      }
  },

  stopRunning: function() {
    timerRunning = false;
    clearInterval(interval);
    questionIndex++;
  }
}

// ..../end timer---------------------------
// INITIALIZE: -----------------------------

function initialize() {
  answer1.style.display = 'none';
  answer2.style.display = 'none';
  answer3.style.display = 'none';
  answer4.style.innerHTML = 'Start Game!';
  score = 0;
  countdown = 60;
  correct = [];
  incorrect = [];
  unanswered = [];
  questionIndex = 0;
}

// ..../end initialize-----------------------------
// TRIVIA GAME: -----------------------------------

  const triviaGame = {

    startGame: function() {
      initialize();
      if (response === "Start Game!") {
        triviaGame.askQuestion();
      }
    },

    attachChoices: function(i) {
      answer1.style.display = '';
      answer2.style.display = '';
      answer3.style.display = '';
      answer1.innerHTML = questions[i].answer[0];
      answer2.innerHTML = questions[i].answer[1];
      answer3.innerHTML = questions[i].answer[2];
      answer4.innerHTML = questions[i].answer[3];
    },

    askQuestion: function() {
      if (questionIndex === 10) {
        triviaGame.endGame();
      }
      else if (questionIndex < 10) {
        question.innerHTML = questions[questionIndex].question;
        answer = questions[questionIndex].correctAnswer;
        triviaGame.attachChoices(questionIndex);
        timer.run();
      }
    },

    checkResponse: function(response) {
      if (answerClicked) {
        console.log(response);
          if ( response === answer) {
            console.log('correct!');
            score++;
            scoreCounter.innerHTML = "Score: " + score + "/10";
            // correctAnswers.push('answer');
            answerClicked = false;
            questionIndex++;

            triviaGame.askQuestion();
          } else if ( response !== answer) {
            console.log('incorrect');
            // incorrectAnswers.push('response');
            scoreCounter.innerHTML = "Score: " + score + "/10";
            answerClicked = false;
            questionIndex++;
            triviaGame.askQuestion();
          }
      }
    },

    endGame: function() {
      if (questionIndex < 10) {
        this.askQuestion();
      }
      else if (questionIndex === 10) {
        console.log('print results');
        timer.stopRunning();
        answer1.style.display = 'none';
        answer2.style.display = 'none';
        answer3.style.display = 'none';
        answer4.style.display = 'none';
        question.innerHTML = `Results: You scored ${score} out of 10!`;
      }
    }

  }
//....../triviaGame end -------------------------------

// Run game -------------------------------------------

triviaGame.startGame();

document.addEventListener('click', (e) => {
  response = e.target.innerHTML;
  if ( response === 'Start Game!') {
    triviaGame.askQuestion();
  } else {
    answerClicked = true;
    triviaGame.checkResponse(response);
    triviaGame.endGame();
  }
});


// code dump:
// ----------------------------------------------------------------
// else if (!answerClicked && !timerRunning ) {
//   console.log('out of time!');
//   // unanswered.push('questions[questionIndex].question');
//   questionIndex++;
//   triviaGame.askQuestion();
// }
