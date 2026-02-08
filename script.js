// Hamburger Menü Fonksiyonları
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function closeMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Çıkmaya başladığınız tarihi buraya girin (YYYY, MM-1, DD formatında)
const startDate = new Date(2023, 11, 18); // 18 Aralık 2023 (aylar 0'dan başlar)

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('timer').innerHTML = `
        ${days} Gün, ${hours} Saat, ${minutes} Dakika, ${seconds} Saniye
    `;
}

// Sayfa yüklendiğinde başlat
updateTimer();
// Her saniye güncelle
setInterval(updateTimer, 1000);

// Uçuşan kalpler animasyonu
function createFloatingHeart() {
    const heartsContainer = document.getElementById('floatingHearts');
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// Her 2 saniyede bir kalp oluştur
setInterval(createFloatingHeart, 2000);
// Sayfa yüklenince hemen birkaç kalp oluştur
for(let i = 0; i < 5; i++) {
    setTimeout(createFloatingHeart, i * 400);
}

// Easter Egg: "açım" yazınca tema değişsin
let typedKeys = '';
let hungerMode = false;
let foodInterval = null;
let partyMode = false;
let partyInterval = null;
let snowMode = false;
let snowInterval = null;
let discoMode = false;
let discoInterval = null;
let rainMode = false;
let rainInterval = null;

document.addEventListener('keypress', (e) => {
    typedKeys += e.key.toLowerCase();
    
    // Easter Egg kontrolleri
    // "açım" / "acim"
    if (typedKeys.slice(-4) === 'açım' || typedKeys.slice(-5) === 'acim') {
        hungerMode = !hungerMode;
        toggleHungerMode();
        typedKeys = '';
    }
    
    // "dans" / "dance"
    if (typedKeys.slice(-4) === 'dans' || typedKeys.slice(-5) === 'dance') {
        discoMode = !discoMode;
        toggleDiscoMode();
        typedKeys = '';
    }
    
    // "parti" / "party"
    if (typedKeys.slice(-5) === 'parti' || typedKeys.slice(-5) === 'party') {
        partyMode = !partyMode;
        togglePartyMode();
        typedKeys = '';
    }
    
    // "kar" / "snow"
    if (typedKeys.slice(-3) === 'kar' || typedKeys.slice(-4) === 'snow') {
        snowMode = !snowMode;
        toggleSnowMode();
        typedKeys = '';
    }
    
    // "yağmur" / "rain"
    if (typedKeys.slice(-6) === 'yağmur' || typedKeys.slice(-6) === 'yagmur' || typedKeys.slice(-4) === 'rain') {
        rainMode = !rainMode;
        toggleRainMode();
        typedKeys = '';
    }
    
    // Çok uzun olmasın diye sınırla
    if (typedKeys.length > 15) {
        typedKeys = typedKeys.slice(-15);
    }
});

function toggleHungerMode() {
    const body = document.body;
    
    if (hungerMode) {
        // Açlık modunu aç
        body.classList.add('hunger-mode');
        
        // Yiyecek emojileri oluştur
        foodInterval = setInterval(createFloatingFood, 800);
        
        // İlk birkaç yiyeceği hemen oluştur
        for(let i = 0; i < 8; i++) {
            setTimeout(createFloatingFood, i * 200);
        }
    } else {
        // Normal moda dön
        body.classList.remove('hunger-mode');
        
        // Yiyecek üretimini durdur
        if (foodInterval) {
            clearInterval(foodInterval);
            foodInterval = null;
        }
        
        // Mevcut yiyecekleri temizle
        const foods = document.querySelectorAll('.food');
        foods.forEach(food => food.remove());
    }
}

function createFloatingFood() {
    const heartsContainer = document.getElementById('floatingHearts');
    const foodEmojis = ['🍔', '🍕', '🌭', '🍟', '🍗', '🥙', '🌮', '🌯', '🥪', '🍰', '🍩', '🍪', '🧁', '🍦', '🍭'];
    
    const food = document.createElement('div');
    food.className = 'food heart'; // Aynı animasyonu kullan
    food.innerHTML = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
    food.style.left = Math.random() * 100 + '%';
    food.style.animationDuration = (Math.random() * 3 + 3) + 's';
    food.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
    
    heartsContainer.appendChild(food);
    
    setTimeout(() => {
        food.remove();
    }, 6000);
}

// Easter Egg: Disco Mode
function toggleDiscoMode() {
    const body = document.body;
    
    if (discoMode) {
        body.classList.add('disco-mode');
        const colors = ['#ff6b9d', '#ff8fab', '#ffa8c5', '#ffcce0', '#c471ed', '#12c2e9', '#f64f59'];
        let colorIndex = 0;
        
        discoInterval = setInterval(() => {
            body.style.background = `linear-gradient(135deg, ${colors[colorIndex % colors.length]}, ${colors[(colorIndex + 1) % colors.length]})`;
            colorIndex++;
        }, 500);
        
        // Disco ışıkları
        for(let i = 0; i < 20; i++) {
            setTimeout(() => createDiscoLight(), i * 300);
        }
        setInterval(createDiscoLight, 1000);
    } else {
        body.classList.remove('disco-mode');
        body.style.background = '';
        if (discoInterval) {
            clearInterval(discoInterval);
            discoInterval = null;
        }
    }
}

function createDiscoLight() {
    if (!discoMode) return;
    
    const heartsContainer = document.getElementById('floatingHearts');
    const emojis = ['✨', '⭐', '💫', '🌟', '⚡'];
    
    const light = document.createElement('div');
    light.className = 'disco-light heart';
    light.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    light.style.left = Math.random() * 100 + '%';
    light.style.animationDuration = (Math.random() * 2 + 2) + 's';
    light.style.fontSize = (Math.random() * 2 + 2) + 'rem';
    
    heartsContainer.appendChild(light);
    
    setTimeout(() => light.remove(), 4000);
}

// Easter Egg: Party Mode (Konfeti)
function togglePartyMode() {
    if (partyMode) {
        document.body.classList.add('party-mode');
        
        // Konfeti patlaması
        for(let i = 0; i < 50; i++) {
            setTimeout(() => createConfetti(), i * 100);
        }
        
        partyInterval = setInterval(() => {
            for(let i = 0; i < 10; i++) {
                setTimeout(() => createConfetti(), i * 50);
            }
        }, 3000);
    } else {
        document.body.classList.remove('party-mode');
        if (partyInterval) {
            clearInterval(partyInterval);
            partyInterval = null;
        }
    }
}

function createConfetti() {
    if (!partyMode) return;
    
    const heartsContainer = document.getElementById('floatingHearts');
    const colors = ['🎉', '🎊', '🎈', '🎁', '🎀', '🎂', '🍾', '🥳'];
    
    const confetti = document.createElement('div');
    confetti.className = 'confetti heart';
    confetti.innerHTML = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
    confetti.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    heartsContainer.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 6000);
}

