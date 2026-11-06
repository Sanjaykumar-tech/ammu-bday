/* ==========================================================
   AMMU'S LAVENDER DREAM BIRTHDAY WEBSITE
   ========================================================== */

const config = {
  // Correct Future Date (Nov 7, 2026)
  birthdayDate: "2026-11-07T00:00:00+05:30", 
  secretPin: "0711"
};

let birthdayCelebrated = false;

/* ============ 1. MAGIC CURSOR ============ */
const cursorSparkles = document.getElementById("cursorSparkles");
let lastSparkle = 0;
document.addEventListener("mousemove", (e) => {
  if (!cursorSparkles) return;
  const now = Date.now();
  if (now - lastSparkle < 50) return; 
  lastSparkle = now;
  const sparkle = document.createElement("div");
  sparkle.className = "cursor-sparkle";
  sparkle.style.left = e.clientX + "px";
  sparkle.style.top = e.clientY + "px";
  cursorSparkles.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
});

/* ============ 2. NAVIGATION & ROMANTIC MUSIC ============ */
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
const volumeSlider = document.getElementById("volumeSlider");

if (musicToggle && bgMusic) {
  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play().catch((err) => {
        console.log("Audio play blocked or file missing:", err);
        alert("Add your music file to assets/romantic-music.mp3");
      });
      if(musicIcon) musicIcon.textContent = "⏸";
      musicToggle.classList.add("playing");
    } else {
      bgMusic.pause();
      if(musicIcon) musicIcon.textContent = "🎵";
      musicToggle.classList.remove("playing");
    }
  });
}

if (volumeSlider && bgMusic) {
  volumeSlider.addEventListener("input", (e) => { bgMusic.volume = parseFloat(e.target.value); });
  bgMusic.volume = 0.5;
}

/* ============ 3. BIRTHDAY CELEBRATION MODE ============ */
function triggerBirthdayMode() {
  if (birthdayCelebrated) return;
  birthdayCelebrated = true;
  
  // Play Romantic Music
  if(bgMusic) {
    bgMusic.src = "assets/romantic-music.mp3"; 
    bgMusic.volume = 0.8;
    bgMusic.play().catch(e => console.log("Audio blocked by browser", e));
  }

  const celebrationOverlay = document.createElement("div");
  celebrationOverlay.id = "celebrationOverlay";
  
  celebrationOverlay.style.cssText = `
    position: fixed !important; 
    top: 0 !important; left: 0 !important; 
    width: 100vw !important; height: 100vh !important;
    background-color: #0b0314 !important;
    background-image: radial-gradient(circle at 50% 50%, #2d0a3d 0%, #0b0314 100%) !important;
    z-index: 2147483647 !important; 
    display: flex !important; 
    flex-direction: column !important; 
    align-items: center !important; 
    justify-content: center !important; 
    text-align: center !important;
    overflow: hidden !important;
    margin: 0 !important;
    padding: 0 !important;
    transition: opacity 1s ease-out !important;
  `;

  celebrationOverlay.innerHTML = `
    <h1 style="font-family: 'Dancing Script', cursive !important; font-size: 6rem !important; color: #FFD700 !important; text-shadow: 0 0 30px #FFD700, 0 0 60px #FF4081 !important; margin-bottom: 20px !important; animation: zoomInOut 2s infinite alternate !important; z-index: 10 !important; position: relative !important;">Happy Birthday Ammu! 🎂</h1>
    <p style="font-family: 'Playfair Display', serif !important; font-size: 2rem !important; color: #ffffff !important; margin-bottom: 40px !important; z-index: 10 !important; position: relative !important;">The most beautiful day in the world is here! ❤️</p>
    
    <button onclick="exitCelebrationMode()" style="padding: 15px 40px !important; font-size: 1.2rem !important; background: linear-gradient(135deg, #FF4081, #FFD700) !important; border: none !important; border-radius: 30px !important; color: white !important; font-weight: bold !important; cursor: pointer !important; box-shadow: 0 0 20px #FF4081 !important; z-index: 10 !important; position: relative !important;">
      Enter My World ✨
    </button>
    
    <div id="fireworksContainer" style="position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; pointer-events: none !important; z-index: 1 !important;"></div>
  `;

  document.documentElement.appendChild(celebrationOverlay);
  startBirthdayFireworks();

  setTimeout(() => {
    exitCelebrationMode();
  }, 60000); 
}

