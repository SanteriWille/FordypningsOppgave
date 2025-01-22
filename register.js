// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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

// Sign up Inputs
const email = document.getElementById("email");
const password = document.getElementById("password");
const rePassword = document.getElementById("rePassword")

// Sign up Submit
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (rePassword.value !== password.value) {
    alert("Passordet er ikke er det samme")
    return;
  }

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("Lager bruker...")
      window.location.href = 'spill.html'
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });

  email.value = '';
  password.value = '';
  rePassword.value = '';
});

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