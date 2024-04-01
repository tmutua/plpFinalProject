
document.getElementById('proceed').addEventListener('click', function(event) {
    event.preventDefault();
    var hospitalCode = document.getElementById('hospitalCode').value;
    if (hospitalCode == '12345') {
        document.getElementById('hospitalName').innerText = 'Ponya Hospital';
        document.getElementById('hospitalCode').style.display='none';
        document.getElementById('proceed').style.display = 'none';
        document.getElementById('hospitalName').style.display = 'block';
        document.getElementById('username').style.display = 'block';
        document.getElementById('password').style.display = 'block';
        document.getElementById('loginButton').style.display = 'block';
       

    
} else {
    alert('Invalid Hospital Code');
}

});
const firebaseConfig = {
    apiKey: "AIzaSyDJBNgYDCJoOY3cOLUUK7JWNf-dx1_B3vY",
    authDomain: "teetech-67c26.firebaseapp.com",
    databaseURL: "https://teetech-67c26-default-rtdb.firebaseio.com",
    projectId: "teetech-67c26",
    storageBucket: "teetech-67c26.appspot.com",
    messagingSenderId: "307099503704",
    appId: "1:307099503704:web:f31cddc061f3fbfc598e2d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Query the Firebase Realtime Database to verify the username and password
    database.ref('users').orderByChild('username').equalTo(username).once('value')
        .then(snapshot => {
            const userData = snapshot.val();
            if (userData) {
                const userKey = Object.keys(userData)[0];
                if (userData[userKey].password === password) {
                    // Authentication successful
                    alert("Login successful!");
                    // Redirect to dashboard or another page
                    window.location.href = "index.html"; // Replace with your desired page
                } else {
                    // Invalid password
                    alert("Invalid password");
                }
            } else {
                // User not found
                alert("User not found");
            }
        })
        .catch(error => {
            console.error("Error authenticating user:", error);
            alert("An error occurred while logging in. Please try again later.");
        });
});