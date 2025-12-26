import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyACb43fMwRYCNzc7MryHvGkW8GEtfUwtTo",
  authDomain: "platypus-85246.firebaseapp.com",
  projectId: "platypus-85246",
  storageBucket: "platypus-85246.firebasestorage.app",
  messagingSenderId: "614481643950",
  appId: "1:614481643950:web:e8245d7dfa83ed1d28203f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "dashboard.html";
      })
      .catch(err => {
        error.innerText = err.message;
      });
  });
}