// Easter Egg: Snow Mode
function toggleSnowMode() {
    if (snowMode) {
        document.body.classList.add('snow-mode');
        
        snowInterval = setInterval(createSnowflake, 300);
        
        for(let i = 0; i < 20; i++) {
            setTimeout(() => createSnowflake(), i * 100);
        }
    } else {
        document.body.classList.remove('snow-mode');
        if (snowInterval) {
            clearInterval(snowInterval);
            snowInterval = null;
        }
        const snowflakes = document.querySelectorAll('.snowflake');
        snowflakes.forEach(snow => snow.remove());
    }
}

function createSnowflake() {
    if (!snowMode) return;
    
    const heartsContainer = document.getElementById('floatingHearts');
    const snowEmojis = ['❄️', '☃️', '⛄', '🌨️'];
    
    const snow = document.createElement('div');
    snow.className = 'snowflake heart';
    snow.innerHTML = snowEmojis[Math.floor(Math.random() * snowEmojis.length)];
    snow.style.left = Math.random() * 100 + '%';
    snow.style.animationDuration = (Math.random() * 5 + 5) + 's';
    snow.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    snow.style.opacity = Math.random() * 0.6 + 0.4;
    
    heartsContainer.appendChild(snow);
    
    setTimeout(() => snow.remove(), 10000);
}

