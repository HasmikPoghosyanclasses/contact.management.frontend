import { authAPI } from './api.js';
import { setCurrentUser, setAuthToken, clearState } from './state.js';
import { dom } from './dom.js';
import { showAuthError, clearAuthErrors } from './utils.js';
import { showApp, showAuth } from './ui.js';
import { resetContactForm } from './contacts.js';

/**
 * Initialize authentication event listeners
 */
export function initAuth() {
    // Auth Form Switcher
    dom.showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        dom.loginForm.style.display = 'none';
        dom.registerForm.style.display = 'block';
        clearAuthErrors();
    });

    dom.showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        dom.registerForm.style.display = 'none';
        dom.loginForm.style.display = 'block';
        clearAuthErrors();
    });

    // Login Form Submit
    dom.loginFormElement.addEventListener('submit', handleLogin);

    // Register Form Submit
    dom.registerFormElement.addEventListener('submit', handleRegister);

    // Logout Button
    dom.logoutBtn.addEventListener('click', handleLogout);
}

/**
 * Handle user login
 * @param {Event} e - Form submit event
 */
async function handleLogin(e) {
    e.preventDefault();
    clearAuthErrors();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const data = await authAPI.login(email, password);
        setAuthToken(data.token);
        setCurrentUser({ _id: data._id, name: data.name, email: data.email });
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('currentUser', JSON.stringify({
            _id: data._id,
            name: data.name,
            email: data.email
        }));
        showApp();
        dom.loginFormElement.reset();
    } catch (error) {
        showAuthError('loginError', error.message || 'Network error. Please check if the server is running.');
    }
}

/**
 * Handle user registration
 * @param {Event} e - Form submit event
 */
async function handleRegister(e) {
    e.preventDefault();
    clearAuthErrors();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const data = await authAPI.register(name, email, password);
        setAuthToken(data.token);
        setCurrentUser({ _id: data._id, name: data.name, email: data.email });
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('currentUser', JSON.stringify({
            _id: data._id,
            name: data.name,
            email: data.email
        }));
        showApp();
        dom.registerFormElement.reset();
    } catch (error) {
        showAuthError('registerError', error.message || 'Network error. Please check if the server is running.');
    }
}

/**
 * Handle user logout
 */
function handleLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    clearState();
    showAuth();
    dom.contactForm.reset();
    resetContactForm();
}

/**
 * Check if user is already logged in (from localStorage)
 */
export function checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');

    if (token && user) {
        setAuthToken(token);
        setCurrentUser(JSON.parse(user));
        showApp();
    }
}
