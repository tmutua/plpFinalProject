 // Array to store patient details
 var patients = [];
 // Function to display queue
 function displayQueue() {
   var queueRef = database.ref('queue');

   queueRef.on('value', function(snapshot) {
     var queueList = document.getElementById('queueList');
     var searchInput = document.getElementById('searchInput');
     var searchQuery = searchInput.value.toLowerCase(); // Get search query
     
     queueList.innerHTML = ''; // Clear previous entries
     patients= [];

     snapshot.forEach(function(childSnapshot) {
       var patientData = childSnapshot.val();
       var patientName = patientData.name.toLowerCase();

       // Filter by search query
       if (patientName.includes(searchQuery)) {
        var listItem = document.createElement('li');
        listItem.textContent = patientData.name;

       var listItem = document.createElement('li');
       listItem.textContent = patientName;
       listItem.addEventListener('click', function() {
         // Find the index of clicked patient in the array
         var index = patients.findIndex(function(patient) {
           return patient.name === patientName;
         });

         // Populate patient details when the name is clicked
         document.getElementById('pname').value = patients[index].name;
         document.getElementById('sexx').value = patients[index].sex;
         document.getElementById('residencee').value = patients[index].residence;
         // Populate more patient details as needed
       });
       // Right-click event listener
       listItem.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent default right-click menu
    
        // Store the clicked patient details for context menu actions
        var index = patients.findIndex(function(patient) {
            return patient.name === patientName;
        });
    
        // Position the context menu at the clicked position
        var contextMenu = document.getElementById('contextMenu');
        contextMenu.style.display = 'block';
        contextMenu.style.left = event.pageX + 'px';
        contextMenu.style.top = event.pageY + 'px';
    
        // Store the index of the clicked patient for later use
        contextMenu.dataset.patientIndex = index;
        });




       queueList.appendChild(listItem);

       // Add patient details to the array
       patients.push({
         name: patientName,
         sex: patientData.sex,
         residence: patientData.residence

         // Add more patient details as needed
       });
      }
     });
   });
 }
 // Function to finalize patient
 function finalizePatient() {
   var index = document.getElementById('contextMenu').dataset.patientIndex;
   // Implement logic to finalize the patient
   console.log('Finalize patient:', patients[index]);
 }

 // Function to remove patient from queue
function removeFromQueue(index) {
  var queueRef = database.ref('queue');
  queueRef.once('value', function(snapshot) {
    var queueData = snapshot.val();
    if (queueData) {
      var keys = Object.keys(queueData);
      var patientKey = keys[index];
      queueRef.child(patientKey).remove();
    }
  });
}

 // Call displayQueue function to initially display the queue
 displayQueue();
 // Event listener for clicking outside the context menu to hide it
 window.addEventListener('click', function(event) {
   var contextMenu = document.getElementById('contextMenu');
   if (event.target !== contextMenu) {
     contextMenu.style.display = 'none';
   }
 });

 // Event listeners for context menu options
 document.getElementById('removeOption').addEventListener('click', function() {
  var index = document.getElementById('contextMenu').dataset.patientIndex;
  removeFromQueue(index); // Remove the patient from the queue
  hideContextMenu(); // Hide the context menu after selection
});

// Function to hide the context menu
function hideContextMenu() {
  var contextMenu = document.getElementById('contextMenu');
  contextMenu.style.display = 'none';
}
/*

// Click event listener
listItem.addEventListener('click', function(event) {
  // Store the clicked patient details for context menu actions
  var index = patients.findIndex(function(patient) {
      return patient.name === patientName;
  });
  
  // Store selected patient details in local storage
  localStorage.setItem('selectedPatientIndex', index);

  // Populate form with selected patient details
  populateForm(patients[index]);

  // Add event listeners to form inputs to update patient details
  document.getElementById('complaints').addEventListener('input', updatePatientData);
  document.getElementById('allergies').addEventListener('input', updatePatientData);
  document.getElementById('presenting_history').addEventListener('input', updatePatientData);
  document.getElementById('medical_history').addEventListener('input', updatePatientData);
  document.getElementById('surgical_history').addEventListener('input', updatePatientData);
  document.getElementById('impression').addEventListener('input', updatePatientData);
  document.getElementById('diagnosis').addEventListener('input', updatePatientData);
  document.getElementById('clinical_summary').addEventListener('input', updatePatientData);
});

// Function to populate form with patient details
function populateForm(patient) {
  document.getElementById('complaints').value = patient.complains || '';
  document.getElementById('allergies').value = patient.alergies || '';
  document.getElementById('presenting_history').value = patient.historyOfPresentingIllness || '';
  document.getElementById('medical_history').value = patient.medicalHistory || '';
  document.getElementById('surgical_history').value = patient.surgicalHistory || '';
  document.getElementById('impression').value = patient.impresion || '';
  document.getElementById('diagnosis').value = patient.diagnosis || '';
  document.getElementById('clinical_summary').value = patient.clinicalSummary || '';
}

// Function to update patient data when form inputs change
function updatePatientData() {
  var index = localStorage.getItem('selectedPatientIndex');
  if (index !== null) {
      patients[index].complains = document.getElementById('complaints').value;
      patients[index].alergies = document.getElementById('allergies').value;
      patients[index].historyOfPresentingIllness = document.getElementById('presenting_history').value;
      patients[index].medicalHistory = document.getElementById('medical_history').value;
      patients[index].surgicalHistory = document.getElementById('surgical_history').value;
      patients[index].impresion = document.getElementById('impression').value;
      patients[index].diagnosis = document.getElementById('diagnosis').value;
      patients[index].clinicalSummary = document.getElementById('clinical_summary').value;

      // Update patient details in local storage
      localStorage.setItem('patients', JSON.stringify(patients));
      console.log(patients);
      
  }
}

// Click event listener
listItem.addEventListener('click', function(event) {
  // Store the clicked patient details for context menu actions
  var index = patients.findIndex(function(patient) {
      return patient.name === patientName;
  });
  
  // Store selected patient details in local storage
  localStorage.setItem('selectedPatientIndex', index);

  // Populate form with selected patient details
  populateForm(patients[index]);
});

// Function to handle form submission
document.getElementById('patientTreatment').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  
  // Get the form data
  var formData = new FormData(event.target);

  // Get the clicked patient index from local storage
  var index = localStorage.getItem('selectedPatientIndex');

  if (index !== null) {
      // Construct the patient data object with form data and clicked patient details
      var patientData = {
          complains: formData.get('complaints'),
          alergies: formData.get('allergies'),
          historyOfPresentingIllness: formData.get('presenting_history'),
          medicalHistory: formData.get('medical_history'),
          surgicalHistory: formData.get('surgical_history'),
          impresion: formData.get('impression'),
          diagnosis: formData.get('diagnosis'),
          clinicalSummary: formData.get('clinical_summary'),
          // Merge with the clicked patient details
          ...patients[index]
      };

      // Store the patient data in Firebase
      var treatmentRef = database.ref('treatment').push(); // Push to generate a unique key
      treatmentRef.set(patientData)
      .then(function() {
          console.log('Patient data saved successfully.');
          // Optionally, clear the form inputs after submission
          event.target.reset();
      })
      .catch(function(error) {
          console.error('Error saving patient data:', error);
      });
  }
});
*/
