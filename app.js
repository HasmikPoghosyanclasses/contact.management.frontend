// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// State Management
let currentUser = null;
let authToken = null;
let editingContactId = null;

// DOM Elements
const authSection = document.getElementById('authSection');
const appSection = document.getElementById('appSection');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginFormElement = document.getElementById('loginFormElement');
const registerFormElement = document.getElementById('registerFormElement');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');
const contactForm = document.getElementById('contactForm');
const contactsList = document.getElementById('contactsList');
const noContacts = document.getElementById('noContacts');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    
    if (token && user) {
        authToken = token;
        currentUser = JSON.parse(user);
        showApp();
    }
});

// Auth Form Switcher
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    clearAuthErrors();
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    clearAuthErrors();
});

// Login
loginFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAuthErrors();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            currentUser = { _id: data._id, name: data.name, email: data.email };
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showApp();
            loginFormElement.reset();
        } else {
            showAuthError('loginError', data.message || 'Login failed');
        }
    } catch (error) {
        showAuthError('loginError', 'Network error. Please check if the server is running.');
    }
});

// Register
registerFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAuthErrors();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            currentUser = { _id: data._id, name: data.name, email: data.email };
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showApp();
            registerFormElement.reset();
        } else {
            showAuthError('registerError', data.message || 'Registration failed');
        }
    } catch (error) {
        showAuthError('registerError', 'Network error. Please check if the server is running.');
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    authToken = null;
    currentUser = null;
    editingContactId = null;
    showAuth();
    contactForm.reset();
    resetContactForm();
});

// Contact Form Submit
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearContactError();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    
    try {
        let response;
        if (editingContactId) {
            // Update contact
            response = await fetch(`${API_BASE_URL}/contacts/${editingContactId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ name, email, phone })
            });
        } else {
            // Create contact
            response = await fetch(`${API_BASE_URL}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ name, email, phone })
            });
        }
        
        const data = await response.json();
        
        if (response.ok) {
            contactForm.reset();
            resetContactForm();
            loadContacts();
        } else {
            showContactError(data.message || 'Failed to save contact');
        }
    } catch (error) {
        showContactError('Network error. Please check if the server is running.');
    }
});

// Cancel Edit
cancelBtn.addEventListener('click', () => {
    contactForm.reset();
    resetContactForm();
});

// Show Auth Section
function showAuth() {
    authSection.style.display = 'flex';
    appSection.style.display = 'none';
}

// Show App Section
function showApp() {
    authSection.style.display = 'none';
    appSection.style.display = 'block';
    userName.textContent = currentUser.name;
    loadContacts();
}

// Load Contacts
async function loadContacts() {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (response.ok) {
            const contacts = await response.json();
            displayContacts(contacts);
        } else {
            if (response.status === 401) {
                // Token expired, logout
                logoutBtn.click();
            }
        }
    } catch (error) {
        console.error('Error loading contacts:', error);
    }
}

// Display Contacts
function displayContacts(contacts) {
    contactsList.innerHTML = '';
    
    if (contacts.length === 0) {
        noContacts.style.display = 'block';
        return;
    }
    
    noContacts.style.display = 'none';
    
    contacts.forEach(contact => {
        const contactCard = document.createElement('div');
        contactCard.className = 'contact-card';
        contactCard.innerHTML = `
            <h3>${escapeHtml(contact.name)}</h3>
            <div class="contact-info">
                <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
                <p><strong>Phone:</strong> ${escapeHtml(contact.phone)}</p>
            </div>
            <div class="contact-actions">
                <button class="btn btn-edit" onclick="editContact('${contact._id}')">Edit</button>
                <button class="btn btn-delete" onclick="deleteContact('${contact._id}')">Delete</button>
            </div>
        `;
        contactsList.appendChild(contactCard);
    });
}

// Edit Contact
async function editContact(contactId) {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (response.ok) {
            const contact = await response.json();
            document.getElementById('contactId').value = contact._id;
            document.getElementById('contactName').value = contact.name;
            document.getElementById('contactEmail').value = contact.email;
            document.getElementById('contactPhone').value = contact.phone;
            
            editingContactId = contact._id;
            formTitle.textContent = 'Edit Contact';
            submitBtn.textContent = 'Update Contact';
            cancelBtn.style.display = 'block';
            
            // Scroll to form
            document.querySelector('.contact-form-container').scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        showContactError('Error loading contact for editing');
    }
}

// Delete Contact
async function deleteContact(contactId) {
    if (!confirm('Are you sure you want to delete this contact?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (response.ok) {
            loadContacts();
            // If we were editing this contact, reset the form
            if (editingContactId === contactId) {
                contactForm.reset();
                resetContactForm();
            }
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to delete contact');
        }
    } catch (error) {
        alert('Network error. Please try again.');
    }
}

// Reset Contact Form
function resetContactForm() {
    editingContactId = null;
    formTitle.textContent = 'Add New Contact';
    submitBtn.textContent = 'Add Contact';
    cancelBtn.style.display = 'none';
    document.getElementById('contactId').value = '';
    clearContactError();
}

// Error Handling
function showAuthError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearAuthErrors() {
    document.getElementById('loginError').classList.remove('show');
    document.getElementById('registerError').classList.remove('show');
}

function showContactError(message) {
    const errorElement = document.getElementById('contactError');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    setTimeout(() => {
        errorElement.classList.remove('show');
    }, 5000);
}

function clearContactError() {
    document.getElementById('contactError').classList.remove('show');
}

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions globally available for onclick handlers
window.editContact = editContact;
window.deleteContact = deleteContact;
