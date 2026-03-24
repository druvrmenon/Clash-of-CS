
// AudioSynth is a simple synthetic sound generator so we don't need audio files
const sfx = {
    playSine: (freq, duration, vol=0.1) => {
        if(!app.settings.sfx) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(vol, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch(e) { console.log("Audio not supported"); }
    },
    correct: () => sfx.playSine(800, 0.3),
    wrong: () => sfx.playSine(200, 0.4),
    click: () => sfx.playSine(600, 0.1, 0.05),
    skip: () => sfx.playSine(400, 0.2, 0.05)
};

const views = {
    dashboard: document.getElementById('dashboardView'),
    quiz: document.getElementById('quizView'),
    results: document.getElementById('resultsView'),
    review: document.getElementById('reviewView'),
    bookmarks: document.getElementById('bookmarksView'),
    leaderboard: document.getElementById('leaderboardView')
};

const app = {
    state: {
        currentModule: null,
        currentQuestionIndex: 0,
        score: 0,
        userAnswers: [], // stores selected index or 'skipped'
        totalXP: parseInt(localStorage.getItem('cs_master_xp') || '0'),
        streak: parseInt(localStorage.getItem('cs_master_streak') || '0'),
        level: 1,
        timerInterval: null,
        timeLeft: 0,
        isPaused: false,
        lifelinesRemaining: 3,
        dailyCompleted: parseInt(localStorage.getItem('cs_master_daily') || '0'),
        dailyDate: localStorage.getItem('cs_master_date') || new Date().toDateString(),
        bookmarks: JSON.parse(localStorage.getItem('cs_master_bookmarks') || '[]'),
        highscore: parseInt(localStorage.getItem('cs_master_highscore') || '0')
    },
    settings: {
        username: localStorage.getItem('cs_master_name') || 'Student',
        sfx: localStorage.getItem('cs_master_sfx') !== 'false',
        practice: localStorage.getItem('cs_master_prac') === 'true',
        feedback: localStorage.getItem('cs_master_fb') !== 'false'
    },
    
    init: function() {
        lucide.createIcons();
        this.overrideAlertWithToast();
        this.checkDaily();
        this.updateLevel();
        this.bindEvents();
        this.initDashboard();
        this.applySettingsUI();
        
        // Theme init
        let currentTheme = localStorage.getItem('cs_master_theme') || 'claude';
        document.documentElement.setAttribute('data-theme', currentTheme);
        this.initParallax();
        this.initScrollListener();

        // Name prompt for first-time users
        setTimeout(() => {
            if (this.settings.username === 'Student') {
                const name = prompt("Welcome to CS Master! What's your name?", "");
                if (name && name.trim()) {
                    this.settings.username = name.trim();
                    localStorage.setItem('cs_master_name', this.settings.username);
                    this.initDashboard();
                    this.showToast(`Welcome, ${name}!`);
                }
            }
        }, 1000);
    },

    overrideAlertWithToast: function() {
        window.alert = (msg) => {
            app.showToast(msg);
        };
    },

    showToast: function(message) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i data-lucide="info" style="color:var(--accent-primary)"></i> <span>${message}</span>`;
        container.appendChild(toast);
        lucide.createIcons();
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => toast.classList.add('show'));
        });
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    },

    initParallax: function() {
        if (window.innerWidth < 768) return; // Disable parallax on mobile
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            const b1 = document.getElementById('blob1');
            const b2 = document.getElementById('blob2');
            const b3 = document.getElementById('blob3');
            if(b1) b1.style.transform = `translate(${x * 30}px, ${y * 30}px) scale(1)`;
            if(b2) b2.style.transform = `translate(${x * -40}px, ${y * -40}px) scale(1.1)`;
            if(b3) b3.style.transform = `translate(${x * 20}px, ${y * -20}px) scale(0.95)`;
        });
    },

    initScrollListener: function() {
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.app-header');
            if(window.scrollY > 20) header.classList.add('sticky');
            else header.classList.remove('sticky');
        });
    },

    toggleThemeMenu: function(e) {
        sfx.click();
        const themeMenu = document.getElementById('themeMenu');
        themeMenu.classList.toggle('hidden');
        if (e) e.stopPropagation();
    },

    bindEvents: function() {
        // Theme
        const themeMenu = document.getElementById('themeMenu');
        const themeToggleBtn = document.getElementById('themeToggleBtn');
        
        themeToggleBtn.addEventListener('click', this.toggleThemeMenu.bind(this));
        document.addEventListener('click', () => themeMenu.classList.add('hidden'));

        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = e.currentTarget.getAttribute('data-set-theme');
                if(!theme) return;
                
                document.documentElement.classList.remove('theme-flash');
                void document.documentElement.offsetWidth; // trigger reflow
                document.documentElement.classList.add('theme-flash');
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('cs_master_theme', theme);
            });
        });

        // Mobile FAB
        const fab = document.getElementById('mobileFab');
        const fabMain = fab.querySelector('.fab-main');
        fabMain.addEventListener('click', (e) => { e.stopPropagation(); fab.classList.toggle('open'); });
        document.addEventListener('click', () => { if(fab) fab.classList.remove('open'); });
        
        document.getElementById('fabLeaderboard').addEventListener('click', () => { document.getElementById('btnLeaderboardMenu').click(); });
        document.getElementById('fabBookmarks').addEventListener('click', () => { document.getElementById('btnBookmarksMenu').click(); });
        document.getElementById('fabSettings').addEventListener('click', () => { document.getElementById('btnSettings').click(); });
        document.getElementById('fabTheme').addEventListener('click', (e) => { this.toggleThemeMenu(e); });

        // Multiplayer Events
        const battleModal = document.getElementById('battleModal');
        const createRoomState = document.getElementById('createRoomState');
        const joinRoomState = document.getElementById('joinRoomState');

        document.getElementById('btnCreateBattle').addEventListener('click', () => {
            sfx.click();
            const code = multiplayer.createRoom();
            document.getElementById('roomCodeText').innerText = code;
            document.getElementById('battleModalTitle').innerText = "Host a Battle";
            createRoomState.classList.remove('hidden');
            joinRoomState.classList.add('hidden');
            battleModal.classList.remove('hidden');
        });

        document.getElementById('btnJoinBattle').addEventListener('click', () => {
            sfx.click();
            document.getElementById('battleModalTitle').innerText = "Join a Battle";
            createRoomState.classList.add('hidden');
            joinRoomState.classList.remove('hidden');
            battleModal.classList.remove('hidden');
        });

        document.getElementById('btnConfirmJoin').addEventListener('click', () => {
            sfx.click();
            const code = document.getElementById('inputRoomCode').value;
            if (code.length === 6) {
                multiplayer.joinRoom(code).catch(err => {
                    this.showToast(err.message);
                });
            } else {
                this.showToast("Enter a 6-digit code.");
            }
        });

        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                sfx.click();
                document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
                // If closing battle modal while waiting, maybe cancel?
                if (multiplayer.currentRoom) {
                    // Logic to cancel room can go here
                }
            });
        });

        // Settings Modal
        document.getElementById('btnSettings').addEventListener('click', () => { sfx.click(); document.getElementById('settingsModal').classList.remove('hidden'); });
        document.querySelector('.close-modal').addEventListener('click', () => { sfx.click(); document.getElementById('settingsModal').classList.add('hidden'); });
        
        document.getElementById('btnSaveName').addEventListener('click', () => {
            sfx.click();
            this.settings.username = document.getElementById('usernameInput').value || 'Student';
            localStorage.setItem('cs_master_name', this.settings.username);
            this.initDashboard();
        });

        document.getElementById('sfxToggle').addEventListener('change', (e) => {
            this.settings.sfx = e.target.checked;
            localStorage.setItem('cs_master_sfx', this.settings.sfx);
        });

        document.getElementById('practiceToggle').addEventListener('change', (e) => {
            this.settings.practice = e.target.checked;
            localStorage.setItem('cs_master_prac', this.settings.practice);
        });

        document.getElementById('feedbackToggle').addEventListener('change', (e) => {
            this.settings.feedback = e.target.checked;
            localStorage.setItem('cs_master_fb', this.settings.feedback);
        });

        document.getElementById('btnResetProgress').addEventListener('click', () => {
            sfx.click();
            if(confirm("Are you sure you want to reset EVERYTHING?")) {
                localStorage.clear();
                window.location.reload();
            }
        });

        // Bookmarks
        document.getElementById('btnBookmarksMenu').addEventListener('click', () => {
            sfx.click();
            this.renderBookmarks();
            this.switchView('bookmarks');
        });

        document.getElementById('btnClearBookmarks').addEventListener('click', () => {
            if(confirm("Clear all bookmarks?")) {
                this.state.bookmarks = [];
                this.saveState();
                this.renderBookmarks();
            }
        });

        // Dashboard Search
        document.getElementById('moduleSearch').addEventListener('input', (e) => this.initDashboard(e.target.value));

        // Quiz Actions
        document.getElementById('btnBackDashboard').addEventListener('click', () => { sfx.click(); this.stopTimer(); this.switchView('dashboard'); });
        document.getElementById('btnNextQuestion').addEventListener('click', () => { sfx.click(); this.nextQuestion(); });
        document.getElementById('btnPause').addEventListener('click', () => { sfx.click(); this.togglePause(); });
        document.getElementById('btnResume').addEventListener('click', () => { sfx.click(); this.togglePause(); });
        document.getElementById('btnSkip').addEventListener('click', () => { sfx.skip(); this.skipQuestion(); });
        document.getElementById('btnBookmark').addEventListener('click', () => { sfx.click(); this.toggleBookmark(); });
        document.getElementById('btnLifeline').addEventListener('click', () => { sfx.click(); this.useLifeline(); });

        // Results
        document.getElementById('btnReviewMistakes').addEventListener('click', () => { sfx.click(); this.renderReview(); this.switchView('review'); });
        document.getElementById('btnReturnHome').addEventListener('click', () => { sfx.click(); this.initDashboard(); this.switchView('dashboard'); });
        document.getElementById('btnShareScore').addEventListener('click', () => {
            sfx.click();
            const text = `I just scored ${this.state.score}/${this.state.currentModule.questions.length} on CS Master: ${this.state.currentModule.title}!`;
            navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
        });

        // Review Back
        document.getElementById('btnBackToResults').addEventListener('click', () => { sfx.click(); this.switchView('results'); });
        document.getElementById('btnFinishReview').addEventListener('click', () => { sfx.click(); this.initDashboard(); this.switchView('dashboard'); });

        // Global Keyboard Shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    },

    saveState: function() {
        localStorage.setItem('cs_master_xp', this.state.totalXP);
        localStorage.setItem('cs_master_streak', this.state.streak);
        localStorage.setItem('cs_master_daily', this.state.dailyCompleted);
        localStorage.setItem('cs_master_date', this.state.dailyDate);
        localStorage.setItem('cs_master_bookmarks', JSON.stringify(this.state.bookmarks));
        localStorage.setItem('cs_master_highscore', this.state.highscore);
    },

    checkDaily: function() {
        const today = new Date().toDateString();
        if(this.state.dailyDate !== today) {
            this.state.dailyCompleted = 0;
            this.state.dailyDate = today;
            this.saveState();
        }
    },

    updateLevel: function() {
        this.state.level = Math.floor(this.state.totalXP / 100) + 1;
        const xpInCurrentLevel = this.state.totalXP % 100;
        document.getElementById('xpProgress').style.width = `${xpInCurrentLevel}%`;
        document.getElementById('xpToNext').innerText = 100 - xpInCurrentLevel;
    },

    applySettingsUI: function() {
        document.getElementById('usernameInput').value = this.settings.username;
        document.getElementById('sfxToggle').checked = this.settings.sfx;
        document.getElementById('practiceToggle').checked = this.settings.practice;
        document.getElementById('feedbackToggle').checked = this.settings.feedback;
    },

    
    refreshLeaderboard: function() {
        if(this.FirebaseLB) {
            this.FirebaseLB.loadLeaderboard();
        }
    },

    switchView: function(viewName) {
        Object.values(views).forEach(v => {
            v.classList.remove('active');
            v.classList.add('hidden');
        });
        views[viewName].classList.remove('hidden');
        setTimeout(() => views[viewName].classList.add('active'), 10);
        lucide.createIcons();
    },

    initDashboard: function(filterText = "") {
        this.updateLevel();
        document.getElementById('displayUsername').innerText = this.settings.username;
        document.getElementById('userLevel').innerText = this.state.level;
        document.getElementById('statScore').innerText = this.state.totalXP;
        document.getElementById('statStreak').innerText = this.state.streak;
        document.getElementById('dailyGoal').innerText = `${Math.min(1, this.state.dailyCompleted)}/1`;
        document.getElementById('globalHighscore').innerText = this.state.highscore;

        const grid = document.getElementById('moduleGrid');
        grid.innerHTML = '';
        
        let modulesToRender = mockModules;
        if(filterText) {
            const f = filterText.toLowerCase();
            modulesToRender = mockModules.filter(m => m.title.toLowerCase().includes(f) || m.description.toLowerCase().includes(f));
        }

        modulesToRender.forEach((mod, index) => {
            const card = document.createElement('div');
            card.className = 'module-card glass-panel animate-slide-up';
            card.style.animationDelay = `${index * 0.05}s`;
            card.innerHTML = `
                <div class="module-icon-wrap"><i data-lucide="${mod.icon}"></i></div>
                <h4 class="module-title">${mod.title}</h4>
                <p class="module-desc">${mod.description}</p>
                <div class="module-meta">
                    <i data-lucide="help-circle" style="width:14px;height:14px"></i>
                    ${mod.questions.length} Questions
                </div>
            `;
            card.addEventListener('click', () => { sfx.click(); this.startModule(mod.id); });
            grid.appendChild(card);
        });

        if(!filterText) {
            const randomCard = document.createElement('div');
            randomCard.className = 'module-card glass-panel animate-slide-up highlight-card';
            randomCard.style.animationDelay = `${mockModules.length * 0.05}s`;
            randomCard.innerHTML = `
                <div class="module-icon-wrap" style="background: linear-gradient(135deg, var(--primary), var(--secondary));"><i data-lucide="shuffle"></i></div>
                <h4 class="module-title">Random Mix</h4>
                <p class="module-desc">A 20-question randomized test.</p>
                <div class="module-meta">
                    <i data-lucide="help-circle" style="width:14px;height:14px"></i> 20 Questions
                </div>
            `;
            randomCard.addEventListener('click', () => { sfx.click(); this.startRandomModule(20); });
            grid.appendChild(randomCard);
        }
        lucide.createIcons();
    },

    startModule: function(id) {
        const originalMod = mockModules.find(m => m.id === id);
        const modCopy = JSON.parse(JSON.stringify(originalMod));
        
        // Shuffle questions
        modCopy.questions.sort(() => Math.random() - 0.5);

        // Shuffle options and fix correctAnswer index
        modCopy.questions.forEach(q => {
            const correctText = q.options[q.correctAnswer];
            q.options.sort(() => Math.random() - 0.5);
            q.correctAnswer = q.options.indexOf(correctText);
        });

        this.state.currentModule = modCopy;
        this.startQuizSession();
    },

    startRandomModule: function(count) {
        let all = [];
        mockModules.forEach(m => all = all.concat(m.questions));
        all.sort(() => 0.5 - Math.random());
        
        const mixMod = { title: "Random Mix", icon: "shuffle", questions: JSON.parse(JSON.stringify(all.slice(0, count))) };
        // Shuffle options
        mixMod.questions.forEach(q => {
            const correctText = q.options[q.correctAnswer];
            q.options.sort(() => Math.random() - 0.5);
            q.correctAnswer = q.options.indexOf(correctText);
        });

        this.state.currentModule = mixMod;
        this.startQuizSession();
    },

    startQuizSession: function() {
        this.state.currentQuestionIndex = 0;
        this.state.score = 0;
        this.state.userAnswers = [];
        this.state.lifelinesRemaining = 3;
        this.state.isPaused = false;
        
        const countEl = document.getElementById('lifelineCount');
        if (countEl) countEl.innerText = this.state.lifelinesRemaining;
        
        // Multiplayer Reset
        if (multiplayer.battleActive) {
            document.getElementById('battleHUD').classList.remove('hidden');
            document.getElementById('myBattleProgress').style.width = '0%';
            document.getElementById('opponentProgress').style.width = '0%';
            document.getElementById('myNameLabel').innerText = this.settings.username;
            document.getElementById('opponentNameLabel').innerText = multiplayer.opponentName;
        } else {
            document.getElementById('battleHUD').classList.add('hidden');
        }

        document.getElementById('quizTitle').innerText = this.state.currentModule.title;
        document.getElementById('btnLifeline').disabled = false;
        document.getElementById('pauseOverlay').classList.add('hidden');
        document.getElementById('questionCardWrap').classList.remove('hidden');
        
        const qCount = this.state.currentModule.questions.length;
        if(this.settings.practice) {
            document.getElementById('quizTimer').innerText = "PRACTICE";
            document.getElementById('btnPause').classList.add('hidden');
        } else {
            document.getElementById('btnPause').classList.remove('hidden');
            this.startTimer(qCount * 30);
        }
        
        // Generate Palette
        const palette = document.getElementById('questionPalette');
        if (palette) {
            palette.innerHTML = '';
            this.state.currentModule.questions.forEach((_, idx) => {
                const btn = document.createElement('button');
                btn.className = 'palette-btn';
                btn.id = `paletteBtn_${idx}`;
                btn.innerText = idx + 1;
                palette.appendChild(btn);
            });
        }
        
        this.switchView('quiz');
        this.loadQuestion();
    },

    startTimer: function(seconds) {
        this.state.timeLeft = seconds;
        this.updateTimerUI();
        const timerEl = document.getElementById('quizTimer');
        timerEl.classList.remove('pulse-red');
        
        this.stopTimer();
        this.state.timerInterval = setInterval(() => {
            if(!this.state.isPaused) {
                this.state.timeLeft--;
                this.updateTimerUI();
                if(this.state.timeLeft <= 10) timerEl.classList.add('pulse-red');
                if(this.state.timeLeft <= 0) {
                    this.stopTimer();
                    this.finishModule();
                }
            }
        }, 1000);
    },

    stopTimer: function() {
        if(this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
    },

    updateTimerUI: function() {
        if(this.settings.practice) return;
        const min = Math.floor(this.state.timeLeft / 60);
        const sec = this.state.timeLeft % 60;
        document.getElementById('quizTimer').innerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    },

    togglePause: function() {
        if(this.settings.practice) return;
        this.state.isPaused = !this.state.isPaused;
        if(this.state.isPaused) {
            document.getElementById('questionCardWrap').classList.add('hidden');
            document.getElementById('pauseOverlay').classList.remove('hidden');
            document.getElementById('btnPause').innerHTML = '<i data-lucide="play"></i>';
        } else {
            document.getElementById('questionCardWrap').classList.remove('hidden');
            document.getElementById('pauseOverlay').classList.add('hidden');
            document.getElementById('btnPause').innerHTML = '<i data-lucide="pause"></i>';
        }
        lucide.createIcons();
    },

    loadQuestion: function() {
        const q = this.state.currentModule.questions[this.state.currentQuestionIndex];
        const total = this.state.currentModule.questions.length;
        
        document.getElementById('currentQNum').innerText = this.state.currentQuestionIndex + 1;
        document.getElementById('totalQNum').innerText = total;
        document.getElementById('quizProgressFill').style.width = `${(this.state.currentQuestionIndex / total) * 100}%`;
        
        document.getElementById('qCategoryTag').innerHTML = `<i data-lucide="hash" style="width:14px;height:14px;"></i> ${this.state.currentModule.title || 'Topic'}`;
        
        // 3D Flip animation
        const qCard = document.getElementById('questionCardWrap');
        qCard.classList.remove('animate-flip-in');
        void qCard.offsetWidth; // reflow
        qCard.classList.add('animate-flip-in');
        
        // Typewriter Effect
        const qText = document.getElementById('questionText');
        qText.innerText = '';
        qText.classList.add('typewriter');
        let typeIdx = 0;
        clearInterval(this.state.typeInterval);
        this.state.typeInterval = setInterval(() => {
            qText.innerText += q.text.charAt(typeIdx);
            typeIdx++;
            if(typeIdx >= q.text.length) {
                clearInterval(this.state.typeInterval);
                qText.classList.remove('typewriter');
            }
        }, 15);
        
        this.updateBookmarkIcon();
        
        const c = document.getElementById('optionsContainer');
        c.innerHTML = '';
        const labels = ['A', 'B', 'C', 'D'];
        
        q.options.forEach((opt, idx) => {
            const b = document.createElement('button');
            b.className = 'option-btn ripple-fx';
            b.id = `optBtn_${idx}`;
            b.innerHTML = `<span class="option-letter">${labels[idx]}</span><span class="option-text">${opt}</span>`;
            b.addEventListener('click', () => { sfx.click(); this.selectOption(idx); });
            c.appendChild(b);
        });
        
        document.getElementById('quizActions').classList.add('hidden');
        lucide.createIcons();

        // Update Palette Active State
        if (document.getElementById('questionPalette')) {
            document.querySelectorAll('.palette-btn').forEach(btn => btn.classList.remove('current'));
            const curP = document.getElementById(`paletteBtn_${this.state.currentQuestionIndex}`);
            if(curP) curP.classList.add('current');
        }
        
        document.getElementById('btnLifeline').disabled = this.state.lifelinesRemaining <= 0;
    },

    selectOption: function(selectedIdx) {
        if(this.state.userAnswers[this.state.currentQuestionIndex] !== undefined) return; // already answered
        
        const q = this.state.currentModule.questions[this.state.currentQuestionIndex];
        const isCorrect = selectedIdx === q.correctAnswer;
        this.state.userAnswers[this.state.currentQuestionIndex] = selectedIdx;
        
        const btns = document.querySelectorAll('.option-btn');
        btns.forEach(b => b.disabled = true);
        
        if(this.settings.feedback) {
            if(isCorrect) sfx.correct(); else sfx.wrong();
            btns.forEach((btn, idx) => {
                if(idx === q.correctAnswer) btn.classList.add('correct');
                else if(idx === selectedIdx) {
                    btn.classList.add('wrong', 'shake');
                }
            });
            
            const actions = document.getElementById('quizActions');
            const msg = document.getElementById('feedbackMessage');
            actions.classList.remove('hidden');
            
            if(isCorrect) {
                this.state.score++;
                this.state.totalXP += 10;
                msg.className = 'feedback-message success';
                msg.innerText = 'Correct! ' + (q.explanation || '');
                
                // Auto Advance for Tablet/Touch
                if (window.innerWidth <= 1024) {
                    setTimeout(() => {
                        if(this.state.userAnswers[this.state.currentQuestionIndex] !== undefined && document.getElementById('quizActions').classList.contains('hidden') === false) {
                            this.nextQuestion();
                        }
                    }, 3000);
                }
            } else {
                this.state.totalXP = Math.max(0, this.state.totalXP - 5);
                msg.className = 'feedback-message error';
                msg.innerText = 'Incorrect. ' + (q.explanation || '');
            }

            // Update palette
            const pBtn = document.getElementById(`paletteBtn_${this.state.currentQuestionIndex}`);
            if (pBtn) pBtn.classList.add(isCorrect ? 'correct' : 'wrong');

            // Multiplayer Sync
            if (multiplayer.battleActive) {
                multiplayer.syncMyScore(this.state.score);
                const percentage = (this.state.score / this.state.currentModule.questions.length) * 100;
                document.getElementById('myBattleProgress').style.width = percentage + "%";
            }
        } else {
            // No feedback until end
            if(selectedIdx === q.correctAnswer) {
                this.state.score++;
                this.state.totalXP += 10;
            } else {
                this.state.totalXP = Math.max(0, this.state.totalXP - 5);
            }
            
            const pBtn = document.getElementById(`paletteBtn_${this.state.currentQuestionIndex}`);
            if(pBtn) pBtn.classList.add('skipped'); // reusing neutral color for 'answered'

            document.getElementById(`optBtn_${selectedIdx}`).classList.add('selected');
            document.getElementById('quizActions').classList.remove('hidden');
            document.getElementById('feedbackMessage').innerText = "Answer recorded.";
            document.getElementById('feedbackMessage').className = 'feedback-message';
        }

        this.saveState();
        // Silently sync XP
        if(window.app.FirebaseLB && window.db) {
            window.app.FirebaseLB.publishScore(this.settings.username, this.state.totalXP, this.state.level, true);
        }
    },

    skipQuestion: function() {
        if(this.state.userAnswers[this.state.currentQuestionIndex] !== undefined) return;
        this.state.userAnswers[this.state.currentQuestionIndex] = 'skipped';
        
        const pBtn = document.getElementById(`paletteBtn_${this.state.currentQuestionIndex}`);
        if(pBtn) pBtn.classList.add('skipped');

        this.nextQuestion();
    },

    nextQuestion: function() {
        this.state.currentQuestionIndex++;
        if(this.state.currentQuestionIndex < this.state.currentModule.questions.length) {
            this.loadQuestion();
        } else {
            this.stopTimer();
            this.finishModule();
        }
    },

    useLifeline: function() {
        if(this.state.lifelinesRemaining <= 0 || this.state.userAnswers[this.state.currentQuestionIndex] !== undefined) return;
        this.state.lifelinesRemaining--;
        
        const countEl = document.getElementById('lifelineCount');
        if (countEl) countEl.innerText = this.state.lifelinesRemaining;

        if (this.state.lifelinesRemaining <= 0) {
            document.getElementById('btnLifeline').disabled = true;
        }
        
        const q = this.state.currentModule.questions[this.state.currentQuestionIndex];
        const wrongIndices = [];
        q.options.forEach((_, i) => { if(i !== q.correctAnswer) wrongIndices.push(i); });
        wrongIndices.sort(() => 0.5 - Math.random());
        
        // Hide two wrong options
        document.getElementById(`optBtn_${wrongIndices[0]}`).style.visibility = 'hidden';
        document.getElementById(`optBtn_${wrongIndices[1]}`).style.visibility = 'hidden';
    },

    toggleBookmark: function() {
        const q = this.state.currentModule.questions[this.state.currentQuestionIndex];
        const exists = this.state.bookmarks.findIndex(b => b.text === q.text);
        if(exists >= 0) {
            this.state.bookmarks.splice(exists, 1);
        } else {
            this.state.bookmarks.push({...q, modTitle: this.state.currentModule.title});
        }
        this.saveState();
        this.updateBookmarkIcon();
    },

    updateBookmarkIcon: function() {
        const q = this.state.currentModule.questions[this.state.currentQuestionIndex];
        const isM = this.state.bookmarks.some(b => b.text === q.text);
        const icon = document.querySelector('#btnBookmark i');
        if(icon) {
            icon.className = isM ? 'lucide-bookmark fill-current text-accent-primary' : 'lucide-bookmark';
            if(isM) icon.style.fill = "currentColor"; else icon.style.fill = "none";
        }
    },

    finishModule: function() {
        const totalQ = this.state.currentModule.questions.length;
        const correctAnswers = this.state.score;
        const wrongAnswers = totalQ - correctAnswers;
        
        // XP Calculation for display in Results panel
        const xpEarned = correctAnswers * 10;
        const xpPenalty = wrongAnswers * 5;
        const netXP = Math.max(-50, xpEarned - xpPenalty); 
        
        if(this.state.score === totalQ && totalQ > 0) this.state.streak++; else this.state.streak = 0;
        
        this.state.dailyCompleted += 1;
        if(this.state.score > this.state.highscore) this.state.highscore = this.state.score;
        this.saveState();
        
        // Multiplayer Cleanup
        if (multiplayer.battleActive) {
            multiplayer.syncMyScore(this.state.score); // Final sync
            const battleModal = document.getElementById('battleModal');
            battleModal.classList.add('hidden');
            // Show winner/loser toast
            if (this.state.score > multiplayer.opponentScore) {
                this.showToast("🔥 VICTORY! You beat " + multiplayer.opponentName);
                if(this.settings.sfx) triggerConfetti();
            } else if (this.state.score < multiplayer.opponentScore) {
                this.showToast("💀 DEFEAT! " + multiplayer.opponentName + " won.");
            } else {
                this.showToast("🤝 DRAW! It was a close battle.");
            }
            multiplayer.battleActive = false;
            multiplayer.currentRoom = null;
        }
        
        const circle = document.getElementById('finalScoreCircle');
        const percentage = totalQ === 0 ? 0 : (this.state.score / totalQ) * 100;
        circle.style.animation = 'none';
        void circle.offsetWidth;
        setTimeout(() => {
            circle.style.animation = '';
            circle.style.strokeDasharray = `${percentage}, 100`;
        }, 50);
        document.getElementById('finalScoreText').innerText = `${this.state.score}/${totalQ}`;
        document.getElementById('xpGainedText').innerText = netXP >= 0 ? `+${netXP}` : netXP;
        document.getElementById('xpGainedText').style.color = netXP >= 0 ? 'var(--success)' : 'var(--error)';
        
        const icon = document.querySelector('.result-icon');
        if(this.state.score === totalQ) {
            icon.setAttribute('data-lucide', 'award');
            icon.className = 'result-icon success streak-active';
            if(this.settings.sfx) triggerConfetti();
        } else if(this.state.score >= totalQ / 2) {
            icon.setAttribute('data-lucide', 'check-circle');
            icon.className = 'result-icon success';
        } else {
            icon.setAttribute('data-lucide', 'alert-circle');
            icon.className = 'result-icon error';
        }
        
        this.switchView('results');
    },

    renderReview: function() {
        const c = document.getElementById('reviewContainer');
        c.innerHTML = '';
        const labels = ['A', 'B', 'C', 'D'];
        
        this.state.currentModule.questions.forEach((q, i) => {
            const uA = this.state.userAnswers[i];
            const isCorrect = uA === q.correctAnswer;
            const isSkipped = uA === 'skipped' || uA === undefined;
            
            const card = document.createElement('div');
            card.className = 'review-card glass-panel animate-slide-up';
            card.style.animationDelay = `${i * 0.05}s`;
            
            card.innerHTML = `
                <div style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:4px;">#${i+1}</div>
                <p class="review-q-text">${q.text}</p>
                <div class="review-answer-row">
                    <div class="review-ans ${isCorrect ? 'correct-ans' : (isSkipped ? '' : 'wrong-ans')}">
                        <span class="ans-tag">${isSkipped ? 'Skipped' : (isCorrect ? 'Correct' : 'Your Answer')}</span>
                        ${isSkipped ? '—' : q.options[uA]}
                    </div>
                    ${!isCorrect ? `
                    <div class="review-ans correct-ans">
                        <span class="ans-tag">Correct Answer</span>
                        ${q.options[q.correctAnswer]}
                    </div>
                    ` : ''}
                </div>
                <div class="review-explanation"><strong>Explanation:</strong> ${q.explanation || 'None provided.'}</div>
            `;
            c.appendChild(card);
        });
    },

    renderBookmarks: function() {
        const c = document.getElementById('bookmarksContainer');
        c.innerHTML = '';
        if(this.state.bookmarks.length === 0) {
            c.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-secondary);">No bookmarks saved yet. Break a leg!</div>';
            return;
        }
        
        this.state.bookmarks.forEach((q, i) => {
            const card = document.createElement('div');
            card.className = 'review-card glass-panel animate-slide-up';
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between;">
                    <span style="font-size:0.8rem; color:var(--accent-primary); font-weight:bold;">#${q.modTitle || 'General'}</span>
                    <button class="icon-btn" onclick="app.removeBookmark(${i})" style="width:24px;height:24px;"><i data-lucide="trash-2" style="width:14px;height:14px;color:var(--error);"></i></button>
                </div>
                <p class="review-q-text">${q.text}</p>
                <div class="review-ans correct-ans" style="margin-top:10px;">
                    <span class="ans-tag">Answer</span>
                    ${q.options[q.correctAnswer]}
                </div>
                ${q.explanation ? `<div class="review-explanation" style="margin-top:10px;">${q.explanation}</div>` : ''}
            `;
            c.appendChild(card);
        });
        lucide.createIcons();
    },

    removeBookmark: function(index) {
        this.state.bookmarks.splice(index, 1);
        this.saveState();
        this.renderBookmarks();
    },

    handleKeyboard: function(e) {
        if(!views.quiz.classList.contains('active') || this.state.isPaused) return;
        
        const key = e.key.toLowerCase();
        
        if(e.code === 'Space' || e.code === 'Enter') {
            const nextBtn = document.getElementById('btnNextQuestion');
            if(!document.getElementById('quizActions').classList.contains('hidden') && document.activeElement !== nextBtn) {
                nextBtn.click();
            }
            e.preventDefault();
        }
        
        // Only if answer not submitted
        if(this.state.userAnswers[this.state.currentQuestionIndex] !== undefined) return;
        
        const q = this.state.currentModule.questions[this.state.currentQuestionIndex];
        let selectIdx = -1;
        
        if(key === '1' || key === 'a') selectIdx = 0;
        if(key === '2' || key === 'b') selectIdx = 1;
        if(key === '3' || key === 'c') selectIdx = 2;
        if(key === '4' || key === 'd') selectIdx = 3;
        
        if(selectIdx >= 0 && selectIdx < q.options.length) {
            const btn = document.getElementById(`optBtn_${selectIdx}`);
            if(btn && btn.style.visibility !== 'hidden') {
                sfx.click();
                this.selectOption(selectIdx);
            }
        }
    }
};

function triggerConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-wrapper';
    document.body.appendChild(container);
    const colors = ['#f0c396', '#00f0ff', '#00fa9a', '#ff8c00', '#ff003c'];
    for(let i=0; i<100; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        c.style.animationDelay = Math.random() * 2 + 's';
        c.style.transform = `scale(${Math.random() * 1.5})`;
        container.appendChild(c);
    }
    setTimeout(() => container.remove(), 4000);
}

window.app = app;
window.sfx = sfx;
document.addEventListener('DOMContentLoaded', () => app.init());
