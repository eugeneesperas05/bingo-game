// BINGO GAME

const usedNumbers = new Set();

// Create the board dynamically
function createBoard() {
  const bingoBoard = document.getElementById("bingoBoard");
  bingoBoard.innerHTML = "";

  for (let i = 0; i < 15; i++) {
    const row = document.createElement("div");
    row.className = "row d-flex justify-content-center align-items-center";

    for (let j = 0; j < 5; j++) {
      const num = i + 1 + j * 15;
      const col = document.createElement("div");
      col.className = "col d-flex justify-content-center align-items-center";

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

  // audio to play

  const audioBingoLetters = [
    new Audio("recordings/letters/B.mp3"),
    new Audio("recordings/letters/I.mp3"),
    new Audio("recordings/letters/N.mp3"),
    new Audio("recordings/letters/G.mp3"),
    new Audio("recordings/letters/O.mp3"),
  ];

  const audioBingoTens = [
    new Audio("recordings/dinumbers/Pilado.mp3"),
    new Audio("recordings/dinumbers/Diuno.mp3"),
    new Audio("recordings/dinumbers/Didos.mp3"),
    new Audio("recordings/dinumbers/Ditres.mp3"),
    new Audio("recordings/dinumbers/Diquatro.mp3"),
    new Audio("recordings/dinumbers/Disingko.mp3"),
    new Audio("recordings/dinumbers/Diseyes.mp3"),
    new Audio("recordings/dinumbers/Disyete.mp3"),
  ];

  const audioBingoOnes = [
    new Audio("recordings/numbers/Uno.mp3"),
    new Audio("recordings/numbers/Dos.mp3"),
    new Audio("recordings/numbers/Tres.mp3"),
    new Audio("recordings/numbers/Quatro.mp3"),
    new Audio("recordings/numbers/Singko.mp3"),
    new Audio("recordings/numbers/Seyes.mp3"),
    new Audio("recordings/numbers/Syete.mp3"),
    new Audio("recordings/numbers/Otcho.mp3"),
    new Audio("recordings/numbers/Nuebe.mp3"),
    new Audio("recordings/numbers/Sarado.mp3"),
  ];

  const soundsToPlay = [];

  function playNumberAudio(num) {
    const letterIndex = Math.floor((num - 1) / 15); // 0 = B, 4 = O
    const tens = Math.floor(num / 10);
    const ones = num % 10;

    if (num >= 1 && num <= 9) {
      //  Case 1: Numbers 1–9
      soundsToPlay.push(audioBingoLetters[letterIndex]); // e.g., "B.mp3"
      soundsToPlay.push(audioBingoTens[0]); // "Pilado.mp3"
      soundsToPlay.push(audioBingoOnes[num - 1]); // 1–9
    } else if (num >= 10 && num <= 19) {
      //  Case 2: Numbers 10–19
      soundsToPlay.push(audioBingoLetters[letterIndex]); // e.g., "I.mp3"
      soundsToPlay.push(audioBingoTens[1]); // "Diuno.mp3"
      if (ones > 0) {
        soundsToPlay.push(audioBingoOnes[ones - 1]); // 1–9
      } else {
        soundsToPlay.push(audioBingoOnes[9]); // "Sarado" for 10
      }
    } else {
      //  Case 3: Numbers 20–75
      soundsToPlay.push(audioBingoLetters[letterIndex]); // e.g., "N.mp3"
      if (tens > 1) {
        soundsToPlay.push(audioBingoTens[tens]); // Didos, Diquatro, etc.
      }
      if (ones === 0) {
        soundsToPlay.push(audioBingoOnes[9]); // "Sarado"
      } else {
        soundsToPlay.push(audioBingoOnes[ones - 1]); // 1–9
      }
    }

    playSequentially(soundsToPlay);
  }

  playNumberAudio(num);
}

function playSequentially(audioArray, index = 0) {
  if (index >= audioArray.length) return;
  const sound = audioArray[index];
  sound.currentTime = 0;
  sound.play();
  sound.onended = () => playSequentially(audioArray, index + 1);
}

// for the naygan
function naygan() {
  const button = document.querySelector('button[onclick="naygan()"]');
  button.disabled = true;

  const nayganAudio = new Audio("recordings/naygan/Naygan.mp3");
  nayganAudio.onended = () => {
    generateBingoNumber();
    button.disabled = false;
  };
  nayganAudio.play();
}

function resetBingo() {
  usedNumbers.clear();
  document.getElementById("bingoNumber").textContent = "--";
  document
    .querySelectorAll(".number-box")
    .forEach((box) => box.classList.remove("called"));
}

createBoard();
