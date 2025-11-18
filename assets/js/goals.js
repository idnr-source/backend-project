function loadGoals() {
  document.getElementById("pageTitle").innerText = "Goals";

  document.getElementById("pageContainer").innerHTML = `
    <div class="flex flex-col gap-6 max-w-xl mx-auto">

      <!-- Input new goal -->
      <div class="flex gap-2">
        <input id="newGoal" type="text" placeholder="Tambahkan goal baru"
          class="flex-1 border p-2 rounded-lg">
        <button onclick="addGoal()" 
          class="px-4 py-2 bg-blue-600 text-white rounded-lg">Add</button>
      </div>

      <!-- List goals -->
      <ul id="goalsList" class="space-y-2">
        <!-- Goals akan dimuat di sini -->
      </ul>

      <!-- Reset all -->
      <button onclick="resetGoals()"
        class="mt-4 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
        Reset All
      </button>
    </div>
  `;

  loadStoredGoals();
}

function loadStoredGoals() {
  const data = JSON.parse(localStorage.getItem("goalsData")) || [];
  const ul = document.getElementById("goalsList");
  ul.innerHTML = "";

  data.forEach((goal, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-white p-3 rounded-lg shadow";

    li.innerHTML = `
      <span>${goal}</span>
      <button onclick="deleteGoal(${index})" class="text-red-500 font-bold">✕</button>
    `;
    ul.appendChild(li);
  });
}

function addGoal() {
  const input = document.getElementById("newGoal");
  const value = input.value.trim();
  if (!value) return;

  const data = JSON.parse(localStorage.getItem("goalsData")) || [];
  data.push(value);
  localStorage.setItem("goalsData", JSON.stringify(data));

  input.value = "";
  loadStoredGoals();
}

function deleteGoal(index) {
  const data = JSON.parse(localStorage.getItem("goalsData")) || [];
  data.splice(index, 1);
  localStorage.setItem("goalsData", JSON.stringify(data));
  loadStoredGoals();
}

function resetGoals() {
  localStorage.removeItem("goalsData");
  loadStoredGoals();
}
