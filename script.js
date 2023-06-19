let guide = document.querySelector("#guide");
let dialog = document.querySelector("#dialog");

let ai = document.querySelector(".ai");
let title = document.querySelector("#player-title");
let countdown = document.querySelector(".countdown");
let aiMove = document.querySelector("#aiMove");
let result = document.querySelector(".result");
let btnReplay = document.querySelector("#btnReplay");

let rock = document.querySelector("#rock");
let paper = document.querySelector("#paper");
let scissors = document.querySelector("#scissors");

const COUNTDOWN_VALUE = 3;
let currentCountdown = COUNTDOWN_VALUE;

let playing = false;
let currentId = 1;

guide.addEventListener("click", () => {
    showModal();
});

const closeDialog = () => {
    dialog.close();
};

const showModal = () => {
    dialog.showModal();
};

// Game loop //
// Countdown logic
let interval;
const handleCountdown = () => {
    countdown.textContent = currentCountdown; // Update the countdown text

    if (!playing) {
        playing = true;
    }

    if (currentCountdown > 0) {
        currentCountdown--; // Decrease the countdown value
    } else {
        countdown.textContent = "";
        handleAiMove(currentId);
        clearInterval(interval); // Stop the interval when countdown reaches 0
        currentCountdown = COUNTDOWN_VALUE;
        btnReplay.style.display = "block";
    }
};

const resetView = () => {
    countdown.style.display = "none";
    aiMove.style.display = "none";
    ai.style.display = "none";
    result.style.display = "none";
    btnReplay.style.display = "none";

    title.style.display = "block";
    rock.style.display = "block";
    paper.style.display = "block";
    scissors.style.display = "block";

    playing = false;
};

const playRound = (id) => {
    if (!playing) {
        currentId = id;
        toggleMoves(currentId);

        ai.style.display = "flex";
        countdown.style.display = "block";
        countdown.textContent = "Hm...";
        interval = setInterval(handleCountdown, 1000);
    }
};

const toggleMoves = (id) => {
    title.style.display = "none";
    if (id === 1) {
        paper.style.display = "none";
        scissors.style.display = "none";
    } else if (id === 2) {
        rock.style.display = "none";
        scissors.style.display = "none";
    } else {
        rock.style.display = "none";
        paper.style.display = "none";
    }
};

// Never change this or all ends, DO NOT CHANGE, LIKE SERIOUSLY... EVER
let superSecretSettingDoNotChange = true;

const handleAiMove = (id) => {
    let shouldAiWin = superSecretSettingDoNotChange;

    let aiPick = pickAiMove(id, shouldAiWin);
    aiMove.style.backgroundImage = `url('assets/${aiPick}.svg')`;
    aiMove.style.display = "block";

    result.style.display = "block";
    result.textContent = shouldAiWin
        ? "You lost. Big surprise..."
        : "You lo... Wait what?! That's cheating!";
};

const playAgain = () => {
    resetView();
};

const pickAiMove = (id, shouldWin) => {
    if (id === 1) {
        return shouldWin ? "paper" : "scissors";
    } else if (id === 2) {
        return shouldWin ? "scissors" : "rock";
    } else {
        return shouldWin ? "rock" : "paper";
    }
};
