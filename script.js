// ============ CONFIG ============
const PASSCODE = "DORA"; // 👉 change this if you want a different code

// ============ PASSCODE KEYPAD (A-Z) ============
const keypad = document.getElementById('keypad');
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
letters.forEach(letter => {
  const btn = document.createElement('button');
  btn.textContent = letter;
  btn.addEventListener('click', () => typeLetter(letter));
  keypad.appendChild(btn);
});
const backBtn = document.createElement('button');
backBtn.textContent = "⌫";
backBtn.classList.add('wide');
backBtn.addEventListener('click', backspace);
keypad.appendChild(backBtn);

let typed = "";
const boxes = document.querySelectorAll('#codeBoxes .box');
const wrongMsg = document.getElementById('wrongMsg');
const passcodeWrap = document.querySelector('.passcode-wrap');

function renderBoxes(){
  boxes.forEach((box, i) => {
    box.textContent = typed[i] ? typed[i] : "";
  });
}

function typeLetter(letter){
  if (typed.length >= 4) return;
  typed += letter;
  renderBoxes();
  if (typed.length === 4){
    setTimeout(checkCode, 250);
  }
}

function backspace(){
  typed = typed.slice(0, -1);
  wrongMsg.classList.remove('show');
  renderBoxes();
}

function checkCode(){
  if (typed === PASSCODE){
    goToScreen('screen-bday');
  } else {
    wrongMsg.classList.add('show');
    passcodeWrap.classList.add('shake');
    setTimeout(() => {
      passcodeWrap.classList.remove('shake');
      typed = "";
      renderBoxes();
    }, 450);
  }
}

// hint bubble
const hintBtn = document.getElementById('hintBtn');
const hintBubble = document.getElementById('hintBubble');
hintBtn.addEventListener('click', () => {
  hintBubble.classList.toggle('show');
});

// ============ SCREEN NAVIGATION ============
function goToScreen(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  target.classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});

  // reset passcode screen when restarting
  if (id === 'screen-passcode'){
    typed = "";
    renderBoxes();
    wrongMsg.classList.remove('show');
  }
}

document.querySelectorAll('.next-btn').forEach(btn => {
  btn.addEventListener('click', () => goToScreen(btn.dataset.next));
});

// ============ SONG PLAYER ============
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const seek = document.getElementById('seek');
const curTime = document.getElementById('curTime');
const durTime = document.getElementById('durTime');

function formatTime(t){
  if (isNaN(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

playBtn.addEventListener('click', () => {
  if (audio.paused){
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

audio.addEventListener('loadedmetadata', () => {
  seek.max = audio.duration;
  durTime.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  seek.value = audio.currentTime;
  curTime.textContent = formatTime(audio.currentTime);
});

seek.addEventListener('input', () => {
  audio.currentTime = seek.value;
});

document.getElementById('prevBtn').addEventListener('click', () => {
  audio.currentTime = 0;
});
document.getElementById('nextBtn').addEventListener('click', () => {
  audio.currentTime = audio.duration || 0;
});
