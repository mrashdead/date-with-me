const TOTAL_STEPS = 13;

const state = {
  currentStep: 1,
  profile: {
    firstName: "",
    lastName: "",
    interests: [],
  },
  selectedDate: "",
  selectedTime: "",
  selectedDay: "",
  selectedTimeSlot: "",
  selectedDayLabel: "",
  selectedTimeLabel: "",
  selectedActivity: "",
  selectedSuggestion: "",
  instagram: "",
  telegram: "",
  phone: "",
  noAttempts: 0,
  boyfriendClickCount: 0,
  boyfriendEmailSent: false,
  submissionStarted: false,
};

let siteContent = null;

let activitySuggestions = {
  کافه: [
    {
      title: "کافه‌ دارکو + گپ دونفره آرام",
      desc: "یه قهوه تلخ و گفت‌وگوی بی‌عجله و بی‌استرس برای شناخت بهتر همدیگه.",
    },
    {
      title: "کافه باغ‌های قصردشت + عصرونه دونفره",
      desc: "تو گرمای آتیشی زیر درخت‌های خنک خیابان‌های قصردشت قدم بزنیم و از کافه‌هاش لذت ببریم.",
    },
    {
      title: "کافه انتخاب تو",
      desc: "خیلی خوشحال میشم منو به کافه مورد علاقت ببری و بتونیم یه گپ جذاب رو تجربه کنیم.",
    },
  ],
  پیاده‌روی: [
    {
      title: "چمران‌گردی + نوشیدنی بعدش",
      desc: "یک پیاده‌روی سبک ۳۰ تا ۴۵ دقیقه‌ای و بعدش یک آبمیوه، قهوه سرد یا چای.",
    },
    {
      title: "بازار وکیل + مغازه‌گردی",
      desc: "تو شلوغی‌های بازار بین مردم قدم بزنیم و از کوچه پس کوچه‌های شهر لذت ببریم.",
    },
    {
      title: "مسیر قلب تو",
      desc: "خیلی مسیریابیم خوب نیست، میتونی درحالی که اومدم دنبالت مسیر قلبت رو هم نشونم بدی و باهم تا اونجا بریم.",
    },
  ],
  سینما: [
    {
      title: "سینما + پاپ‌کورن",
      desc: "یه فیلم جذاب انتخاب کنیم و تو تاریکی سالن پاپ‌کورن بزنیم، بعدش درباره فیلم، شخصیت‌ها و سکانس‌ها حرف بزنیم.",
    },
    {
      title: "تئاتر و نمایش زنده",
      desc: "هیچی مثل یک نمایش زنده ما رو به واقعیت‌ها نزدیک نمیکنه؛ به نظرم لذت‌بخشه که غرق در نمایش بشیم.",
    },
    {
      title: "مسابقه خیره شدن به همدیگر",
      desc: "هیچ فیلم و نمایشی نمیتونه از نگاه کردن به تو برای من جذاب‌تر باشه؛ به نظرم میتونیم ساعت‌ها بهم خیره بشیم و داستان خودمون رو بشنویم.",
    },
  ],
  رستوران: [
    {
      title: "یه وعده خفن",
      desc: "یه رستوران برای خوردن یه غذای دلچسب و بحث کردن راجب سلیقه‌هامون.",
    },
    {
      title: "اسنک و ساندویچی",
      desc: "هیچی مثل خوردن هله‌هوله مثل پاستیل و ترشی و خوراکی‌های مضر جذاب‌تر نیست که ما رو بخندونه.",
    },
    {
      title: "غذای خونگی",
      desc: "یه مسابقه جذاب برای چشیدن دستپخت همدیگه.",
    },
  ],
  بستنی: [
    {
      title: "بستنی میوه‌ای",
      desc: "بعضی چیزا تجربه‌ی اولش خوبه؛ خوردن بستنی میوه‌ای که انتخاب شخص خودت باشه همیشه خوبه.",
    },
    {
      title: "بستنی و فالوده پشت ارگ",
      desc: "تو این گرمای تابستون، فقط فالوده و بستنی‌های پشت ارگ کریم‌خان می‌چسبه.",
    },
    {
      title: "بستنی دکه‌ای و خیابون‌گردی",
      desc: "انتخاب لوکسی نیست ولی یه حس خودمونی و دوستانه بهمون میده که من خیلی دوسش دارم.",
    },
  ],
  کتاب‌فروشی: [
    {
      title: "بوک‌لند",
      desc: "فضای کتاب خوندن همیشه حس آرامش بهم میده؛ میتونیم بریم یه جزیره‌ای که پر از کتابه و توش گم بشیم.",
    },
    {
      title: "کتاب‌گردی + انتخاب کتاب برای هم",
      desc: "لوکیشن: بوک‌لند شیراز مال یا کتاب‌فروشی‌های خوب شیراز. هر نفر برای طرف مقابل یک کتاب، جلد یا حتی یک جمله از کتاب انتخاب کنه؛ این کار خیلی شخصیت‌سنجی خوبی میده.",
    },
    {
      title: "کتاب + گپ عمیق در کافه",
      desc: "لوکیشن: نزدیک ستارخان یا خاک‌شناسی. اگر هر دو اهل گفت‌وگوی عمیق هستید، یک کتاب‌فروشی را با یک کافه خلوت ترکیب کنید تا فضا خیلی بالغ و خاص بشه.",
    },
  ],
  "گیم کلاب": [
    {
      title: "گیم کلاب",
      desc: "وقت کل‌کل کردن سر بردن و باختنه، ولی برنده نهایی تویی.",
    },
    {
      title: "بیلیارد",
      desc: "در کمال آرامش وقتی باهم گپ می‌زنیم، آروم به توپ‌های بیلیارد ضربه می‌زنیم که آروم‌آروم از روی میز کم بشن.",
    },
    {
      title: "برد گیم",
      desc: "میشه مثل بچگی‌ها با بازی‌های کارتی کلی خندید و لذت برد؛ درحالی که هیچی از هم نمیدونیم شروع می‌کنیم به شناخت هم.",
    },
  ],
};


