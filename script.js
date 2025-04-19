// BINGO GAME

const usedNumbers = new Set();

// Create the board dynamically
function createBoard() {
  const bingoBoard = document.getElementById("bingoBoard");
  bingoBoard.innerHTML = "";

  for (let i = 0; i < 15; i++) {
    const row = document.createElement("div");
    row.className = "row justify-content-center";

    for (let j = 0; j < 5; j++) {
      const num = i + 1 + j * 15;
      const col = document.createElement("div");
      col.className = "col";

      const box = document.createElement("div");
      box.className = "number-box";
      box.id = `num-${num}`;
      box.textContent = num;

      col.appendChild(box);
      row.appendChild(col);
    }
    bingoBoard.appendChild(row);
  }
}

function generateBingoNumber() {
  if (usedNumbers.size >= 75) {
    alert("All numbers have been called!");
    return;
  }

  let num;
  do {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    num = (array[0] % 75) + 1;
  } while (usedNumbers.has(num));

  usedNumbers.add(num);

  document.getElementById("bingoNumber").textContent = num;

  const calledBox = document.getElementById(`num-${num}`);
  if (calledBox) {
    calledBox.classList.add("called");
  }
}

function resetBingo() {
  usedNumbers.clear();
  document.getElementById("bingoNumber").textContent = "--";
  document
    .querySelectorAll(".number-box")
    .forEach((box) => box.classList.remove("called"));
}

createBoard();
