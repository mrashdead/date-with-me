// ===== State =====
let selectedActivities = [];
let selectedDate = '';
let selectedTime = '';
let currentPage = 1;

// ===== Load Pages =====
const pageFiles = [
    'pages/page1.html',
    'pages/page2.html',
    'pages/page3.html',
    'pages/page4.html',
    'pages/page5.html',
    'pages/page6.html'
];

async function loadPages() {
    const app = document.getElementById('app');
    for (const file of pageFiles) {
        const res = await fetch(file);
        const html = await res.text();
        app.innerHTML += html;
    }
    initPage1();
    setMinDate();
}

loadPages();

// ===== Floating Hearts =====
function createHearts() {
    const container = document.getElementById('hearts-bg');
    const hearts = ['💕', '💗', '💖', '✨', '🦋', '🌸'];
    setInterval(() => {
        const heart = document.createElement('span');
        heart.className = 'heart-particle';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (3 + Math.random() * 3) + 's';
        heart.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }, 800);
}
createHearts();

// ===== Page 1: No Button =====
function initPage1() {
    const noBtn = document.getElementById('noBtn');
    let noAttempts = 0;

    function moveNoBtn() {
        noAttempts++;
        if (noAttempts >= 2) {
            document.getElementById('noHint').classList.remove('hidden');
        }
        const page = document.getElementById('page1');
        const rect = page.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        const maxX = rect.width - btnRect.width - 20;
        const maxY = rect.height - btnRect.height - 20;

        const newX = Math.random() * maxX - maxX / 2;
        const newY = Math.random() * maxY - maxY / 2;

        noBtn.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    noBtn.addEventListener('mouseenter', moveNoBtn);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoBtn();
    });
}

// ===== Confetti =====
function launchConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        piece.style.animationDelay = Math.random() * 2 + 's';
        piece.style.width = (5 + Math.random() * 10) + 'px';
        piece.style.height = (5 + Math.random() * 10) + 'px';
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 5000);
    }
}

// ===== Navigation =====
function goToPage(num) {
    // Validations
    if (num === 4) {
        selectedDate = document.getElementById('dateInput').value;
        selectedTime = document.getElementById('timeInput').value;
        if (!selectedDate || !selectedTime) {
            alert('لطفاً تاریخ و ساعت رو انتخاب کن 🙏');
            return;
        }
    }
    if (num === 5) {
        if (selectedActivities.length === 0) {
            alert('حداقل یه فعالیت انتخاب کن 😊');
            return;
        }
        buildSuggestions();
    }
    if (num === 6) {
        setupFinalPage();
    }

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page' + num).classList.add('active');
    document.getElementById('progressBar').style.width = (num / 6 * 100) + '%';
    currentPage = num;
}

function sayYes() {
    launchConfetti();
    setTimeout(() => goToPage(2), 600);
}

// ===== Activities =====
function toggleActivity(el) {
    const activity = el.dataset.activity;
    el.classList.toggle('selected');
    if (selectedActivities.includes(activity)) {
        selectedActivities = selectedActivities.filter(a => a !== activity);
    } else {
        selectedActivities.push(activity);
    }
}

// ===== Suggestions =====
const suggestions = {
    cafe: [
        { icon: '☕', title: 'یه کافه دنج با فضای روباز', desc: 'لاته و کیک و کلی حرف' },
        { icon: '📖', title: 'کافه کتاب', desc: 'یه گوشه آروم با موسیقی ملایم' }
    ],
    restaurant: [
        { icon: '🍕', title: 'رستوران ایتالیایی', desc: 'پاستا و پیتزا و شمع‌های رمانتیک' },
        { icon: '🍣', title: 'رستوران ژاپنی', desc: 'سوشی و یه تجربه متفاوت' }
    ],
    cinema: [
        { icon: '🍿', title: 'فیلم رمانتیک / کمدی', desc: 'پاپ‌کورن و خنده و لحظات خوب' },
        { icon: '🎭', title: 'تئاتر', desc: 'یه نمایش خاص و متفاوت' }
    ],
    park: [
        { icon: '🌅', title: 'قدم زدن غروب', desc: 'قدم زدن کنار هم وقتی آسمون نارنجیه' },
        { icon: '🧺', title: 'پیک‌نیک', desc: 'ساندویچ و آبمیوه زیر درختا' }
    ],
    shopping: [
        { icon: '🏬', title: 'مرکز خرید', desc: 'ویترین‌گردی و خرید یه هدیه برات' },
        { icon: '🎁', title: 'بازار محلی', desc: 'کلی چیز جالب و خاص' }
    ],
    museum: [
        { icon: '🖼️', title: 'نمایشگاه هنری', desc: 'هنر و زیبایی کنار هم' },
        { icon: '📸', title: 'گالری عکاسی', desc: 'عکس‌های خاص و الهام‌بخش' }
    ],
    game: [
        { icon: '🎳', title: 'بولینگ', desc: 'رقابت و خنده و هیجان' },
        { icon: '🎯', title: 'اتاق فرار', desc: 'تیمی حل معما و ماجراجویی' }
    ],
    nature: [
        { icon: '🥾', title: 'پیاده‌روی کوهستان', desc: 'هوای تازه و مناظر زیبا' },
        { icon: '🌊', title: 'کنار دریاچه', desc: 'آرامش و طبیعت بکر' }
    ]
};

function buildSuggestions() {
    const container = document.getElementById('suggestionsContainer');
    container.innerHTML = '';
    selectedActivities.forEach(activity => {
        const items = suggestions[activity] || [];
        items.forEach(item => {
            container.innerHTML += `
                <div class="card rounded-xl p-4 flex items-center gap-3 text-right">
                    <div class="text-3xl">${item.icon}</div>
                    <div>
                        <p class="text-white font-medium">${item.title}</p>
                        <p class="text-gray-400 text-sm">${item.desc}</p>
                    </div>
                </div>
            `;
        });
    });
}

// ===== Final Page =====
function setupFinalPage() {
    const dateObj = new Date(selectedDate + 'T' + selectedTime);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const persianDate = dateObj.toLocaleDateString('fa-IR', options);

    document.getElementById('finalDateText').textContent = `📅 ${persianDate}`;
    document.getElementById('finalTimeText').textContent = `⏰ ساعت ${selectedTime}`;

    function updateCountdown() {
        const now = new Date();
        const diff = dateObj - now;
        if (diff <= 0) {
            document.getElementById('cd-days').textContent = '🎉';
            document.getElementById('cd-hours').textContent = '';
            document.getElementById('cd-mins').textContent = '';
            document.getElementById('cd-secs').textContent = '';
            return;
        }
        document.getElementById('cd-days').textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('cd-hours').textContent = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('cd-mins').textContent = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('cd-secs').textContent = Math.floor((diff % (1000 * 60)) / 1000);
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
    launchConfetti();
}

// ===== Utils =====
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('dateInput');
    if (dateInput) dateInput.setAttribute('min', today);
}
