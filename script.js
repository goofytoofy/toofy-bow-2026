/*
  TOOFY BOW 2026
  To customize the bingo phrases, edit the list below.
  Keep each phrase inside quotation marks and separate phrases with commas.
  You can have MORE than 24 phrases. Each visitor receives 24 different ones.
*/

const phrases = [
  "DJ play Mr. Brightside",
  "Connor Lewis cameo",
  "Someone spills a drink",
  "Split the G (self)",
  "Buy a round for at least 3",
  "Group photo",
  "Someone misses their train",
  "Eric pukes",
  "Mark pukes",
  "Tony pukes",
  "Mylan rizz",
  "Sibling sighting",
  "Green tea shot (self)",
  "Someone gets kicked out of bar",
  "Tony D actually gets drunk",
  "Altercation",
  "Trade completed in Dynasty",
  "Tony falls asleep",
  "JT DMFO",
  "Jager bomb (self)",
  "Tequila shot (self)",
  "Tommy says bye to everyone",
  "JC smokes a joint",
  "Samir steals a drink",
  "Lengyel shows up",
  "Dillon smokes a cig",
  "Mylan smokes a cig",
  "Enda shows up",
  "Brandon blacks out",
  "Someone draws blood",
  "WNF parlay hits",
  "Dylan fights Eric",
  "Send a drunk text (self)",
  "Receive a drunk text (self)",
  "Mark does bag",
  "Eric phone dies",
  "Dillon rizz",
  "Eric talks to a girl",
  "Receive the N pass (self)",
  "John sees a guy he knows",
];

const STORAGE_KEY = "toofy-bow-2026-card-v1";
const cardElement = document.getElementById("bingo-card");
const statusElement = document.getElementById("status");
const celebrationElement = document.getElementById("celebration");

function shuffled(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createNewCard() {
  if (phrases.length < 24) {
    throw new Error("Please add at least 24 phrases to the phrase list in script.js.");
  }
  const selected = shuffled(phrases).slice(0, 24);
  const squares = [];
  let phraseIndex = 0;

  for (let i = 0; i < 25; i++) {
    if (i === 12) {
      squares.push({ text: "FREE", marked: true, free: true });
    } else {
      squares.push({ text: selected[phraseIndex++], marked: false, free: false });
    }
  }
  return { squares };
}

function loadOrCreateCard() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.squares) &&
          parsed.squares.length === 25 &&
          parsed.squares[12]?.free === true) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Could not read the saved bingo card; creating a new one.", error);
  }

  const card = createNewCard();
  saveCard(card);
  return card;
}

function saveCard(card) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(card));
  } catch (error) {
    statusElement.textContent = "Your browser could not save this card. It may not persist after closing the page.";
    console.warn("Could not save bingo card.", error);
  }
}

let card = loadOrCreateCard();

function getWinningLines(squares) {
  const lines = [];
  for (let row = 0; row < 5; row++) {
    lines.push(Array.from({ length: 5 }, (_, col) => row * 5 + col));
  }
  for (let col = 0; col < 5; col++) {
    lines.push(Array.from({ length: 5 }, (_, row) => row * 5 + col));
  }
  lines.push([0, 6, 12, 18, 24]);
  lines.push([4, 8, 12, 16, 20]);
  return lines.filter(line => line.every(index => squares[index].marked));
}

function renderCard() {
  cardElement.innerHTML = "";
  card.squares.forEach((square, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "bingo-square";
    if (square.marked) button.classList.add("marked");
    if (square.free) button.classList.add("free-space");
    button.textContent = square.text;
    button.setAttribute("aria-pressed", String(Boolean(square.marked)));
    button.setAttribute("aria-label",
      square.free ? "Free center square" :
      `${square.text}${square.marked ? ", marked" : ", not marked"}`);
    if (square.free) {
      button.disabled = true;
    } else {
      button.addEventListener("click", () => toggleSquare(index));
    }
    cardElement.appendChild(button);
  });
  const count = getWinningLines(card.squares).length;
  statusElement.textContent = count > 0
    ? `BINGO! ${count} ${count === 1 ? "line" : "lines"} completed.`
    : "Tap a square to mark it.";
}

function toggleSquare(index) {
  if (card.squares[index].free) return;
  const before = getWinningLines(card.squares).length;
  card.squares[index].marked = !card.squares[index].marked;
  const after = getWinningLines(card.squares).length;
  saveCard(card);
  renderCard();

  // Celebrate every time a new winning line is completed, including
  // a second line while another line is still complete.
  if (after > before) celebrate();
}

function celebrate() {
  celebrationElement.classList.remove("show");
  // Force a reflow so the same animation can play again.
  void celebrationElement.offsetWidth;
  celebrationElement.classList.add("show");

  const colors = ["#f2c66d", "#fff0cf", "#a84c36", "#6d8a57", "#f7df9b"];
  for (let i = 0; i < 85; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 240}px`);
    piece.style.animationDelay = `${Math.random() * 0.45}s`;
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    document.body.appendChild(piece);
    window.setTimeout(() => piece.remove(), 2600);
  }
}

renderCard();
