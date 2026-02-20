// ==========================================
//  BUSINESS AUDIT - APPLICATION LOGIC
// ==========================================

// ---------- QUESTIONS DATA ----------
const questions = [
    {
        id: 1,
        emoji: '🏢',
        text: 'Siz biznes egasimisiz?',
        hint: 'Biznesingiz haqida asosiy ma\'lumot',
        type: 'options',
        options: [
            { value: 'yes', label: 'Ha, biznes egasiman', emoji: '✅' },
            { value: 'no', label: 'Yo\'q, hali boshlaganim yo\'q', emoji: '❌' },
            { value: 'starting', label: 'Boshlash arafasidaman', emoji: '🚀' }
        ]
    },
    {
        id: 2,
        emoji: '📂',
        text: 'Sizda CRM tizimi mavjudmi?',
        hint: 'AmoCRM, Bitrix24, HubSpot kabilar',
        type: 'options',
        options: [
            { value: 'yes', label: 'Ha, CRM tizimim bor', emoji: '✅' },
            { value: 'no', label: 'Yo\'q, CRM ishlatmayman', emoji: '❌' },
            { value: 'partial', label: 'Boshqa usulda (Excel, Telegram)', emoji: '📋' }
        ]
    },
    {
        id: 3,
        emoji: '👥',
        text: 'Alohida sotuv bo\'limi (Menejerlar) bormi?',
        hint: 'Maxsus sotuv menejerlari yoki jamoangiz',
        type: 'options',
        options: [
            { value: 'yes', label: 'Ha, sotuv jamoam bor', emoji: '✅' },
            { value: 'no', label: 'Yo\'q, o\'zim sotaman', emoji: '❌' },
            { value: 'partial', label: '1-2 kishi yordam beradi', emoji: '👤' }
        ]
    },
    {
        id: 4,
        emoji: '📱',
        text: 'Ijtimoiy tarmoqlaringiz holati qanday?',
        hint: 'Instagram, Telegram, Facebook va boshqalar',
        type: 'options',
        options: [
            { value: 'great', label: 'Zo\'r holatda, kontent chiqadi', emoji: '🔥' },
            { value: 'average', label: 'O\'rtacha, muntazam emas', emoji: '😐' },
            { value: 'poor', label: 'Yomon yoki umuman yo\'q', emoji: '😞' }
        ]
    },
    {
        id: 5,
        emoji: '🏥',
        text: 'Biznesingiz qaysi sohada?',
        hint: 'Masalan: tibbiyot, ta\'lim, savdo, xizmatlar...',
        type: 'text',
        placeholder: 'Soha nomini kiriting...'
    },
    {
        id: 6,
        emoji: '📢',
        text: 'Asosiy reklama platformangiz?',
        hint: 'Reklama beradigan asosiy kanalingiz',
        type: 'options',
        options: [
            { value: 'instagram', label: 'Instagram', emoji: '📸', cplMin: 0.8, cplMax: 1.5 },
            { value: 'facebook', label: 'Facebook', emoji: '👍', cplMin: 1.0, cplMax: 2.0 },
            { value: 'telegram', label: 'Telegram', emoji: '✈️', cplMin: 0.3, cplMax: 0.8 },
            { value: 'google', label: 'Google Ads', emoji: '🔍', cplMin: 1.5, cplMax: 3.0 },
            { value: 'tiktok', label: 'TikTok', emoji: '🎵', cplMin: 0.5, cplMax: 1.2 },
            { value: 'youtube', label: 'YouTube', emoji: '🎬', cplMin: 1.2, cplMax: 2.5 }
        ]
    },
    {
        id: 7,
        emoji: '💰',
        text: 'Oylik DAROMAD maqsadingiz?',
        hint: 'Dollar ($) da kiriting',
        type: 'number',
        placeholder: '10000',
        prefix: '$'
    },
    {
        id: 8,
        emoji: '🧾',
        text: 'O\'rtacha chek qancha?',
        hint: 'Bir mijozdan o\'rtacha tushadigan summa ($)',
        type: 'number',
        placeholder: '60',
        prefix: '$'
    },
    {
        id: 9,
        emoji: '📈',
        text: 'Sotuv konversiyasi necha foiz?',
        hint: 'Lidlardan necha foizi sotuvga aylanadi',
        type: 'options',
        options: [
            { value: 10, label: '10% — Past', emoji: '📉' },
            { value: 20, label: '20% — O\'rtacha', emoji: '📊' },
            { value: 30, label: '30% — Yaxshi', emoji: '📈' },
            { value: 40, label: '40% — A\'lo', emoji: '🚀' },
            { value: 50, label: '50% yoki undan yuqori', emoji: '🔥' }
        ]
    }
];

