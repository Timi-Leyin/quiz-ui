// A list of questions with possible answers.
// @ts-nocheck
import { formatTime } from "../utils/format-time";
import questions1 from "./questions";
import questions2 from "./questions2";
let all = [...questions1, ...questions2].sort();
let questions = [...all]

const questionElement = document.getElementById("question-text");
const optionsButtons = document.getElementById("options-buttons");
const nextButton = document.getElementById("next");
const timerEl = document.getElementById("timer-time");
let explanation = document.getElementById("explanation");
let scoreEl = document.getElementById("score-number");
const scoreboardEl =  document.querySelector("#scoreboard")

// Keeps track of the question while we can go next and the score.
let currentQuestionIndex = 0;
let score = 0;
let time = 60 * 2; // in secs;
let MAX_QUESTION = 5;
let mode = "easy";
let scoreboard=[];
let timer;



function updateLocal(reload=false){
    const id="1234";
    const key=`storage:${id}`
   const previousStorage = localStorage.getItem(key);
   const rawStorage = previousStorage &&  JSON.parse(previousStorage);

   if(!reload || !rawStorage || rawStorage.time <=1){
    localStorage.setItem(key, JSON.stringify({
        id,
        time,
        scoreboard,
        MAX_QUESTION,
        score,
        currentQuestionIndex
    }))
    return
   }
   time=rawStorage.time
   scoreboard=rawStorage.scoreboard
   MAX_QUESTION=rawStorage.MAX_QUESTION
   score=rawStorage.score
   currentQuestionIndex=rawStorage.currentQuestionIndex
}

function startTimer() {
    timer = setInterval(() => {
      updateLocal()
    time = time - 1;
    timerEl.innerText = formatTime(time);
    if (time <= 10) timerEl.style.color = "red";
    if (time == 0) {
      clearInterval(timer);
      showScore();
    }
  }, 1000);
}


function updateScoreboard(){
    scoreboardEl.innerHTML=""
    scoreboard.forEach((sc)=>{
        const el = document.createElement("div");
        el.classList.add(sc==-1?"score-dot-none" :sc?"score-dot-correct":"score-dot-fail")
        scoreboardEl?.append(el)
    })
}

// Shuffle the order of the questions.
function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Starts the quiz.
function startQuiz() {
    // Reset count.
    currentQuestionIndex = 0;
    score = 0;
    scoreboard = new Array(MAX_QUESTION).fill(-1);
    questions = shuffleQuestions(questions);
    updateLocal(true)
    updateScoreboard()
  nextButton.innerHTML = "Next";
  showQuestion();
  startTimer();
}

// Resets the quiz after answering all questions.
function resetQuiz() {
  nextButton.style.display = "none";
  while (optionsButtons.firstChild) {
    optionsButtons.removeChild(optionsButtons.firstChild);
  }
   score = 0;
  time = 60 * 2; // in secs;
 scoreboard=[];

 localStorage.clear()
  clearTimeout(timer)
  startQuiz();
}

// Shows question to user.
function showQuestion() {
  // Clear the previous answer buttons.
  scoreEl.innerText = `${currentQuestionIndex + 1}/${MAX_QUESTION}`;
  optionsButtons.innerHTML = "";

  // Make the "next" button disappear.
  nextButton.style.display = "none";

  // Hide explanation after moving on to the next question.
  explanation.style.display = "none";

  // Get current question from questions list.
  let currentQuestion = questions[currentQuestionIndex];

  // Get the question number.
  let questionNumber = currentQuestionIndex + 1;

  // Show proper question on display
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

  // Show each of the possible answers from the question.
  // For each answer for the current question...
  currentQuestion.answers.forEach((answer) => {
    // Create the button for the answer with the corresponding answer text.
    const button = document.createElement("button");
    button.innerHTML = answer.text;

    // Add the button to the options.
    button.classList.add("options-buttons");
    optionsButtons.appendChild(button);

    // Set "data-correct" attribute on the button if the answer
    // is correct for later use in handling user input.
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    // When the button is clicked, we check if the option is right or wrong,
    // displaying green or red.
    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(e) {
  // Get the selected button that the user clicked on.
  const selectedButton = e.target;

  // Check if the selected answer is correct by accessing the "data-correct" attribute
  // previously created on showQuestion().
  const isCorrect = selectedButton.dataset.correct === "true";

  // If the selected answer is correct, add it to "correct" to display green, and increase score.
  // If the selected answer is incorrect, add it to "incorrect" to display red.
  if (isCorrect) {
    selectedButton.classList.add("correct");
    scoreboard[currentQuestionIndex] = 1
    updateScoreboard()
    score++;
} else {
    selectedButton.classList.add("incorrect");
    scoreboard[currentQuestionIndex] = 0
    updateScoreboard()
  }

  // Disable all answer buttons to prevent further selections after the user has chosen an answer.
  // Store every correct answer into "correct" to prevent further selection of options.
  Array.from(optionsButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }

    // Disable button.
    button.disabled = true;
  });

  explanation.innerHTML =
    "Explanation: " + questions[currentQuestionIndex]["explanation"];
  explanation.style.display = "block";

  // Make the "next" button appear for user to click and move on.
  nextButton.style.display = "block";
}

// After clicking "next", check if there's another question after the current one.
nextButton.addEventListener("click", checkNext);

// Displays the next question.
function nextQuestion() {
  // Go to the next question.
  currentQuestionIndex++;

  // Display question if there are more questions, show score, otherwise.
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Show the score at the end of the quiz.
function showScore() {
  // Hide explanation from last question.
  explanation.style.display = "none";
clearInterval(timer)
  // Remove the options to show the score only.
  while (optionsButtons.firstChild) {
    optionsButtons.removeChild(optionsButtons.firstChild);
  }

  // Show score that the user got and update text of the "next" button to
  // "Play Again" for user to play again.
  questionElement.innerHTML =
    "You scored " +
    score +
    " out of  " +
    MAX_QUESTION +
    "! -> " +
    ((score / MAX_QUESTION) * 100).toFixed(1) +
    "%";
  nextButton.innerHTML = "Play Again";

  // Remove the previous click event listener from nextButton.
  nextButton.removeEventListener("click", checkNext);

  // Add the click event listener to start the quiz again when "Play Again" is clicked.
  nextButton.addEventListener("click", resetQuiz);
}

// Checks if there are more questions to be answered. Reset quiz otherwise.
function checkNext() {
  // Hide the welcome text.
  // welcomeTextElement.style.display = "none";

  if (currentQuestionIndex < MAX_QUESTION - 1) {
    nextQuestion();
  } else {
    showScore();
  }
}


// updateLocal(true)
startQuiz();