const TOTAL_STEPS = 9;

const state = {
  currentStep: 1,
  profile: {
    firstName: "",
    lastName: "",
    interests: []
  },
  selectedDate: "",
  selectedTime: "",
  selectedActivity: "",
  selectedSuggestion: "",
  noAttempts: 0
};

const activitySuggestions = {
  "کافه": [
    {
      title: "کافه دنج + گفت‌وگوی طولانی",
      desc: "اول یک کافه آروم با نور ملایم، بعدش یک گفت‌وگوی راحت و بدون عجله."
    },
    {
      title: "کافه + پیاده‌روی کوتاه",
      desc: "بعد از نوشیدنی، یک پیاده‌روی سبک و صمیمی برای ادامه حال خوب."
    },
    {
      title: "کافه + دسر مشترک",
      desc: "یک کافه خوب با یک دسر ساده که فضا را شیرین‌تر و بامزه‌تر می‌کند."
    }
  ],
  "پیاده‌روی": [
    {
      title: "پیاده‌روی عصرگاهی + نوشیدنی",
      desc: "شروع با قدم‌زدن در یک مسیر خوب و بعدش یک نوشیدنی takeaway."
    },
    {
      title: "پیاده‌روی + عکاسی یادگاری",
      desc: "اگر فضا خوب بود، چند عکس ساده و قشنگ هم می‌تونه خاطره‌اش را بهتر کند."
    },
    {
      title: "پیاده‌روی + بستنی",
      desc: "یک قرار سبک، بدون فشار، با پایان خوش و ساده."
    }
  ],
  "سینما": [
    {
      title: "سینما + کافه بعدش",
      desc: "فیلم ببینید و بعدش درباره‌اش حرف بزنید؛ این مدل قرار معمولاً خیلی خوب جواب می‌دهد."
    },
    {
      title: "فیلم سبک + گفت‌وگوی کوتاه",
      desc: "یک فیلم خوب با فضای راحت، بدون اینکه قرار زیادی رسمی یا خشک شود."
    },
    {
      title: "سینما + قدم‌زدن کوتاه",
      desc: "بعد از فیلم، کمی قدم‌زدن باعث می‌شود ارتباط بهتر و طبیعی‌تر شود."
    }
  ],
  "رستوران": [
    {
      title: "شام سبک + دسر",
      desc: "یک فضای کلاسیک، مرتب و کمی رسمی‌تر برای یک قرار جدی‌تر."
    },
    {
      title: "رستوران دنج + گفت‌وگوی طولانی",
      desc: "اگر هدفت شناخت بیشتر و فضای عمیق‌تر است، این انتخاب خیلی خوب است."
    },
    {
      title: "رستوران + قدم‌زدن بعدش",
      desc: "بعد از غذا، یک پیاده‌روی کوتاه قرار را از حالت خشک خارج می‌کند."
    }
  ],
  "بستنی": [
    {
      title: "بستنی + قدم‌زدن سبک",
      desc: "قرار شاد، ساده و کم‌فشار که حس خوبی می‌سازد."
    },
    {
      title: "بستنی + نشستن در فضای باز",
      desc: "اگر هوا خوب باشد، انتخابی جمع‌وجور ولی جذاب است."
    },
    {
      title: "بستنی + گشت شهری",
      desc: "برای فضای غیررسمی و راحت، این مدل خیلی طبیعی و خوب است."
    }
  ],
  "کتاب‌فروشی": [
    {
      title: "کتاب‌فروشی + کافه",
      desc: "اول کتاب‌فروشی، بعد یک کافه آرام؛ ترکیب خاص، متفاوت و باکلاس."
    },
    {
      title: "کتاب‌گردی + گفت‌وگوی عمیق",
      desc: "اگر اهل حرف‌های عمیق و سلیقه مشترک باشید، این انتخاب خیلی قشنگ می‌شود."
    },
    {
      title: "کتاب + قدم‌زدن",
      desc: "یک قرار آروم، کم‌هیاهو و متفاوت از کلیشه‌های معمول."
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  initHearts();
  bindGeneralNavigation();
  bindProfileStep();
  bindQuestionStep();
  bindScheduleStep();
  bindActivityStep();
  bindSuggestionStep();
  bindFinalStep();
  initDatePicker();
  updateProgress();
});

function bindGeneralNavigation() {
  document.querySelectorAll("[data-next]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetStep = Number(btn.dataset.next);
      goToStep(targetStep);
    });
  });
}

