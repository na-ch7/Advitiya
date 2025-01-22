// General: Handle navigation between pages
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    // Highlight current navigation or log the current page
    console.log(`Current Path: ${currentPath}`);

    // Added code for handling the "Login" button click and redirection to client_login.html
    const loginButton = document.getElementById('loginButton');  // Get the Login button by its ID
    if (loginButton) {  // Check if the button exists
        loginButton.addEventListener('click', () => {
            // Redirect to the client_login.html page
            window.location.href = 'client_login.html'; 
        });
    }
});

// File: client_login.html - Handle login form submission
if (window.location.pathname.includes('client_login.html')) {
    const loginForm = document.querySelector('form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            alert('Login successful!');
            // Add your actual login logic here
            window.location.href = 'profile.html';
        } else {
            alert('Please enter both email and password.');
        }
    });
}

// File: reg_talent.html - Handle talent registration form submission
if (window.location.pathname.includes('reg_talent.html')) {
    const registrationForm = document.querySelector('form');
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const expertise = document.getElementById('expertise').value;
        const description = document.getElementById('description').value;
        const skills = document.getElementById('skills').value;
        const linkedin = document.getElementById('linkedin').value;

        if (name && contact && email && password && expertise && description && skills && linkedin) {
            alert('Registration successful!');
            // Add your actual registration logic here
            window.location.href = 'client_login.html'; 
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// File: profile.html - Handle button interactions
if (window.location.pathname.includes('profile.html')) {
    const resumeButton = document.querySelector('button:first-child');
    const meetingButton = document.querySelector('button:last-child');

    resumeButton.addEventListener('click', () => {
        alert('Displaying resume...');
        // Logic to display resume can be added here
    });

    meetingButton.addEventListener('click', () => {
        alert('Redirecting to login...');
        window.location.href = 'client_login.html'; 
    });
}

// File: Exploretalents.html - Handle search functionality
if (window.location.pathname.includes('Exploretalents.html')) {
    const searchInput = document.querySelector('.search');
    const searchButton = document.querySelector('.login');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Searching for: ${query}`);
            // Add search logic here
        } else {
            alert('Please enter a search term.');
        }
    });
}
