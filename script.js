let enteredPasscode = "";
const correctPasscode = "dora"; // Configured password

function pressKey(val) {
  if (enteredPasscode.length < 4) {
    enteredPasscode += val;
    updateDots();
  }
}

function updateDots() {
  const dots = document.querySelectorAll('.passcode-dots .dot');
  dots.forEach((dot, index) => {
    if (index < enteredPasscode.length) {
      dot.classList.add('filled');
    } else {
      dot.classList.remove('filled');
    }
  });
}

function toggleHint() {
  const hint = document.getElementById('hint-text');
  hint.classList.toggle('hidden');
}

function checkPasscode() {
  if (enteredPasscode.toLowerCase() === correctPasscode) {
    document.getElementById('lock-screen').classList.remove('active');
    document.getElementById('main-screen').classList.add('active');
  } else {
    alert("Wrong passcode! Try again.");
    enteredPasscode = "";
    updateDots();
  }
}

function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}