document.addEventListener("DOMContentLoaded", () => {
  fetchSiteContent()
    .then((content) => {
      siteContent = content;
      applySiteContent(content);
    })
    .catch((error) => {
      console.warn("Site content could not be loaded; using built-in content.", error);
    })
    .finally(initializeApp);
});

function initializeApp() {
  initBackgroundCreatures();
  bindGeneralNavigation();
  bindNameStep();
  bindInterestsStep();
  bindQuestionStep();
  bindScheduleStep();
  bindActivityStep();
  bindSuggestionStep();
  bindContactStep();
  bindFinalStep();
  initDatePicker();
  updateProgress();
  ensureEmailJSReady().catch(() => {});
}

function fetchSiteContent() {
  const contentUrl = new URL("./content/site.json", document.baseURI);
  return fetch(contentUrl).then((response) => {
    if (!response.ok) throw new Error(`Content request failed (${response.status})`);
    return response.json();
  });
}

function applySiteContent(content) {
  if (content.copy && typeof content.copy === "object") {
    document.querySelectorAll("[data-site-copy]").forEach((element) => {
      const value = content.copy[element.dataset.siteCopy];
      if (typeof value === "string") element.textContent = value;
    });

    if (typeof content.copy.pageTitle === "string") {
      document.title = content.copy.pageTitle;
    }
  }

  if (Array.isArray(content.interests)) {
    renderInterestOptions(content.interests);
    if (window.ThemeSystem) window.ThemeSystem.setupThemeListeners();
  }
  if (Array.isArray(content.activities)) renderActivityOptions(content.activities);
  applyNameSettings(content.nameSettings);
  renderScheduleOptions(content.schedule);
  if (content.suggestions && typeof content.suggestions === "object") {
    activitySuggestions = content.suggestions;
  }
}

function applyNameSettings(settings = {}) {
  const firstName = typeof settings.firstName === "string" ? settings.firstName.trim() : "";
  const lastName = typeof settings.lastName === "string" ? settings.lastName.trim() : "";

  document.getElementById("firstName").value = firstName;
  document.getElementById("lastName").value = lastName;

  if (settings.skipNameStep && firstName) {
    state.profile.firstName = firstName;
    state.profile.lastName = lastName;
  }
}