// Easter Egg: Rain Mode (Kalp Yağmuru)
function toggleRainMode() {
    if (rainMode) {
        document.body.classList.add('rain-mode');
        
        rainInterval = setInterval(createRainHeart, 200);
        
        for(let i = 0; i < 30; i++) {
            setTimeout(() => createRainHeart(), i * 100);
        }
    } else {
        document.body.classList.remove('rain-mode');
        if (rainInterval) {
            clearInterval(rainInterval);
            rainInterval = null;
        }
    }
}

function createRainHeart() {
    if (!rainMode) return;
    
    const heartsContainer = document.getElementById('floatingHearts');
    const rainEmojis = ['💕', '💖', '💗', '💓', '💝', '💘', '💞'];
    
    const rain = document.createElement('div');
    rain.className = 'rain-heart heart';
    rain.innerHTML = rainEmojis[Math.floor(Math.random() * rainEmojis.length)];
    rain.style.left = Math.random() * 100 + '%';
    rain.style.animationDuration = (Math.random() * 2 + 2) + 's';
    rain.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
    
    heartsContainer.appendChild(rain);
    
    setTimeout(() => rain.remove(), 4000);
}

// ========================================
// "Seni Seviyorum" Farklı Dillerde
// ========================================

document.querySelectorAll('.love-heart').forEach(heart => {
    heart.addEventListener('click', function() {
        const loveText = this.dataset.text;
        const display = document.getElementById('love-display');
        
        display.textContent = loveText;
        display.style.animation = 'none';
        setTimeout(() => {
            display.style.animation = 'fadeInScale 0.5s ease';
        }, 10);
        
        // Confetti efekti - küçük kalplar
        createLoveConfetti(this);
    });
});

function createLoveConfetti(element) {
    const rect = element.getBoundingClientRect();
    const heartsContainer = document.getElementById('floatingHearts');
    
    for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'heart';
        confetti.innerHTML = '💕';
        confetti.style.left = rect.left + rect.width / 2 + 'px';
        confetti.style.bottom = (window.innerHeight - rect.top) + 'px';
        confetti.style.fontSize = '1.5rem';
        confetti.style.animationDuration = '2s';
        
        heartsContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
}

// ========================================
// OYUN 1: Kalp Toplama Oyunu
// ========================================

let heartGameInterval;
let heartGameScore = 0;

function startHeartGame() {
    const modal = document.getElementById('game-modal');
    const gameArea = document.getElementById('game-area');
    
    modal.style.display = 'block';
    
    gameArea.innerHTML = `
        <h3 style="text-align: center; color: #d91e62;">💕 Kalp Topla</h3>
        <div class="game-score">Skor: <span id="heart-score">0</span></div>
        <canvas id="heartCanvas" class="heart-game-canvas" width="400" height="400"></canvas>
        <p style="text-align: center; margin-top: 15px; color: #666;">← → tuşlarıyla hareket et!</p>
        <button class="game-restart" onclick="startHeartGame()">🔄 Yeniden Başlat</button>
    `;
    
    heartGameScore = 0;
    playHeartGame();
}

