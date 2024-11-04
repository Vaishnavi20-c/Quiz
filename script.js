// JavaScript Logic
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questions = [
  { question: "Which of thw following will help to encape from a callback hell?", options: ["Event Queue", "Promise", "Both a and b", "None of these"], answer: "Both a and b" },
  { question: "Which of the following illusions does a event loop gives?", options: ["Single threaded", "Multi threaded", "Both a and b", "None of the above"], answer: "Multi threaded" },
  { question: "Choose the correct syntax for named export:?", options: ["export app;", "export default app;", "export app()", "export {app};"], answer: "export {app};" },
  { question: "What is the right way to add classes in JSX?", options: ["<p class=”para”></p>", "<p className=”.para”></p>", "<p class=”.para”></p>", "<p className=”para”></p>"], answer: "<p className=”para”></p>" },
  { question: "What is the main file in the public folder?", options: ["App.js", "Index.js", "index.html", "App.html"], answer: "index.html" },
  { question: "JSX stand for ______?", options: ["Javascript html", "Extensible markup language", "Javascript XML", "None of these"], answer: "Javascript XML" },
  { question: "What is babel?", options: ["Javascript interpreter", "Javascript compiler", "Javascript transpiler", "None of the above"], answer: "Javascript compiler" },
  { question: "How to create a React app?", options: ["npm create-react-app", "npm create-app", "npx create-react-app", "None"], answer: "npx create-react-app" },
  { question: "What is Reactjs?", options: ["Server side framework", "UI framework", "Javascript library", "Both b and c"], answer: "Both b and c" },
  { question: "Which of the following are the main building blocks of the program?", options: ["Loops", "Functions", "Conditional Statements", "None of the above"], answer: "Functions" }


];

const welcomeScreen = document.getElementById("welcomeScreen");
const categoryScreen = document.getElementById("categoryScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const timeElement = document.getElementById("time");
const questionCountElement = document.getElementById("questionCount");

welcomeScreen.style.display = "block";

function startQuiz() {
  const username = document.getElementById("username").value;
  if (username) {
    welcomeScreen.style.display = "none";
    categoryScreen.style.display = "block";
  }
}

function showQuiz() {
  categoryScreen.style.display = "none";
  quizScreen.style.display = "block";
  showQuestion();
  startTimer();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  startTimer();

  const questionData = questions[currentQuestionIndex];
  questionElement.textContent = questionData.question;
  optionsElement.innerHTML = "";
  questionCountElement.textContent = currentQuestionIndex + 1;

  questionData.options.forEach(option => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.textContent = option;
    optionElement.onclick = () => checkAnswer(option);
    optionsElement.appendChild(optionElement);
  });
}

function checkAnswer(selectedOption) {
  const questionData = questions[currentQuestionIndex];
  if (selectedOption === questionData.answer) {
    score++;
  }
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timeElement.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
      } else {
        endQuiz();
      }
    }
  }, 1000);
}

function endQuiz() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";
  const message = `You got "${score}" out of "${questions.length}"!`;
  document.getElementById("resultMessage").textContent = message;
}