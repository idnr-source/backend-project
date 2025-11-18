function showPage(page) {
  if (page === "breathing") {
    loadBreathingTrainer();
  } 
  else if (page === "meditation") {
    loadMeditation();
  } 
  else if (page === "planner") {
    loadPlanner();
  }
  else if (page === "goals") {
    loadGoals();
  }
  else {
    document.getElementById("pageTitle").innerText = page;
    document.getElementById("pageContainer").innerHTML =
      `<p class="text-gray-600 italic">Page "${page}" belum dibuat.</p>`;
  }

  closeSidebar(); // pastikan sidebar otomatis menutup di mobile
}

function logout() {
  localStorage.removeItem("mockLogin");
  window.location.href = "index.html";
}

/* ───────── SIDEBAR TOGGLE ───────── */
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("backdrop");

  const isOpen = sidebar.classList.contains("translate-x-0");

  if (isOpen) {
    // tutup sidebar
    sidebar.classList.add("-translate-x-full");
    sidebar.classList.remove("translate-x-0");
    backdrop.classList.add("hidden");
  } else {
    // buka sidebar
    sidebar.classList.remove("-translate-x-full");
    sidebar.classList.add("translate-x-0");
    backdrop.classList.remove("hidden");
  }
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("backdrop");

  // hanya tutup otomatis kalau layar mobile (width < 768px)
  if (window.innerWidth < 768) {
    sidebar.classList.add("-translate-x-full");
    sidebar.classList.remove("translate-x-0");
    backdrop.classList.add("hidden");
  }
}

// tutup sidebar saat resize ke desktop supaya tidak stuck
window.addEventListener("resize", () => {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("backdrop");

  if (window.innerWidth >= 768) {
    sidebar.classList.remove("-translate-x-full");
    sidebar.classList.add("translate-x-0");
    backdrop.classList.add("hidden");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  showPage("breathing");
});