function playHeartGame() {
    const canvas = document.getElementById('heartCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const player = { x: 180, y: 360, width: 40, height: 40, speed: 8 };
    const hearts = [];
    const keys = {};
    
    // Klavye kontrolü
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            keys[e.key] = true;
        }
    });
    
    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });
    
    // Kalp oluştur
    function createHeart() {
        hearts.push({
            x: Math.random() * (canvas.width - 30),
            y: 0,
            width: 30,
            height: 30,
            speed: 2 + Math.random() * 2
        });
    }
    
    // Çizim
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Oyuncu
        ctx.font = '40px Arial';
        ctx.fillText('🧺', player.x, player.y);
        
        // Kalplar
        hearts.forEach((heart, index) => {
            ctx.font = '30px Arial';
            ctx.fillText('💕', heart.x, heart.y);
            
            heart.y += heart.speed;
            
            // Çarpışma kontrolü
            if (heart.x < player.x + player.width &&
                heart.x + heart.width > player.x &&
                heart.y < player.y + player.height &&
                heart.y + heart.height > player.y) {
                hearts.splice(index, 1);
                heartGameScore++;
                document.getElementById('heart-score').textContent = heartGameScore;
            }
            
            // Ekrandan çıktı
            if (heart.y > canvas.height) {
                hearts.splice(index, 1);
            }
        });
        
        // Oyuncu hareketi
        if (keys['ArrowLeft'] && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
            player.x += player.speed;
        }
    }
    
    // Oyun döngüsü
    setInterval(createHeart, 1000);
    heartGameInterval = setInterval(draw, 1000 / 60);
}

// ========================================
// OYUN 2: Memory Oyunu
// ========================================

let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;

function startMemoryGame() {
    const modal = document.getElementById('game-modal');
    const gameArea = document.getElementById('game-area');
    
    modal.style.display = 'block';
    
    const emojis = ['💕', '💖', '💗', '💘', '💝', '💞', '❤️', '🧡'];
    memoryCards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    flippedCards = [];
    matchedPairs = 0;
    
    gameArea.innerHTML = `
        <h3 style="text-align: center; color: #d91e62;">🧠 Hafıza Oyunu</h3>
        <div class="game-score">Eşleşen: <span id="memory-score">0</span>/8</div>
        <div class="memory-grid" id="memoryGrid"></div>
        <button class="game-restart" onclick="startMemoryGame()">🔄 Yeniden Başlat</button>
    `;
    
    const grid = document.getElementById('memoryGrid');
    memoryCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.innerHTML = '❓';
        card.addEventListener('click', flipMemoryCard);
        grid.appendChild(card);
    });
}

function flipMemoryCard() {
    if (flippedCards.length >= 2 || this.classList.contains('flipped')) return;
    
    this.classList.add('flipped');
    this.innerHTML = this.dataset.emoji;
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        setTimeout(checkMemoryMatch, 800);
    }
}

function checkMemoryMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        document.getElementById('memory-score').textContent = matchedPairs;
        
        if (matchedPairs === 8) {
            setTimeout(() => {
                alert('🎉 Tebrikler! Hepsini buldun! 💕');
            }, 300);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerHTML = '❓';
        card2.innerHTML = '❓';
    }
    
    flippedCards = [];
}

// ========================================
// OYUN 3: XOX (Tic-Tac-Toe)
// ========================================

let xoxBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '❤️';
let xoxGameActive = true;

function startTicTacToe() {
    const modal = document.getElementById('game-modal');
    const gameArea = document.getElementById('game-area');
    
    modal.style.display = 'block';
    
    xoxBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = '❤️';
    xoxGameActive = true;
    
    gameArea.innerHTML = `
        <h3 style="text-align: center; color: #d91e62;">❌⭕ XOX Oyunu</h3>
        <div class="game-status" id="xox-status">Sıra: ❤️</div>
        <div class="tictactoe-board" id="xoxBoard"></div>
        <button class="game-restart" onclick="startTicTacToe()">🔄 Yeniden Başlat</button>
    `;
    
    const board = document.getElementById('xoxBoard');
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'tictactoe-cell';
        cell.dataset.index = i;
        cell.addEventListener('click', xoxCellClick);
        board.appendChild(cell);
    }
}