function exitCelebrationMode() {
  const overlay = document.getElementById("celebrationOverlay");
  if (overlay) {
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.remove();
      const fireworksContainer = document.getElementById("fireworksContainer");
      if (fireworksContainer) fireworksContainer.innerHTML = ""; 
    }, 1000);
  }
}

function startBirthdayFireworks() {
  const container = document.getElementById("fireworksContainer");
  if(!container) return;
  
  let duration = 60000; 
  let endTime = Date.now() + duration;

  function createParticle() {
    if (Date.now() > endTime) return;

    const particle = document.createElement("div");
    const colors = ["#FF4081", "#FFD700", "#00E5FF", "#FFF", "#8B5CF6", "#FF5722"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 5;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      background: ${color};
      border-radius: 50%;
      left: 50%; top: 50%;
      box-shadow: 0 0 10px ${color}, 0 0 20px ${color};
      transition: transform 2s ease-out, opacity 2s ease-out;
    `;

    container.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 400 + 100;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${x}px, ${y}px) scale(0)`;
      particle.style.opacity = "0";
    });

    setTimeout(() => particle.remove(), 2000);
    setTimeout(createParticle, Math.random() * 50);
  }

  for(let i=0; i<50; i++) createParticle();
  setTimeout(createParticle, 500); 
}

function updateCountdown() {
  const targetDate = new Date(config.birthdayDate).getTime();
  const now = new Date().getTime();
  const diff = targetDate - now;
  
  if (diff <= 0) { 
    triggerBirthdayMode();
    const countdownGrid = document.getElementById("countdownGrid");
    if (countdownGrid) {
      countdownGrid.innerHTML = `<h2 style="color:var(--deep-purple); font-family:var(--font-script); font-size: 3rem;">Happy Birthday Ammu! 🎂</h2>`; 
    }
    return; 
  }
  
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);
  
  if(daysEl) daysEl.textContent = String(d).padStart(2, "0"); 
  if(hoursEl) hoursEl.textContent = String(h).padStart(2, "0"); 
  if(minutesEl) minutesEl.textContent = String(m).padStart(2, "0"); 
  if(secondsEl) secondsEl.textContent = String(s).padStart(2, "0");
}
setInterval(updateCountdown, 1000); 
updateCountdown();

/* ============ 4. GALLERY SCROLL ============ */
const galleryScroll = document.getElementById("galleryScroll");
function scrollGallery(dir) {
  if (!galleryScroll) return;
  const scrollAmount = 320; 
  galleryScroll.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
}

/* ============ 5. LIGHTBOX ============ */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
function openLightbox(src) { 
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src; 
  lightbox.classList.remove("hidden"); 
}

