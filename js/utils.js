// Utility Functions

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML
 */
export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Show authentication error message
 * @param {string} errorId - ID of error element
 * @param {string} message - Error message to display
 */
export function showAuthError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

/**
 * Clear all authentication error messages
 */
export function clearAuthErrors() {
    document.getElementById('loginError').classList.remove('show');
    document.getElementById('registerError').classList.remove('show');
}

/**
 * Show contact error message
 * @param {string} message - Error message to display
 */
export function showContactError(message) {
    const errorElement = document.getElementById('contactError');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    setTimeout(() => {
        errorElement.classList.remove('show');
    }, 5000);
}

/**
 * Clear contact error message
 */
export function clearContactError() {
    document.getElementById('contactError').classList.remove('show');
}