function xoxCellClick() {
    const index = this.dataset.index;
    
    if (xoxBoard[index] !== '' || !xoxGameActive) return;
    
    xoxBoard[index] = currentPlayer;
    this.textContent = currentPlayer;
    this.classList.add('taken');
    
    if (checkXOXWinner()) {
        document.getElementById('xox-status').textContent = currentPlayer + ' Kazandı! 🎉';
        xoxGameActive = false;
        return;
    }
    
    if (!xoxBoard.includes('')) {
        document.getElementById('xox-status').textContent = 'Berabere! 🤝';
        xoxGameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === '❤️' ? '💙' : '❤️';
    document.getElementById('xox-status').textContent = 'Sıra: ' + currentPlayer;
}

function checkXOXWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Yatay
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Dikey
        [0, 4, 8], [2, 4, 6] // Çapraz
    ];
    
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return xoxBoard[a] && xoxBoard[a] === xoxBoard[b] && xoxBoard[a] === xoxBoard[c];
    });
}

function closeGameModal() {
    document.getElementById('game-modal').style.display = 'none';
    if (heartGameInterval) {
        clearInterval(heartGameInterval);
    }
}

// Modal dışına tıklayınca kapat
window.onclick = function(event) {
    const modal = document.getElementById('game-modal');
    if (event.target === modal) {
        closeGameModal();
    }
}

// Doğum Günü Geri Sayımları
function updateBirthdayCountdowns() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Doğum günleri
    const birthdays = [
        { id: 'birthday1-countdown', month: 6, day: 10, name: 'Senin doğum günün' }, // 10 Temmuz
        { id: 'birthday2-countdown', month: 7, day: 30, name: 'Benim doğum günüm' }, // 30 Ağustos
        { id: 'anniversary-countdown', month: 11, day: 18, name: 'Yıldönümümüz' } // 18 Aralık
    ];
    
    birthdays.forEach(birthday => {
        let targetDate = new Date(currentYear, birthday.month, birthday.day);
        
        // Eğer bu yılki tarih geçtiyse, gelecek yılın tarihini al
        if (targetDate < now) {
            targetDate = new Date(currentYear + 1, birthday.month, birthday.day);
        }
        
        const diff = targetDate - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        const element = document.getElementById(birthday.id);
        if (element) {
            if (days === 0 && hours === 0 && minutes === 0) {
                element.innerHTML = '🎉 BUGÜN! 🎉';
                element.style.fontSize = '1.5rem';
                element.style.animation = 'bounce 0.5s infinite';
            } else if (days === 0) {
                element.innerHTML = `⏰ Bugün! ${hours} saat ${minutes} dakika kaldı!`;
            } else {
                element.innerHTML = `📅 ${days} gün, ${hours} saat, ${minutes} dakika kaldı`;
            }
        }
    });
}

// Sayfa yüklendiğinde ve her dakika güncelle
updateBirthdayCountdowns();
setInterval(updateBirthdayCountdowns, 60000); // Her dakika güncelle

