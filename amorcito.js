let noCount = 0, yesScale = 1, noScale = 1;

const texts = [
  "¿Segura?",
  "¿Segurísima?",
  "Piénsalo bien amor...",
  "Última oportunidad Laura...",
  "No desperdicies la oportunidad amor"
];

function no() {
  if (noCount < texts.length) {
    document.getElementById("question").innerText = texts[noCount++];
  }

  yesScale += 0.27;
  noScale -= 0.27;

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  yesBtn.style.transform = `scale(${yesScale})`;
  noBtn.style.transform = `scale(${Math.max(noScale, 0.4)})`;

  noBtn.classList.add("shake");
  setTimeout(() => noBtn.classList.remove("shake"), 300);
}

function yes() { showPage(2); }

function next() {
  showPage(3);
  typeText("TU_MENSAJE_AQUI");
  launchFireworks();
}

function intermediate() { 
  showPage(4); 
}

function finalPage() { showPage(5); }

function showPage(num) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page' + num).classList.add('active');
}

function typeText(text) {
  let i = 0;
  const el = document.getElementById("typewriter");
  el.innerHTML = "";
  const interval = setInterval(() => {
    el.innerHTML += text.charAt(i++);
    if (i >= text.length) clearInterval(interval);
  }, 50);
}

/* FUEGOS ARTIFICIALES MEJORADOS */
function launchFireworks() {
  setInterval(() => {
    // Posición aleatoria
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight * 0.6);
    const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    
    // Crear explosión con múltiples partículas
    for (let i = 0; i < 30; i++) {
      const spark = document.createElement("div");
      spark.className = "spark";
      spark.style.left = x + "px";
      spark.style.top = y + "px";
      spark.style.background = color;
      
      const angle = (Math.PI * 2 * i) / 30;
      const velocity = 50 + Math.random() * 100;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      spark.style.animation = `explode 1s ease-out forwards`;
      spark.style.transform = `translate(${tx}px, ${ty}px)`;
      
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 1000);
    }
  }, 600);
}

let teaseStep = 0;
const teaseLines = [
  "Amorcito",
  "Amorcito<br>No creas que",
  "Amorcito<br>No creas que<br>eso fue todo!!!!"
];

function tease() {
  document.getElementById("teaseText").innerHTML = teaseLines[teaseStep++];
  
  // Cuando llegue al último paso
  if (teaseStep === teaseLines.length) {
    // Ocultar botón de emojis
    document.getElementById("emojiBtn").style.display = "none";
    
    // Mostrar botón final
    document.getElementById("secondBtn").style.display = "inline-block";
    
    // MOSTRAR EL GIF con clase para animación
    const gif = document.getElementById("surpriseGif");
    gif.classList.add("show");
  }
}