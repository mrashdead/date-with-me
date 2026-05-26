(function () {
    'use strict';

    // ===== State =====
    const state = {
        currentPage: 1,
        selectedActivities: [],
        selectedDate: '',      // ISO میلادی: "2026-06-15"
        selectedDatePersian: '', // شمسی برای نمایش
        selectedTime: '',
        countdownInterval: null
    };

    // ===== DOM Ready =====
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        setupPersianDatepicker();
        setupNoButton();
        setupEventListeners();
        createHearts();
        updateProgress();
    }

    // ===== Event Listeners =====
    function setupEventListeners() {
        document.getElementById('yesBtn').addEventListener('click', sayYes);
        document.getElementById('goPage3').addEventListener('click', () => goToPage(3));
        document.getElementById('goPage4').addEventListener('click', () => goToPage(4));
        document.getElementById('goPage5').addEventListener('click', () => goToPage(5));
        document.getElementById('goPage6').addEventListener('click', () => goToPage(6));

        document.querySelectorAll('.activity-card').forEach(card => {
            card.addEventListener('click', () => toggleActivity(card));
        });
    }

    // ===== Persian Datepicker =====
    function setupPersianDatepicker() {
        $('#dateInput').persianDatepicker({
            format: 'YYYY/MM/DD',
            initialValue: false,
            minDate: new persianDate(),
            persianDigit: true,
            onSelect: function (unix) {
                // unix = timestamp انتخاب‌شده
                // تبدیل به Date میلادی برای countdown
                const pd = new persianDate(unix);
                state.selectedDate = pd.toDate().toISOString().split('T')[0]; // "2026-06-15"
                state.selectedDatePersian = pd.toLocale('fa').format('dddd D MMMM YYYY'); // "یکشنبه ۱۵ خرداد ۱۴۰۵"
            }
        });
    }

    // ===== No Button =====
    function setupNoButton() {
        const noBtn = document.getElementById('noBtn');
        let attempts = 0;

        function escape() {
            attempts++;
            if (attempts >= 2) {
                document.getElementById('noHint').classList.remove('hidden');
            }

            const card = noBtn.closest('.card');
            const cardRect = card.getBoundingClientRect();
            const btnRect = noBtn.getBoundingClientRect();

            const rangeX = (cardRect.width - btnRect.width) / 2;
            const rangeY = 100;

            const x = (Math.random() - 0.5) * rangeX * 2;
            const y = (Math.random() - 0.5) * rangeY * 2;

            noBtn.style.transform = `translate(${x}px, ${y}px)`;
        }

        noBtn.addEventListener('mouseenter', escape);
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            escape();
        });
    }

    // ===== Navigation =====
    function goToPage(num) {
        if (num === 4) {
            state.selectedTime = document.getElementById('timeInput').value;
            if (!state.selectedDate || !state.selectedTime) {
                showToast('لطفاً تاریخ و ساعت رو انتخاب کن 🙏');
                return;
            }
        }
        if (num === 5) {
            if (state.selectedActivities.length === 0) {
                showToast('حداقل یه فعالیت انتخاب کن 😊');
                return;
            }
            buildSuggestions();
        }
        if (num === 6) {
            setupFinalPage();
        }

        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('page' + num).classList.add('active');
        state.currentPage = num;
        updateProgress();
    }

    function sayYes() {
        launchConfetti();
        setTimeout(() => goToPage(2), 600);
    }

    function updateProgress() {
        document.getElementById('progressBar').style.width = ((state.currentPage / 6) * 100) + '%';
    }

    // ===== Activities =====
    function toggleActivity(el) {
        const activity = el.dataset.activity;
        el.classList.toggle('selected');
        const idx = state.selectedActivities.indexOf(activity);
        if (idx > -1) {
            state.selectedActivities.splice(idx, 1);
        } else {
            state.selectedActivities.push(activity);
        }
    }

    // ===== Suggestions =====
    const suggestions = {
        cafe: [
            { icon: '☕', title: 'یه کافه دنج با فضای روباز', desc: 'لاته و کیک و کلی حرف' },
            { icon: '📖', title: 'کافه کتاب', desc: 'یه گوشه آروم با موسیقی ملایم' }
        ],
        restaurant: [
            { icon: '🍕', title: 'رستوران و پیتزایی', desc: 'پاستا و پیتزا' },
            { icon: '🥪', title: 'ساندویچ کثیف', desc: 'خوردن فلافل اونم کنار خیابون' }
        ],
        cinema: [
            { icon: '🍿', title: 'فیلم رمانتیک / کمدی', desc: 'پاپ‌کورن و لذت تماشایی فیلم' },
            { icon: '🎭', title: 'تئاتر', desc: 'یه نمایش خاص و متفاوت' }
        ],
        park: [
            { icon: '🌅', title: 'قدم زدن در غروب', desc: 'قدم زدن کنار هم وقتی آسمون نارنجیه' },
            { icon: '🎡', title: 'نشستن تو پارک', desc: 'خوراکی بگیرم و بشینم گپ بزنیم' }
        ],
        museum: [
            { icon: '🖼️', title: 'نمایشگاه هنری', desc: 'هنر و زیبایی کنار هم' },
            { icon: '📸', title: 'گالری عکاسی', desc: 'عکس‌های خاص و الهام‌بخش' }
        ],
        game: [
            { icon: '🎱', title: 'بیلیارد', desc: 'میشه ساده بازی کنیم یا شرطی' },
            { icon: '🎮', title: 'کلاب', desc: 'بریم مورتال یا کراش بزنیم' }
        ],
    };

    function buildSuggestions() {
        const container = document.getElementById('suggestionsContainer');
        container.innerHTML = '';
        state.selectedActivities.forEach(activity => {
            (suggestions[activity] || []).forEach(item => {
                const div = document.createElement('div');
                div.className = 'card rounded-xl p-4 flex items-center gap-3 text-right';
                div.innerHTML = `
                    <div class="text-3xl">${item.icon}</div>
                    <div>
                        <p class="text-white font-medium">${item.title}</p>
                        <p class="text-gray-400 text-sm">${item.desc}</p>
                    </div>
                `;
                container.appendChild(div);
            });
        });
    }

    // ===== Final Page + Countdown (اصلاح‌شده) =====
    function setupFinalPage() {
        // ساخت Date object صحیح از تاریخ میلادی + ساعت
        const [hours, minutes] = state.selectedTime.split(':').map(Number);
        const dateObj = new Date(state.selectedDate + 'T' + state.selectedTime + ':00');

        // اگه تاریخ نامعتبر بود
        if (isNaN(dateObj.getTime())) {
            showToast('تاریخ یا ساعت نامعتبره ❌');
            return;
        }

        // نمایش تاریخ شمسی
        document.getElementById('finalDateText').textContent = '📅 ' + (state.selectedDatePersian || dateObj.toLocaleDateString('fa-IR', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        }));
        document.getElementById('finalTimeText').textContent = '⏰ ساعت ' + state.selectedTime;

        // پاکسازی interval قبلی
        if (state.countdownInterval) {
            clearInterval(state.countdownInterval);
            state.countdownInterval = null;
        }

        function tick() {
            const now = new Date();
            const diff = dateObj.getTime() - now.getTime();

            if (diff <= 0) {
                document.getElementById('cd-days').textContent = '🎉';
                document.getElementById('cd-hours').textContent = '۰';
                document.getElementById('cd-mins').textContent = '۰';
                document.getElementById('cd-secs').textContent = '۰';
                clearInterval(state.countdownInterval);
                state.countdownInterval = null;
                return;
            }

            const days = Math.floor(diff / 86400000);
            const hours = Math.floor((diff % 86400000) / 3600000);
            const mins = Math.floor((diff % 3600000) / 60000);
            const secs = Math.floor((diff % 60000) / 1000);

            // نمایش با اعداد فارسی
            document.getElementById('cd-days').textContent = toPersianNum(days);
            document.getElementById('cd-hours').textContent = toPersianNum(hours);
            document.getElementById('cd-mins').textContent = toPersianNum(mins);
            document.getElementById('cd-secs').textContent = toPersianNum(secs);
        }

        tick(); // اجرای فوری
        state.countdownInterval = setInterval(tick, 1000);
        launchConfetti();
    }

    // ===== تبدیل عدد به فارسی =====
    function toPersianNum(num) {
        const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
        return String(num).replace(/\d/g, d => persianDigits[d]);
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
            piece.style.animationDelay = (Math.random() * 2) + 's';
            piece.style.width = (5 + Math.random() * 10) + 'px';
            piece.style.height = (5 + Math.random() * 10) + 'px';
            document.body.appendChild(piece);
            setTimeout(() => piece.remove(), 5000);
        }
    }

    // ===== Floating Hearts =====
    function createHearts() {
        const container = document.getElementById('hearts-bg');
        if (!container) return;
        const emojis = ['💕', '💗', '💖', '✨', '🦋', '🌸'];
        setInterval(() => {
            const span = document.createElement('span');
            span.className = 'heart-particle';
            span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            span.style.left = Math.random() * 100 + 'vw';
            span.style.animationDuration = (3 + Math.random() * 3) + 's';
            span.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
            container.appendChild(span);
            setTimeout(() => span.remove(), 6000);
        }, 800);
    }

    // ===== Toast =====
    function showToast(msg) {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.style.cssText = `
                position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
                background: rgba(255,107,107,0.95); color: #fff; padding: 12px 24px;
                border-radius: 12px; font-size: 14px; z-index: 999;
                opacity: 0; transition: opacity 0.3s ease;
                font-family: 'Vazirmatn', sans-serif;
            `;
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = '1';
        setTimeout(() => { toast.style.opacity = '0'; }, 2500);
    }

})();
