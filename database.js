// script.js

// Function to save form data to Firebase
function saveFormData(data) {
  return firebase.database().ref('patients').push(data);
}

// Function to display success message
function displaySuccessMessage() {
  alert('Registration successful! Data saved to Firebase.');
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

  // Save form data to Firebase
  saveFormData(formData)
    .then(function() {
      // Clear form fields
      document.getElementById('registrationForm').reset();
      // Display success message
      displaySuccessMessage();
    })
    .catch(function(error) {
      console.error('Error saving data to Firebase: ', error);
    });
});
