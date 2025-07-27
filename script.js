const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const nameInput = document.getElementById("name-input");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const finalScore = document.getElementById("final-score");
const userNameSpan = document.getElementById("user-name");
const reviewList = document.getElementById("review-list");
const timerDisplay = document.getElementById("timer");

let questions = [
  { question: "When is the next Arcium community submit?", answers: ["28 July 2025", "29 July 2025", "30 July 2025", "31 July 2025"], correct: 2 },
  { question: "What is Arcium primarily focused on?", answers: ["Gaming and NFTs", "Smart contract scalability", "Privacy-preserving computation", "Token distribution"], correct: 2 },
  { question: "Which of the following is a key benefit of using Arcium?", answers: ["Lower staking requirements", "NFT minting automation", "Data privacy and verifiable off-chain logic", "Gasless transaction"], correct: 2 },
  { question: "In Arcium, what do users reveal when verifying results?", answers: ["The entire computation history", "The source code of the logic", "Only the proof that a valid computation occurred", "Their private keys"], correct: 2 },
  { question: "Arcium is best described as a:", answers: ["Blockchain explorer", "Privacy-preserving compute layer", "Consensus mechanism", "Token bridge"], correct: 1 },
  { question: "What is the main security guarantee Arcium provides?", answers: ["File redundancy", "Spam resistance", "Trustless execution integrity", "KYC compliance"], correct: 2 },
  { question: "How can developers integrate Arcium into their apps?", answers: ["By plugging in its privacy compute APIs", "By migrating fully to its blockchain", "Through centralized SDKs only", "By replacing Ethereum with Arcium"], correct: 0 },
  { question: "Who is Arcium Head of Community?", answers: ["Doingz", "Loosty", "Aberama", "Lily Billy"], correct: 1 },
  { question: "Arcium is coming to Kaito Soon", answers: ["True", "False"], correct: 1 }
];

let currentQuestionIndex = 0;
let score = 0;
let username = "";
let wrongAnswers = [];
let timer;
let timeLeft = 10;

startBtn.addEventListener("click", () => {
  username = nameInput.value.trim();
  if (username === "") return;

  startScreen.classList.add("d-none");
  quizScreen.classList.remove("d-none");

  const bgMusic = document.getElementById("bg-music");
  const tryPlay = bgMusic.play();
  if (tryPlay !== undefined) {
    tryPlay.catch(() => {
      document.body.addEventListener("click", () => bgMusic.play(), { once: true });
    });
  }

  startQuiz();
});

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setNextQuestion();
  } else {
    endQuiz();
  }
});

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  wrongAnswers = [];
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  startTimer();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerText = answer;
    btn.classList.add("btn", "btn-outline-light", "mb-2", "w-100");
    btn.addEventListener("click", () => selectAnswer(index));
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  clearInterval(timer);
  timeLeft = 10;
  timerDisplay.innerText = `Time: ${timeLeft}s`;
  nextBtn.classList.add("d-none");
  answerButtons.innerHTML = "";
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `Time: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      selectAnswer(-1);
    }
  }, 1000);
}

function selectAnswer(selectedIndex) {
  clearInterval(timer);
  const current = questions[currentQuestionIndex];
  const correctIndex = current.correct;
  const buttons = answerButtons.children;

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("btn-outline-light");
    if (i === correctIndex) {
      buttons[i].classList.add("btn-success");
    } else {
      buttons[i].classList.add("btn-secondary");
    }
  }

  if (selectedIndex === correctIndex) {
    score++;
  } else {
    wrongAnswers.push({
      question: current.question,
      correct: current.answers[correctIndex]
    });
  }

  nextBtn.classList.remove("d-none");
}

function endQuiz() {
  quizScreen.classList.add("d-none");
  resultScreen.classList.remove("d-none");

  userNameSpan.innerText = username;
  finalScore.innerText = `${score} / ${questions.length}`;

  reviewList.innerHTML = "";
  wrongAnswers.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.question} → Correct: ${item.correct}`;
    reviewList.appendChild(li);
  });
}