function shouldSkipNameStep() {
  const settings = siteContent?.nameSettings;
  const firstName = typeof settings?.firstName === "string" ? settings.firstName.trim() : "";
  return Boolean(settings?.skipNameStep && firstName);
}

function renderScheduleOptions(schedule) {
  if (!schedule || !Array.isArray(schedule.days) || !Array.isArray(schedule.times)) return;
  if (!schedule.days.length || !schedule.times.length) return;

  const enabledDays = schedule.days.filter((day) => day.enabled !== false);
  const enabledTimes = schedule.times.filter((time) => time.enabled !== false);

  const daysWrap = document.getElementById("dateOptionsWrap");
  const timesWrap = document.getElementById("timeOptionsWrap");
  if (!daysWrap || !timesWrap) return;

  daysWrap.replaceChildren();
  enabledDays.forEach((day) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "activity-card day-card";
    button.dataset.day = day.value;
    button.dataset.label = day.label;
    button.textContent = day.label;
    daysWrap.append(button);
  });

  timesWrap.replaceChildren();
  enabledTimes.forEach((time) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chip time-chip";
    button.dataset.time = time.value;
    button.dataset.label = time.label;
    button.textContent = time.label;
    timesWrap.append(button);
  });

  selectSingleScheduleDefaults();
}

function selectSingleScheduleDefaults() {
  const dayButtons = Array.from(document.querySelectorAll(".day-card"));
  const timeButtons = Array.from(document.querySelectorAll(".time-chip"));

  state.selectedDay = "";
  state.selectedDayLabel = "";
  state.selectedTimeSlot = "";
  state.selectedTimeLabel = "";

  if (dayButtons.length === 1) {
    dayButtons[0].classList.add("selected");
    state.selectedDay = dayButtons[0].dataset.day;
    state.selectedDayLabel = dayButtons[0].dataset.label || dayButtons[0].textContent.trim();
  }

  if (timeButtons.length === 1) {
    timeButtons[0].classList.add("selected");
    state.selectedTimeSlot = timeButtons[0].dataset.time;
    state.selectedTimeLabel = timeButtons[0].dataset.label || timeButtons[0].textContent.trim();
  }
}

function renderInterestOptions(interests) {
  const wrap = document.getElementById("interestsWrap");
  if (!wrap) return;

  wrap.replaceChildren();
  interests.forEach((interest) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chip";
    button.dataset.interest = interest.value;
    button.append(document.createTextNode(interest.label));

    if (interest.symbol) {
      const symbol = document.createElement("span");
      symbol.className = "option-symbol";
      symbol.setAttribute("aria-hidden", "true");
      symbol.textContent = interest.symbol;
      button.append(" ", symbol);
    }

    wrap.append(button);
  });
}

function renderActivityOptions(activities) {
  const wrap = document.getElementById("activitiesWrap");
  if (!wrap) return;

  wrap.replaceChildren();
  activities.forEach((activity) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "activity-card";
    button.dataset.activity = activity.value;

    const symbol = document.createElement("span");
    symbol.className = "emoji";
    symbol.setAttribute("aria-hidden", "true");
    symbol.textContent = activity.symbol || "•";

    const title = document.createElement("h3");
    title.textContent = activity.title;

    const description = document.createElement("p");
    description.textContent = activity.description;

    button.append(symbol, title, description);
    wrap.append(button);
  });
}

function bindGeneralNavigation() {
  document.querySelectorAll("[data-next]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetStep = Number(btn.dataset.next);
      goToStep(targetStep);
    });
  });
}