function goToStep(stepNumber) {
  document.querySelectorAll(".step").forEach((step) => {
    step.classList.remove("active");
  });

  const nextStep = document.getElementById(`step${stepNumber}`);
  if (nextStep) {
    nextStep.classList.add("active");
    state.currentStep = stepNumber;
    updateProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function updateProgress() {
  const progress = ((state.currentStep - 1) / (TOTAL_STEPS - 1)) * 100;
  const progressBar = document.getElementById("progressBar");
  const stepLabel = document.getElementById("stepLabel");
  const dots = document.querySelectorAll(".step-dot");

  progressBar.style.width = `${progress}%`;
  stepLabel.textContent = `مرحله ${state.currentStep} از ${TOTAL_STEPS}`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === state.currentStep - 1);
  });
}

function bindProfileStep() {
  const chips = document.querySelectorAll(".chip");
  const saveProfileBtn = document.getElementById("saveProfileBtn");
  const profileError = document.getElementById("profileError");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chip.classList.toggle("selected");
      const interest = chip.dataset.interest;

      if (state.profile.interests.includes(interest)) {
        state.profile.interests = state.profile.interests.filter((i) => i !== interest);
      } else {
        state.profile.interests.push(interest);
      }
    });
  });

  saveProfileBtn.addEventListener("click", () => {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();

    if (!firstName || state.profile.interests.length === 0) {
      profileError.classList.remove("hidden");
      return;
    }

    profileError.classList.add("hidden");

    state.profile.firstName = firstName;
    state.profile.lastName = lastName;

    personalizeTexts();
    goToStep(3);
  });
}

function personalizeTexts() {
  const fullName = `${state.profile.firstName} ${state.profile.lastName}`.trim();
  const firstName = state.profile.firstName || "تو";

  document.getElementById("introText").innerHTML = `
    ${fullName} عزیز،
    <br />
    من علیرضا هستم؛ طرفدار گفت‌وگوی خوب، حس خوب، و قرارهای ساده ولی به‌یادموندنی.
  `;

  document.getElementById("questionTitle").textContent = `${firstName}، با من میای بریم دیت؟ 💖`;

  document.getElementById("celebrateText").textContent =
    `${firstName}، واقعاً خوشحالم که قبول کردی. حالا بریم بهترین حالت این قرار رو باهم بچینیم.`;
}

function bindQuestionStep() {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const noHint = document.getElementById("noHint");
  const questionArea = document.getElementById("questionArea");

  yesBtn.addEventListener("click", () => {
    goToStep(5);
  });

  const moveNoButton = () => {
    state.noAttempts += 1;

    const areaRect = questionArea.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = Math.max(0, areaRect.width - btnRect.width - 10);
    const maxY = Math.max(0, areaRect.height - btnRect.height - 10);

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.classList.add("moving");
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    if (state.noAttempts >= 2) {
      noHint.classList.remove("hidden");
    }

    if (state.noAttempts >= 5) {
      noHint.textContent = "به نظرم این دکمه از اول هم انتخاب درستی نبود 😌";
    }
  };

  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
  }, { passive: false });

  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveNoButton();
  });
}

function initDatePicker() {
  const today = new persianDate();
  const nextWeek = new persianDate().add("days", 7);

  $("#dateInput").persianDatepicker({
    format: "YYYY/MM/DD",
    initialValue: false,
    autoClose: true,
    minDate: today,
    maxDate: nextWeek,
    onSelect: function () {
      const value = document.getElementById("dateInput").value;
      state.selectedDate = value;
      updateSchedulePreview();
    }
  });

  document.getElementById("timeInput").addEventListener("change", (e) => {
    state.selectedTime = e.target.value;
    updateSchedulePreview();
  });
}

function updateSchedulePreview() {
  const preview = document.getElementById("schedulePreview");

  if (state.selectedDate && state.selectedTime) {
    preview.textContent = `عالیه، پس فعلاً ${state.selectedDate} ساعت ${state.selectedTime} در نظر گرفته شده ✨`;
    preview.classList.remove("hidden");
  } else {
    preview.classList.add("hidden");
  }
}

