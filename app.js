import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAETENU7OHy2QXKT5mR5eG_XAeNrXmQYmM",
  authDomain: "gruppe-spill.firebaseapp.com",
  projectId: "gruppe-spill",
  storageBucket: "gruppe-spill.firebasestorage.app",
  messagingSenderId: "462198315480",
  appId: "1:462198315480:web:383671ced377785b1d7aad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let score = 0;
let timer = 30;
let correctColor;
let timerInterval;

const colorBox = document.getElementById('colorBox');
const optionsDiv = document.getElementById('options');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Viser logged in bruker sin score
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      scoreDisplay.textContent = 'Poeng: ' + userSnap.data().score;
    }
  } else {
    window.location.href = 'login.html'; 
  }
});

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
      endGame();
    }
  }, 1000);
}

// Funksjon for å lage en ny runde
function createNewRound() {
  correctColor = getRandomColor();
  colorBox.style.backgroundColor = correctColor;

  let colorOptions = [correctColor];
  while (colorOptions.length < 4) {
    let randomColor = getRandomColor();
    if (!colorOptions.includes(randomColor)) {
      colorOptions.push(randomColor);
    }
  }

  colorOptions = colorOptions.sort(() => Math.random() - 0.5);
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
    createNewRound(); 
  }
}

// Funksjon for å lagre høyeste score i Firestore
async function saveHighScore(finalScore) {
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const currentHighScore = userSnap.data().score;
      if (finalScore > currentHighScore) {
        await updateDoc(userRef, { score: finalScore });
        console.log("Ny høyeste poengsum lagret:", finalScore);
      } else {
        console.log("Høyeste poengsum ble ikke slått.");
      }
    }
  }
}

// Funksjon for å avslutte spillet og lagre poeng
function endGame() {
  alert('Tiden er ute! Din poengsum er: ' + score);
  saveHighScore(score);
  startBtn.style.display = 'block';
}

// Knytt startknappen til startGame-funksjonen
startBtn.addEventListener('click', startGame);

// Logg ut-knappen
logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = 'login.html';
});