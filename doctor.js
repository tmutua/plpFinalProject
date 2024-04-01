document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('quantityTimeInput').addEventListener('input', calculateTotalQuantity);
    document.getElementById('frequencyPerDayInput').addEventListener('input', calculateTotalQuantity);
    document.getElementById('durationDaysInput').addEventListener('input', calculateTotalQuantity);
});

function calculateTotalQuantity() {
    var quantityTime = parseFloat(document.getElementById('quantityTimeInput').value) || 0;
    var frequencyPerDay = parseFloat(document.getElementById('frequencyPerDayInput').value) || 0;
    var durationDays = parseFloat(document.getElementById('durationDaysInput').value) || 0;
    var totalQuantity = quantityTime * frequencyPerDay * durationDays;
    document.getElementById('totalQuantityInput').value = isNaN(totalQuantity) ? '' : totalQuantity;
}


function addEntry(inputId, listId) {
    var inputValue = document.getElementById(inputId).value;
    if (inputValue.trim() !== '') {
        var listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerHTML = inputValue + '<span class="deleteEntry ml-2"><i class="fas fa-trash-alt"></i></span>';
        document.getElementById(listId).appendChild(listItem);
        document.getElementById(inputId).value = '';
        
        // Add event listener to delete entry
        listItem.querySelector('.deleteEntry').addEventListener('click', function() {
            listItem.remove();
        });
    }
}
function addRequest(inputId, listId) {
    var inputValue = document.getElementById(inputId).value;
    if (inputValue.trim() !== '') {
        var listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerHTML = inputValue + '<span class="deleteEntry ml-2"><i class="fas fa-trash-alt"></i></span>';
        document.getElementById(listId).appendChild(listItem);
        document.getElementById(inputId).value = '';
        
        // Add event listener to delete entry
        listItem.querySelector('.deleteEntry').addEventListener('click', function() {
            listItem.remove();
        });
    }
}
function savePrescription() {
    var drugName = document.getElementById('drugNameInput').value;
    var quantityTime = document.getElementById('quantityTimeInput').value;
    var dosageUnit = document.getElementById('dosageUnitInput').value;
    var frequencyPerDay = document.getElementById('frequencyPerDayInput').value;
    var durationDays = document.getElementById('durationDaysInput').value;
    var totalQuantity = document.getElementById('totalQuantityInput').value;
    var specialInstructions = document.getElementById('specialInstructionsInput').value;

    var prescriptionDetails = document.getElementById('prescriptionDetails');

    if (drugName.trim() !== '' && quantityTime.trim() !== '' && dosageUnit.trim() !== '' && frequencyPerDay.trim() !== '' && durationDays.trim() !== '' && totalQuantity.trim() !== '') {
        var listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerHTML = drugName + '  ' + quantityTime + ' ' + dosageUnit + '  ' + frequencyPerDay + '  ' + 'times a day'+' '+'for' +' '+durationDays + '  ' +'days'+'|'+ totalQuantity + '  ' + dosageUnit+'s'+ '<span class="deleteEntry ml-2"><i class="fas fa-trash-alt"></i></span>';
        prescriptionDetails.appendChild(listItem);

        // Add event listener to delete entry
        listItem.querySelector('.deleteEntry').addEventListener('click', function() {
            listItem.remove();
        });

        // Clear input fields after saving
        document.getElementById('drugNameInput').value = '';
        document.getElementById('quantityTimeInput').value = '';
        document.getElementById('dosageUnitInput').value = '';
        document.getElementById('frequencyPerDayInput').value = '';
        document.getElementById('durationDaysInput').value = '';
        document.getElementById('totalQuantityInput').value = '';
        document.getElementById('specialInstructionsInput').value = '';

    } else {
        alert("Please fill in all fields before saving the prescription.");
    }
}
//visit summary
const visitSummaryLink = document.getElementById('visitSummaryLink');
const visitSummary = document.getElementById('visitSummary');

 // Function to handle click event on visit summary link
 visitSummaryLink.addEventListener('click', function(event) {
    event.preventDefault();

    const selectedName = form.querySelector('input[name="pname"]').value;

    // Fetch visit summary for the selected name
    firebase.database().ref('treatment').orderByChild('pname').equalTo(selectedName).once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          visitSummary.innerHTML = ''; // Clear existing content
          snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
            // Display visit summary
            const summaryElement = document.createElement('div');
            summaryElement.innerHTML = `
              <p>Name: ${data.pname}</p>
              <p>Diagnosis: ${data.diagnosis}</p>
              <!-- Add more fields as needed -->
            `;
            visitSummary.appendChild(summaryElement);
          });
        } else {
          visitSummary.innerHTML = 'No visit summary found for the selected name.';
        }
      })
      .catch(error => {
        console.error("Error fetching visit summary:", error);
      });
  });