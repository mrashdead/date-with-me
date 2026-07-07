/**
 * Premium Features Module
 * Includes: Dynamic Theme System, Vibe Matching Meter, Digital Ticket Generator
 */

// ============================================================================
// 1. DYNAMIC THEME SYSTEM
// ============================================================================

const ThemeSystem = {
  themes: {
    default: {
      name: 'default',
      label: 'Default',
      colors: {
        '--bg-1': '#0b1020',
        '--bg-2': '#16112b',
        '--primary-1': '#fb7185',
        '--primary-2': '#c084fc',
        '--primary-3': '#f9a8d4',
        '--accent': '#f9a8d4',
      },
      effect: null,
    },
    coffee: {
      name: 'coffee',
      label: 'Coffee / Cozy ☕',
      colors: {
        '--bg-1': '#1a1410',
        '--bg-2': '#2d2218',
        '--primary-1': '#d4a574',
        '--primary-2': '#c9915e',
        '--primary-3': '#e8c89f',
        '--accent': '#d4a574',
      },
      effect: 'steam',
    },
    nature: {
      name: 'nature',
      label: 'Nature / Fresh 🌿',
      colors: {
        '--bg-1': '#0d1f14',
        '--bg-2': '#132b1f',
        '--primary-1': '#34d399',
        '--primary-2': '#10b981',
        '--primary-3': '#6ee7b7',
        '--accent': '#34d399',
      },
      effect: 'leaves',
    },
    gaming: {
      name: 'gaming',
      label: 'Gaming / Neon 🎮',
      colors: {
        '--bg-1': '#0f0f1e',
        '--bg-2': '#1a1a3f',
        '--primary-1': '#00ffff',
        '--primary-2': '#ff00ff',
        '--primary-3': '#00ff88',
        '--accent': '#00ffff',
      },
      effect: 'neon',
    },
  },

  currentTheme: 'default',

  init() {
    this.setupThemeListeners();
    this.loadThemeFromStorage();
  },

  setupThemeListeners() {
    const chips = document.querySelectorAll('.chip[data-interest]');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => this.updateThemeFromInterests());
    });
  },

  updateThemeFromInterests() {
    // Delay to ensure DOM is updated with selected interests
    setTimeout(() => {
      const selectedInterests = Array.from(
        document.querySelectorAll('.chip.selected[data-interest]')
      ).map((el) => el.dataset.interest);

      let themeKey = 'default';

      // Smart theme selection based on interests
      if (selectedInterests.includes('کافه')) {
        themeKey = 'coffee';
      } else if (selectedInterests.includes('طبیعت') || selectedInterests.includes('پیاده‌روی')) {
        themeKey = 'nature';
      } else if (selectedInterests.includes('گیم')) {
        themeKey = 'gaming';
      }

      this.applyTheme(themeKey);
    }, 50);
  },

  applyTheme(themeKey) {
    const theme = this.themes[themeKey];
    if (!theme) return;

    this.currentTheme = themeKey;

    // Apply colors with smooth transition
    const root = document.documentElement;
    root.style.transition = 'background-color 600ms cubic-bezier(0.4, 0, 0.2, 1)';

    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Store theme preference
    localStorage.setItem('selectedTheme', themeKey);

    // Apply theme-specific effects
    if (theme.effect) {
      this.applyEffect(theme.effect);
    } else {
      this.removeEffects();
    }

    // Add theme class to body for additional styling
    document.body.classList.remove(
      'theme-default',
      'theme-coffee',
      'theme-nature',
      'theme-gaming'
    );
    document.body.classList.add(`theme-${themeKey}`);
  },

  applyEffect(effectType) {
    this.removeEffects();

    const effectContainer = document.createElement('div');
    effectContainer.id = 'theme-effect-container';
    effectContainer.className = `theme-effect theme-effect-${effectType}`;

    document.body.appendChild(effectContainer);

    if (effectType === 'steam') {
      this.createSteamEffect();
    } else if (effectType === 'leaves') {
      this.createLeavesEffect();
    } else if (effectType === 'neon') {
      this.createNeonEffect();
    }
  },

  removeEffects() {
    const existing = document.getElementById('theme-effect-container');
    if (existing) {
      existing.remove();
    }
  },

  createSteamEffect() {
    const container = document.getElementById('theme-effect-container');
    for (let i = 0; i < 5; i++) {
      const steam = document.createElement('div');
      steam.className = 'steam-particle';
      steam.style.left = `${20 + i * 15}%`;
      steam.style.animationDelay = `${i * 0.3}s`;
      container.appendChild(steam);
    }
  },

  createLeavesEffect() {
    const container = document.getElementById('theme-effect-container');
    const leaves = ['🍃', '🍂', '🌿'];
    for (let i = 0; i < 8; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'floating-leaf';
      leaf.textContent = leaves[i % leaves.length];
      leaf.style.left = `${Math.random() * 100}%`;
      leaf.style.animationDelay = `${Math.random() * 5}s`;
      leaf.style.animationDuration = `${8 + Math.random() * 4}s`;
      container.appendChild(leaf);
    }
  },

  createNeonEffect() {
    const container = document.getElementById('theme-effect-container');
    const neonText = document.createElement('div');
    neonText.className = 'neon-glow';
    neonText.innerHTML = '<span style="text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;">⚡ NEON MODE ⚡</span>';
    neonText.style.position = 'fixed';
    neonText.style.top = '20px';
    neonText.style.right = '20px';
    neonText.style.color = '#00ffff';
    neonText.style.fontSize = '12px';
    neonText.style.fontWeight = 'bold';
    neonText.style.zIndex = '1000';
    neonText.style.animation = 'neonFlicker 0.15s infinite';
    container.appendChild(neonText);
  },

  loadThemeFromStorage() {
    const saved = localStorage.getItem('selectedTheme');
    if (saved && this.themes[saved]) {
      this.applyTheme(saved);
    }
  },
};

