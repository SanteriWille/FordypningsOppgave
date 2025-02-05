// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, setDoc, doc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"

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

// Sign up Inputs
const username = document.getElementById("username")
const email = document.getElementById("email");
const password = document.getElementById("password");
const rePassword = document.getElementById("rePassword")

// Sign up Submit
const submitBtn = document.getElementById("submit")
submitBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  if (rePassword.value !== password.value) {
    alert("Passordet er ikke er det samme");
    return;
  }

  // Hvis brukernavn er tatt
  const usernameQuery = query(
    collection(db,"users"),
    where("brukernavn", "==", username.value)
  )

  const querySnapshot = await getDocs(usernameQuery);

  if(!querySnapshot.empty) {
    alert("Brukernavn er allerede i bruk. Velg et annet.");
    return;
  }

  try {
    showAlert('Bruker opprettes...');

    // Lag bruker med passord og email
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    // Sende data i firebase database
    await setDoc(doc(db, "users", user.uid), {
      email: email.value,
      brukernavn: username.value,
      score: 0
    });

    showAlert("Bruker opprettet!")
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 200);

    document.querySelector("form").reset();
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  }
});

// Alert melding
function showAlert(message) {
  const popup = document.getElementById('popupAlert');
  const popupMessage = document.getElementById('popupMessage');
  
  popupMessage.textContent = message;
  popup.style.display = 'block';
  popup.style.opacity = 1; 
  
  setTimeout(() => {
    popup.style.opacity = 0;
    setTimeout(() => {
      popup.style.display = 'none'; 
    }, 700); 
  }, 400); 
}

// Hvis passord
const checkbox = document.getElementById("showP")

checkbox.onclick = function() {
  if (checkbox.checked) {
    password.type = "text"
    rePassword.type = "text"
  } else {
    password.type = "password"
    rePassword.type = "password"
  }
}