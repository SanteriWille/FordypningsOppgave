import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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

// Logg inn Inputs
const logEmail = document.getElementById("logEmail");
const logPassword = document.getElementById("logPassword");

// Logg inn submit
const logSubmitBtn = document.getElementById("logSubmit")
logSubmitBtn.addEventListener("click", function (event) {
  event.preventDefault()

  signInWithEmailAndPassword(auth, logEmail.value, logPassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.href = 'spill.html';
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });

  logEmail.value = '';
  logPassword.value = '';
})

// Hvis passord
const checkbox = document.getElementById("showP")

checkbox.onclick = function() {
  if (checkbox.checked) {
    logPassword.type = "text"
  } else {
    logPassword.type = "password"
  }
}