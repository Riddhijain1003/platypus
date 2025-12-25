// Firebase config (PASTE YOUR CONFIG HERE)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACb43fMwRYCNzc7MryHvGkW8GEtfUwtTo",
  authDomain: "platypus-85246.firebaseapp.com",
  projectId: "platypus-85246",
  storageBucket: "platypus-85246.firebasestorage.app",
  messagingSenderId: "614481643950",
  appId: "1:614481643950:web:e8245d7dfa83ed1d28203f"
};

// Initialize Firebase


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// LOGIN
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    console.log("Login button clicked");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    console.log("Email:", email);
    console.log("Password length:", password.length);

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("LOGIN SUCCESS");
        window.location.href = "dashboard.html";
      })
      .catch((err) => {
        console.error("LOGIN ERROR:", err.message);
        error.innerText = err.message;
      });
  });
}