// ---------- STATE ----------
let currentQuestion = 0;
let answers = {};

// ---------- SCREEN MANAGEMENT ----------
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(`screen-${screenId}`);
    if (screen) {
        screen.classList.add('active');
    }
}

// ---------- START AUDIT ----------
function startAudit() {
    currentQuestion = 0;
    answers = {};
    showScreen('questions');
    document.getElementById('progress-wrapper').style.display = 'flex';
    renderQuestion();
}

// ---------- RENDER QUESTION ----------
function renderQuestion() {
    const q = questions[currentQuestion];
    const card = document.getElementById('question-card');

    // Update progress
    const pct = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${pct}%`;
    document.getElementById('progress-text').textContent = `${currentQuestion + 1} / ${questions.length}`;

    // Show/hide prev button
    document.getElementById('btn-prev').style.display = currentQuestion > 0 ? 'inline-flex' : 'none';

    // Update next button text
    const btnNext = document.getElementById('btn-next');
    if (currentQuestion === questions.length - 1) {
        btnNext.innerHTML = '<span>Natijani ko\'rish</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
    } else {
        btnNext.innerHTML = '<span>Keyingisi</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
    }

    let html = `
        <div class="question-number">
            <span>${q.emoji}</span>
            <span>${q.id}-savol / ${questions.length}</span>
        </div>
        <span class="question-emoji">${q.emoji}</span>
        <h2 class="question-text">${q.text}</h2>
        <p class="question-hint">${q.hint}</p>
    `;

    if (q.type === 'options') {
        html += '<div class="options-grid">';
        q.options.forEach((opt, i) => {
            const isSelected = answers[q.id] === opt.value || answers[q.id] === opt.value;
            html += `
                <button class="option-btn ${isSelected ? 'selected' : ''}" 
                        onclick="selectOption(${q.id}, ${typeof opt.value === 'string' ? `'${opt.value}'` : opt.value}, this)"
                        id="option-${q.id}-${i}">
                    <span class="option-check">${isSelected ? '✓' : ''}</span>
                    <span class="option-emoji">${opt.emoji}</span>
                    <span>${opt.label}</span>
                </button>
            `;
        });
        html += '</div>';
    } else if (q.type === 'text') {
        const val = answers[q.id] || '';
        html += `
            <div class="input-group">
                <input type="text" class="text-input" id="text-input-${q.id}" 
                       placeholder="${q.placeholder}" value="${val}" 
                       oninput="answers[${q.id}] = this.value">
            </div>
        `;
    } else if (q.type === 'number') {
        const val = answers[q.id] || '';
        html += `
            <div class="input-group">
                <span class="input-prefix">${q.prefix}</span>
                <input type="number" class="text-input has-prefix" id="text-input-${q.id}" 
                       placeholder="${q.placeholder}" value="${val}" min="0"
                       oninput="answers[${q.id}] = parseFloat(this.value) || 0">
            </div>
        `;
    }

    card.innerHTML = html;

    // Animate card
    card.style.animation = 'none';
    card.offsetHeight; // trigger reflow
    card.style.animation = 'fadeUp 0.4s ease-out';

    // Auto-focus text/number inputs
    if (q.type === 'text' || q.type === 'number') {
        setTimeout(() => {
            const inp = document.getElementById(`text-input-${q.id}`);
            if (inp) inp.focus();
        }, 100);
    }
}

// ---------- SELECT OPTION ----------
function selectOption(questionId, value, element) {
    answers[questionId] = value;
    // Update UI
    const siblings = element.parentElement.querySelectorAll('.option-btn');
    siblings.forEach(btn => {
        btn.classList.remove('selected');
        btn.querySelector('.option-check').textContent = '';
    });
    element.classList.add('selected');
    element.querySelector('.option-check').textContent = '✓';

    // Auto-advance after short delay
    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            nextQuestion();
        }
    }, 400);
}

// ---------- NAVIGATION ----------
function nextQuestion() {
    const q = questions[currentQuestion];

    // Validate
    if (!answers[q.id] && answers[q.id] !== 0) {
        shakeCard();
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        showLoading();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

function shakeCard() {
    const card = document.getElementById('question-card');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'shake 0.5s ease-in-out';
}

// Add shake keyframes dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-4px); }
        80% { transform: translateX(4px); }
    }
`;
document.head.appendChild(shakeStyle);

// ---------- LOADING SCREEN ----------
function showLoading() {
    showScreen('loading');
    document.getElementById('progress-wrapper').style.display = 'none';

    const loadingTexts = [
        'Ma\'lumotlar tahlil qilinmoqda...',
        'Funnel hisob-kitob qilinmoqda...',
        'Reklama byudjeti hisoblanmoqda...',
        'Tavsiyalar tayyorlanmoqda...',
        'Hisobot yakunlanmoqda...'
    ];

    let step = 0;
    const bar = document.getElementById('loading-bar');
    const text = document.getElementById('loading-text');

    const interval = setInterval(() => {
        step++;
        const pct = Math.min(step * 22, 100);
        bar.style.width = `${pct}%`;

        if (step <= loadingTexts.length) {
            text.textContent = loadingTexts[step - 1];
        }

        if (step >= 5) {
            clearInterval(interval);
            setTimeout(() => generateResults(), 400);
        }
    }, 500);
}

// ---------- CALCULATE & GENERATE RESULTS ----------
function generateResults() {
    // Extract answers
    const isBizOwner = answers[1];
    const hasCRM = answers[2];
    const hasSalesTeam = answers[3];
    const socialStatus = answers[4];
    const businessField = answers[5] || 'Ko\'rsatilmagan';
    const platform = answers[6];
    const monthlyGoal = answers[7] || 0;
    const avgCheck = answers[8] || 1;
    const conversionRate = answers[9] || 20;

    // Calculations
    const requiredClients = Math.ceil(monthlyGoal / avgCheck);
    const requiredLeads = Math.ceil(requiredClients / (conversionRate / 100));

    // CPL benchmarks
    const platformData = questions[5].options.find(o => o.value === platform);
    const cplMin = platformData ? platformData.cplMin : 0.8;
    const cplMax = platformData ? platformData.cplMax : 1.5;
    const platformName = platformData ? platformData.label : 'Noma\'lum';
    const platformEmoji = platformData ? platformData.emoji : '📢';

    const minBudget = Math.ceil(requiredLeads * cplMin);
    const optBudget = Math.ceil(requiredLeads * cplMax);

    // Penalties
    let totalPenalty = 0;
    const warnings = [];

    if (hasCRM === 'no') {
        totalPenalty += 20;
        warnings.push({
            icon: '❌',
            text: 'CRM yo\'qligi sababli lidlar yo\'qotilishi mumkin',
            penalty: '+20%'
        });
    }
    if (hasSalesTeam === 'no') {
        totalPenalty += 20;
        warnings.push({
            icon: '❌',
            text: 'Sotuvchilar yo\'qligi sababli past konversiya',
            penalty: '+20%'
        });
    }
    if (socialStatus === 'poor') {
        totalPenalty += 10;
        warnings.push({
            icon: '⚠️',
            text: 'Ijtimoiy tarmoqlar yomon — ishonch past bo\'ladi',
            penalty: '+10%'
        });
    }
    if (hasCRM === 'partial') {
        totalPenalty += 10;
        warnings.push({
            icon: '⚠️',
            text: 'Professional CRM o\'rniga Excel/Telegram ishlatilmoqda',
            penalty: '+10%'
        });
    }

    // Risk level
    let riskLevel, riskText, riskClass;
    if (totalPenalty >= 30) {
        riskLevel = '🔴 Yuqori';
        riskText = 'high';
        riskClass = 'high';
    } else if (totalPenalty >= 10) {
        riskLevel = '🟡 O\'rtacha';
        riskText = 'medium';
        riskClass = 'medium';
    } else {
        riskLevel = '🟢 Past';
        riskText = 'low';
        riskClass = 'low';
    }

    // CRM status
    const crmLabel = hasCRM === 'yes' ? '✅ Ha' : hasCRM === 'partial' ? '📋 Qisman (Excel/Telegram)' : '❌ Yo\'q';
    const salesLabel = hasSalesTeam === 'yes' ? '✅ Ha' : hasSalesTeam === 'partial' ? '👤 1-2 kishi' : '❌ Yo\'q, o\'zim sotaman';
    const socialLabel = socialStatus === 'great' ? '✅ Ha, zo\'r holatda' : socialStatus === 'average' ? '😐 O\'rtacha' : '😞 Yomon';

    // Recommendations
    const recommendations = [];

    if (hasCRM !== 'yes') {
        recommendations.push({
            title: 'CRM tizimini o\'rnating',
            desc: 'AmoCRM yoki Bitrix24 o\'rnating — bu byudjetni 20% tejaydi va lidlarni boshqarish osonlashadi.'
        });
    }
    if (hasSalesTeam === 'no') {
        recommendations.push({
            title: 'Sotuv menejeri yollang',
            desc: 'Lidlar kuyib ketmasligi uchun alohida sotuv menejeri yollang. Bu konversiyani 2x oshiradi.'
        });
    }
    if (socialStatus !== 'great') {
        recommendations.push({
            title: 'Ijtimoiy tarmoqlarni yaxshilang',
            desc: 'Professional kontent, branding va muntazam postlar bilan ishonchni oshiring.'
        });
    }
    recommendations.push({
        title: 'Reklamani test bilan boshlang',
        desc: `Dastlab kichik summa ($${Math.ceil(minBudget * 0.3)}-$${Math.ceil(minBudget * 0.5)}) bilan boshlab, CPL ni aniqlang.`
    });
    recommendations.push({
        title: 'Konversiyani kuzating',
        desc: 'Har bir bosqichdagi konversiyani o\'lchang: reklama → lid → qo\'ng\'iroq → sotuv.'
    });

    // Date
    const now = new Date();
    const dateStr = now.toLocaleDateString('uz-UZ', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    // Build Results HTML
    let resultsHTML = '';

    // Title card
    resultsHTML += `
        <div class="result-card result-title-card">
            <h2>📊 MARKETING & BYUDJET AUDITI</h2>
            <p>Biznesingiz uchun to'liq tahlil natijasi</p>
            <p class="result-date">📅 ${dateStr}</p>
        </div>
    `;

    // Business Status
    resultsHTML += `
        <div class="result-card">
            <div class="result-header">
                <span class="result-header-icon">🏥</span>
                <h3>Biznes Holati</h3>
            </div>
            <div class="stat-row">
                <span class="stat-label"><span class="stat-label-icon">🏢</span> Soha</span>
                <span class="stat-value accent">${businessField}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label"><span class="stat-label-icon">📂</span> CRM</span>
                <span class="stat-value">${crmLabel}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label"><span class="stat-label-icon">👥</span> Sotuv bo'limi</span>
                <span class="stat-value">${salesLabel}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label"><span class="stat-label-icon">📱</span> Ijtimoiy tarmoq</span>
                <span class="stat-value">${socialLabel}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label"><span class="stat-label-icon">⚠️</span> Xavf darajasi</span>
                <span class="stat-value"><span class="risk-badge ${riskClass}">${riskLevel}</span></span>
            </div>
        </div>
    `;

    // Financial Goals
    resultsHTML += `
        <div class="result-card">
            <div class="result-header">
                <span class="result-header-icon">🎯</span>
                <h3>Moliyaviy Maqsad</h3>
            </div>
            <div class="stat-row">
                <span class="stat-label"><span class="stat-label-icon">💰</span> Oylik daromad</span>
                <span class="stat-value accent">$${monthlyGoal.toLocaleString()}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label"><span class="stat-label-icon">🧾</span> O'rtacha chek</span>
                <span class="stat-value">$${avgCheck.toLocaleString()}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label"><span class="stat-label-icon">👤</span> Kerakli mijozlar soni</span>
                <span class="stat-value success">${requiredClients} ta</span>
            </div>
        </div>
    `;

    // Funnel Calculation
    resultsHTML += `
        <div class="result-card">
            <div class="result-header">
                <span class="result-header-icon">📈</span>
                <h3>Funnel Hisob-kitobi</h3>
            </div>
            <div class="stat-row">
                <span class="stat-label"><span class="stat-label-icon">🔄</span> Sotuv konversiyasi</span>
                <span class="stat-value info">${conversionRate}%</span>
            </div>
            <div class="big-number">${requiredLeads} ta</div>
            <div class="big-number-label">Kerakli lidlar soni</div>
            <div class="formula-box">📐 $${monthlyGoal.toLocaleString()} ÷ $${avgCheck} ÷ ${conversionRate}% = ${requiredLeads} lid</div>
        </div>
    `;

    // Budget
    resultsHTML += `
        <div class="result-card">
            <div class="result-header">
                <span class="result-header-icon">💵</span>
                <h3>Reklama Byudjeti</h3>
            </div>
            <div class="stat-row">
                <span class="stat-label"><span class="stat-label-icon">${platformEmoji}</span> Platforma</span>
                <span class="stat-value accent">${platformName}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label"><span class="stat-label-icon">💲</span> Lid narxi (Benchmark)</span>
                <span class="stat-value">$${cplMin} - $${cplMax}</span>
            </div>
            <div class="budget-range">
                <div class="budget-box">
                    <div class="budget-amount">$${minBudget.toLocaleString()}</div>
                    <div class="budget-label">Minimal</div>
                </div>
                <span class="budget-arrow">→</span>
                <div class="budget-box optimal">
                    <div class="budget-amount">$${optBudget.toLocaleString()}</div>
                    <div class="budget-label">Optimal</div>
                </div>
            </div>
        </div>
    `;

    // Warnings
    if (warnings.length > 0) {
        resultsHTML += `
            <div class="result-card">
                <div class="result-header">
                    <span class="result-header-icon">⚠️</span>
                    <h3>Muhim Ogohlantirishlar</h3>
                </div>
        `;
        warnings.forEach(w => {
            resultsHTML += `
                <div class="warning-item">
                    <span class="warning-icon">${w.icon}</span>
                    <div>
                        <span>${w.text}</span>
                        <span class="penalty-tag"> (${w.penalty})</span>
                    </div>
                </div>
            `;
        });
        if (totalPenalty > 0) {
            resultsHTML += `
                <div class="penalty-note">
                    ⚡ Sizda tizim bo'lmagani uchun real byudjet <strong>${totalPenalty}%</strong> ga qimmatroq tushishi mumkin.<br>
                    Real byudjet: <strong>$${Math.ceil(minBudget * (1 + totalPenalty / 100)).toLocaleString()} — $${Math.ceil(optBudget * (1 + totalPenalty / 100)).toLocaleString()}</strong>
                </div>
            `;
        }
        resultsHTML += '</div>';
    }

    // Recommendations
    resultsHTML += `
        <div class="result-card">
            <div class="result-header">
                <span class="result-header-icon">✅</span>
                <h3>Tavsiyalar</h3>
            </div>
    `;
    recommendations.forEach((r, i) => {
        resultsHTML += `
            <div class="rec-item">
                <span class="rec-number">${i + 1}</span>
                <div class="rec-content">
                    <div class="rec-title">${r.title}</div>
                    <div class="rec-desc">${r.desc}</div>
                </div>
            </div>
        `;
    });
    resultsHTML += '</div>';

    // Restart button
    resultsHTML += `
        <button class="btn-restart" onclick="restartAudit()">
            🔄 Qayta audit qilish
        </button>
    `;

    document.getElementById('results-container').innerHTML = resultsHTML;
    showScreen('results');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------- RESTART ----------
function restartAudit() {
    currentQuestion = 0;
    answers = {};
    showScreen('welcome');
    document.getElementById('progress-wrapper').style.display = 'none';
    document.getElementById('progress-fill').style.width = '0%';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
