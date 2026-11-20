const passwordInput = document.getElementById('password-input');
const loginBtn = document.getElementById('login-btn');
const errorMsg = document.getElementById('error-msg');
const lockScreen = document.getElementById('lock-screen');
const mainContent = document.getElementById('main-content');
const lockBtn = document.getElementById('lock-btn');
const bgVideo = document.getElementById('bg-video');
const overlay = document.querySelector('.overlay');
const nycClock = document.getElementById('nyc-clock');
const tokyoClock = document.getElementById('tokyo-clock');

const correctPassword = "DbghgneWP7nb9ciF7RD4h9k3owV17QozhDMTWATB7dYW";

// Fungsi Update Jam
function updateClocks() {
    const nycTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(new Date());
    
    const tokyoTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(new Date());

    nycClock.textContent = nycTime;
    tokyoClock.textContent = tokyoTime;
}

let clockInterval;

function checkPassword() {
    if (passwordInput.value === correctPassword) {
        lockScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        errorMsg.style.display = 'none';
        passwordInput.value = '';
        
        // Tampilkan dan mainkan video
        bgVideo.classList.remove('hidden');
        overlay.classList.remove('hidden');
        bgVideo.play();
        
        // Mulai Jam
        updateClocks();
        clockInterval = setInterval(updateClocks, 1000);
    } else {
        errorMsg.style.display = 'block';
    }
}

loginBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
});

// Tombol kunci kembali
lockBtn.addEventListener('click', () => {
    mainContent.classList.add('hidden');
    lockScreen.style.display = 'flex';
    
    // Sembunyikan dan pause video
    bgVideo.classList.add('hidden');
    overlay.classList.add('hidden');
    bgVideo.pause();
    bgVideo.currentTime = 0; // Reset ke awal
    
    // Hentikan Jam
    clearInterval(clockInterval);
});