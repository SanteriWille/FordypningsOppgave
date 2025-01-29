let score = 0;
let timer = 30;
let correctColor;
let gameInterval;
let timerInterval;

const colorBox = document.getElementById('colorBox');
const optionsDiv = document.getElementById('options');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Funksjon for å generere en tilfeldig farge i HEX-format
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Funksjon for å starte spillet
function startGame() {
  score = 0;
  timer = 30;
  scoreDisplay.textContent = 'Poeng: ' + score;
  timerDisplay.textContent = 'Tid: ' + timer;

  startBtn.style.display = 'none';
  createNewRound();

  // Start timer
  timerInterval = setInterval(() => {
    timer--;
    timerDisplay.textContent = 'Tid: ' + timer;
    if (timer <= 0) {
      clearInterval(timerInterval);
      alert('Tiden er ute! Din poengsum er: ' + score);
      startBtn.style.display = 'block'; // Vis startknapp på slutten
    }
  }, 1000);
}

// Funksjon for å lage en ny runde
function createNewRound() {
  correctColor = getRandomColor();
  colorBox.style.backgroundColor = correctColor;

  // Generer alternative farger
  let colorOptions = [correctColor];
  while (colorOptions.length < 4) {
    let randomColor = getRandomColor();
    if (!colorOptions.includes(randomColor)) {
      colorOptions.push(randomColor);
    }
  }

  // Bland alternativene
  colorOptions = colorOptions.sort(() => Math.random() - 0.5);

  // Vis alternativene
  optionsDiv.innerHTML = '';
  colorOptions.forEach(color => {
    let option = document.createElement('div');
    option.classList.add('option');
    option.style.backgroundColor = color;
    option.addEventListener('click', () => checkAnswer(color));
    optionsDiv.appendChild(option);
  });
}

// Funksjon for å sjekke spillerens svar
function checkAnswer(selectedColor) {
  if (selectedColor === correctColor) {
    score++;
    scoreDisplay.textContent = 'Poeng: ' + score;
    createNewRound(); // Start ny runde
  }
}

// Knytt startknappen til startGame-funksjonen
startBtn.addEventListener('click', startGame);

// Knytt logg ut-knappen til å gå til index.html
logoutBtn.addEventListener('click', () => {
  window.location.href = 'login.html';
});
