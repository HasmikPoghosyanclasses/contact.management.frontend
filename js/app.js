// Main Application Entry Point
import { initAuth, checkAuthStatus } from './auth.js';
import { initContacts } from './contacts.js';

// Initialize application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    checkAuthStatus();

    // Initialize authentication
    initAuth();

    // Initialize contacts management
    initContacts();
});