/* ============ 6. AUDIO SYNTHESIZER ============ */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;
    if (type === 'click') { osc.type = 'sine'; osc.frequency.setValueAtTime(400, now); gain.gain.setValueAtTime(0.3, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1); osc.start(now); osc.stop(now + 0.1); }
    else if (type === 'success') { osc.type = 'triangle'; osc.frequency.setValueAtTime(523.25, now); osc.frequency.setValueAtTime(659.25, now + 0.1); osc.frequency.setValueAtTime(783.99, now + 0.2); gain.gain.setValueAtTime(0.3, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4); osc.start(now); osc.stop(now + 0.4); }
    else if (type === 'fail') { osc.type = 'sawtooth'; osc.frequency.setValueAtTime(200, now); osc.frequency.exponentialRampToValueAtTime(100, now + 0.3); gain.gain.setValueAtTime(0.2, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3); osc.start(now); osc.stop(now + 0.3); }
    else if (type === 'pop') { osc.type = 'sine'; osc.frequency.setValueAtTime(800, now); osc.frequency.exponentialRampToValueAtTime(300, now + 0.1); gain.gain.setValueAtTime(0.5, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1); osc.start(now); osc.stop(now + 0.1); }
    else if (type === 'spin') { osc.type = 'square'; osc.frequency.setValueAtTime(600, now); gain.gain.setValueAtTime(0.1, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05); osc.start(now); osc.stop(now + 0.05); }
    else if (type === 'heart') { osc.type = 'sine'; osc.frequency.setValueAtTime(60, now); osc.frequency.exponentialRampToValueAtTime(30, now + 0.2); gain.gain.setValueAtTime(0.5, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2); osc.start(now); osc.stop(now + 0.2); }
    else if (type === 'magic') { osc.type = 'triangle'; osc.frequency.setValueAtTime(400, now); osc.frequency.exponentialRampToValueAtTime(800, now + 0.3); gain.gain.setValueAtTime(0.3, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3); osc.start(now); osc.stop(now + 0.3); }
    else if (type === 'letter') { osc.type = 'sawtooth'; osc.frequency.setValueAtTime(100, now); osc.frequency.linearRampToValueAtTime(200, now + 0.1); gain.gain.setValueAtTime(0.2, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.1); osc.start(now); osc.stop(now + 0.1); }
    else if (type === 'blow') { osc.type = 'lowpass'; osc.frequency.setValueAtTime(400, now); osc.frequency.exponentialRampToValueAtTime(100, now + 0.5); gain.gain.setValueAtTime(0.4, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.5); osc.start(now); osc.stop(now + 0.5); }
  } catch (e) { console.log("Audio error", e); }
}

/* ============ 7. CAKE GAME ============ */
const cakeModal = document.getElementById("cakeModal");
const phase1 = document.getElementById("cakePhase1");
const phase2 = document.getElementById("cakePhase2");
const phase3 = document.getElementById("cakePhase3");
const cakeCountdownDisplay = document.getElementById("cakeCountdownDisplay");
const theCake = document.getElementById("theCake");
let cakeInner = null;
if(theCake) cakeInner = theCake.querySelector(".cake");

const micBtn = document.getElementById("micBtn");
const micStatus = document.getElementById("micStatus");
const knife = document.getElementById("knife");
const cakePhase2Title = document.getElementById("cakePhase2Title");
const cakePhase2Text = document.getElementById("cakePhase2Text");

let cakeCountdownInterval, micStream = null, audioContextMic = null, analyser = null, isListening = false, isCakeBlown = false;

function openCakeModal() {
  playSound('click'); 
  if(!cakeModal) return;
  cakeModal.classList.remove("hidden"); 
  phase1.classList.add("active"); 
  phase2.classList.remove("active"); 
  phase3.classList.remove("active");
  
  isCakeBlown = false; 
  if(theCake) theCake.classList.remove("cut-animation"); 
  if(cakeInner) cakeInner.classList.remove("blown-out"); 
  if(knife) knife.classList.add("hidden");
  
  if(micStatus) micStatus.textContent = "Mic is off"; 
  if(micBtn) { micBtn.textContent = "🎤 Tap to Blow"; micBtn.classList.remove("hidden"); }
  if(cakePhase2Title) cakePhase2Title.textContent = "Blow the Candles! 💨"; 
  if(cakePhase2Text) cakePhase2Text.textContent = "Make a wish and blow into your mic";
  if(knife) knife.style.transform = "rotate(-45deg) translate(0px, 0px)";

  let count = 3; 
  if(cakeCountdownDisplay) cakeCountdownDisplay.textContent = count; 
  playSound('pop'); 
  clearInterval(cakeCountdownInterval);
  
  cakeCountdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      if(cakeCountdownDisplay) cakeCountdownDisplay.textContent = count; 
      playSound('pop'); 
    } else if (count === 0) {
      if(cakeCountdownDisplay) cakeCountdownDisplay.textContent = "Blow! 💨"; 
      playSound('pop'); 
    } else { 
      clearInterval(cakeCountdownInterval); 
      phase1.classList.remove("active"); 
      phase2.classList.add("active"); 
      playSound('magic'); 
    }
  }, 1000);
}

