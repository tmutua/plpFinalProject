$(document).ready(function() {
  $('#ageInputButton').click(function() {
    $('#ageInputModal').modal('show');
  });

  $('#calculateDateOfBirth').click(function() {
    var years = parseInt($('#years').val());
    var months = parseInt($('#months').val());
    var weeks = parseInt($('#weeks').val());

    var currentDate = new Date();
    var calculatedDate = new Date(currentDate.getFullYear() - years, currentDate.getMonth() - months, currentDate.getDate() - (weeks * 7));
    
    var formattedDate = calculatedDate.toISOString().split('T')[0];

    $('#dob').val(formattedDate);

    $('#ageInputModal').modal('hide');
  });
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

// Reference to the Firebase Realtime Database
var database = firebase.database();
let patientId=0;

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
    document.getElementById('opdNo').value = patientData.patientId || '';
    // Clear suggestions
    document.getElementById('suggestions').innerHTML = '';
  });
  return suggestionElement;
}

// Function to update patient details in the database
function updatePatientDetails() {
   const surname =document.getElementById('surname').value;
   const otherNames= document.getElementById('otherNames').value;
  const sex=document.getElementById('sex').value;
  const dob=document.getElementById('dob').value;
  const idNumber=document.getElementById('idNumber').value;
  const telephone=document.getElementById('telephone').value;
  const residence=document.getElementById('residence').value;
  const nextOfKin=document.getElementById('nextOfKin').value;
  const relationship=document.getElementById('relationship').value;
  const nextOfKinContact=document.getElementById('nextOfKinContact').value;

  const updatedData = {
    surname: surname,
    otherNames: otherNames,
    sex: sex,
    dob: dob,
    idNumber: idNumber,
    telephone: telephone,
    residence: residence,
    nextOfKin: nextOfKin,
    relationship: relationship,
    nextOfKinContact: nextOfKinContact
    
  };

  // Update patient details in the database
  firebase.database().ref('patients').update(updatedData)
    .then(() => {
      console.log('Patient details updated successfully.');
      // Optionally, display a success message to the user
    })
    .catch(error => {
      console.error('Error updating patient details:', error);
      // Optionally, display an error message to the user
    });
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
    if (data.idNumber) {
      // Check if ID number already exists
      firebase.database().ref('patients').orderByChild('idNumber').equalTo(data.idNumber).once('value', snapshot => {
        if (snapshot.exists()) {
          reject('Patient with the same ID number already exists.');
        } else {
          resolve();
        }
      }).catch(error => {
        reject(error.message);
      });
    } else if (data.telephone) {
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
    } else {
      // If both ID number and telephone are empty, resolve immediately
      resolve();
    }
  });
}



// Event listener for form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  
  // Get form data
  patientId++;
  var formData = {
    patientId:patientId,
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
//Queue management
