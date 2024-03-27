/*document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById('registrationForm');
    const queueList = document.getElementById('queue');
    const searchInput = document.getElementById('search');

    function loadNames() {
        const names = JSON.parse(localStorage.getItem('names')) || [];
        names.forEach(name => {
            const listItem = document.createElement('li');
            listItem.textContent = name;
            queueList.appendChild(listItem);
        });
    }

    loadNames();
    //event listner for clicking queue items
    /*queueList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            const patientName = event.target.textContent.trim();
            fetchPatientInfo(patientName);
        }
    });
    function fetchPatientInfo(patientName) {
        const dbRef = firebase.database().ref('patients');
        dbRef.orderByChild('surname').equalTo(patientName).once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                const patientData = childSnapshot.val();
                document.getElementById('opdnoo').value = patientData.opdno;
                document.getElementById('surnamee').value = patientData.surname;
                document.getElementById('agee').value = patientData.age;
                document.getElementById('sexx').value = patientData.sex;
                document.getElementById('residencee').value = patientData.residence;
            });
        });
    } */
    /*
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const surname = document.getElementById('surname').value.trim();
        const otherNames = document.getElementById('otherNames').value.trim();

        if (surname && otherNames) {
            const fullName = surname + ' ' + otherNames;
            const listItem = document.createElement('li');
            listItem.textContent = fullName;
            queueList.appendChild(listItem);

            const names = JSON.parse(localStorage.getItem('names')) || [];
            names.push(fullName);
            localStorage.setItem('names', JSON.stringify(names));

            document.getElementById('surname').value = '';
            document.getElementById('otherNames').value = '';
        }
    });

    searchInput.addEventListener('input', function() {
        const searchValue = searchInput.value.trim().toLowerCase();
        const items = queueList.getElementsByTagName('li');

        for (let i = 0; i < items.length; i++) {
            const fullName = items[i].textContent.toLowerCase();
            if (fullName.includes(searchValue)) {
                items[i].style.display = '';
            } else {
                items[i].style.display = 'none';
            }
        }
    });
});
*/