function goToStep(stepNumber) {
  if (stepNumber === 2 && shouldSkipNameStep()) {
    state.profile.firstName = siteContent.nameSettings.firstName.trim();
    state.profile.lastName = (siteContent.nameSettings.lastName || "").trim();
    stepNumber = 3;
  }

  if (stepNumber === 11 && siteContent?.contactSettings?.enabled === false) {
    submitInvite();
    return;
  }

  document.querySelectorAll(".step").forEach((step) => {
    step.classList.remove("active");
  });

  const nextStep = document.getElementById(`step${stepNumber}`);
  if (nextStep) {
    nextStep.classList.add("active");
    state.currentStep = stepNumber;
    updateProgress();
    if (stepNumber === 7) {
      updateSchedulePreview();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function sendViaEmailJS(data) {
  const emailjsInstance = window.emailjs || emailjs;

  if (!emailjsInstance || typeof emailjsInstance.send !== "function") {
    console.warn("EmailJS is not available yet. Waiting for the SDK to initialize...");
    return Promise.resolve();
  }

  console.log("EmailJS payload:", data);

  return emailjsInstance
    .send("service_9bk9nyb", "template_jn3mrcu", data, "3rADitjzNZUmkE1RX")
    .then(function (response) {
      console.log("EmailJS SUCCESS!", response.status, response.text);
    })
    .catch(function (error) {
      console.error("EmailJS FAILED...", error);
      return sendToFallbackEndpoint(data);
    });
}

function sendToFallbackEndpoint(data) {
  const fallbackPayload = {
    name: data.fullName || data.firstName || "ناشناس",
    phone: data.phone || "",
    message: [
      `وضعیت: ${data.accepted || "دوست پسر دارد"}`,
      `نام: ${data.fullName || data.firstName || ""}`,
      `نام خانوادگی: ${data.lastName || ""}`,
      `علاقه‌ها: ${data.interests || ""}`,
      `فعالیت انتخاب‌شده: ${data.selectedActivity || ""}`,
      `روز: ${data.selectedDay || ""}`,
      `زمان: ${data.selectedTime || ""}`,
      `اینستاگرام: ${data.instagram || ""}`,
      `تلگرام: ${data.telegram || ""}`,
      `تلفن: ${data.phone || ""}`,
    ].join("\n"),
    accepted: data.accepted || "دوست پسر دارد",
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    fullName: data.fullName || "",
    interests: data.interests || "",
    selectedActivity: data.selectedActivity || "",
    selectedDay: data.selectedDay || "",
    selectedTime: data.selectedTime || "",
    instagram: data.instagram || "",
    telegram: data.telegram || "",
    phone: data.phone || "",
  };

  return fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fallbackPayload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Fallback endpoint returned a non-OK response");
      }
      return response.json().catch(() => ({}));
    })
    .then(() => {
      console.log("Fallback notification sent successfully.");
    })
    .catch((error) => {
      console.warn("Fallback notification failed:", error);
    });
}

function ensureEmailJSReady() {
  return new Promise((resolve) => {
    const tryInit = () => {
      if (window.emailjs && typeof window.emailjs.init === "function") {
        window.emailjs.init("3rADitjzNZUmkE1RX");
        resolve();
        return;
      }

      if (typeof emailjs !== "undefined" && typeof emailjs.init === "function") {
        emailjs.init("3rADitjzNZUmkE1RX");
        resolve();
        return;
      }

      window.setTimeout(tryInit, 100);
    };

    tryInit();
  });
}

function buildBoyfriendEmailData() {
  const fullName = `${state.profile.firstName} ${state.profile.lastName}`.trim();

  return {
    accepted: "دوست پسر دارد",
    firstName: state.profile.firstName || "",
    lastName: state.profile.lastName || "",
    fullName: fullName || "",
    interests: state.profile.interests.join(", ") || "",
    selectedActivity: state.selectedActivity || "",
    selectedDay: state.selectedDay || "",
    selectedTime: state.selectedTimeSlot || "",
    instagram: state.instagram || "",
    telegram: state.telegram || "",
    phone: state.phone || "",
  };
}

function showBoyfriendDialogue() {
  const questionArea = document.getElementById("questionArea");
  const boyfriendDialogue = document.getElementById("boyfriendDialogue");
  const boyfriendBtn = document.getElementById("boyfriendBtn");

  if (questionArea) {
    questionArea.classList.add("hidden");
  }

  if (boyfriendDialogue) {
    boyfriendDialogue.classList.remove("hidden");
  }

  if (boyfriendBtn) {
    boyfriendBtn.classList.add("opacity-80");
    boyfriendBtn.style.transform = "scale(0.35)";
  }
}

