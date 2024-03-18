document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var hospitalCode = document.getElementById('hospitalCode').value;
    // Here you might perform some AJAX request to fetch hospital details based on the code
    // For now, let's just simulate it
    if (hospitalCode === '12345') {
        document.getElementById('hospitalName').innerText = 'Hospital Name: Example Hospital';
        document.getElementById('hospitalCodeInput').style.display = 'none';
        document.getElementById('hospitalNameDisplay').style.display = 'block';
        document.getElementById('usernameInput').style.display = 'block';
        document.getElementById('passwordInput').style.display = 'block';
        document.getElementById('loginButton').style.display = 'block';
    } else {
        alert('Invalid Hospital Code');
    }
});