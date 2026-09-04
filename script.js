/* ================================================= */
/* PAGE SYSTEM */
/* ================================================= */

let currentPage = 1;

const pages = document.querySelectorAll(".page");

function showPage(number) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const target = document.querySelector(`#page${number}`);

    if (target) {
        target.classList.add("active");
    } else {
        const allPages = document.querySelectorAll(".page");

        if (allPages[number - 1]) {
            allPages[number - 1].classList.add("active");
        }
    }

    currentPage = number;
}

function nextPage() {

    if (currentPage < pages.length) {
        showPage(currentPage + 1);
    }

}


/* ================================================= */
/* PASSWORD */
/* ================================================= */

let enteredPassword = "";

const correctPassword = "dora";

const boxes = document.querySelectorAll(".code-boxes div");

document.querySelectorAll(".keypad button").forEach(button => {

    button.addEventListener("click", () => {

        const key = button.dataset.key;

        if (key === "clear") {

            enteredPassword = "";

        } else if (key === "back") {

            enteredPassword = enteredPassword.slice(0, -1);

        } else if (
            key !== "x" &&
            enteredPassword.length < 4
        ) {

            enteredPassword += key;

        }

        updateBoxes();

    });

});


function updateBoxes() {

    boxes.forEach((box, index) => {

        if (enteredPassword[index]) {
            box.textContent = "♥";
        } else {
            box.textContent = "";
        }

    });

}


function checkPassword() {

    const error = document.getElementById("wrong-password");

    if (enteredPassword === correctPassword) {

        error.textContent = "";

        showPage(2);

        enteredPassword = "";

        updateBoxes();

    } else {

        error.textContent = "wrong passcode baby 😭 try again";

        enteredPassword = "";

        updateBoxes();

    }

}


/* Keyboard support */

document.addEventListener("keydown", event => {

    const key = event.key.toLowerCase();

    if ("dora".includes(key) && enteredPassword.length < 4) {

        enteredPassword += key;
        updateBoxes();

    }

    if (event.key === "Backspace") {

        enteredPassword = enteredPassword.slice(0, -1);
        updateBoxes();

    }

});


/* ================================================= */
/* POPUPS */
/* ================================================= */

function openGift() {

    document
        .getElementById("giftPopup")
        .classList.add("show");

}

function openCamera() {

    document
        .getElementById("cameraPopup")
        .classList.add("show");

}

function closePopups() {

    document
        .querySelectorAll(".popup")
        .forEach(popup => {
            popup.classList.remove("show");
        });

}


/* ================================================= */
/* JAR HEARTS */
/* ================================================= */

document.querySelectorAll(".jar-heart").forEach(heart => {

    heart.addEventListener("click", () => {

        heart.style.transform =
            "scale(1.3) rotate(-8deg)";

        setTimeout(() => {

            heart.style.transform = "";

        }, 450);

    });

});


/* ================================================= */
/* MUSIC PLAYER */
/* ================================================= */

const song = document.getElementById("song");
const playButton = document.querySelector(".play-button");
const progress = document.getElementById("progress");

function toggleSong() {

    if (song.paused) {

        song.play();

        playButton.textContent = "Ⅱ";

    } else {

        song.pause();

        playButton.textContent = "▶";

    }

}


song.addEventListener("timeupdate", () => {

    if (!song.duration) return;

    progress.value =
        (song.currentTime / song.duration) * 100;

});


progress.addEventListener("input", () => {

    if (!song.duration) return;

    song.currentTime =
        (progress.value / 100) * song.duration;

});


song.addEventListener("ended", () => {

    playButton.textContent = "▶";

    progress.value = 0;

});