// Yıldız Haritası Canvas
function drawStarMap() {
    const canvas = document.getElementById('starCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Arka plan gradient
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
    gradient.addColorStop(0, '#1a1a3e');
    gradient.addColorStop(0.5, '#0a0e27');
    gradient.addColorStop(1, '#000000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Yıldızları çiz
    function drawStar(x, y, radius, brightness) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx.fill();
        
        // Işık halesı
        const starGradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
        starGradient.addColorStop(0, `rgba(255, 255, 255, ${brightness * 0.3})`);
        starGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = starGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Rastgele yıldızlar
    for (let i = 0; i < 150; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 1.5 + 0.5;
        const brightness = Math.random() * 0.6 + 0.4;
        drawStar(x, y, radius, brightness);
    }
    
    // Önemli yıldızlar (daha büyük ve parlak)
    const importantStars = [
        { x: width * 0.3, y: height * 0.2 },
        { x: width * 0.6, y: height * 0.4 },
        { x: width * 0.25, y: height * 0.6 },
        { x: width * 0.7, y: height * 0.7 },
        { x: width * 0.8, y: height * 0.3 }
    ];
    
    importantStars.forEach(star => {
        drawStar(star.x, star.y, 3, 0.9);
    });
    
    // Merkezdeki kalp yıldızı
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Kalp etrafında pembe ışık
    const heartGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60);
    heartGradient.addColorStop(0, 'rgba(255, 107, 157, 0.4)');
    heartGradient.addColorStop(0.5, 'rgba(255, 107, 157, 0.2)');
    heartGradient.addColorStop(1, 'rgba(255, 107, 157, 0)');
    ctx.fillStyle = heartGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // Parlak merkez yıldız
    drawStar(centerX, centerY, 4, 1);
    
    // Yıldızları birleştiren çizgiler (takımyıldızı)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    
    // Merkez yıldızdan diğerlerine bağlantılar
    importantStars.forEach(star => {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();
    });
    
    // Yıldızlar arası bağlantılar
    for (let i = 0; i < importantStars.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(importantStars[i].x, importantStars[i].y);
        ctx.lineTo(importantStars[i + 1].x, importantStars[i + 1].y);
        ctx.stroke();
    }
    
    // Ay çiz
    const moonX = width * 0.85;
    const moonY = height * 0.15;
    const moonRadius = 25;
    
    // Dolunay
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 200, 0.9)';
    ctx.fill();
    
    // Ay ışığı
    const moonGradient = ctx.createRadialGradient(moonX, moonY, moonRadius, moonX, moonY, moonRadius * 2);
    moonGradient.addColorStop(0, 'rgba(255, 255, 200, 0.3)');
    moonGradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
    ctx.fillStyle = moonGradient;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius * 2, 0, Math.PI * 2);
    ctx.fill();
}

// Sayfa yüklendiğinde yıldız haritasını çiz
window.addEventListener('load', drawStarMap);

// Pencere boyutu değiştiğinde yeniden çiz
window.addEventListener('resize', drawStarMap);

// Aşk Termometresi
let currentLoveLevel = 100;

function measureLove() {
    // Aşk seviyesi her zaman 95-100 arası (çünkü aşkınız mükemmel!)
    const targetLevel = Math.floor(Math.random() * 6) + 95;
    currentLoveLevel = targetLevel;
    
    const mercury = document.getElementById('mercury');
    const percentage = document.getElementById('love-percentage');
    const status = document.getElementById('love-status');
    
    // Animasyon
    mercury.style.height = '0%';
    setTimeout(() => {
        mercury.style.height = targetLevel + '%';
    }, 100);
    
    // Sayı animasyonu
    let current = 0;
    const increment = targetLevel / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetLevel) {
            current = targetLevel;
            clearInterval(timer);
            createLoveParticles();
        }
        percentage.textContent = Math.floor(current);
    }, 20);
    
    // Durum mesajı
    const statuses = [
        { min: 95, text: '🔥 Ateş Gibi Yanıyor!', emoji: '🔥' },
        { min: 96, text: '💯 Kusursuz Uyum!', emoji: '💯' },
        { min: 97, text: '✨ Sihirli Bir Bağ!', emoji: '✨' },
        { min: 98, text: '💖 Harika Gidiyorsunuz!', emoji: '💖' },
        { min: 99, text: '🌟 Yıldızlar Bile Kıskanıyor!', emoji: '🌟' },
        { min: 100, text: '👑 Mükemmel Aşk!', emoji: '👑' }
    ];
    
    const statusObj = statuses.find(s => targetLevel >= s.min) || statuses[0];
    status.textContent = statusObj.text;
}

