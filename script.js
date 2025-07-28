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
  {
    question: "What is Arcium primarily focused on?",
    answers: ["Gaming and NFTs", "Smart contract scalability", "Privacy-preserving computation", "Token distribution"],
    correct: 2
  },
  {
    question: "What PET does Arcium use exclusively for confidential computing?",
    answers: ["TEES", "MPC", "ZKP", "AXOs"],
    correct: 1
  },
  {
    question: "What symbol is associated with the Arcium brand?",
    answers: ["Letter A", "Solana", "Umbra", "Umbrella"],
    correct: 3
  },
  {
    question: "What is a well-known Privacy 1.0 coin that hides transactions?",
    answers: ["Manticore", "Zero Knowledge Proofs", "Cerberus", "Monero"],
    correct: 3
  },
  {
    question: "What is the name of the backend integrated via Arcium's Inpher acquisition that supports <encrypted> AI?",
    answers: ["TEEs", "Manticore", "ZKPs", "Cerberus"],
    correct: 1
  },
  {
    question: "What will the native token of Arcium be called?",
    answers: ["Arxos", "Arc", "Arx", "Axium"],
    correct: 2
  },
  {
    question: "What is Arcium's most recent achievement on Solana?",
    answers: ["Number one Project in Solana", "Leading solana", "Confidential SPL Token", "Bringing Latinas to Solana"],
    correct: 2
  },
  {
    question: "What does Confidential SPL offer on Solana?",
    answers: ["Dominance", "Price Increase", "Privacy", "Aura"],
    correct: 2
  },
  {
    question: "What privacy protocol is built on Arcium to enable encrypted transactions on Solana?",
    answers: ["Umbra", "Arcane hand", "Dark pool", "Cerberus"],
    correct: 0
  },
  {
    question: "What does Umbra mean in English?",
    answers: ["Shadow", "Latina", "<encrypted>", "Umbrella"],
    correct: 3
  }
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