function bindScheduleStep() {
  const saveScheduleBtn = document.getElementById("saveScheduleBtn");
  const scheduleError = document.getElementById("scheduleError");

  saveScheduleBtn.addEventListener("click", () => {
    const dateValue = document.getElementById("dateInput").value.trim();
    const timeValue = document.getElementById("timeInput").value.trim();

    if (!dateValue || !timeValue) {
      scheduleError.classList.remove("hidden");
      return;
    }

    scheduleError.classList.add("hidden");
    state.selectedDate = dateValue;
    state.selectedTime = timeValue;

    goToStep(7);
  });
}

function bindActivityStep() {
  const activityCards = document.querySelectorAll(".activity-card");
  const saveActivityBtn = document.getElementById("saveActivityBtn");
  const activityError = document.getElementById("activityError");

  activityCards.forEach((card) => {
    card.addEventListener("click", () => {
      activityCards.forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      state.selectedActivity = card.dataset.activity;
    });
  });

  saveActivityBtn.addEventListener("click", () => {
    if (!state.selectedActivity) {
      activityError.classList.remove("hidden");
      return;
    }

    activityError.classList.add("hidden");
    renderSuggestions();
    goToStep(8);
  });
}

function renderSuggestions() {
  const wrap = document.getElementById("suggestionsWrap");
  wrap.innerHTML = "";

  const suggestions = buildSmartSuggestions();

  suggestions.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.className = "suggestion-card";
    btn.type = "button";
    btn.dataset.index = index;
    btn.dataset.title = item.title;
    btn.dataset.desc = item.desc;

    btn.innerHTML = `
      <span class="suggestion-title">${item.title}</span>
      <span class="suggestion-desc">${item.desc}</span>
    `;

    btn.addEventListener("click", () => {
      document.querySelectorAll(".suggestion-card").forEach((card) => {
        card.classList.remove("selected");
      });

      btn.classList.add("selected");
      state.selectedSuggestion = `${item.title} - ${item.desc}`;
    });

    wrap.appendChild(btn);
  });
}

function buildSmartSuggestions() {
  const baseSuggestions = activitySuggestions[state.selectedActivity] || [];
  const interests = state.profile.interests;

  return baseSuggestions.map((item) => {
    let smartDesc = item.desc;

    if (interests.includes("موسیقی")) {
      smartDesc += " اگر موزیک خوب هم همراهش باشد، فضا خیلی دلنشین‌تر می‌شود.";
    }

    if (interests.includes("پیاده‌روی") && !smartDesc.includes("پیاده")) {
      smartDesc += " حتی می‌شود آخرش یک پیاده‌روی کوتاه هم بهش اضافه کرد.";
    }

    if (interests.includes("بستنی") && state.selectedActivity !== "بستنی") {
      smartDesc += " اگر خواستی می‌شود با یک بستنی خوشحال‌کننده هم تمامش کرد.";
    }

    if (interests.includes("کتاب") && state.selectedActivity === "کافه") {
      smartDesc += " برای آدم‌های اهل کتاب، کافه‌های آرام معمولاً انتخاب خیلی خوبی هستند.";
    }

    if (state.selectedTime && ["19:00", "19:30", "20:00", "20:30"].includes(state.selectedTime)) {
      smartDesc += " چون ساعت انتخابی عصر به شب نزدیکه، نور و فضای قرار هم رمانتیک‌تر میشه.";
    }

    return {
      title: item.title,
      desc: smartDesc
    };
  });
}

function bindSuggestionStep() {
  const finishBtn = document.getElementById("finishBtn");
  const suggestionError = document.getElementById("suggestionError");

  finishBtn.addEventListener("click", () => {
    if (!state.selectedSuggestion) {
      suggestionError.classList.remove("hidden");
      return;
    }

    suggestionError.classList.add("hidden");
    fillSummary();
    goToStep(9);
  });
}

function fillSummary() {
  const fullName = `${state.profile.firstName} ${state.profile.lastName}`.trim();

  document.getElementById("summaryName").textContent = fullName || state.profile.firstName;
  document.getElementById("summaryDate").textContent = state.selectedDate;
  document.getElementById("summaryTime").textContent = state.selectedTime;
  document.getElementById("summaryActivity").textContent = state.selectedActivity;
  document.getElementById("summarySuggestion").textContent = state.selectedSuggestion;

  document.getElementById("finalMessageText").textContent =
    `${state.profile.firstName}، خوشحال شدم که این قرار رو قبول کردی. پس ${state.selectedDate} ساعت ${state.selectedTime} می‌بینمت 🌹`;
}

