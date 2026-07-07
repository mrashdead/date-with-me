# Premium Features - Visual Reference & Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    date-with-me Website                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │             Premium Features Module                        │ │
│  │  (premium-features.js - 15 KB, loaded async)              │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │                                                             │ │
│  │  ┌──────────────────┐  ┌──────────────────┐              │ │
│  │  │  ThemeSystem     │  │   VibeMeter      │              │ │
│  │  │  ────────────    │  │   ──────────     │              │ │
│  │  │ • Apply themes   │  │ • Load spinner   │              │ │
│  │  │ • Store prefs    │  │ • Animate %      │              │ │
│  │  │ • Effects        │  │ • Show results   │              │ │
│  │  └──────────────────┘  └──────────────────┘              │ │
│  │                                                             │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │         TicketGenerator                              │ │ │
│  │  │         ───────────────                              │ │ │
│  │  │ • Generate HTML ticket                              │ │ │
│  │  │ • Export to PNG (html2canvas)                       │ │ │
│  │  │ • Fallback Canvas API                               │ │ │
│  │  │ • Share via native APIs                             │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                             │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │         CSS Animations (Injected)                    │ │ │
│  │  │ • Theme transitions (600ms)                          │ │ │
│  │  │ • Steam particle effects                             │ │ │
│  │  │ • Floating leaf animations                           │ │ │
│  │  │ • Neon glow effects                                  │ │ │
│  │  │ • Vibe meter animations (60fps)                      │ │ │
│  │  │ • Ticket decorative bounces                          │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                           │                                       │
│  ┌────────────────────────┴────────────────────────────────────┐ │
│  │              Event Listeners & Triggers                    │ │
│  │                                                             │ │
│  │  • Interest chip clicks → Theme changes                   │ │
│  │  • Suggestion selection → Vibe meter shows                │ │
│  │  • Contact info entry → Ticket generated                  │ │
│  │  • Final step → Summary shows                             │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Feature Flow Diagram

### Theme System Flow

```
User Interest Selection (Step 3)
         │
         ├─ Click "کافه" ──→ Coffee theme applies
         │                   ├─ Colors change (600ms transition)
         │                   ├─ Steam effects appear
         │                   └─ localStorage saved
         │
         ├─ Click "طبیعت" ──→ Nature theme applies
         │                   ├─ Colors change
         │                   ├─ Leaves float down
         │                   └─ localStorage saved
         │
         ├─ Click "گیم" ──→ Gaming theme applies
         │                 ├─ Neon colors
         │                 ├─ Glow indicator
         │                 └─ localStorage saved
         │
         └─ Page reload ──→ Saved theme reapplies automatically
```

### Vibe Matching Meter Flow

```
Step 9: Suggestion Selected
         │
         └─ Click "ادامه" button
            │
            ├─ Go to Step 10 (Vibe Meter)
            │
            ├─ 0-3 seconds: Loading Phase
            │  ├─ Spinner animation (rotate)
            │  └─ Messages change every 600ms
            │     ├─ "موسیقی تو رو تحلیل میکنم..."
            │     ├─ "سبک دیت‌ات رو بررسی میکنم..."
            │     ├─ "انرژی‌ات رو اندازه میگیرم..."
            │     └─ "نتیجه آمادیه..."
            │
            ├─ 3-4.2 seconds: Reveal Phase
            │  ├─ Percentage counter: 0% → 88-97%
            │  └─ SVG ring animates from empty to full
            │
            ├─ 4.2-4.5 seconds: Message Phase
            │  └─ Result message fades in
            │     ├─ High match (92%+):
            │     │  "دقیقاً دنبال بودم! 💘"
            │     │  "خیلی خوب سازگار هستیم! 🔥"
            │     └─ Medium match:
            │        "خیلی خوب میشه! 💕"
            │
            └─ 5+ seconds: Auto-proceed
               └─ Step 11 (Contact info)
```

### Digital Ticket Flow