// ============================================================================
// 2. VIBE MATCHING METER
// ============================================================================

const VibeMeter = {
  isAnimating: false,
  messages: [
    'موسیقی تو رو تحلیل می‌کنم...',
    'سبک دیت‌ات رو بررسی می‌کنم...',
    'انرژی‌ات رو اندازه می‌گیرم...',
    'خصوصیات تو رو مقایسه می‌کنم...',
    'شاخص سازگاری رو محاسبه می‌کنم...',
    'نتیجه آمادیه...',
  ],

  resultMessages: {
    high: [
      'دقیقاً دنبال بودم! 💘',
      'خیلی خوب سازگار هستیم! 🔥',
      'perfect match! 💖',
      'این شانس نیستش، قضایی! 🌟',
    ],
    medium: [
      'خیلی خوب میشه! 💕',
      'چیزایی برای یادگیری داریم! 🌈',
      'فصل شناخت رو شروع کنیم! 💫',
    ],
  },

  show(containerId = 'vibeMeterContainer') {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const container = document.getElementById(containerId);
    if (!container) {
      console.warn('Vibe Meter container not found');
      this.isAnimating = false;
      return;
    }

    this.render(container);
  },

  render(container) {
    container.innerHTML = `
      <div class="vibe-meter-wrapper">
        <div class="vibe-loading">
          <div class="vibe-spinner"></div>
          <p class="vibe-message" id="vibeMessage">${this.messages[0]}</p>
        </div>
        <div class="vibe-result hidden" id="vibeResult">
          <div class="vibe-percentage-wrapper">
            <div class="vibe-circle">
              <svg viewBox="0 0 200 200" class="vibe-progress-ring">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  stroke-width="8"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="url(#progressGradient)"
                  stroke-width="8"
                  stroke-linecap="round"
                  class="vibe-ring"
                  style="stroke-dasharray: 565.48; stroke-dashoffset: 565.48;"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:var(--primary-1)" />
                    <stop offset="100%" style="stop-color:var(--primary-2)" />
                  </linearGradient>
                </defs>
              </svg>
              <span class="vibe-percentage-text" id="vibePercentage">0%</span>
            </div>
          </div>
          <p class="vibe-result-message" id="vibeResultMessage"></p>
        </div>
      </div>
    `;

    this.startAnimation();
  },

  startAnimation() {
    this.changeLoadingMessages();

    setTimeout(() => {
      this.showResult();
    }, 3000);
  },

  changeLoadingMessages() {
    let currentIndex = 0;
    const messageEl = document.getElementById('vibeMessage');

    const interval = setInterval(() => {
      if (currentIndex < this.messages.length - 1) {
        currentIndex++;
        if (messageEl) {
          messageEl.style.opacity = '0';
          setTimeout(() => {
            messageEl.textContent = this.messages[currentIndex];
            messageEl.style.opacity = '1';
          }, 200);
        }
      } else {
        clearInterval(interval);
      }
    }, 600);
  },

  showResult() {
    const percentage = 88 + Math.floor(Math.random() * 10); // 88-97
    const isHigh = percentage >= 92;
    const resultMessages = isHigh ? this.resultMessages.high : this.resultMessages.medium;
    const resultMessage = resultMessages[Math.floor(Math.random() * resultMessages.length)];

    const loadingEl = document.querySelector('.vibe-loading');
    const resultEl = document.getElementById('vibeResult');

    if (loadingEl) {
      loadingEl.style.opacity = '0';
      loadingEl.style.pointerEvents = 'none';
    }

    setTimeout(() => {
      if (resultEl) resultEl.classList.remove('hidden');
      this.animatePercentage(percentage);
      this.animateRing(percentage);

      setTimeout(() => {
        const messageEl = document.getElementById('vibeResultMessage');
        if (messageEl) {
          messageEl.textContent = resultMessage;
          messageEl.style.animation = 'fadeUp 0.6s ease';
        }
      }, 1200);
    }, 300);

    setTimeout(() => {
      this.isAnimating = false;
    }, 2500);
  },

  animatePercentage(targetPercentage) {
    const percentageEl = document.getElementById('vibePercentage');
    if (!percentageEl) return;

    let current = 0;
    const duration = 1200;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(easeOutCubic * targetPercentage);

      percentageEl.textContent = `${current}%`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  },

  animateRing(targetPercentage) {
    const ring = document.querySelector('.vibe-ring');
    if (!ring) return;

    const circumference = 565.48;
    const targetOffset = circumference - (circumference * targetPercentage) / 100;

    let current = circumference;
    const duration = 1200;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      current = circumference - easeOutCubic * (circumference - targetOffset);

      ring.style.strokeDashoffset = current;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  },
};

