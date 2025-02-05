import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, getDoc} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"

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

// Logg inn Inputs
const logEmail = document.getElementById("logEmail");
const logPassword = document.getElementById("logPassword");

// Logg inn submit
const logSubmitBtn = document.getElementById("logSubmit")
logSubmitBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, logEmail.value, logPassword.value);
    const user = userCredential.user;

    // Fetch user's score from Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      console.log("User logged in. Current score:", userData.score);
      localStorage.setItem("userScore", userData.score);
    } else {
      console.log("User data not found in Firestore.");
    }

    window.location.href = 'spill.html';

  } catch (error) {
    alert(error.message);
  }

  logEmail.value = '';
  logPassword.value = '';
});

// Hvis passord
const checkbox = document.getElementById("showP")

checkbox.onclick = function() {
  if (checkbox.checked) {
    logPassword.type = "text"
  } else {
    logPassword.type = "password"
  }
}