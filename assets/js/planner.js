function loadPlanner() {
  document.getElementById("pageTitle").innerText = "Fitness Planner";

  // Data latihan per hari
  const plannerData = {
    Monday: ["Push Ups x20", "5 Min Meditation"],
    Tuesday: ["Jogging 15 min", "Stretching 5 min"],
    Wednesday: ["Plank 60 sec", "Breathing Trainer"],
    Thursday: ["HIIT 10 min", "Walk 3km"],
    Friday: ["Push Ups x30", "Meditation 10 min"]
  };

  // Render HTML
  let html = `
    <div class="mb-6">
      <h2 class="text-xl font-bold mb-2">Weekly Progress</h2>
      <div class="w-full bg-gray-300 rounded-full h-4">
        <div id="plannerProgress" class="h-4 bg-blue-500 rounded-full transition-all"></div>
      </div>
      <p id="progressText" class="text-gray-600 mt-1 text-sm"></p>
    </div>

    <div class="planner-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  `;

  for (const day in plannerData) {
    html += createPlannerCard(day, plannerData[day]);
  }

  html += `</div>
    <button onclick="resetPlanner()"
      class="mt-6 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
      Reset All
    </button>
  `;

  document.getElementById("pageContainer").innerHTML = html;

  // Setelah HTML ada, panggil fungsi JS untuk checkbox
  restorePlannerChecks();
  updateProgress();
}

// Buat card untuk tiap hari
function createPlannerCard(day, tasks) {
  let html = `<div class="planner-card bg-white shadow-md p-5 rounded-xl">
    <h2 class="font-bold text-lg mb-3">${day}</h2>
    <ul>
  `;

  tasks.forEach((task, index) => {
    const id = `${day}-${index}`;
    html += `
      <li class="flex items-center gap-2 mb-1">
        <input type="checkbox" id="${id}" onchange="savePlannerCheck('${id}')">
        <label for="${id}">${task}</label>
      </li>`;
  });

  html += `</ul></div>`;
  return html;
}

// Save checkbox ke localStorage
function savePlannerCheck(id) {
  const box = document.getElementById(id).checked;
  let data = JSON.parse(localStorage.getItem("plannerCheck")) || {};
  data[id] = box;
  localStorage.setItem("plannerCheck", JSON.stringify(data));
  updateProgress();
}

// Restore checkbox dari localStorage
function restorePlannerChecks() {
  const data = JSON.parse(localStorage.getItem("plannerCheck")) || {};
  for (const id in data) {
    const box = document.getElementById(id);
    if (box) box.checked = data[id];
  }
}

// Reset semua checklist
function resetPlanner() {
  localStorage.removeItem("plannerCheck");
  loadPlanner();
}

// Update progress bar
function updateProgress() {
  const boxes = document.querySelectorAll("#pageContainer input[type=checkbox]");
  let done = 0;
  boxes.forEach(box => box.checked && done++);

  const total = boxes.length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  const bar = document.getElementById("plannerProgress");
  if (bar) bar.style.width = percent + "%";

  const text = document.getElementById("progressText");
  if (text) text.innerText = `${done}/${total} completed (${percent}%)`;
}