function closeCakeModal() { 
  playSound('click'); 
  if(cakeModal) cakeModal.classList.add("hidden"); 
  clearInterval(cakeCountdownInterval); 
  stopMic(); 
}

if (micBtn) {
  micBtn.addEventListener("click", async () => {
    if (isListening) { stopMic(); return; }
    try {
      if(micStatus) micStatus.textContent = "Requesting mic..."; 
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextMic = new (window.AudioContext || window.webkitAudioContext)(); 
      analyser = audioContextMic.createAnalyser(); 
      analyser.fftSize = 256;
      const source = audioContextMic.createMediaStreamSource(micStream); 
      source.connect(analyser);
      isListening = true; 
      micBtn.textContent = "🔴 Listening... Blow!"; 
      if(micStatus) micStatus.textContent = "Mic is ON. Blow!";
      detectBlow();
    } catch (err) { if(micStatus) micStatus.textContent = "Mic access denied."; }
  });
}

function detectBlow() {
  if (!isListening || !analyser) return;
  const bufferLength = analyser.frequencyBinCount, dataArray = new Uint8Array(bufferLength); 
  analyser.getByteFrequencyData(dataArray);
  let sum = 0; 
  for (let i = 0; i < bufferLength; i++) { sum += dataArray[i]; }
  if ((sum / bufferLength) > 70) { blowCandles(); return; }
  requestAnimationFrame(detectBlow);
}

function stopMic() {
  isListening = false;
  if (micStream) { micStream.getTracks().forEach(track => track.stop()); micStream = null; }
  if (audioContextMic && audioContextMic.state !== 'closed') { audioContextMic.close(); }
  if(micStatus) micStatus.textContent = "Mic is off"; 
  if(micBtn) micBtn.textContent = "🎤 Tap to Blow";
}

function blowCandles() {
  stopMic(); 
  isCakeBlown = true; 
  playSound('blow'); 
  if(cakeInner) cakeInner.classList.add("blown-out");
  if(micBtn) micBtn.classList.add("hidden"); 
  if(cakePhase2Title) cakePhase2Title.textContent = "Now, Cut the Cake! 🔪"; 
  if(cakePhase2Text) cakePhase2Text.textContent = "Drag the knife down";
  setTimeout(() => { if(knife) knife.classList.remove("hidden"); playSound('magic'); }, 800);
}

let isDragging = false, startX, startY;
if(knife) {
  knife.addEventListener("mousedown", startDrag); 
  knife.addEventListener("touchstart", startDrag, {passive: false});
}
function startDrag(e) { 
  if (!isCakeBlown) return; 
  isDragging = true; 
  if (e.type === "touchstart") { startX = e.touches[0].clientX; startY = e.touches[0].clientY; e.preventDefault(); } 
  else { startX = e.clientX; startY = e.clientY; } 
}

document.addEventListener("mousemove", drag); 
document.addEventListener("touchmove", drag, {passive: false});

function drag(e) { 
  if (!isDragging) return; 
  let clientX, clientY; 
  if (e.type === "touchmove") { clientX = e.touches[0].clientX; clientY = e.touches[0].clientY; e.preventDefault(); } 
  else { clientX = e.clientX; clientY = e.clientY; } 
  const dx = clientX - startX, dy = clientY - startY; 
  if(knife) knife.style.transform = `rotate(-45deg) translate(${dx}px, ${dy}px)`; 
  if (dy > 80) { cutCake(); } 
}

document.addEventListener("mouseup", endDrag); 
document.addEventListener("touchend", endDrag);
function endDrag() { isDragging = false; }

