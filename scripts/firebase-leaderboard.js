import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// ========================================================================= //
// 🚀 GITHUB PAGES LEADERBOARD SETUP GUIDE 🚀
// 
// To make your leaderboard work live on GitHub Pages, follow these steps:
// 1. Go to https://console.firebase.google.com/ and create a free Project.
// 2. Click the Web icon (</>) to Add an App.
// 3. Copy the 'firebaseConfig' object they give you.
// 4. Paste it over the placeholder variable below.
// 5. Build a Firestore Database: Go to "Firestore Database" in the sidebar -> Create.
// 6. Start in "Test Mode" so your friends can seamlessly read and write without logging in.
// ========================================================================= //

const firebaseConfig = {
    apiKey: "AIzaSyAfhl-rqqFw1S9sK924hGMGgmqalKrTpA4",
    authDomain: "cs-mcq-765fc.firebaseapp.com",
    projectId: "cs-mcq-765fc",
    storageBucket: "cs-mcq-765fc.firebasestorage.app",
    messagingSenderId: "347801869146",
    appId: "1:347801869146:web:d66a5f0675bdc9bf75b163"
};

let db = null;
try {
    const fireApp = initializeApp(firebaseConfig);
    db = getFirestore(fireApp);
    console.log("🔥 Firebase initialized");
} catch (e) {
    console.warn("⚠️ Firebase not configured cleanly yet. Please replace the config keys.");
}

window.app.FirebaseLB = {
    publishScore: async function (username, totalXp, level, silent = false) {
        if (!db || firebaseConfig.apiKey === "YOUR_API_KEY") {
            if(!silent) alert("Oops! The database isn't connected yet. Check scripts/firebase-leaderboard.js for instructions!");
            return;
        }

        try {
            // Slugify username to use as a unique ID, so a user updates their own high score
            const docId = username.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
            if (!docId) {
                if(!silent) alert("Please set a valid username in settings first!");
                return;
            }

            await setDoc(doc(db, "leaderboard", docId), {
                name: username,
                xp: totalXp,
                level: level,
                updatedAt: new Date().toISOString()
            });

            if(!silent) alert(`🎉 Success! Published ${totalXp} XP for ${username} to the Global Leaderboard!`);
            window.app.refreshLeaderboard();
        } catch (e) {
            console.error("Error adding document: ", e);
            if(!silent) alert("Error publishing score. Check the developer console.");
        }
    },

    loadLeaderboard: async function () {
        const listEl = document.getElementById('leaderboardList');

        if (!db || firebaseConfig.apiKey === "YOUR_API_KEY") {
            listEl.innerHTML = `
                <div style="text-align:center; color:var(--error); padding: 20px;">
                    <h3>Leaderboard Not Connected</h3>
                    <p style="font-size: 0.9rem; margin-top: 10px;">To enable global ranking with your friends over GitHub Pages, open <code>scripts/firebase-leaderboard.js</code> and paste your free Firebase config keys.</p>
                </div>`;
            return;
        }

        listEl.innerHTML = '<div style="text-align:center; padding:10px;"><i data-lucide="loader" class="spin"></i> Fetching scores...</div>';
        if (window.lucide) window.lucide.createIcons();

        try {
            const q = query(collection(db, "leaderboard"), orderBy("xp", "desc"), limit(50));
            const querySnapshot = await getDocs(q);

            listEl.innerHTML = '';
            let rank = 1;
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const row = document.createElement('div');
                row.style.display = 'flex';
                row.style.justifyContent = 'space-between';
                row.style.alignItems = 'center';
                row.style.padding = '12px 0';
                row.style.borderBottom = '1px solid rgba(255,255,255,0.05)';

                row.innerHTML = `
                    <span style="width: 40px; font-weight:900; color: ${rank <= 3 ? '#ff8c00' : 'var(--accent-primary)'};">#${rank}</span>
                    <span style="flex:1; margin-left:10px; font-weight:600; font-size:1.1rem;">
                        ${data.name} 
                        <span style="font-size:0.75rem; background:var(--glass-border); padding:2px 6px; border-radius:10px; margin-left:6px;">Lv. ${data.level}</span>
                    </span>
                    <span style="font-weight:900; color:var(--text-primary); font-size:1.2rem;">${data.xp} <span style="font-size:0.8rem; color:var(--text-secondary);">XP</span></span>
                `;
                listEl.appendChild(row);
                rank++;
            });
            if (querySnapshot.empty) {
                listEl.innerHTML = '<div style="text-align:center; padding: 20px;">It\'s a ghost town here! Be the first to publish a score!</div>';
            }
        } catch (e) {
            console.error(e);
            listEl.innerHTML = '<div style="text-align:center; color:var(--error);">Failed to load leaderboard database. Check your Firestore read permissions.</div>';
        }
    }
};

// Bind the button logic here to keep it modular
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const btnLB = document.getElementById('btnLeaderboardMenu');
        if (btnLB) {
            btnLB.addEventListener('click', () => {
                if (window.sfx) window.sfx.click();
                window.app.refreshLeaderboard();
                window.app.switchView('leaderboard');
            });
        }

        const btnSubmit = document.getElementById('btnSubmitScore');
        if (btnSubmit) {
            btnSubmit.addEventListener('click', () => {
                if (window.sfx) window.sfx.click();
                window.app.FirebaseLB.publishScore(
                    window.app.settings.username,
                    window.app.state.totalXP,
                    window.app.state.level
                );
            });
        }
    }, 500); // 500ms delay ensures app.js UI is ready
});
