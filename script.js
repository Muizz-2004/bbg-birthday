const pages = [...document.querySelectorAll(".page")];

const password = "dora";

let entered = "";


/* =====================================================
   PAGE SWITCHING
   ===================================================== */

function showPage(id) {

  pages.forEach(page => {
    page.classList.toggle("active", page.id === id);
  });

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

  entered = "";

  updateCode();
}


/* =====================================================
   PASSWORD DISPLAY
   ===================================================== */

function updateCode() {

  document
    .querySelectorAll("#codeDisplay span")
    .forEach((el, i) => {

      el.textContent =
        entered[i] ? "♥" : "";

    });
}


/* =====================================================
   KEYPAD
   ===================================================== */

document
  .querySelectorAll("#keypad button")
  .forEach(button => {

    button.addEventListener("click", () => {

      const key = button.dataset.key;


      if (key === "back") {

        entered = entered.slice(0, -1);

      }

      else if (
        key !== "♡" &&
        entered.length < 4
      ) {

        entered += key;

      }


      updateCode();

    });

  });


/* =====================================================
   CHECK PASSWORD
   ===================================================== */

function tryPassword() {

  if (
    entered.toLowerCase() === password
  ) {

    document.getElementById("error").textContent = "";

    showPage("birthday");

  }

  else {

    document.getElementById("error").textContent =
      "nope 😭 try the hint again, bbg";


    const box =
      document.getElementById("codeDisplay");


    box.animate(
      [
        {
          transform: "translateX(0)"
        },

        {
          transform: "translateX(-8px)"
        },

        {
          transform: "translateX(8px)"
        },

        {
          transform: "translateX(0)"
        }
      ],
      {
        duration: 260
      }
    );

  }

}


document
  .getElementById("enterBtn")
  .addEventListener(
    "click",
    tryPassword
  );


/* =====================================================
   KEYBOARD SUPPORT
   ===================================================== */

document.addEventListener("keydown", event => {

  const lock =
    document.getElementById("lock");


  if (!lock.classList.contains("active")) {
    return;
  }


  if (
    /^[a-zA-Z]$/.test(event.key) &&
    entered.length < 4
  ) {

    entered += event.key.toLowerCase();

    updateCode();

  }


  if (event.key === "Backspace") {

    entered =
      entered.slice(0, -1);

    updateCode();

  }


  if (event.key === "Enter") {

    tryPassword();

  }

});


/* =====================================================
   NEXT BUTTONS
   ===================================================== */

document
  .querySelectorAll("[data-next]")
  .forEach(button => {

    button.addEventListener("click", () => {

      showPage(button.dataset.next);

    });

  });


/* =====================================================
   HEART JAR
   ===================================================== */

document
  .querySelectorAll(".heart")
  .forEach((heart, i) => {

    heart.addEventListener("click", () => {

      const text =
        heart.querySelector("small");


      const original =
        text.textContent;


      const messages = [

        "you 🥹",

        "my favourite",

        "always",

        "bbg energy",

        "too cute",

        "forever ♡"

      ];


      text.textContent =
        messages[i];


      heart.animate(

        [
          {
            transform:
              "scale(.8) rotate(var(--rot))"
          },

          {
            transform:
              "scale(1.12) rotate(var(--rot))"
          },

          {
            transform:
              "scale(1) rotate(var(--rot))"
          }
        ],

        {
          duration: 350
        }

      );


      setTimeout(() => {

        text.textContent =
          original;

      }, 1600);

    });

  });


/* =====================================================
   SONG
   ===================================================== */

const song =
  document.getElementById("birthdaySong");


document
  .getElementById("playBtn")
  .addEventListener("click", () => {

    song
      .play()
      .catch(() => {});

  });


/* =====================================================
   INITIALIZE
   ===================================================== */

updateCode();
