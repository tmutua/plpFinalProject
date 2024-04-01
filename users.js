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
    // Check if username already exists
    database.ref('users').orderByChild('username').equalTo(username).once('value', function(snapshot) {
        if (snapshot.exists()) {
            alert("Username already exists. Please choose a different username.");
        } else {
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
        }
    });
});
    
// Function to populate user table
function populateUserTable() {
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';

    database.ref('users').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            const userData = childSnapshot.val();
            const userKey = childSnapshot.key;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${userData.surname}</td>
                <td>${userData.othernames}</td>
                <td>${userData.username}</td>
                <td>${userData.roles}</td>
                <td>
                <button class="editButton" data-key="${userKey}">Edit</button>
                <button class="deleteButton" data-key="${userKey}">Delete</button>
                </td>
            `;

            userTableBody.appendChild(row);
        });

        // Add event listeners to edit buttons
        const editButtons = document.querySelectorAll('.editButton');
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const userKey = this.getAttribute('data-key');
                populateFormForEdit(userKey);
            });
        });
        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll('.deleteButton');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const userKey = this.getAttribute('data-key');
                deleteUser(userKey);
            });
        });
    });
}
// Function to populate form for editing
function populateFormForEdit(userKey) {
    database.ref('users/' + userKey).once('value', function(snapshot) {
        const userData = snapshot.val();
        document.getElementById('surname').value = userData.surname;
        document.getElementById('othernames').value = userData.othernames;
        document.getElementById('username').value = userData.username;
        document.getElementById('password').value = userData.password;
        document.getElementById('confirmPassword').value = userData.password;
        document.getElementById('roles').value = userData.roles;

        // Show update button, hide add button
        document.getElementById('addButton').style.display = 'none';
        document.getElementById('updateButton').style.display = 'inline-block';

        // Add event listener to update button
        document.getElementById('updateButton').addEventListener('click', function() {
            updateUser(userKey);
        });
    });
}


// Function to update user data
function updateUser(userKey) {
    const surname = document.getElementById('surname').value;
    const othernames = document.getElementById('othernames').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const roles = document.getElementById('roles').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const userData = {
        surname: surname,
        othernames: othernames,
        username: username,
        password: password,
        roles: roles
    };

    database.ref('users/' + userKey).update(userData)
        .then(() => {
            alert("User updated successfully!");
            document.getElementById('userForm').reset();
            document.getElementById('addButton').style.display = 'inline';
            document.getElementById('updateButton').style.display = 'none';
        })
        .catch(error => {
            console.error("Error updating user: ", error);
            alert("An error occurred. Please try again later.");
        });
        populateUserTable();
}
// Function to delete user
function deleteUser(userKey) {
    if (confirm("Are you sure you want to delete this user?")) {
        database.ref('users/' + userKey).remove()
            .then(() => {
                alert("User deleted successfully!");
                // Remove user from table
                const userRow = document.querySelector(`tr[data-key="${userKey}"]`);
                if (userRow) {
                    userRow.remove();
                }
            })
            .catch(error => {
                console.error("Error deleting user: ", error);
                alert("An error occurred while deleting the user. Please try again later.");
            });
    }
    populateUserTable();
}

// Populate user table initially
populateUserTable();