function cutCake() {
  if (!theCake || theCake.classList.contains("cut-animation")) return; 
  isDragging = false; 
  if(knife) knife.classList.add("hidden"); 
  theCake.classList.add("cut-animation"); 
  playSound('success');
  for(let i=0; i<30; i++) { 
    let conf = document.createElement("div"); 
    conf.textContent = "✨"; 
    conf.style.position = "absolute"; 
    conf.style.left = "50%"; 
    conf.style.top = "50%"; 
    conf.style.fontSize = "20px"; 
    conf.style.zIndex = "100"; 
    conf.style.transition = "all 1s ease-out"; 
    document.querySelector('.cake-stage').appendChild(conf); 
    setTimeout(() => { conf.style.transform = `translate(${Math.random()*200 - 100}px, ${Math.random()*200 - 100}px) scale(0)`; conf.style.opacity = "0"; }, 50); 
    setTimeout(() => conf.remove(), 1000); 
  }
  setTimeout(() => { phase2.classList.remove("active"); phase3.classList.add("active"); }, 1500);
}

/* ============ 8. GAMES MODAL ============ */
const gameModal = document.getElementById("gameModal"), gameTitle = document.getElementById("gameTitle"), gameContent = document.getElementById("gameContent"); let gameIntervals = []; 
function openGame(gameType) {
  playSound('click'); 
  if(!gameModal) return;
  gameModal.classList.remove("hidden"); 
  if(gameContent) gameContent.innerHTML = ""; 
  gameIntervals.forEach(clearInterval); 
  gameIntervals = [];
  switch (gameType) { case 'pin': setupPinGame(); break; case 'memory': setupMemoryGame(); break; case 'scratch': setupScratchGame(); break; case 'wheel': setupWheelGame(); break; case 'puzzle': setupPuzzleGame(); break; case 'catch': setupCatchGame(); break; case 'hunt': setupHuntGame(); break; case 'timeline': setupTimelineGame(); break; }
}
function closeGame() { playSound('click'); if(gameModal) gameModal.classList.add("hidden"); gameIntervals.forEach(clearInterval); gameIntervals = []; }

function setupPinGame() {
  if(!gameTitle || !gameContent) return;
  gameTitle.textContent = "Love Letter PIN Unlock 💌"; let currentPin = "";
  gameContent.innerHTML = `<p>Hint: Your Birthday Date (DDMM)</p><div class="pin-display" id="pinDisplay">____</div><div class="pin-pad">${[1,2,3,4,5,6,7,8,9,'C',0,'✓'].map(k => `<button class="pin-key" onclick="handlePin('${k}')">${k}</button>`).join('')}</div><p id="pinMsg" style="margin-top:15px; color:red; font-weight:bold;"></p>`;
  window.handlePin = (val) => {
    playSound('click');
    if (val === 'C') currentPin = "";
    else if (val === '✓') {
      if (currentPin === config.secretPin) { playSound('success'); document.getElementById("pinMsg").style.color = "green"; document.getElementById("pinMsg").innerHTML = "Unlocked! ❤️ <br><br><a href='#' onclick='openLetter()' style='color:var(--primary-purple); font-weight:bold; text-decoration:underline;'>Tap here to read the letter</a>"; }
      else { playSound('fail'); document.getElementById("pinMsg").style.color = "red"; document.getElementById("pinMsg").textContent = "Wrong PIN! Try 0711 ❤️"; currentPin = ""; }
    } else if (currentPin.length < 4) currentPin += val;
    document.getElementById("pinDisplay").textContent = currentPin.padEnd(4, "_");
  };
}