function updateProgress() {
  const skipNameStep = shouldSkipNameStep();
  const logicalStep = skipNameStep && state.currentStep > 2
    ? state.currentStep - 1
    : state.currentStep;
  const logicalTotal = TOTAL_STEPS - (skipNameStep ? 1 : 0);
  const progress = ((logicalStep - 1) / (logicalTotal - 1)) * 100;
  const progressBar = document.getElementById("progressBar");
  const stepLabel = document.getElementById("stepLabel");
  const dots = document.querySelectorAll(".step-dot");

  progressBar.style.width = `${progress}%`;
  stepLabel.textContent = `مرحله ${logicalStep} از ${logicalTotal}`;

  dots.forEach((dot, index) => {
    dot.hidden = skipNameStep && index === 1;
    const logicalIndex = skipNameStep && index > 1 ? index - 1 : index;
    dot.classList.toggle("active", logicalIndex === logicalStep - 1);
  });
}

function bindNameStep() {
  const saveNameBtn = document.getElementById("saveNameBtn");
  const nameError = document.getElementById("nameError");

  saveNameBtn.addEventListener("click", () => {
    const firstName = document.getElementById("firstName").value.trim();

    if (!firstName) {
      nameError.classList.remove("hidden");
      return;
    }

    nameError.classList.add("hidden");
    state.profile.firstName = firstName;
    state.profile.lastName = document.getElementById("lastName").value.trim();

    goToStep(3);
  });
}

function bindInterestsStep() {
  const chips = document.querySelectorAll(".chip");
  const saveInterestsBtn = document.getElementById("saveInterestsBtn");
  const interestError = document.getElementById("interestError");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chip.classList.toggle("selected");
      const interest = chip.dataset.interest;

      if (state.profile.interests.includes(interest)) {
        state.profile.interests = state.profile.interests.filter(
          (i) => i !== interest,
        );
      } else {
        state.profile.interests.push(interest);
      }
    });
  });

  saveInterestsBtn.addEventListener("click", () => {
    if (state.profile.interests.length === 0) {
      interestError.classList.remove("hidden");
      return;
    }

    interestError.classList.add("hidden");
    personalizeTexts();
    goToStep(4);
  });
}

function personalizeTexts() {
  const fullName =
    `${state.profile.firstName} ${state.profile.lastName}`.trim();
  const firstName = state.profile.firstName || "تو";
  const introText = document.getElementById("introText");
  const greeting = document.createElement("strong");
  greeting.textContent = `${fullName} عزیز،`;
  introText.replaceChildren(
    greeting,
    document.createElement("br"),
    document.createTextNode(siteContent?.copy?.storyText || "من علیرضام، از اون مدل آدما که یه گفت‌وگوی خوب براشون جذابه."),
  );

  document.getElementById("questionTitle").textContent =
    `${firstName}، ${siteContent?.copy?.questionTitle || "با من میای بریم دیت؟"}`;

  document.getElementById("celebrateText").textContent =
    `${firstName}، واقعاً خوشحالم که قبول کردی. بزن بریم ببینیم چه چیزی بیشتر به دلت می‌شینه.`;
}

