// Firebase Configuration for Clash of CS
// IMPORTANT: Replace these placeholders with your actual Firebase project settings
const firebaseConfig = {
    apiKey: "AIzaSyAfhl-rqqFw1S9sK924hGMGgmqalKrTpA4",
    authDomain: "cs-mcq-765fc.firebaseapp.com",
    databaseURL: "https://cs-mcq-765fc-default-rtdb.firebaseio.com",
    projectId: "cs-mcq-765fc",
    storageBucket: "cs-mcq-765fc.firebasestorage.app",
    messagingSenderId: "347801869146",
    appId: "1:347801869146:web:d66a5f0675bdc9bf75b163"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

// Export for use in other scripts
window.db = db;
