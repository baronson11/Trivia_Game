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
const answerButtons = document.getElementById('answer');
const parent = document.querySelector('section.qa');

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

// NOTES TO SELF: -------------------
// Set a timer, give player 60 seconds per question and when time is up
// change question to next one
// iterate through questions one at a time
// sort clicked answers to correct or incorrect
// increase score by one for all correct answers
// manipulate the dom to add buttons and remove buttons from page dynamically
// --------------------------------------

function timer() {
  function run() {
    timerRunning = true;
    clearInterval(interval);
    interval = setInterval(decrement, 1000);
  }

  function decrement() {
    countdown--;
    timerCounter.innerHTML = "Timer: " + "00:" + countdown;
      if (countdown > 10) {
        timerCounter.style.color = '#fff';
      }
      if (countdown <= 10) {
        timerCounter.style.color = 'tomato';
      }
      if (countdown === 0) {
        stop();
      }
  }

  function stop() {
    timerRunning = false;
    clearInterval(interval);
  }

  run();
}

function appendAnswers(i) {
  for (let x = 0; x < 4; x++) {
    let multipleChoice = questions[i].answer[x];
    let button = document.createElement('button');
    button.className = 'btn';
    button.innerHTML = multipleChoice;
    parent.appendChild(button);
  }
}

function removeAnswers() {
  let button = document.getElementsByTagName('button');
  for(let i = 0; i < button.length; i++) {
    parent.removeChild(button[i]);
  }
}

// Make this an object during refactoring

function startGame() {

}

function askQuestion() {

    question.innerHTML = questions[questionIndex].question;
    answer = questions[questionIndex].correctAnswer;
    appendAnswers(questionIndex);

    // Run timer
      timer();

    if (timerRunning) {
      if ( answerClicked && response === answer) {
        score++;
        correctAnswers.push(answer);
        removeAnswers();
        questionIndex++;
        askQuestion();
        console.log('bug at 1');
      } else if ( answerClicked && response !== answer) {
        incorrectAnswers.push(response);
        removeAnswers();
        questionIndex++;
        askQuestion();
        console.log('bug at 2');
      } else if ( !timerRunning && countdown === 0 ) {
        unanswered.push(questions[questionIndex].question)
        removeAnswers();
        questionIndex++;
        askQuestion();
        console.log('bug at 3');
      }
    }

  }


function endGame() {

}

// calls go at bottom

document.addEventListener('click', (event) => {
  response = event.target.innerHTML;
  answerClicked = true;
});
