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


const timer = {
  run: function() {
    timerRunning = true;
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
      }
  },

  stopRunning: function() {
    timerRunning = false;
    clearInterval(interval);
  }
}

function initialize() {
  answer1.style.display = 'none';
  answer2.style.display = 'none';
  answer3.style.display = 'none';
  answer4.style.innerHTML = 'Start Game!';
}

// start trivia game ------------------------------

  const triviaGame = {

    startGame: function() {
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

      } else {

        question.innerHTML = questions[questionIndex].question;
        answer = questions[questionIndex].correctAnswer;
        triviaGame.attachChoices(questionIndex);

        // Run timer
          timer.run();

        if (timerRunning) {
          if ( answerClicked && response === answer) {
            score++;
            correctAnswers.push(answer);
            questionIndex++;
            triviaGame.askQuestion();
          } else if ( answerClicked && response !== answer) {
            incorrectAnswers.push(response);
            questionIndex++;
            triviaGame.askQuestion();
          } else if ( !timerRunning && countdown === 0 ) {
            unanswered.push(questions[questionIndex].question)
            questionIndex++;
            triviaGame.askQuestion();
          }
        }
      }

    },

    endGame: function() {
      if (questionIndex === 10) {
        // add results here
      }
    }

  } //....../triviaGame end

// Calls go here

document.addEventListener('click', (e) => {
  response = e.target.innerHTML;
  if ( response === 'Start Game!') {
    triviaGame.startGame();
  }
  if ( questionIndex === 10) {
    triviaGame.endGame();
  }
});

initialize();