// ============================================================================
// 3. FANTASY DIGITAL TICKET GENERATOR
// ============================================================================

const TicketGenerator = {
  ticketData: {
    name: '',
    dateStyle: '',
    interests: [],
    dateTime: '',
  },

  init() {
    // Load html2canvas from CDN if not already loaded
    if (!window.html2canvas) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      script.onload = () => {
        console.log('html2canvas loaded successfully');
      };
      document.head.appendChild(script);
    }
  },

  setData(userData) {
    this.ticketData = {
      name: userData.name || 'Guest',
      dateStyle: userData.dateStyle || 'Special Date',
      interests: userData.interests || [],
      dateTime: userData.dateTime || 'TBD',
    };
  },

  generateHTML() {
    const { name, dateStyle, interests, dateTime } = this.ticketData;

    return `
      <div class="digital-ticket" id="ticketContent">
        <!-- Left Section -->
        <div class="ticket-left">
          <div class="ticket-header">
            <h2>✨ دعوت به قرار ✨</h2>
            <p class="ticket-subtitle">تجربه ویژه</p>
          </div>

          <div class="ticket-details">
            <div class="ticket-field">
              <span class="field-label">مهمان دعوت‌شده</span>
              <span class="field-value">${name}</span>
            </div>

            <div class="ticket-field">
              <span class="field-label">سبک قرار</span>
              <span class="field-value">${dateStyle}</span>
            </div>

            <div class="ticket-field">
              <span class="field-label">علاقه‌مندی‌ها</span>
              <span class="field-value">${interests.join(', ') || 'غافل‌گیرم کن'}</span>
            </div>

            <div class="ticket-field">
              <span class="field-label">زمان</span>
              <span class="field-value">${dateTime}</span>
            </div>
          </div>

          <div class="ticket-baggage">
            <p><strong>مجاز برای همراهی:</strong></p>
            <ul>
              <li>یک لبخند واقعی 😊</li>
              <li>گفت‌وگوی خوب و خنده‌ها 💬</li>
              <li>ذهن و قلب باز 💖</li>
              <li>بدون فشار، فقط حال خوب ✨</li>
            </ul>
          </div>
        </div>

        <!-- Perforation Line -->
        <div class="ticket-perforation"></div>

        <!-- Right Section (QR/Barcode) -->
        <div class="ticket-right">
          <div class="ticket-barcode">
            <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
              ${this.generateBarcodePattern()}
            </svg>
            <p class="barcode-text">قابل استفاده</p>
          </div>

          <div class="ticket-seal">
            <div class="seal-circle">
              <span>✓</span>
            </div>
            <p>تأیید شده</p>
          </div>

          <div class="ticket-decorations">
            <div class="decoration">💖</div>
            <div class="decoration">✨</div>
            <div class="decoration">🎀</div>
          </div>
        </div>
      </div>
    `;
  },

  generateBarcodePattern() {
    // Generate a pseudo-barcode pattern
    let svg = '';
    const barWidth = 3;
    for (let i = 0; i < 40; i++) {
      const height = 30 + Math.random() * 40;
      const x = i * barWidth;
      svg += `<rect x="${x}" y="${60 - height / 2}" width="${barWidth - 0.5}" height="${height}" fill="currentColor" />`;
    }
    return svg;
  },

  async downloadAsImage() {
    if (!window.html2canvas) {
      alert('Image export is loading. Please try again in a moment.');
      return;
    }

    try {
      // Create temporary container
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.zIndex = '-9999';
      tempContainer.innerHTML = this.generateHTML();
      tempContainer.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
      tempContainer.style.padding = '20px';
      tempContainer.style.borderRadius = '12px';
      document.body.appendChild(tempContainer);

      const canvas = await html2canvas(tempContainer, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        allowTaint: true,
        useCORS: true,
      });

      // Create download link
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `date-invitation-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      document.body.removeChild(tempContainer);

      return true;
    } catch (error) {
      console.error('Error generating ticket:', error);
      // Fallback: use canvas API directly
      this.downloadAsImageFallback();
      return false;
    }
  },

  downloadAsImageFallback() {
    // Native Canvas API fallback
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 400;

    // Background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.roundRect(10, 10, canvas.width - 20, canvas.height - 20, [15]);
    ctx.stroke();

    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('✨ DATE INVITATION ✨', 40, 60);

    ctx.font = '16px sans-serif';
    ctx.fillText(`Guest: ${this.ticketData.name}`, 40, 110);
    ctx.fillText(`Date: ${this.ticketData.dateTime}`, 40, 140);
    ctx.fillText(`Style: ${this.ticketData.dateStyle}`, 40, 170);

    // Download
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `date-invitation-${Date.now()}.png`;
    link.click();
  },

  show(containerId = 'ticketContainer') {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn('Ticket container not found');
      return;
    }

    container.innerHTML = `
      <div class="ticket-wrapper">
        ${this.generateHTML()}
        <div class="ticket-actions">
          <button class="ticket-btn primary" onclick="TicketGenerator.downloadAsImage()">
            📥 دانلود بلیت
          </button>
          <button class="ticket-btn secondary" onclick="TicketGenerator.shareTicket()">
            📤 اشتراک‌گذاری
          </button>
        </div>
      </div>
    `;
  },

  shareTicket() {
    const message = `دعوت من برای قرار 💖\nنام: ${this.ticketData.name}\nزمان: ${this.ticketData.dateTime}`;

    if (navigator.share) {
      navigator.share({
        title: 'دعوت به قرار',
        text: message,
      }).catch(err => console.log('Share failed:', err));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(message).then(() => {
        alert('جزئیات دعوت در کلیپ‌بورد کپی شد!');
      }).catch(() => {
        alert('امکان کپی خودکار نیست؛ لطفاً متن را دستی کپی کنید.');
      });
    }
  },
};

// ============================================================================
// CSS ANIMATIONS (injected into stylesheet)
// ============================================================================

const injectAnimations = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Theme Effects */
    .steam-particle {
      position: fixed;
      width: 40px;
      height: 40px;
      opacity: 0.3;
      font-size: 2rem;
      pointer-events: none;
      animation: steamRise 4s ease-out infinite;
      z-index: 1;
    }

    @keyframes steamRise {
      0% {
        transform: translateY(0) scale(1);
        opacity: 0.3;
      }
      100% {
        transform: translateY(-300px) scale(0.8);
        opacity: 0;
      }
    }

    .floating-leaf {
      position: fixed;
      font-size: 1.5rem;
      opacity: 0.5;
      pointer-events: none;
      z-index: 1;
      animation: leafFloat linear infinite;
    }

    @keyframes leafFloat {
      0% {
        transform: translateY(-100px) rotateZ(0deg);
        opacity: 0.5;
      }
      100% {
        transform: translateY(100vh) rotateZ(360deg);
        opacity: 0;
      }
    }

    @keyframes neonFlicker {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }

    /* Vibe Meter Styles */
    .vibe-meter-wrapper {
      padding: 40px 20px;
      text-align: center;
    }

    .vibe-loading {
      animation: fadeIn 0.6s ease;
    }

    .vibe-spinner {
      width: 60px;
      height: 60px;
      border: 4px solid rgba(255, 255, 255, 0.1);
      border-top: 4px solid var(--primary-1);
      border-radius: 50%;
      margin: 0 auto 20px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .vibe-message {
      font-size: 1rem;
      color: var(--text-soft);
      transition: opacity 0.4s ease;
    }

    .vibe-result {
      animation: fadeUp 0.6s ease;
    }

    .vibe-result.hidden {
      display: none;
    }

    .vibe-percentage-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
    }

    .vibe-circle {
      position: relative;
      width: 200px;
      height: 200px;
    }

    .vibe-progress-ring {
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }

    .vibe-ring {
      transition: stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .vibe-percentage-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--primary-1), var(--primary-2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .vibe-result-message {
      font-size: 1.2rem;
      color: var(--primary-3);
      font-weight: 600;
      margin: 20px 0 0;
      opacity: 0;
    }

    /* Digital Ticket Styles */
    .digital-ticket {
      display: flex;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      max-width: 800px;
      margin: 0 auto;
      font-family: "Vazirmatn", sans-serif;
      color: #fff;
    }

    .ticket-left {
      flex: 1;
      padding: 30px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .ticket-header h2 {
      margin: 0;
      font-size: 1.4rem;
      text-align: center;
      letter-spacing: 2px;
    }

    .ticket-subtitle {
      text-align: center;
      color: #999;
      font-size: 0.85rem;
      margin: 5px 0 0;
    }

    .ticket-details {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .ticket-field {
      text-align: right;
      padding: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .field-label {
      display: block;
      font-size: 0.75rem;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }

    .field-value {
      display: block;
      font-size: 1rem;
      font-weight: 600;
      color: var(--primary-3);
    }

    .ticket-baggage {
      background: rgba(255, 255, 255, 0.05);
      padding: 15px;
      border-radius: 8px;
      font-size: 0.9rem;
      text-align: right;
    }

    .ticket-baggage p {
      margin: 0 0 10px;
      color: #ccc;
    }

    .ticket-baggage ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .ticket-baggage li {
      padding: 4px 0;
      color: #aaa;
    }

    .ticket-perforation {
      width: 2px;
      background: repeating-linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.3) 0px,
        rgba(255, 255, 255, 0.3) 10px,
        transparent 10px,
        transparent 20px
      );
    }

    .ticket-right {
      flex: 0 0 auto;
      width: 200px;
      padding: 30px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      background: rgba(255, 255, 255, 0.03);
    }

    .ticket-barcode {
      text-align: center;
    }

    .ticket-barcode svg {
      width: 100%;
      height: 80px;
      color: var(--primary-1);
    }

    .barcode-text {
      font-size: 0.7rem;
      letter-spacing: 2px;
      margin-top: 8px;
      color: #999;
    }

    .ticket-seal {
      text-align: center;
    }

    .seal-circle {
      width: 80px;
      height: 80px;
      border: 3px solid var(--primary-2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: bold;
      color: var(--primary-2);
      margin-bottom: 10px;
    }

    .ticket-seal p {
      margin: 0;
      font-size: 0.75rem;
      letter-spacing: 1px;
      color: var(--primary-2);
    }

    .ticket-decorations {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }

    .decoration {
      font-size: 1.2rem;
      animation: bounce 1.5s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .ticket-wrapper {
      padding: 20px;
    }

    .ticket-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 20px;
      flex-wrap: wrap;
    }

    .ticket-btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.95rem;
    }

    .ticket-btn.primary {
      background: linear-gradient(135deg, var(--primary-1), var(--primary-2));
      color: #fff;
    }

    .ticket-btn.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(251, 113, 133, 0.3);
    }

    .ticket-btn.secondary {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-soft);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .ticket-btn.secondary:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    /* Responsive */
    @media (max-width: 640px) {
      .digital-ticket {
        flex-direction: column;
      }

      .ticket-right {
        width: 100%;
      }

      .ticket-perforation {
        width: 100%;
        height: 2px;
        background: repeating-linear-gradient(
          to right,
          rgba(255, 255, 255, 0.3) 0px,
          rgba(255, 255, 255, 0.3) 10px,
          transparent 10px,
          transparent 20px
        );
      }

      .vibe-percentage-text {
        font-size: 2rem;
      }

      .vibe-circle {
        width: 150px;
        height: 150px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;
  document.head.appendChild(style);
};

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Inject animations
  injectAnimations();

  // Initialize all features
  ThemeSystem.init();
  TicketGenerator.init();

  // Make features globally accessible
  window.VibeMeter = VibeMeter;
  window.TicketGenerator = TicketGenerator;
  window.ThemeSystem = ThemeSystem;

  console.log('✨ Premium Features Loaded:', {
    ThemeSystem: '✓',
    VibeMeter: '✓',
    TicketGenerator: '✓',
  });
});
