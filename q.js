 // Array to store patient details
 var patients = [];
 // Function to display queue
 function displayQueue() {
   var queueRef = database.ref('queue');

   //test
   var billRef= database.ref('bills');
   billRef.on('value',function(snapshot){
    snapshot.forEach(function(snapshot){
      var patientBill=childSnapshot.val();
    }
    );
  }
  );
  //end of test
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