```
Step 11: Contact Info Entry
         │
         └─ Click "ادامه" button
            │
            ├─ Validate contact info
            │  └─ At least one: Instagram/Telegram/Phone required
            │
            ├─ Go to Step 12 (Ticket)
            │
            ├─ Generate Ticket HTML
            │  ├─ User data populated:
            │  │  ├─ Name (from step 2)
            │  │  ├─ Date style (from step 9)
            │  │  ├─ Interests (from step 3)
            │  │  └─ Date/Time (from step 7)
            │  │
            │  └─ Static content:
            │     ├─ Barcode pattern (SVG)
            │     ├─ Approval seal (✓)
            │     └─ Baggage items (emojis)
            │
            ├─ Display in UI
            │  └─ Download & Share buttons available
            │
            ├─ User Action: Download
            │  ├─ html2canvas available?
            │  │  ├─ YES → Use html2canvas
            │  │  │         ├─ Scale 2x for quality
            │  │  │         ├─ Export as PNG
            │  │  │         └─ Download file
            │  │  │
            │  │  └─ NO → Use Canvas fallback
            │  │          ├─ Draw gradient background
            │  │          ├─ Draw text
            │  │          └─ Download file
            │  │
            │  └─ File: date-invitation-{timestamp}.png
            │
            ├─ User Action: Share
            │  ├─ Browser has Share API?
            │  │  ├─ YES → Native share dialog
            │  │  │         ├─ Share to messages/email/etc
            │  │  │         └─ Message: Invitation text
            │  │  │
            │  │  └─ NO → Copy to clipboard
            │  │          ├─ Copy: Name + Date style
            │  │          └─ User paste elsewhere
            │  │
            │  └─ Show success feedback
            │
            └─ Click "تمام!" button
               │
               ├─ Send email with all data
               │  ├─ via EmailJS service
               │  └─ Payload includes all steps
               │
               └─ Go to Step 13 (Final Summary)
```

---

## Visual Component Hierarchy

### Vibe Meter Component Structure

```html
<div id="vibeMeterContainer">
  <div class="vibe-meter-wrapper">

    <!-- Loading State -->
    <div class="vibe-loading">
      <div class="vibe-spinner"></div>  <!-- CSS animation: spin -->
      <p class="vibe-message">موسیقی تو رو تحلیل می‌کنم...</p>
    </div>

    <!-- Result State -->
    <div class="vibe-result hidden">
      <div class="vibe-percentage-wrapper">
        <div class="vibe-circle">

          <!-- SVG Progress Ring -->
          <svg viewBox="0 0 200 200">
            <circle />  <!-- Background circle -->
            <circle class="vibe-ring" />  <!-- Progress circle -->
            <defs>
              <linearGradient id="progressGradient">
                <stop offset="0%" style="stop-color:var(--primary-1)" />
                <stop offset="100%" style="stop-color:var(--primary-2)" />
              </linearGradient>
            </defs>
          </svg>

          <!-- Percentage Text -->
          <span class="vibe-percentage-text">92%</span>
        </div>
      </div>

      <!-- Result Message -->
      <p class="vibe-result-message">دقیقاً دنبال بودم! 💘</p>
    </div>

  </div>
</div>
```

### Digital Ticket Component Structure

```html
<div class="digital-ticket">

  <!-- Left Section: Main Content -->
  <div class="ticket-left">
    <div class="ticket-header">
      <h2>✨ DATE INVITATION ✨</h2>
      <p class="ticket-subtitle">Premium Experience</p>
    </div>

    <div class="ticket-details">
      <div class="ticket-field">
        <span class="field-label">Invited Guest</span>
        <span class="field-value">علیرضا احمدی</span>
      </div>
      <div class="ticket-field">
        <span class="field-label">Date Style</span>
        <span class="field-value">کافه دنج</span>
      </div>
      <div class="ticket-field">
        <span class="field-label">Interests</span>
        <span class="field-value">کافه، موسیقی، کتاب</span>
      </div>
      <div class="ticket-field">
        <span class="field-label">Scheduled</span>
        <span class="field-value">1402/04/15 19:00</span>
      </div>
    </div>

    <div class="ticket-baggage">
      <p><strong>Allowed Baggage:</strong></p>
      <ul>
        <li>One genuine smile 😊</li>
        <li>Good conversation 💬</li>
        <li>Open mind & heart 💖</li>
        <li>No pressure ✨</li>
      </ul>
    </div>
  </div>

  <!-- Perforation Line -->
  <div class="ticket-perforation"></div>

  <!-- Right Section: Decorations -->
  <div class="ticket-right">
    <div class="ticket-barcode">
      <!-- SVG barcode pattern -->
      <p class="barcode-text">VALID OFFER</p>
    </div>

    <div class="ticket-seal">
      <div class="seal-circle">
        <span>✓</span>
      </div>
      <p>APPROVED</p>
    </div>

    <div class="ticket-decorations">
      <div class="decoration">💖</div>  <!-- animated bounce -->
      <div class="decoration">✨</div>  <!-- animated bounce -->
      <div class="decoration">🎀</div>  <!-- animated bounce -->
    </div>
  </div>

</div>
```