function setupMemoryGame() {
  if(!gameTitle || !gameContent) return;
  gameTitle.textContent = "Memory Match 🃏"; gameContent.innerHTML = `<p>Match the pairs to win!</p><div class="memory-grid" id="memGrid"></div><p id="memWin" style="margin-top:15px; font-weight:bold; color:green; display:none;">You matched them all! ❤️</p>`;
  const grid = document.getElementById("memGrid"), emojis = ["💖", "🌹", "🎂", "💌", "💖", "🌹", "🎂", "💌"]; emojis.sort(() => Math.random() - 0.5);
  let flippedCards = [], matchedPairs = 0;
  emojis.forEach((emoji, index) => {
    const card = document.createElement("div"); card.className = "memory-card"; card.dataset.value = emoji; card.dataset.index = index; card.innerHTML = ""; 
    card.onclick = () => {
      if (card.classList.contains("flipped") || card.classList.contains("matched") || flippedCards.length === 2) return;
      playSound('pop'); card.classList.add("flipped"); card.innerHTML = emoji; flippedCards.push(card);
      if (flippedCards.length === 2) {
        if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) { playSound('success'); flippedCards[0].classList.add("matched"); flippedCards[1].classList.add("matched"); matchedPairs++; flippedCards = []; if (matchedPairs === 4) document.getElementById("memWin").style.display = "block"; }
        else { setTimeout(() => { flippedCards[0].classList.remove("flipped"); flippedCards[0].innerHTML = ""; flippedCards[1].classList.remove("flipped"); flippedCards[1].innerHTML = ""; flippedCards = []; }, 800); }
      }
    };
    grid.appendChild(card);
  });
}

function setupScratchGame() {
  if(!gameTitle || !gameContent) return;
  gameTitle.textContent = "Scratch Card 🎟️"; gameContent.innerHTML = `<div style="position:relative; width:300px; height:150px; margin:0 auto; background:#C4A7F7; border-radius:15px; overflow:hidden;"><p style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); font-weight:bold; color:white; z-index:1;">I love you! ❤️</p><canvas id="scratchCanvas" width="300" height="150" style="position:absolute; top:0; left:0; z-index:2; touch-action: none;"></canvas></div>`;
  const canvas = document.getElementById('scratchCanvas'), ctx = canvas.getContext('2d');
  ctx.fillStyle = '#8B5CF6'; ctx.fillRect(0, 0, 300, 150); ctx.fillStyle = '#fff'; ctx.font = '20px Inter'; ctx.fillText("Scratch me ❤️", 90, 80); ctx.globalCompositeOperation = 'destination-out';
  let isDrawing = false, scratchSoundCounter = 0;
  const scratch = (e) => { if (!isDrawing) return; scratchSoundCounter++; if (scratchSoundCounter % 10 === 0) playSound('pop'); const rect = canvas.getBoundingClientRect(), x = (e.clientX || e.touches[0].clientX) - rect.left, y = (e.clientY || e.touches[0].clientY) - rect.top; ctx.beginPath(); ctx.arc(x, y, 20, 0, Math.PI * 2); ctx.fill(); };
  canvas.addEventListener('mousedown', () => isDrawing = true); canvas.addEventListener('mouseup', () => isDrawing = false); canvas.addEventListener('mousemove', scratch); canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }); canvas.addEventListener('touchend', () => isDrawing = false); canvas.addEventListener('touchmove', (e) => { e.preventDefault(); scratch(e); });
}

function setupWheelGame() {
  if(!gameTitle || !gameContent) return;
  gameTitle.textContent = "Spin the Wheel 🎡"; gameContent.innerHTML = `<div style="width:250px; height:250px; border-radius:50%; background:conic-gradient(#8B5CF6 0deg 60deg, #C4A7F7 60deg 120deg, #D8C6FF 120deg 180deg, #5B21B6 180deg 240deg, #E9D5FF 240deg 300deg, #8B5CF6 300deg 360deg); margin:20px auto; position:relative; transition:transform 3s cubic-bezier(0.2,0.8,0.2,1);" id="wheel"><div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); background:white; padding:10px; border-radius:50%; font-weight:bold; z-index:2;">SPIN</div></div><button class="btn-primary" onclick="spinWheel()">Click to Spin!</button><h3 id="wheelResult" style="margin-top:15px; color:var(--primary-purple);"></h3>`;
  window.spinWheel = () => {
    playSound('spin'); const wheel = document.getElementById("wheel"); const randomDeg = Math.floor(Math.random() * 360) + 720; wheel.style.transform = `rotate(${randomDeg}deg)`; document.getElementById("wheelResult").textContent = "Spinning...";
    let ticks = 0; const tickInterval = setInterval(() => { playSound('spin'); ticks++; if (ticks > 15) clearInterval(tickInterval); }, 150);
    setTimeout(() => { playSound('success'); if (!document.getElementById("wheelResult")) return; const rewards = ["A Warm Hug 🤗", "100 Kisses 😘", "Movie Date 🎬", "Forever Love ❤️"]; document.getElementById("wheelResult").textContent = "You won: " + rewards[Math.floor(Math.random() * rewards.length)]; }, 3000);
  };
}

