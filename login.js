
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var hospitalCode = document.getElementById('hospitalCode').value;
    if (hospitalCode == '12345') {
        document.getElementById('hospitalName').innerText = 'Ponya Hospital';
        document.getElementById('hospitalCode').style.display='none';
        document.getElementById('proceed').style.display = 'none';
        document.getElementById('hospitalName').style.display = 'block';
        document.getElementById('username').style.display = 'block';
        document.getElementById('password').style.display = 'block';
        document.getElementById('loginButton').style.display = 'block';
       

    
} else {
    alert('Invalid Hospital Code');
}

});

