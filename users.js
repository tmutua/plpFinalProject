const firebaseConfig = {
    apiKey: "AIzaSyDJBNgYDCJoOY3cOLUUK7JWNf-dx1_B3vY",
    authDomain: "teetech-67c26.firebaseapp.com",
    databaseURL: "https://teetech-67c26-default-rtdb.firebaseio.com",
    projectId: "teetech-67c26",
    storageBucket: "teetech-67c26.appspot.com",
    messagingSenderId: "307099503704",
    appId: "1:307099503704:web:f31cddc061f3fbfc598e2d"
};
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// Function to handle form submission
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const surname = document.getElementById('surname').value;
    const othernames = document.getElementById('othernames').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const roles = document.getElementById('roles').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Prepare data object
    const userData = {
        surname: surname,
        othernames: othernames,
        username: username,
        password: password,
        roles: roles
    };

    // Save data to Firebase Realtime Database
    database.ref('users').push(userData)
        .then(() => {
            alert("User added successfully!");
            document.getElementById('userForm').reset(); // Clear the form
        })
        .catch(error => {
            console.error("Error adding user: ", error);
            alert("An error occurred. Please try again later.");
        });
});