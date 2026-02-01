import { contactsAPI } from './api.js';
import { authToken, editingContactId, setEditingContactId } from './state.js';
import { dom } from './dom.js';
import { escapeHtml, showContactError, clearContactError } from './utils.js';
import { loadContacts } from './ui.js';

/**
 * Initialize contact management event listeners
 */
export function initContacts() {
    // Contact Form Submit
    dom.contactForm.addEventListener('submit', handleContactSubmit);

    // Cancel Edit Button
    dom.cancelBtn.addEventListener('click', () => {
        dom.contactForm.reset();
        resetContactForm();
    });

    // Make functions globally available for onclick handlers
    window.editContact = editContact;
    window.deleteContact = deleteContact;
}

/**
 * Handle contact form submission (create or update)
 * @param {Event} e - Form submit event
 */
async function handleContactSubmit(e) {
    e.preventDefault();
    clearContactError();

    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;

    try {
        if (editingContactId) {
            // Update contact
            await contactsAPI.update(editingContactId, { name, email, phone });
        } else {
            // Create contact
            await contactsAPI.create({ name, email, phone });
        }

        dom.contactForm.reset();
        resetContactForm();
        loadContacts();
    } catch (error) {
        showContactError(error.message || 'Network error. Please check if the server is running.');
    }
}

/**
 * Edit a contact
 * @param {string} contactId - Contact ID to edit
 */
export async function editContact(contactId) {
    try {
        const contact = await contactsAPI.getById(contactId);

        document.getElementById('contactId').value = contact._id;
        document.getElementById('contactName').value = contact.name;
        document.getElementById('contactEmail').value = contact.email;
        document.getElementById('contactPhone').value = contact.phone;

        setEditingContactId(contact._id);
        dom.formTitle.textContent = 'Edit Contact';
        dom.submitBtn.textContent = 'Update Contact';
        dom.cancelBtn.style.display = 'block';

        // Scroll to form
        document.querySelector('.contact-form-container').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showContactError('Error loading contact for editing');
    }
}

/**
 * Delete a contact
 * @param {string} contactId - Contact ID to delete
 */
export async function deleteContact(contactId) {
    if (!confirm('Are you sure you want to delete this contact?')) {
        return;
    }

    try {
        await contactsAPI.delete(contactId);
        loadContacts();

        // If we were editing this contact, reset the form
        if (editingContactId === contactId) {
            dom.contactForm.reset();
            resetContactForm();
        }
    } catch (error) {
        alert(error.message || 'Network error. Please try again.');
    }
}

/**
 * Reset contact form to "Add" mode
 */
export function resetContactForm() {
    setEditingContactId(null);
    dom.formTitle.textContent = 'Add New Contact';
    dom.submitBtn.textContent = 'Add Contact';
    dom.cancelBtn.style.display = 'none';
    document.getElementById('contactId').value = '';
    clearContactError();
}
