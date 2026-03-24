/**
 * Multiplayer Module for Clash of CS
 * Handles real-time 1v1 battles and global leaderboard sync
 */
const multiplayer = {
    currentRoom: null,
    isHost: false,
    opponentName: "Opponent",
    opponentScore: 0,
    battleActive: false,

    /**
     * Create a new battle room
     */
    createRoom: function() {
        const roomCode = Math.floor(100000 + Math.random() * 900000).toString();
        this.currentRoom = roomCode;
        this.isHost = true;
        
        const roomRef = db.ref('battles/' + roomCode);
        roomRef.set({
            host: app.settings.username,
            hostScore: 0,
            status: 'waiting',
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        this.listenToRoom(roomCode);
        return roomCode;
    },

    /**
     * Join an existing battle room
     */
    joinRoom: function(roomCode) {
        const roomRef = db.ref('battles/' + roomCode);
        
        return roomRef.once('value').then(snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                if (data.status !== 'waiting') {
                    throw new Error("Battle already started or finished.");
                }

                this.currentRoom = roomCode;
                this.isHost = false;
                this.opponentName = data.host;

                roomRef.update({
                    guest: app.settings.username,
                    guestScore: 0,
                    status: 'active'
                });

                this.listenToRoom(roomCode);
                return data;
            } else {
                throw new Error("Invalid room code.");
            }
        });
    },

    /**
     * Listen for updates in the current room
     */
    listenToRoom: function(roomCode) {
        const roomRef = db.ref('battles/' + roomCode);
        roomRef.on('value', (snapshot) => {
            if (!snapshot.exists()) return;
            const data = snapshot.val();

            if (data.status === 'active' && !this.battleActive) {
                this.startBattle(data);
            }

            // Sync opponent score
            if (this.isHost) {
                this.opponentScore = data.guestScore || 0;
                this.opponentName = data.guest || "Opponent";
            } else {
                this.opponentScore = data.hostScore || 0;
                this.opponentName = data.host || "Opponent";
            }

            this.updateBattleUI();
        });
    },

    /**
     * Start the battle quiz
     */
    startBattle: function(roomData) {
        this.battleActive = true;
        app.showToast("Battle Started! VS " + this.opponentName);
        
        // Use a fixed module for now or sync the module ID
        const moduleId = roomData.moduleId || 'cbse_networking'; 
        app.startModule(moduleId);
        
        // Show Battle HUD
        document.getElementById('battleHUD').classList.remove('hidden');
    },

    /**
     * Push current score to Firebase
     */
    syncMyScore: function(score) {
        if (!this.currentRoom) return;
        const roomRef = db.ref('battles/' + this.currentRoom);
        const update = {};
        if (this.isHost) {
            update.hostScore = score;
        } else {
            update.guestScore = score;
        }
        roomRef.update(update);
    },

    /**
     * Update the Battle HUD in real-time
     */
    updateBattleUI: function() {
        const opponentBar = document.getElementById('opponentProgress');
        if (opponentBar) {
            // Assuming 10 questions for now, or match it to the current module
            const totalQ = app.state.currentModule ? app.state.currentModule.questions.length : 10;
            const percentage = (this.opponentScore / totalQ) * 100;
            opponentBar.style.width = percentage + "%";
        }
        
        const opponentNameEl = document.getElementById('opponentNameLabel');
        if (opponentNameEl) opponentNameEl.innerText = this.opponentName;
    },

    /**
     * Submit score to global leaderboard
     */
    submitToLeaderboard: function(username, score, xp) {
        const leaderboardRef = db.ref('leaderboard').push();
        leaderboardRef.set({
            username: username,
            score: score,
            xp: xp,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }
};

window.multiplayer = multiplayer;