function createLoveParticles() {
    const container = document.getElementById('love-particles');
    container.innerHTML = '';
    
    const emojis = ['💕', '💖', '💗', '💓', '💝', '❤️', '💟'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.position = 'absolute';
        particle.style.left = Math.random() * 200 + 'px';
        particle.style.top = '100px';
        particle.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
        particle.style.animation = `particleFloat ${Math.random() * 2 + 2}s ease-out forwards`;
        particle.style.opacity = '1';
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 4000);
    }
}

// Particle animasyon
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-150px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Sayfa yüklendiğinde ilk ölçüm
setTimeout(measureLove, 500);

// Günlük Aşk Sözleri
const loveQuotes = [
    { text: "Seninle geçirdiğim her an, hayatımın en değerli hazinesi.", author: "Kalbimden" },
    { text: "Sen benim için sadece bir insan değilsin, tüm dünyamsın.", author: "Sonsuzluk" },
    { text: "Seninle olmak, her günü özel kılıyor.", author: "Aşkla" },
    { text: "Gözlerin benim en sevdiğim manzara, gülüşün en güzel melodim.", author: "Kalp Notları" },
    { text: "Seninle tanıştığım gün, hayatımın en güzel macerasına başladım.", author: "Bizim Hikaye" },
    { text: "Kalbimde açtığın çiçeklerin kokusu hiç solmuyor.", author: "Bahçem" },
    { text: "Sen olmadan geçen her saniye, yanındayken geçen bir ömürden daha uzun.", author: "Zaman" },
    { text: "Seninle olmak, evrende kaybolmak gibi; harika ve sonsuz.", author: "Yıldızlar" },
    { text: "Beni en çok mutlu eden şey, senin mutluluğunu görmek.", author: "Neşe" },
    { text: "Her sabah uyanıp seni düşünmek, günümü güzelleştiriyor.", author: "Sabahlar" },
    { text: "Seninle geçen zamanlar, ömrümün en değerli anları.", author: "Hatıralar" },
    { text: "Kalbim senin için atıyor, her vuruşta ismini söylüyor.", author: "Ritim" },
    { text: "Sen benim için bir rüya değilsin, gerçek olmuş hayalimsin.", author: "Gerçeklik" },
    { text: "Yanında olduğum her an, cennette gibi hissediyorum.", author: "Huzur" },
    { text: "Seninle olmak, hayatın en güzel armağanı.", author: "Hediye" },
    { text: "Gözlerinde kaybolmak, en sevdiğim yolculuk.", author: "Seyahat" },
    { text: "Sen benim güneşimsin, karanlık günlerimi aydınlatıyorsun.", author: "Işık" },
    { text: "Seninle paylaştığım her anı, kalbime kazıyorum.", author: "Ebediyet" },
    { text: "Aklımdasın, kalbimdesin, ruhumdasın... Her yerimdesin.", author: "Varlık" },
    { text: "Seninle geçen her gün, daha çok sevdiğimi hatırlatıyor.", author: "Büyüyen Aşk" },
    { text: "İyiki varsın, iyiki benimsin, iyiki birlikteyiz!", author: "Şükür" }
];

function getNewQuote() {
    const quoteText = document.getElementById('daily-quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    
    // Fade out
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    
    setTimeout(() => {
        // Rastgele söz seç
        const randomQuote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
        quoteText.textContent = randomQuote.text;
        quoteAuthor.textContent = '- ' + randomQuote.author;
        
        // Fade in
        quoteText.style.transition = 'opacity 0.5s ease';
        quoteAuthor.style.transition = 'opacity 0.5s ease';
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
    }, 300);
}

// Sayfa yüklendiğinde günün sözünü göster (her gün aynı söz)
function getDailyQuote() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const quoteIndex = dayOfYear % loveQuotes.length;
    
    const quote = loveQuotes[quoteIndex];
    document.getElementById('daily-quote-text').textContent = quote.text;
    document.getElementById('quote-author').textContent = '- ' + quote.author;
}

// Sayfa yüklendiğinde günlük sözü göster
setTimeout(getDailyQuote, 100);