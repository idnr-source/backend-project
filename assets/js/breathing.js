function loadBreathingTrainer() {
  document.getElementById("pageTitle").innerText = "Breathing Trainer";

  document.getElementById("pageContainer").innerHTML = `
    <div class="flex flex-col items-center gap-8">

      <div id="breathingCircle"
        class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-500 transition-transform duration-[6000ms]">
      </div>

      <h2 id="breathingText" class="text-2xl md:text-3xl font-bold">Ready?</h2>

      <button id="startBreathing"
        class="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold">
        Start Breathing
      </button>
    </div>
  `;

  const btn = document.getElementById("startBreathing");
  btn.onclick = () => {
    if (btn.innerText === "Start Breathing") {
      startBreathingAnimation();
      btn.innerText = "Stop";
      btn.classList.remove("bg-blue-600");
      btn.classList.add("bg-red-600");
    } else {
      stopBreathingAnimation();
      btn.innerText = "Start Breathing";
      btn.classList.remove("bg-red-600");
      btn.classList.add("bg-blue-600");
    }
  };
}

let breathingInterval;

function startBreathingAnimation() {
  const circle = document.getElementById("breathingCircle");
  const text = document.getElementById("breathingText");

  let phase = 0;

  function cycle() {
    phase++;
    switch (phase % 3) {
      case 1:
        text.innerText = "Inhale…";
        circle.style.transform = "scale(1.5)";
        break;
      case 2:
        text.innerText = "Hold…";
        circle.style.transform = "scale(1.5)";
        break;
      case 0:
        text.innerText = "Exhale…";
        circle.style.transform = "scale(1)";
        break;
    }
  }

  cycle(); // jalankan sekali sebelum interval
  breathingInterval = setInterval(cycle, 6000); // lebih lambat dari sebelumnya
}

function stopBreathingAnimation() {
  clearInterval(breathingInterval);
  const circle = document.getElementById("breathingCircle");
  const text = document.getElementById("breathingText");
  circle.style.transform = "scale(1)";
  text.innerText = "Ready?";
}
