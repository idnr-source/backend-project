document.getElementById("loginBtn").onclick = () => {
  const email = document.getElementById("email").value.trim();
  const pass  = document.getElementById("password").value.trim();

  if (!email || !pass) {
    alert("Isi email & password dulu ya.");
    return;
  }

  localStorage.setItem("mockLogin", "true");  
  window.location.href = "dashboard.html";
};