function bindQuestionStep() {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const boyfriendBtn = document.getElementById("boyfriendBtn");
  const boyfriendDialogue = document.getElementById("boyfriendDialogue");
  const boyfriendYesBtn = document.getElementById("boyfriendYesBtn");
  const boyfriendNoBtn = document.getElementById("boyfriendNoBtn");
  const noHint = document.getElementById("noHint");
  const noButtonArena = document.getElementById("noButtonArena");
  let noButtonMoveLocked = false;

  yesBtn.addEventListener("click", () => {
    goToStep(6);
  });

  boyfriendYesBtn.addEventListener("click", () => {
    goToStep(7);
  });

  boyfriendNoBtn.addEventListener("click", () => {
    goToStep(13);
  });

  const moveNoButton = () => {
    if (noButtonMoveLocked) return;
    noButtonMoveLocked = true;
    window.setTimeout(() => {
      noButtonMoveLocked = false;
    }, 350);

    state.noAttempts += 1;

    const btnRect = noBtn.getBoundingClientRect();

    const maxX = Math.max(0, noButtonArena.clientWidth - btnRect.width - 16);
    const maxY = Math.max(0, noButtonArena.clientHeight - btnRect.height - 16);

    const randomX = 8 + Math.floor(Math.random() * maxX);
    const randomY = 8 + Math.floor(Math.random() * maxY);

    noBtn.classList.add("moving");
    noBtn.style.setProperty("--no-x", `${randomX}px`);
    noBtn.style.setProperty("--no-y", `${randomY}px`);

    if (state.noAttempts >= 2) {
      noHint.classList.remove("hidden");
    }

    if (state.noAttempts >= 5) {
      noHint.textContent = "به نظرم این دکمه از اول هم انتخاب درستی نبود 😌";
    }
  };

  noBtn.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") moveNoButton();
  });

  noBtn.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") {
      event.preventDefault();
      moveNoButton();
    }
  });

  noBtn.addEventListener("click", (event) => {
    if (event.detail === 0) {
      goToStep(13);
      return;
    }

    event.preventDefault();
  });

  boyfriendBtn.addEventListener("click", (e) => {
    e.preventDefault();

    state.boyfriendClickCount += 1;

    if (state.boyfriendClickCount === 1 && !state.boyfriendEmailSent) {
      state.boyfriendEmailSent = true;
      const payload = buildBoyfriendEmailData();
      console.log("Sending boyfriend notification", payload);
      ensureEmailJSReady().then(() => sendViaEmailJS(payload)).catch(() => {});
    }

    const scale =
      state.boyfriendClickCount === 1
        ? 0.7
        : state.boyfriendClickCount === 2
          ? 0.49
          : 0.35;

    boyfriendBtn.classList.add("transition-all", "duration-300", "ease-in-out");
    boyfriendBtn.style.transform = `scale(${scale})`;

    if (state.boyfriendClickCount >= 3) {
      showBoyfriendDialogue();
    }
  });

  if (boyfriendDialogue) {
    boyfriendDialogue.classList.add("hidden");
  }
}

function initDatePicker() {
  // Legacy datepicker removed. Use day/time-slot buttons instead.
  bindDayAndTimeButtons();
}

function bindDayAndTimeButtons() {
  const dayButtons = document.querySelectorAll('.day-card');
  const timeChips = document.querySelectorAll('.time-chip');

  dayButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      dayButtons.forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.selectedDay = btn.dataset.day;
      state.selectedDayLabel = btn.dataset.label || btn.textContent.trim();
      updateSchedulePreview();
    });
  });

  timeChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      timeChips.forEach((c) => c.classList.remove('selected'));
      chip.classList.add('selected');
      state.selectedTimeSlot = chip.dataset.time;
      state.selectedTimeLabel = chip.dataset.label || chip.textContent.trim();
      updateSchedulePreview();
    });
  });
}

function updateSchedulePreview() {
  const preview = document.getElementById("schedulePreview");

  if (state.selectedDay && state.selectedTimeSlot) {
    const dayLabel = state.selectedDayLabel || state.selectedDay;
    const timeLabel = state.selectedTimeLabel || state.selectedTimeSlot;
    preview.textContent = `عالیه، پس فعلاً ${dayLabel} — ${timeLabel} در نظر گرفته شده ✨`;
    preview.classList.remove("hidden");
  } else {
    preview.classList.add("hidden");
  }
}

function bindScheduleStep() {
  const saveScheduleBtn = document.getElementById("saveScheduleBtn");
  const scheduleError = document.getElementById("scheduleError");
  saveScheduleBtn.addEventListener("click", () => {
    if (!state.selectedDay || !state.selectedTimeSlot) {
      scheduleError.classList.remove("hidden");
      return;
    }

    scheduleError.classList.add("hidden");
    // keep selectedDay and selectedTimeSlot in state; clear legacy fields
    state.selectedDate = state.selectedDay;
    state.selectedTime = state.selectedTimeSlot === 'هماهنگ میکنیم' ? '' : state.selectedTimeSlot;

    goToStep(8);
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
    goToStep(9);
  });
}

