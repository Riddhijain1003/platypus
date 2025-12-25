console.log("Platypus JS loaded");

// LOGIN BUTTON
const loginBtn = document.querySelector("button");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    alert("Login button clicked!");
    window.location.href = "dashboard.html";
  });
}
