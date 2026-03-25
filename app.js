function crearEstrellas() {
  const container = document.getElementById('stars');
  if (!container) return;
  for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      --dur: ${(Math.random() * 3 + 2).toFixed(1)}s;
      animation-delay: ${(Math.random() * 5).toFixed(1)}s;
    `;
    container.appendChild(star);
  }
}
crearEstrellas();

const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMenu() {
  mobileMenu.classList.remove('open');
}

let cardActiva = null;

function showInfo(id) {
  const info = document.getElementById(id);
  if (!info) return;

  if (cardActiva && cardActiva !== info) {
    cardActiva.classList.remove('visible');
  }

  info.classList.toggle('visible');
  cardActiva = info.classList.contains('visible') ? info : null;
}

const datos = [
  "🌌 El universo tiene aproximadamente 13,800 millones de años de antigüedad.",
  "🧬 El ADN humano, si se estirara, mediría aproximadamente 2 metros de largo.",
  "⚡ Un rayo contiene suficiente energía para tostar 100,000 rebanadas de pan.",
  "🌊 El 97% del agua en la Tierra es agua salada de los océanos.",
  "🪐 Saturno es tan poco denso que flotaría en agua si hubiera un océano suficientemente grande.",
  "🔬 El cuerpo humano contiene aproximadamente 37 billones de células.",
  "🌡️ El Sol alcanza temperaturas de 15 millones de grados en su núcleo.",
  "🐙 Los pulpos tienen tres corazones y sangre azul.",
  "⚛️ Un átomo es tan pequeño que en un grano de arena hay más átomos que granos de arena en una playa.",
  "🦠 Hay más bacterias en tu boca que personas en el planeta Tierra.",
  "🧠 El cerebro humano tiene más conexiones sinápticas que estrellas en la Vía Láctea.",
  "🌍 La Tierra viaja alrededor del Sol a 107,000 km/h.",
  "🐬 Los delfines duermen con un ojo abierto para seguir respirando.",
  "🔭 La luz del Sol tarda 8 minutos en llegar a la Tierra.",
  "🌀 Un huracán puede liberar tanta energía como 10 bombas atómicas por segundo.",
  "🔥El fuego quema, tencuidado.",
];

let ultimoDato = -1;

function nuevoDato() {
  const datoTexto = document.getElementById('datoTexto');
  let idx;
  do { idx = Math.floor(Math.random() * datos.length); } while (idx === ultimoDato);
  ultimoDato = idx;
  datoTexto.style.opacity = '0';
  setTimeout(() => {
    datoTexto.textContent = datos[idx];
    datoTexto.style.opacity = '1';
    datoTexto.style.transition = 'opacity 0.4s ease';
  }, 200);
}

const preguntas = [
  {
    pregunta: "¿Cuál es la unidad de medida de la frecuencia?",
    opciones: ["Voltio", "Hertz", "Newton", "Pascal"],
    correcta: 1
  },
  {
    pregunta: "¿Qué planeta es conocido como el Planeta Rojo?",
    opciones: ["Venus", "Júpiter", "Marte", "Saturno"],
    correcta: 2
  },
  {
    pregunta: "¿Cuál es el elemento más abundante en el universo?",
    opciones: ["Oxígeno", "Helio", "Hidrógeno", "Carbono"],
    correcta: 2
  },
  {
    pregunta: "¿A qué velocidad viaja la luz?",
    opciones: ["150,000 km/s", "300,000 km/s", "500,000 km/s", "200,000 km/s"],
    correcta: 1
  },
  {
    pregunta: "¿Cuántos cromosomas tiene una célula humana normal?",
    opciones: ["23", "36", "46", "64"],
    correcta: 2
  },
  {
    pregunta: "¿Qué gas produce el efecto invernadero principalmente?",
    opciones: ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Argón"],
    correcta: 2
  },
  {
    pregunta: "¿Cuál es el hueso más largo del cuerpo humano?",
    opciones: ["Radio", "Tibia", "Húmero", "Fémur"],
    correcta: 3
  },
  {
    pregunta: "¿Qué científico formuló la teoría de la relatividad?",
    opciones: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Stephen Hawking"],
    correcta: 2
  },
];

let quizIndex = 0;
let score = 0;
let totalRespondidas = 0;
let respondida = false;

function iniciarQuiz() {
  quizIndex = 0;
  score = 0;
  totalRespondidas = 0;
  respondida = false;
  document.getElementById('scoreDisplay').textContent = 0;
  document.getElementById('totalDisplay').textContent = 0;
  document.getElementById('quizResultado').textContent = '';
  mostrarPregunta();
}

function mostrarPregunta() {
  if (quizIndex >= preguntas.length) {
    finQuiz();
    return;
  }
  respondida = false;
  const q = preguntas[quizIndex];
  document.getElementById('quizPregunta').textContent = `${quizIndex + 1}. ${q.pregunta}`;
  document.getElementById('quizResultado').textContent = '';

  const opcionesDiv = document.getElementById('quizOpciones');
  opcionesDiv.innerHTML = '';

  q.opciones.forEach((op, i) => {
    const btn = document.createElement('button');
    btn.classList.add('opcion-btn');
    btn.textContent = op;
    btn.onclick = () => verificar(i, btn);
    opcionesDiv.appendChild(btn);
  });

  document.getElementById('quizBtn').textContent = '→ Siguiente';
  document.getElementById('quizBtn').onclick = siguientePregunta;
}

function verificar(idx, btn) {
  if (respondida) return;
  respondida = true;
  totalRespondidas++;
  const q = preguntas[quizIndex];
  const botones = document.querySelectorAll('.opcion-btn');

  botones.forEach((b, i) => {
    if (i === q.correcta) b.classList.add('correcto');
    else                   b.classList.add('incorrecto');
  });

  const resultado = document.getElementById('quizResultado');
  if (idx === q.correcta) {
    score++;
    resultado.textContent = '✅ ¡Correcto!';
    resultado.style.color = '#39ff14';
  } else {
    resultado.textContent = `❌ Incorrecto. Era: "${q.opciones[q.correcta]}"`;
    resultado.style.color = '#ff3c3c';
  }

  document.getElementById('scoreDisplay').textContent = score;
  document.getElementById('totalDisplay').textContent = totalRespondidas;
}

function siguientePregunta() {
  quizIndex++;
  mostrarPregunta();
}

function finQuiz() {
  document.getElementById('quizPregunta').textContent = `🎉 Quiz terminado. Obtuviste ${score} de ${preguntas.length}.`;
  document.getElementById('quizOpciones').innerHTML = '';
  document.getElementById('quizResultado').textContent = score >= 6 ? '🌟 ¡Excelente, eres un genio de la ciencia!' : '📚 Sigue aprendiendo, lo harás mejor la próxima vez.';
  document.getElementById('quizResultado').style.color = score >= 6 ? '#39ff14' : '#ffcc00';
  document.getElementById('quizBtn').textContent = '🔄 Jugar de nuevo';
  document.getElementById('quizBtn').onclick = iniciarQuiz;
}