function bindContactStep() {
  const saveContactBtn = document.getElementById("saveContactBtn");
  const contactError = document.getElementById("contactError");

  saveContactBtn.addEventListener("click", () => {
    const instagram = document.getElementById("instagramInput").value.trim();
    const telegram = document.getElementById("telegramInput").value.trim();
    const phone = document.getElementById("phoneInput").value.trim();

    if (!instagram && !telegram && !phone) {
      contactError.textContent = "لطفاً حداقل یک راه ارتباطی وارد کن.";
      contactError.classList.remove("hidden");
      return;
    }

    contactError.classList.add("hidden");
    state.instagram = instagram;
    state.telegram = telegram;
    state.phone = phone;

    submitInvite();
  });
}

function submitInvite() {
  if (state.submissionStarted) return;
  state.submissionStarted = true;

  const fullName = `${state.profile.firstName} ${state.profile.lastName}`.trim();
  const suggestionTitle = state.selectedSuggestion.split(" - ")[0];
  const dateValue = state.selectedDate || state.selectedDay || "ثبت نشده";
  const timeValue = state.selectedTime || state.selectedTimeSlot || "ثبت نشده";
  const dateLabel = state.selectedDayLabel || dateValue;
  const timeLabel = state.selectedTimeLabel || timeValue;

  TicketGenerator.setData({
    name: fullName || state.profile.firstName || 'مهمان',
    dateStyle: suggestionTitle,
    interests: state.profile.interests,
    dateTime: `${dateLabel} ${timeLabel}`,
  });

  const payload = {
    first_name: state.profile.firstName || "ناشناس",
    last_name: state.profile.lastName || "",
    interests: state.profile.interests.join(", ") || "",
    date: dateValue,
    time: timeValue,
    activity: state.selectedActivity || "",
    suggestion: state.selectedSuggestion || "",
    Instagram: state.instagram || "",
    instagram: state.instagram || "",
    telegram: state.telegram || "",
    phone: state.phone || "",
    final_answer: "accepted",
  };

  sendViaEmailJS(payload)
    .then(() => {
      goToStep(12);
      TicketGenerator.show('ticketContainer');
    })
    .catch(() => {
      alert("مشکلی در ارسال ایمیل رخ داد، ولی بلیت نمایش داده می‌شود.");
      goToStep(12);
      TicketGenerator.show('ticketContainer');
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

    const title = document.createElement("span");
    title.className = "suggestion-title";
    title.textContent = item.title;

    const description = document.createElement("span");
    description.className = "suggestion-desc";
    description.textContent = item.desc;

    btn.append(title, description);

    btn.addEventListener("click", () => {
      document.querySelectorAll(".suggestion-card").forEach((card) => {
        card.classList.remove("selected");
      });

      btn.classList.add("selected");
      state.selectedSuggestion = `${item.title} - ${item.desc}`;
      console.debug('suggestion selected:', state.selectedSuggestion);
    });

    wrap.appendChild(btn);
  });
}

function buildSmartSuggestions() {
  const baseSuggestions = activitySuggestions[state.selectedActivity] || [];

  return baseSuggestions.map((item) => ({
    title: item.title,
    desc: item.desc,
  }));
}


function bindSuggestionStep() {
  let finishBtn = document.getElementById("finishBtn");
  const suggestionError = document.getElementById("suggestionError");

  if (!finishBtn) {
    // Try again once if DOM wasn't ready for some reason
    finishBtn = document.querySelector('#finishBtn');
  }

  if (!finishBtn) {
    console.warn('finishBtn not found in DOM - suggestion step binding skipped');
    return;
  }

  finishBtn.addEventListener("click", () => {
    console.debug('finishBtn clicked, current selectedSuggestion:', state.selectedSuggestion);
    if (!state.selectedSuggestion) {
      if (suggestionError) suggestionError.classList.remove("hidden");
      return;
    }

    if (suggestionError) suggestionError.classList.add("hidden");

    // Show vibe meter and proceed to step 10
    goToStep(10);

    // Trigger vibe meter animation (if available) and auto-proceed
    setTimeout(() => {
      try {
        if (typeof VibeMeter !== 'undefined' && VibeMeter && VibeMeter.show) {
          VibeMeter.show('vibeMeterContainer');
        }
      } catch (e) {
        console.warn('VibeMeter error', e);
      }

      // Auto-proceed after meter completes
      setTimeout(() => {
        const cont = document.getElementById('continueAfterVibe');
        if (cont) cont.classList.remove('hidden');
        setTimeout(() => {
          goToStep(11);
        }, 2500);
      }, 4500);
    }, 500);
  });
}

