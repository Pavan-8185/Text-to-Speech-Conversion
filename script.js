const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const stopBtn = document.getElementById("stopBtn");
const voiceSelect = document.getElementById("voiceSelect");
const rate = document.getElementById("rate");
const pitch = document.getElementById("pitch");
const rateValue = document.getElementById("rateValue");
const pitchValue = document.getElementById("pitchValue");
const toggleDarkMode = document.getElementById("toggleDarkMode");

let voices = [];
let utterance;

// Dark Mode Toggle
toggleDarkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Load voices and populate the voice selection dropdown
function loadVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

speechSynthesis.onvoiceschanged = loadVoices;

// Update rate and pitch values display
rate.addEventListener("input", () => rateValue.textContent = rate.value);
pitch.addEventListener("input", () => pitchValue.textContent = pitch.value);

// Play text-to-speech
convertBtn.addEventListener("click", () => {
    const enteredText = text.value;
    const error = document.querySelector('.error-para');

    if (!enteredText.trim().length) {
        error.textContent = `Nothing to Convert! Enter text in the text area.`;
        return;
    }

    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }

    utterance = new SpeechSynthesisUtterance(enteredText);
    utterance.voice = voices[voiceSelect.value];
    utterance.rate = rate.value;
    utterance.pitch = pitch.value;

    speechSynthesis.speak(utterance);
    error.textContent = "";
});

// Pause, Resume, and Stop functionality
pauseBtn.addEventListener("click", () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.pause();
    }
});

resumeBtn.addEventListener("click", () => {
    if (speechSynthesis.paused) {
        speechSynthesis.resume();
    }
});

stopBtn.addEventListener("click", () => {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
});
