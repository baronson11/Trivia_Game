let correctAnswers = 0;
let question;
let answer;
let response;

setTimeout(timeUp, 1000 * 15);

let questions = [
  {
   question: 'How many states are in the United States?',
   answer: 50
  },
  {
   question: 'How many continents are there?',
   answer: 7
  },
  {
   question: 'How many legs does an insect have?',
   answer: 6
  },
  {
   question: 'How many hours are in a day?',
   answer: 24
  },
  {
   question: 'What year is it?',
   answer: 2018
  }
];

function timeUp() {
  // in the element with an id of time-left add an h2 saying Time's Up!
  // console log done
  console.log("done!");
  // Replace below with JS
  // $("#time-left").append("<h2>Time's Up!</h2>");
  console.log("time is up");
}

function print(message) {
  document.getElementById('.results');
}

for (let i = 0; i < questions.length; i += 1) {
  response = parseInt(prompt(questions[i].question));
  answer = questions[i].answer;
  if (response === answer) {
    correctAnswers += 1;
  }
}

html = "You got " + correctAnswers + " question(s) right."
print(html);
