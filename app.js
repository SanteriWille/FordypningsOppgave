let score = 0;
let timer = 30;
let correctColor;
let colorOptions = [];
let gameInterval;
let timerInterval;

let colorBox = document.getElementById('colorBox');
let optionsDiv = document.getElementById('options');
let scoreDisplay = document.getElementById('score');
let timerDisplay = document.getElementById('timer');
let startBtn = document.getElementById('startBtn');

// Funksjon for å generere en tilfeldig farge
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
  
  // Sett opp timer
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
  colorBox.style.backgroundColor = getRandomColor();  // Tilfeldig bakgrunnsfarge
  correctColor = colorBox.style.backgroundColor;

  // Generer alternative farger
  colorOptions = [correctColor];
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
  } else {
    alert('Feil! Prøv igjen.');
  }
}

// Knytt startknappen til startGame-funksjonen
startBtn.addEventListener('click', startGame);
