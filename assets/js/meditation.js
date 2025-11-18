function loadMeditation() {
  document.getElementById("pageTitle").innerText = "Meditation";

  document.getElementById("pageContainer").innerHTML = `
    <div class="flex flex-col items-center gap-6">

      <h2 id="meditationTime" class="text-4xl font-bold">
        00:00
      </h2>

      <div class="flex gap-4">
        <button class="medBtn" onclick="startMeditation(5)">5 min</button>
        <button class="medBtn" onclick="startMeditation(10)">10 min</button>
        <button class="medBtn" onclick="startMeditation(15)">15 min</button>
      </div>

      <button id="stopMed"
        class="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hidden"
        onclick="stopMeditation()">
        Stop
      </button>
    </div>
  `;
}

let meditationInterval = null;
let remainingSeconds = 0;

function startMeditation(minutes) {
  remainingSeconds = minutes * 60;

  document.getElementById("stopMed").classList.remove("hidden");

  updateMeditationTimer();

  meditationInterval = setInterval(() => {
    remainingSeconds--;
    updateMeditationTimer();
    if (remainingSeconds <= 0) stopMeditation();
  }, 1000);
}

function updateMeditationTimer() {
  const display = document.getElementById("meditationTime");

  let m = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  let s = String(remainingSeconds % 60).padStart(2, "0");

  display.innerText = `${m}:${s}`;
}

function stopMeditation() {
  clearInterval(meditationInterval);
  document.getElementById("meditationTime").innerText = "00:00";
  document.getElementById("stopMed").classList.add("hidden");
}
