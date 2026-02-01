import { dom } from './dom.js';
import { currentUser } from './state.js';
import { contactsAPI } from './api.js';
import { escapeHtml } from './utils.js';

/**
 * Show authentication section
 */
export function showAuth() {
    dom.authSection.style.display = 'flex';
    dom.appSection.style.display = 'none';
}

/**
 * Show main application section
 */
export function showApp() {
    dom.authSection.style.display = 'none';
    dom.appSection.style.display = 'block';
    dom.userName.textContent = currentUser.name;
    loadContacts();
}

/**
 * Load and display contacts
 */
export async function loadContacts() {
    try {
        const contacts = await contactsAPI.getAll();
        displayContacts(contacts);
    } catch (error) {
        if (error.status === 401) {
            // Token expired, trigger logout
            dom.logoutBtn.click();
        } else {
            console.error('Error loading contacts:', error);
        }
    }
}

/**
 * Display contacts in the UI
 * @param {Array} contacts - Array of contact objects
 */
function displayContacts(contacts) {
    dom.contactsList.innerHTML = '';

    if (contacts.length === 0) {
        dom.noContacts.style.display = 'block';
        return;
    }

    dom.noContacts.style.display = 'none';

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
        dom.contactsList.appendChild(contactCard);
    });
}
