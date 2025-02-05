// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
  
  // Button
  const backToGameBtn = document.getElementById('backToGameBtn');  
  const leaderboardTable = document.querySelector('table'); 
  const logoutBtn = document.getElementById('logoutBtn');
  
  // Hvis loading message
  function showLoadingMessage() {
  const tbody = leaderboardTable.querySelector('tbody') || leaderboardTable.appendChild(document.createElement('tbody'));
  tbody.innerHTML = '<tr><td colspan="3">Laster inn...</td></tr>';
  }

  // Innholdet til leaderboarden
  function populateLeaderboard() {
    showLoadingMessage()

    const leaderboardQuery = query(collection(db, "users"), orderBy("score", "desc"), limit(10));
  
    onSnapshot(leaderboardQuery, (querySnapshot) => {
      const tbody = leaderboardTable.querySelector('tbody') || leaderboardTable.appendChild(document.createElement('tbody'));
      tbody.innerHTML = '';
  
      let position = 1;
      querySnapshot.forEach(doc => {
        const data = doc.data();
        let row = document.createElement('tr');
        row.innerHTML = `
          <td>${position}</td>
          <td>${data.brukernavn}</td>
          <td>${data.score}</td>
        `;
        tbody.appendChild(row);
        position++;
      });
    }, (error) => {
      console.error("Error fetching leaderboard:", error);
    });
  }
  
  // Innholdet til leaderboard når pagen loader
  populateLeaderboard();
  
  // Back to game button
  backToGameBtn.addEventListener('click', () => {
    window.location.href = 'spill.html';
  });
  
  // Logout button 
  logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = 'login.html';
  });
  