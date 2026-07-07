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
  selectedActivity: "",
  selectedSuggestion: "",
  instagram: "",
  telegram: "",
  phone: "",
  noAttempts: 0,
};

const activitySuggestions = {
  کافه: [
    {
      title: "کافه دنج + گپ خودمونی",
      desc: "یه کافه آروم با نور ملایم، برای حرف زدن بدون عجله و بی‌استرس.",
    },
    {
      title: "کافه + دسر مشترک",
      desc: "یه دسر خوشمزه وسط یه گفت‌وگوی راحت، ترکیب ساده ولی خیلی خوب.",
    },
    {
      title: "کافه + قدم‌زدن کوتاه",
      desc: "اول یک قهوه، بعدش یه پیاده‌روی کوتاه برای ادامه حال خوب.",
    },
  ],
  پیاده‌روی: [
    {
      title: "پیاده‌روی عصرگاهی + نوشیدنی",
      desc: "یه قدم‌زدن سبک و بعدش یه نوشیدنی خنک یا گرم.",
    },
    {
      title: "پیاده‌روی + بستنی",
      desc: "ساده، بی‌فشار و خیلی خوش‌حال‌و‌هوا.",
    },
    {
      title: "پیاده‌روی + حرف‌های خودمونی",
      desc: "از اون مدل قرارها که بیشتر حس می‌مونه تا عکس.",
    },
  ],
  سینما: [
    {
      title: "سینما + کافه بعدش",
      desc: "فیلم ببینید، بعدش درباره‌ش حرف بزنید و فضا رو ادامه بدین.",
    },
    {
      title: "سینما + قدم‌زدن کوتاه",
      desc: "بعد از فیلم، یه پیاده‌روی کوتاه برای طبیعی‌تر شدن فضا.",
    },
    {
      title: "سینمای سبک + گفت‌وگوی بعدش",
      desc: "یه فیلم خوب، بعدش یه گپ راحت و بدون شلوغی.",
    },
  ],
  رستوران: [
    {
      title: "شام سبک + گفت‌وگوی آرام",
      desc: "یه فضای کلاسیک برای یه قرار مرتب‌تر و جدی‌تر.",
    },
    {
      title: "رستوران دنج + دسر",
      desc: "غذا، دسر، و یه حال‌وهوای شیک و راحت.",
    },
    {
      title: "رستوران + قدم‌زدن بعدش",
      desc: "غذا که تموم شد، یه قدم‌زدن کوتاه همه‌چیزو لطیف‌تر می‌کنه.",
    },
  ],
  بستنی: [
    {
      title: "بستنی + پیاده‌روی",
      desc: "قرار سبک، شیرین و خیلی راحت.",
    },
    {
      title: "بستنی + فضای باز",
      desc: "برای یه حس خنک و دل‌نشین، مخصوص عصرهای خوب.",
    },
    {
      title: "بستنی + گشت کوتاه",
      desc: "بی‌تکلف، شاد و بی‌دردسر.",
    },
  ],
  کتاب‌فروشی: [
    {
      title: "کتاب‌فروشی + کافه",
      desc: "اول کتاب، بعد قهوه؛ ترکیب آروم و خیلی خوش‌سلیقه.",
    },
    {
      title: "کتاب‌گردی + انتخاب برای هم",
      desc: "هرکدوم برای اون یکی یه کتاب یا جلد جالب انتخاب کنه.",
    },
    {
      title: "کتاب + گپ عمیق",
      desc: "اگر اهل حرف‌های ریز و قشنگ باشید، این مدل خیلی می‌چسبه.",
    },
  ],
  "گیم کلاب": [
    {
      title: "گیم دونفره + کل‌کل بامزه",
      desc: "یه رقابت سبک و شیرین که کلی خنده می‌سازه.",
    },
    {
      title: "گیم + قهوه یا اسنک",
      desc: "بازی، خوراکی، و یه فضای راحت برای ریلکس بودن.",
    },
    {
      title: "گیم کلاب اختصاصی",
      desc: "برای وقتی که بخوایم هم بازی کنیم هم حسابی خوش بگذرونیم.",
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
    // If we navigate to the schedule step, ensure the Persian datepicker is initialized
    if (stepNumber === 7) {
      setTimeout(() => {
        try {
          initDatePicker();
          const dateEl = document.getElementById('dateInput');
          if (dateEl) {
            // remove readonly so mobile keyboards or interactions work and focus to open picker
            dateEl.removeAttribute('readonly');
            dateEl.focus();
          }
        } catch (err) {
          console.warn('Datepicker init error:', err);
        }
      }, 60);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function sendViaEmailJS(data) {
  console.log("EmailJS payload:", data);

  return emailjs
    .send("service_9bk9nyb", "template_jn3mrcu", data, "3rADitjzNZUmkE1RX")
    .then(function (response) {
      console.log("EmailJS SUCCESS!", response.status, response.text);
    })
    .catch(function (error) {
      console.error("EmailJS FAILED...", error);
      throw error;
    });
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
  const noHint = document.getElementById("noHint");
  const questionArea = document.getElementById("questionArea");

  yesBtn.addEventListener("click", () => {
    goToStep(6);
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
}

function initDatePicker() {
  try {
    if (typeof persianDate !== 'undefined' && $.fn && $.fn.persianDatepicker) {
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
        },
      });
    } else {
      // Fallback: use native date input so the picker opens reliably
      const dateEl = document.getElementById('dateInput');
      if (dateEl) {
        try {
          dateEl.type = 'date';
        } catch (e) {
          // some browsers may not allow changing type; ensure readonly removed
        }

        dateEl.removeAttribute('readonly');
        dateEl.addEventListener('change', (e) => {
          state.selectedDate = e.target.value;
          updateSchedulePreview();
        });
      }
    }

    const timeEl = document.getElementById("timeInput");
    if (timeEl) {
      timeEl.addEventListener("change", (e) => {
        state.selectedTime = e.target.value;
        updateSchedulePreview();
      });
    }
  } catch (err) {
    console.warn('Datepicker init error:', err);
    // Ensure basic behavior even on error
    const dateEl = document.getElementById('dateInput');
    if (dateEl) {
      dateEl.removeAttribute('readonly');
      dateEl.addEventListener('change', (e) => {
        state.selectedDate = e.target.value;
        updateSchedulePreview();
      });
    }
    const timeEl = document.getElementById('timeInput');
    if (timeEl) {
      timeEl.addEventListener('change', (e) => {
        state.selectedTime = e.target.value;
        updateSchedulePreview();
      });
    }
  }
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

    // Prepare ticket data
    const fullName = `${state.profile.firstName} ${state.profile.lastName}`.trim();
    const suggestionTitle = state.selectedSuggestion.split(" - ")[0];
    
    TicketGenerator.setData({
      name: fullName || state.profile.firstName,
      dateStyle: suggestionTitle,
      interests: state.profile.interests,
      dateTime: `${state.selectedDate} ${state.selectedTime}`,
    });

    // Show ticket
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
      smartDesc +=
        " برای آدم‌های اهل کتاب، کافه‌های آرام معمولاً انتخاب خیلی خوبی هستند.";
    }

    if (interests.includes("گیم")) {
      smartDesc += " اگر علاقه‌ای به بازی‌های سرگرم‌کننده داری، این قرار یقیناً خوب جواب می‌دهد.";
    }

    if (interests.includes("دوس ندارم بگم")) {
      smartDesc += " بدون نیاز به توضیح، این انتخاب نشون‌دهنده سلیقه و رمز‌آلودگی‌ات است.";
    }

    if (
      state.selectedTime &&
      ["19:00", "19:30", "20:00", "20:30"].includes(state.selectedTime)
    ) {
      smartDesc +=
        " چون ساعت انتخابی عصر به شب نزدیکه، نور و فضای قرار هم رمانتیک‌تر میشه.";
    }

    return {
      title: item.title,
      desc: smartDesc,
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
    
    // Show vibe meter and proceed to step 10
    goToStep(10);
    
    // Trigger vibe meter animation
    setTimeout(() => {
      VibeMeter.show('vibeMeterContainer');
      
      // Auto-proceed after meter completes
      setTimeout(() => {
        document.getElementById('continueAfterVibe').classList.remove('hidden');
        // Auto click after animation completes
        setTimeout(() => {
          goToStep(11);
        }, 2500);
      }, 4500);
    }, 500);
  });
}

function fillSummary() {
  const fullName =
    `${state.profile.firstName} ${state.profile.lastName}`.trim();

  document.getElementById("summaryName").textContent =
    fullName || state.profile.firstName;

  // استخراج تنها عنوان از پیشنهاد (قبل از " - ")
  const suggestionTitle = state.selectedSuggestion.split(" - ")[0];
  document.getElementById("summarySuggestion").textContent = suggestionTitle;
  document.getElementById("summaryInstagram").textContent =
    state.instagram || "-";
  document.getElementById("summaryTelegram").textContent =
    state.telegram || "-";
  document.getElementById("summaryPhone").textContent =
    state.phone || "-";

  document.getElementById("finalMessageText").textContent =
    `${state.profile.firstName}، خوشحال شدم که این قرار رو قبول کردی. پس ${state.selectedDate} ساعت ${state.selectedTime} می‌بینمت 🌹`;
}

function bindFinalStep() {
  // Step 12 - Ticket actions
  const finalCompleteBtn = document.getElementById("finalCompleteBtn");
  if (finalCompleteBtn) {
    finalCompleteBtn.addEventListener("click", () => {
      // Send email with all data
      const payload = {
        first_name: state.profile.firstName || "ناشناس",
        last_name: state.profile.lastName || "",
        interests: state.profile.interests.join(", ") || "",
        date: state.selectedDate || "ثبت نشده",
        time: state.selectedTime || "ثبت نشده",
        activity: state.selectedActivity || "",
        suggestion: state.selectedSuggestion || "",
        instagram: state.instagram || "",
        telegram: state.telegram || "",
        phone: state.phone || "",
        final_answer: "accepted",
      };

      sendViaEmailJS(payload)
        .then(() => {
          fillSummary();
          goToStep(13);
        })
        .catch(() => {
          alert("مشکلی در ارسال ایمیل رخ داد.");
          fillSummary();
          goToStep(13);
        });
    });
  }

  // Step 13 - Summary
  const copySummaryBtn = document.getElementById("copySummaryBtn");

  if (copySummaryBtn) {
    copySummaryBtn.addEventListener("click", async () => {
      const suggestionTitle = state.selectedSuggestion.split(" - ")[0];
      const text = `
نام: ${`${state.profile.firstName} ${state.profile.lastName}`.trim()}
پیشنهاد قرار: ${suggestionTitle}
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
  state.selectedActivity = "";
  state.selectedSuggestion = "";
  state.noAttempts = 0;

  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("dateInput").value = "";
  document.getElementById("timeInput").value = "";

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