---

## Animation Keyframes

### Theme Transition (600ms)

```css
/* CSS Custom Properties transition smoothly */
@media (prefers-reduced-motion: no-preference) {
  :root {
    transition:
      --bg-1 600ms cubic-bezier(0.4, 0, 0.2, 1),
      --bg-2 600ms cubic-bezier(0.4, 0, 0.2, 1),
      --primary-1 600ms cubic-bezier(0.4, 0, 0.2, 1),
      --primary-2 600ms cubic-bezier(0.4, 0, 0.2, 1),
      --primary-3 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }
}
```

### Vibe Meter Spinner (1000ms)

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.vibe-spinner {
  animation: spin 1s linear infinite;
}
```

### SVG Ring Progress (1200ms)

```css
/* Smooth stroke-dashoffset animation */
.vibe-ring {
  stroke-dasharray: 565.48;  /* Full circumference */
  stroke-dashoffset: 565.48; /* Start empty */
  transition: stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Final state: 92% filled */
.vibe-ring.complete {
  stroke-dashoffset: ~45;  /* 565.48 - (565.48 * 0.92) */
}
```

### Ticket Decoration Bounce (1500ms)

```css
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.decoration {
  animation: bounce 1.5s ease-in-out infinite;
}
```

---

## Event System

### Global Events Triggered

```javascript
// Theme Applied Event
window.dispatchEvent(new CustomEvent('themeApplied', {
  detail: {
    theme: 'coffee',
    message: 'Coffee theme activated'
  }
}));

// Can listen to this event
window.addEventListener('themeApplied', (e) => {
  console.log('Theme changed:', e.detail.theme);
  // Send to analytics, etc.
});
```

### State Management

```javascript
// Global state in app.js
const state = {
  currentStep: 1,
  profile: {
    firstName: '',
    lastName: '',
    interests: [],
  },
  selectedDate: '',
  selectedTime: '',
  selectedActivity: '',
  selectedSuggestion: '',
  instagram: '',
  telegram: '',
  phone: '',
};

// Modified by:
// - bindNameStep() - updates profile
// - bindInterestsStep() - updates interests
// - bindScheduleStep() - updates date/time
// - bindActivityStep() - updates activity
// - bindSuggestionStep() - updates suggestion
// - bindContactStep() - updates contact + generates ticket
```

---

## Performance Optimization Strategies

### Animation Performance

```javascript
// Use requestAnimationFrame for smooth animations
const animatePercentage = (targetPercentage) => {
  const startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / 1200, 1);

    // Use cubic-out easing for natural feel
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOutCubic * targetPercentage);

    updateUI(current);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};
```

### CSS Transform-Only Animations

```css
/* ✓ GPU-accelerated - no reflow */
transform: translateY(-300px);
transform: scale(0.8);
transform: rotate(360deg);
opacity: 0;

/* ✗ Avoid - causes reflow */
left: 100px;
top: 50px;
width: 200px;
```

### Lazy Loading

```javascript
// html2canvas loaded only when needed
if (!window.html2canvas) {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/.../html2canvas.min.js';
  document.head.appendChild(script);
}
```

---

## Data Flow

### User Input → Theme Change

```
1. User clicks chip (e.g., "کافه")
   └─ Event: click on .chip element

2. Listener detects selection
   └─ app.js: bindInterestsStep()

3. State updated
   └─ state.profile.interests.push('کافه')

