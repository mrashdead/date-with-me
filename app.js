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
  selectedActivity: "",
  selectedSuggestion: "",
  instagram: "",
  telegram: "",
  phone: "",
  noAttempts: 0,
  boyfriendClickCount: 0,
  boyfriendEmailSent: false,
};

const activitySuggestions = {
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
  initHearts();
  bindGeneralNavigation();
  bindNameStep();
  bindInterestsStep();
  bindQuestionStep();
  bindScheduleStep();
  bindActivityStep();
  bindSuggestionStep();
  bindContactStep();
  bindFinalStep();
  TicketGenerator.init();
  initDatePicker();
  updateProgress();
  ensureEmailJSReady().catch(() => {});
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
    // If we navigate to the schedule step, ensure the Persian datepicker is initialized
    if (stepNumber === 7) {
      setTimeout(() => {
        try {
          // Initialize day/time buttons for schedule selection
          bindDayAndTimeButtons();
        } catch (err) {
          console.warn('Schedule init error:', err);
        }
      }, 60);
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

  document.getElementById("introText").innerHTML = `
    <h2>${fullName} عزیز،</h2>
    <br />
  من علیرضام،
از اون مدل آدما که یه قهوه و یه گفت‌وگوی خوب براشون از خیلی چیزا جذاب‌تره.
  `;

  document.getElementById("questionTitle").textContent =
    `${firstName}، بریم یه قرار خودمونی بچینیم؟`;

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
  const questionArea = document.getElementById("questionArea");

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
  noBtn.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      moveNoButton();
    },
    { passive: false },
  );

  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveNoButton();
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
      updateSchedulePreview();
    });
  });

  timeChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      timeChips.forEach((c) => c.classList.remove('selected'));
      chip.classList.add('selected');
      state.selectedTimeSlot = chip.dataset.time;
      updateSchedulePreview();
    });
  });
}

function updateSchedulePreview() {
  const preview = document.getElementById("schedulePreview");

  if (state.selectedDay && state.selectedTimeSlot) {
    preview.textContent = `عالیه، پس فعلاً ${state.selectedDay} — ${state.selectedTimeSlot} در نظر گرفته شده ✨`;
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

    const fullName = `${state.profile.firstName} ${state.profile.lastName}`.trim();
    const suggestionTitle = state.selectedSuggestion.split(" - ")[0];
    const dateValue = state.selectedDate || state.selectedDay || "ثبت نشده";
    const timeValue = state.selectedTime || state.selectedTimeSlot || "ثبت نشده";

    TicketGenerator.setData({
      name: fullName || state.profile.firstName || 'مهمان',
      dateStyle: suggestionTitle,
      interests: state.profile.interests,
      dateTime: `${dateValue} ${timeValue}`,
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
function setupNoButton() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const card = noBtn.closest(".card");
  let attempts = 0;

  function escape() {
    attempts++;

    if (attempts >= 2) {
      document.getElementById("noHint").classList.remove("hidden");
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

    noBtn.style.position = "relative";
    noBtn.style.zIndex = "5";
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  }

  noBtn.addEventListener("mouseenter", escape);
  noBtn.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      escape();
    },
    { passive: false },
  );
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
  state.selectedActivity = "";
  state.selectedSuggestion = "";
  state.noAttempts = 0;
  state.boyfriendClickCount = 0;
  state.boyfriendEmailSent = false;

  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
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

  document.getElementById("profileError").classList.add("hidden");
  document.getElementById("scheduleError").classList.add("hidden");
  document.getElementById("activityError").classList.add("hidden");
  document.getElementById("suggestionError").classList.add("hidden");
  document.getElementById("schedulePreview").classList.add("hidden");
  document.getElementById("noHint").classList.add("hidden");
  document.getElementById("noBtn").style.left = "";
  document.getElementById("noBtn").style.top = "";
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