function setupPuzzleGame() {
  if(!gameTitle || !gameContent) return;
  gameTitle.textContent = "Photo Puzzle 🧩"; gameContent.innerHTML = `<p>Click two pieces to swap them and solve the photo!</p><div class="puzzle-grid" id="pGrid"></div>`;
  const grid = document.getElementById("pGrid"); let positions = [0,1,2,3,4,5,6,7,8].sort(() => Math.random() - 0.5);
  positions.forEach((pos, i) => {
    const piece = document.createElement("div"); piece.className = "puzzle-piece"; const row = Math.floor(pos / 3), col = pos % 3; piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`; piece.dataset.correct = pos;
    piece.onclick = () => { playSound('click'); if (!window.p1) { window.p1 = piece; piece.style.opacity = "0.5"; } else { const tempBg = piece.style.backgroundPosition, tempCorrect = piece.dataset.correct; piece.style.backgroundPosition = window.p1.style.backgroundPosition; piece.dataset.correct = window.p1.dataset.correct; window.p1.style.backgroundPosition = tempBg; window.p1.dataset.correct = tempCorrect; window.p1.style.opacity = "1"; window.p1 = null; } };
    grid.appendChild(piece);
  });
}

function setupCatchGame() {
  if(!gameTitle || !gameContent) return;
  gameTitle.textContent = "Catch My Hearts 💖"; gameContent.innerHTML = `<div class="catch-area" id="cArea"><h3 id="cScore" style="position:absolute; top:10px; left:10px;">Score: 0</h3><h3 id="cTimer" style="position:absolute; top:10px; right:10px; color:var(--deep-purple);">Time: 15s</h3></div>`;
  const area = document.getElementById("cArea"); let score = 0; let timeLeft = 15;
  const timerInterval = setInterval(() => { if (!document.getElementById("cTimer")) { clearInterval(timerInterval); return; } timeLeft--; document.getElementById("cTimer").textContent = "Time: " + timeLeft + "s"; if (timeLeft <= 0) { clearInterval(timerInterval); clearInterval(spawnInterval); playSound('success'); showPopup("Time's Up! ⏰", "You caught " + score + " hearts! That's how much I love you. ❤️", "💖"); } }, 1000);
  gameIntervals.push(timerInterval);
  const spawnInterval = setInterval(() => { if (!document.getElementById("cArea") || timeLeft <= 0) { clearInterval(spawnInterval); return; } const heart = document.createElement("div"); heart.className = "falling-heart"; heart.textContent = "❤️"; heart.style.left = Math.random() * 90 + "%"; heart.style.top = "-30px"; area.appendChild(heart); let top = -30; const fall = setInterval(() => { top += 5; heart.style.top = top + "px"; if (top > 350) { clearInterval(fall); heart.remove(); } }, 30); heart.onclick = () => { playSound('pop'); score++; document.getElementById("cScore").textContent = "Score: " + score; heart.remove(); }; }, 600);
  gameIntervals.push(spawnInterval);
}

function setupHuntGame() {
  if(!gameTitle || !gameContent) return;
  gameTitle.textContent = "Hidden Rose Hunt 🌹"; gameContent.innerHTML = `<p>Find the 5 hidden roses!</p><div style="height:300px; background:#E9D5FF; position:relative; border-radius:15px;" id="hArea"></div>`;
  const area = document.getElementById("hArea"); let found = 0;
  for (let i = 0; i < 5; i++) { const rose = document.createElement("div"); rose.textContent = "🌹"; rose.style.position = "absolute"; rose.style.left = Math.random() * 80 + 10 + "%"; rose.style.top = Math.random() * 80 + 10 + "%"; rose.style.cursor = "pointer"; rose.style.fontSize = "24px"; rose.style.opacity = "0.3"; rose.onclick = () => { if (rose.style.opacity === "1") return; playSound('pop'); rose.style.opacity = "1"; found++; if (found === 5) { playSound('success'); setTimeout(() => showPopup("You found them all! 🌹", "You found all 5 roses! Just like you found my heart. ❤️", "🌹"), 300); } }; area.appendChild(rose); }
}

function setupTimelineGame() {
  if(!gameTitle || !gameContent) return;
  gameTitle.textContent = "Our Love Timeline ⏳"; gameContent.innerHTML = `<div style="text-align:left; padding:20px; border-left:3px solid var(--primary-purple); margin-left:10px;"><h3 style="color:var(--primary-purple);">First Meet</h3><p>The day my world changed. ❤️</p><br><h3 style="color:var(--primary-purple);">First Kiss</h3><p>The most magical moment of my life. 💋</p><br><h3 style="color:var(--primary-purple);">Today</h3><p>Still falling for you more every day. ✨</p></div>`;
}

/* ============ 9. POPUPS & SURPRISES ============ */
const customPopup = document.getElementById("customPopup");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const popupIcon = document.getElementById("popupIcon");

function showPopup(title, message, icon = "💖") { 
  if(!customPopup) return;
  if(popupTitle) popupTitle.textContent = title; 
  if(popupMessage) popupMessage.textContent = message; 
  if(popupIcon) popupIcon.textContent = icon; 
  customPopup.classList.remove("hidden"); 
}
function closePopup() { playSound('click'); if(customPopup) customPopup.classList.add("hidden"); }

let heartClicks = 0;
const heartIcon = document.getElementById("heartIcon");
const secretHeartBtn = document.getElementById("secretHeartBtn");
if(secretHeartBtn) {
  secretHeartBtn.addEventListener("click", () => {
    heartClicks++; playSound('heart'); 
    if(heartIcon) { heartIcon.classList.remove("pulsing"); void heartIcon.offsetWidth; heartIcon.classList.add("pulsing"); }
    if (heartClicks === 7) { setTimeout(() => { playSound('success'); showPopup("Secret Unlocked! 🤫", "You found the secret! I love you more than anything, Ammu. ❤️", "💖"); heartClicks = 0; }, 500); }
  });
}

const magicIcon = document.getElementById("magicIcon");
const magicBtn = document.getElementById("magicBtn");
if(magicBtn) {
  magicBtn.addEventListener("click", () => {
    playSound('magic'); 
    if(magicIcon) { magicIcon.classList.remove("spinning"); void magicIcon.offsetWidth; magicIcon.classList.add("spinning"); }
    setTimeout(() => { showPopup("Magic! 🪄", "You are the most beautiful person in the world. ✨", "✨"); }, 600);
  });
}

const msgIcon = document.getElementById("msgIcon");
const hiddenMsgBtn = document.getElementById("hiddenMsgBtn");
if(hiddenMsgBtn) {
  hiddenMsgBtn.addEventListener("click", () => {
    playSound('letter'); 
    if(msgIcon) { msgIcon.classList.remove("flying"); void msgIcon.offsetWidth; msgIcon.classList.add("flying"); }
    setTimeout(() => { showPopup("A Message For You 💌", "You are my sunshine on a cloudy day. ☀️❤️", "✉️"); }, 600);
  });
}

/* ============ 10. LETTER ============ */
const letterModal = document.getElementById("letterModal");
function openLetter() { playSound('click'); if (typeof closeGame === 'function') closeGame(); if(letterModal) letterModal.classList.remove("hidden"); }

/* ============ 11. CLOSE MODAL ============ */
function closeModal(event) {
  if (event.target.classList.contains('modal') || event.target.classList.contains('close-btn')) {
    playSound('click'); document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    if (typeof closeGame === 'function') closeGame(); if (typeof closeCakeModal === 'function') closeCakeModal();
  }
}