function bindFinalStep() {
  // No final summary page in the new flow.
  // Ticket display is the final step after contact submission.
}
function resetApp() {
  state.currentStep = 1;
  state.profile = {
    firstName: "",
    lastName: "",
    interests: [],
  };
  state.selectedDate = "";
  state.selectedTime = "";
  state.selectedDay = "";
  state.selectedTimeSlot = "";
  state.selectedDayLabel = "";
  state.selectedTimeLabel = "";
  state.selectedActivity = "";
  state.selectedSuggestion = "";
  state.noAttempts = 0;
  state.boyfriendClickCount = 0;
  state.boyfriendEmailSent = false;
  state.submissionStarted = false;

  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  applyNameSettings(siteContent?.nameSettings);
  const dateEl = document.getElementById("dateInput");
  if (dateEl) dateEl.value = "";
  // clear selected UI states for day/time chips
  document.querySelectorAll('.day-card').forEach((b) => b.classList.remove('selected'));
  document.querySelectorAll('.time-chip').forEach((c) => c.classList.remove('selected'));

  document
    .querySelectorAll(".chip")
    .forEach((chip) => chip.classList.remove("selected"));
  document
    .querySelectorAll(".activity-card")
    .forEach((card) => card.classList.remove("selected"));
  document
    .querySelectorAll(".suggestion-card")
    .forEach((card) => card.classList.remove("selected"));
  selectSingleScheduleDefaults();

  document.getElementById("profileError").classList.add("hidden");
  document.getElementById("scheduleError").classList.add("hidden");
  document.getElementById("activityError").classList.add("hidden");
  document.getElementById("suggestionError").classList.add("hidden");
  document.getElementById("schedulePreview").classList.add("hidden");
  document.getElementById("noHint").classList.add("hidden");
  document.getElementById("noBtn").style.left = "";
  document.getElementById("noBtn").style.top = "";
  document.getElementById("noBtn").style.removeProperty("--no-x");
  document.getElementById("noBtn").style.removeProperty("--no-y");
  document.getElementById("noBtn").classList.remove("moving");

  const boyfriendBtn = document.getElementById("boyfriendBtn");
  const boyfriendDialogue = document.getElementById("boyfriendDialogue");
  const questionArea = document.getElementById("questionArea");

  if (boyfriendBtn) {
    boyfriendBtn.style.transform = "";
    boyfriendBtn.classList.remove("opacity-80");
  }

  if (boyfriendDialogue) {
    boyfriendDialogue.classList.add("hidden");
  }

  if (questionArea) {
    questionArea.classList.remove("hidden");
  }

  document.getElementById("suggestionsWrap").innerHTML = "";

  goToStep(1);
}

function initBackgroundCreatures() {
  const container = document.getElementById("creatures-bg");
  if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const creatures = [
    { emoji: "🐸", kind: "frog", left: "7%", top: "16%", delay: "-1.5s" },
    { emoji: "🐱", kind: "cat", left: "83%", top: "24%", delay: "-5s" },
    { emoji: "🐈", kind: "cat", left: "8%", top: "76%", delay: "-8s" },
    { emoji: "🐸", kind: "frog", left: "82%", top: "82%", delay: "-3.5s" },
  ];

  creatures.forEach((creature) => {
    const figure = document.createElement("span");
    figure.className = `background-creature background-creature--${creature.kind}`;
    figure.textContent = creature.emoji;
    figure.style.left = creature.left;
    figure.style.top = creature.top;
    figure.style.animationDelay = creature.delay;
    container.appendChild(figure);
  });
}
