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

// Reference to the Firebase Realtime Database
var database = firebase.database();

// Function to save form data to Firebase
function saveFormData(data) {
  return firebase.database().ref('patients').push(data);
}

// Function to display success message
function displaySuccessMessage() {
  alert('Patient Registred successfully!.');
}
// Function to search for patients by surname, telephone, or ID number
function searchPatient(query) {
  return firebase.database().ref('patients').orderByChild('surname').startAt(query).endAt(query + '\uf8ff')
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot;
      } else {
        // If no match found by surname, search by telephone number
        return firebase.database().ref('patients').orderByChild('telephone').equalTo(query).once('value');
      }
    })
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot;
      } else {
        // If no match found by telephone number, search by ID number
        return firebase.database().ref('patients').orderByChild('idNumber').equalTo(query).once('value');
      }
    });
}
// Function to create a suggestion element
function createSuggestionElement(patientData) {
  var suggestionElement = document.createElement('div');
  suggestionElement.textContent = patientData.surname + ' ' + patientData.otherNames;
  suggestionElement.classList.add('suggestion');
  suggestionElement.addEventListener('click', function() {
    // Populate form inputs with patient details when suggestion is clicked
    document.getElementById('dob').value = patientData.dob || '';
    document.getElementById('idNumber').value = patientData.idNumber || '';
    document.getElementById('nextOfKin').value = patientData.nextOfKin || '';
    document.getElementById('nextOfKinContact').value = patientData.nextOfKinContact || '';
    document.getElementById('otherNames').value = patientData.otherNames || '';
    document.getElementById('relationship').value = patientData.relationship || '';
    document.getElementById('residence').value = patientData.residence || '';
    document.getElementById('sex').value = patientData.sex || '';
    document.getElementById('surname').value = patientData.surname || '';
    document.getElementById('telephone').value = patientData.telephone || '';
    // Clear suggestions
    document.getElementById('suggestions').innerHTML = '';
  });
  return suggestionElement;
}

/*// Event listener for search button click
document.getElementById('searchButton').addEventListener('click', function(event) {
  var searchQuery = document.getElementById('searchInput').value.trim();
  if (searchQuery === '') {
    // Clear form inputs
  } else {
    // Search for patient
    searchPatient(searchQuery)
      .then(snapshot => {
        if (snapshot.exists()) {
          // Patient found, populate form inputs with patient details
          snapshot.forEach(function(childSnapshot) {
            var patientData = childSnapshot.val();
            // Populate form inputs with patient details
            document.getElementById('dob').value = patientData.dob || '';
            document.getElementById('idNumber').value = patientData.idNumber || '';
            document.getElementById('nextOfKin').value = patientData.nextOfKin || '';
            document.getElementById('nextOfKinContact').value = patientData.nextOfKinContact || '';
            document.getElementById('otherNames').value = patientData.otherNames || '';
            document.getElementById('relationship').value = patientData.relationship || '';
            document.getElementById('residence').value = patientData.residence || '';
            document.getElementById('sex').value = patientData.sex || '';
            document.getElementById('surname').value = patientData.surname || '';
            document.getElementById('telephone').value = patientData.telephone || '';
            // Populate other inputs as needed
          });
        } else {
          // Patient not found, display message
          alert('Patient not found.');
        }
      })
      .catch(error => {
        console.error('Error searching for patient:', error);
        alert('An error occurred while searching for patient. Please try again.');
      });
  }
});
*/
// Event listener for search button click
document.getElementById('searchButton').addEventListener('click', function(event) {
  var searchQuery = document.getElementById('searchInput').value.trim();
  if (searchQuery === '') {
    alert('Please enter a search query.');
    return;
  }
  // Search for patients by surname, telephone, or ID number
  searchPatient(searchQuery)
    .then(snapshot => {
      var suggestionsContainer = document.getElementById('suggestions');
      suggestionsContainer.innerHTML = ''; // Clear existing suggestions
      if (snapshot.exists()) {
        // Patients found, create suggestion elements and append to suggestions container
        snapshot.forEach(childSnapshot => {
          var patientData = childSnapshot.val();
          var suggestionElement = createSuggestionElement(patientData);
          suggestionsContainer.appendChild(suggestionElement);
        });
      } else {
        // No patients found, display message
        var noResultsElement = document.createElement('div');
        noResultsElement.textContent = 'No patients found.';
        suggestionsContainer.appendChild(noResultsElement);
      }
    })
    .catch(error => {
      console.error('Error searching for patients:', error);
    });
});
// Function to check if ID number or telephone already exists in the database
function checkExistingData(data) {
  return new Promise((resolve, reject) => {
    // Check if ID number already exists
    firebase.database().ref('patients').orderByChild('idNumber').equalTo(data.idNumber).once('value', snapshot => {
      if (snapshot.exists()) {
        reject('Patient with the same ID number already exists.');
      } else {
        // Check if telephone number already exists
        firebase.database().ref('patients').orderByChild('telephone').equalTo(data.telephone).once('value', snapshot => {
          if (snapshot.exists()) {
            reject('Patient with the same telephone number already exists.');
          } else {
            resolve();
          }
        }).catch(error => {
          reject(error.message);
        });
      }
    }).catch(error => {
      reject(error.message);
    });
  });
}


// Event listener for form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  
  // Get form data
  var formData = {
    surname: document.getElementById('surname').value,
    otherNames: document.getElementById('otherNames').value,
    sex: document.getElementById('sex').value,
    dob: document.getElementById('dob').value,
    idNumber: document.getElementById('idNumber').value,
    telephone: document.getElementById('telephone').value,
    residence: document.getElementById('residence').value,
    nextOfKin: document.getElementById('nextOfKin').value,
    relationship: document.getElementById('relationship').value,
    nextOfKinContact: document.getElementById('nextOfKinContact').value
  };

  // Check if ID number or telephone already exists
  checkExistingData(formData)
    .then(() => {
      // If no existing data, save form data to Firebase
      return saveFormData(formData);
    })
    .then(() => {
      // Clear form fields
      document.getElementById('registrationForm').reset();
      // Display success message
      displaySuccessMessage();
    })
    .catch(error => {
      // Display error message
      alert(error);
    });
});