function bindFinalStep() {
  const restartBtn = document.getElementById("restartBtn");
  const copySummaryBtn = document.getElementById("copySummaryBtn");

  restartBtn.addEventListener("click", () => {
    resetApp();
  });

  copySummaryBtn.addEventListener("click", async () => {
    const text = `
نام: ${`${state.profile.firstName} ${state.profile.lastName}`.trim()}
تاریخ: ${state.selectedDate}
ساعت: ${state.selectedTime}
نوع قرار: ${state.selectedActivity}
پیشنهاد نهایی: ${state.selectedSuggestion}
    `.trim();

    try {
      await navigator.clipboard.writeText(text);
      copySummaryBtn.textContent = "کپی شد ✅";
      setTimeout(() => {
        copySummaryBtn.textContent = "کپی خلاصه قرار";
      }, 1800);
    } catch (err) {
      alert("کپی خودکار انجام نشد، ولی می‌تونی متن رو دستی برداری.");
    }
  });
}
function setupNoButton() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const card = noBtn.closest('.card');
    let attempts = 0;

    function escape() {
        attempts++;

        if (attempts >= 2) {
            document.getElementById('noHint').classList.remove('hidden');
        }

        const cardRect = card.getBoundingClientRect();
        const noRect = noBtn.getBoundingClientRect();
        const yesRect = yesBtn.getBoundingClientRect();

        const isMobile = window.innerWidth < 640;

        let x = 0;
        let y = 0;
        let safe = false;
        let maxTries = 20;

        while (!safe && maxTries > 0) {
            maxTries--;

            if (isMobile) {
                // موبایل: فرار بیشتر عمودی/کناری
                x = (Math.random() - 0.5) * 120;
                y = (Math.random() - 0.5) * 220;
            } else {
                // دسکتاپ: فرار آزادتر
                x = (Math.random() - 0.5) * 200;
                y = (Math.random() - 0.5) * 120;
            }

            const futureLeft = noRect.left + x;
            const futureTop = noRect.top + y;
            const futureRight = futureLeft + noRect.width;
            const futureBottom = futureTop + noRect.height;

            const overlap =
                futureRight > yesRect.left &&
                futureLeft < yesRect.right &&
                futureBottom > yesRect.top &&
                futureTop < yesRect.bottom;

            const insideCard =
                futureLeft >= cardRect.left + 10 &&
                futureTop >= cardRect.top + 10 &&
                futureRight <= cardRect.right - 10 &&
                futureBottom <= cardRect.bottom - 10;

            if (!overlap && insideCard) {
                safe = true;
            }
        }

        noBtn.style.position = 'relative';
        noBtn.style.zIndex = '5';
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    }

    noBtn.addEventListener('mouseenter', escape);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        escape();
    }, { passive: false });
}
function resetApp() {
  state.currentStep = 1;
  state.profile = {
    firstName: "",
    lastName: "",
    interests: []
  };
  state.selectedDate = "";
  state.selectedTime = "";
  state.selectedActivity = "";
  state.selectedSuggestion = "";
  state.noAttempts = 0;

  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("dateInput").value = "";
  document.getElementById("timeInput").value = "";

  document.querySelectorAll(".chip").forEach((chip) => chip.classList.remove("selected"));
  document.querySelectorAll(".activity-card").forEach((card) => card.classList.remove("selected"));
  document.querySelectorAll(".suggestion-card").forEach((card) => card.classList.remove("selected"));

  document.getElementById("profileError").classList.add("hidden");
  document.getElementById("scheduleError").classList.add("hidden");
  document.getElementById("activityError").classList.add("hidden");
  document.getElementById("suggestionError").classList.add("hidden");
  document.getElementById("schedulePreview").classList.add("hidden");
  document.getElementById("noHint").classList.add("hidden");
  document.getElementById("noBtn").style.left = "";
  document.getElementById("noBtn").style.top = "";
  document.getElementById("noBtn").classList.remove("moving");

  document.getElementById("suggestionsWrap").innerHTML = "";

  goToStep(1);
}

function initHearts() {
  const container = document.getElementById("hearts-bg");

  setInterval(() => {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.5 ? "💖" : "💕";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${6 + Math.random() * 5}s`;
    heart.style.fontSize = `${12 + Math.random() * 16}px`;

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 12000);
  }, 650);
}