4. Theme system notified
   └─ premium-features.js: updateThemeFromInterests()

5. Theme applied
   └─ Apply coffee theme colors + steam effect

6. Preference saved
   └─ localStorage.setItem('selectedTheme', 'coffee')
```

### User Input → Vibe Meter → Ticket

```
1. User selects suggestion
   └─ state.selectedSuggestion = 'کافه + گفت‌وگو'

2. User clicks continue
   └─ bindSuggestionStep() triggered

3. Vibe meter shown
   └─ goToStep(10)
   └─ VibeMeter.show()

4. Meter animates for ~5s
   └─ Loading → Reveal → Auto-proceed

5. Contact info step shown
   └─ goToStep(11)

6. User enters contact
   └─ state.instagram/telegram/phone set

7. User clicks continue
   └─ bindContactStep() triggered

8. Ticket data prepared
   └─ TicketGenerator.setData({...})

9. Ticket shown
   └─ goToStep(12)
   └─ TicketGenerator.show()

10. User downloads/shares
    └─ TicketGenerator.downloadAsImage()
    └─ TicketGenerator.shareTicket()

11. User completes
    └─ Final email sent
    └─ goToStep(13)
```

---

## Browser API Usage

### Used APIs

```javascript
// LocalStorage - Save theme preference
localStorage.setItem('selectedTheme', 'coffee');
localStorage.getItem('selectedTheme');

// Clipboard API - Share fallback
navigator.clipboard.writeText(shareText);

// Share API - Native sharing
navigator.share({
  title: 'Date Invitation',
  text: 'Check out my invitation!'
});

// Canvas API - Image export fallback
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.toDataURL('image/png');

// RequestAnimationFrame - Smooth animations
requestAnimationFrame(animateFrame);

// Custom Events - Feature tracking
window.dispatchEvent(new CustomEvent('themeApplied'));
```

### External CDN APIs

```html
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Vazirmatn...">

<!-- UI Framework -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Date Picker -->
<script src="https://cdn.jsdelivr.net/.../persian-datepicker.min.js">

<!-- Email Service -->
<script src="https://cdn.jsdelivr.net/.../emailjs-com@3.2.0.min.js">

<!-- Image Export (Loaded on demand) -->
<script src="https://cdnjs.cloudflare.com/.../html2canvas.min.js">
```

---

## Module Interfaces

### ThemeSystem API

```javascript
ThemeSystem.themes                    // Object of theme definitions
ThemeSystem.currentTheme              // Current theme name (string)
ThemeSystem.init()                    // Initialize theme system
ThemeSystem.applyTheme(name)          // Apply theme by name
ThemeSystem.updateThemeFromInterests()// Auto-apply based on interests
ThemeSystem.applyEffect(type)         // Apply visual effect
ThemeSystem.removeEffects()           // Remove all effects
ThemeSystem.loadThemeFromStorage()    // Load saved preference
```

### VibeMeter API

```javascript
VibeMeter.messages                    // Array of loading messages
VibeMeter.resultMessages              // Object of result messages
VibeMeter.isAnimating                 // Current animation state (boolean)
VibeMeter.show(containerId)           // Show meter in container
VibeMeter.startAnimation()            // Start animation sequence
VibeMeter.changeLoadingMessages()     // Cycle through messages
VibeMeter.showResult()                // Reveal result
VibeMeter.animatePercentage(number)   // Animate percentage
VibeMeter.animateRing(percentage)     // Animate SVG ring
```

### TicketGenerator API

```javascript
TicketGenerator.ticketData            // Current ticket data object
TicketGenerator.init()                // Initialize (load html2canvas)
TicketGenerator.setData(userData)     // Set user data
TicketGenerator.generateHTML()        // Generate HTML markup
TicketGenerator.generateBarcodePattern()  // Create SVG barcode
TicketGenerator.show(containerId)     // Display in container
TicketGenerator.downloadAsImage()     // Download as PNG
TicketGenerator.downloadAsImageFallback() // Fallback method
TicketGenerator.shareTicket()         // Share via APIs
```

---

This comprehensive reference covers the entire architecture, flow, and implementation of the three premium features!
