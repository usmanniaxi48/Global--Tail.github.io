let isLoggedIn = false; // Declare isLoggedIn globally

document.addEventListener('DOMContentLoaded', function() {
    // Check login status on page load
    checkLoginStatus();

    // Handle login form submission
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        loginUser();
    });

    // Handle skip login button click
    document.getElementById('skipLoginBtn').addEventListener('click', function() {
        skipLogin();
    });

    // Handle logout button click
    document.getElementById('logoutBtn').addEventListener('click', function(event) {
        event.preventDefault();
        logoutUser();
    });

    // Handle navigation clicks to ensure login status
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href').substring(1);
            if (targetId === 'registration' && !isLoggedIn) {
                event.preventDefault();
                showLoginPage(); // This will now only show the login form, header remains
                alert('Please log in to access the registration form.');
            } else if (targetId === 'login' && isLoggedIn) {
                event.preventDefault(); // Prevent navigating to login if already logged in
            }
        });
    });
});

function checkLoginStatus() {
    // The header should always be visible, so no class manipulation here
    document.getElementById('mainHeader').classList.remove('d-none'); // Ensure it's always visible on load

    if (localStorage.getItem('isLoggedIn') === 'true') {
        isLoggedIn = true;
        showMainContent();
    } else {
        isLoggedIn = false;
        showLoginPage();
    }
}

function showMainContent() {
    document.getElementById('login').classList.add('d-none');
    document.getElementById('mainContent').classList.remove('d-none');
    // Ensure the home section is visible after login
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
}

function showLoginPage() {
    document.getElementById('login').classList.remove('d-none');
    document.getElementById('mainContent').classList.add('d-none');
}

function loginUser() {
    // In a real application, you would send credentials to a server for authentication.
    // For this example, we'll just simulate a successful login.
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email && password) { // Simple check for non-empty fields
        localStorage.setItem('isLoggedIn', 'true');
        isLoggedIn = true;
        showMainContent();
        alert('Login successful!');
    } else {
        alert('Please enter both email and password.');
    }
}

function skipLogin() {
    localStorage.setItem('isLoggedIn', 'true'); // Treat skipping as a form of "logged in" for access
    isLoggedIn = true;
    showMainContent();
    alert('Skipped login. Welcome!');
}

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    isLoggedIn = false;
    showLoginPage();
    alert('You have been logged out.');
}
