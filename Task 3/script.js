const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clear = document.getElementById("clear");
const equals = document.getElementById("equals");

const historyBtn = document.getElementById("historyBtn");
const historyModal = document.getElementById("historyModal");
const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");
const closeHistory = document.getElementById("closeHistory");

let currentInput = "";
let history = [];


buttons.forEach(button => {
  button.addEventListener("click", () => {
    currentInput += button.getAttribute("data-value");
    display.value = currentInput;
  });
});


clear.addEventListener("click", () => {
  currentInput = "";
  display.value = "";
});


equals.addEventListener("click", () => {
  if (currentInput.trim() === "") return;
  try {
    const result = Function(`"use strict"; return (${currentInput})`)(); 
    history.push(`${currentInput} = ${result}`);
    updateHistory();
    display.value = result;
    currentInput = result.toString();
  } catch (error) {
    display.value = "Error";
    currentInput = "";
  }
});


historyBtn.addEventListener("click", () => {
  historyModal.style.display = "flex";
});


closeHistory.addEventListener("click", () => {
  historyModal.style.display = "none";
});


clearHistory.addEventListener("click", () => {
  history = [];
  updateHistory();
});

function updateHistory() {
  historyList.innerHTML = "";
  if (history.length === 0) {
    historyList.innerHTML = "<li>No history available</li>";
  } else {
    history.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      historyList.appendChild(li);
    });
  }
}
