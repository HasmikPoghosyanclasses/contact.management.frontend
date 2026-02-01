import { API_BASE_URL } from './config.js';
import { authToken } from './state.js';

/**
 * Make API request with authentication
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<Response>} Fetch response
 */
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    // Add auth token if available
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    return fetch(url, {
        ...options,
        headers
    });
}

// Authentication API
export const authAPI = {
    /**
     * Register a new user
     * @param {string} name - User name
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<object>} User data with token
     */
    async register(name, email, password) {
        const response = await apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (!response.ok) {
            throw { ...data, status: response.status };
        }
        return data;
    },

    /**
     * Login user
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<object>} User data with token
     */
    async login(email, password) {
        const response = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok) {
            throw { ...data, status: response.status };
        }
        return data;
    }
};

// Contacts API
export const contactsAPI = {
    /**
     * Get all contacts
     * @returns {Promise<Array>} Array of contacts
     */
    async getAll() {
        const response = await apiRequest('/contacts');
        const data = await response.json();
        if (!response.ok) {
            throw { ...data, status: response.status };
        }
        return data;
    },

    /**
     * Get a single contact by ID
     * @param {string} id - Contact ID
     * @returns {Promise<object>} Contact data
     */
    async getById(id) {
        const response = await apiRequest(`/contacts/${id}`);
        const data = await response.json();
        if (!response.ok) {
            throw { ...data, status: response.status };
        }
        return data;
    },

    /**
     * Create a new contact
     * @param {object} contact - Contact data (name, email, phone)
     * @returns {Promise<object>} Created contact
     */
    async create(contact) {
        const response = await apiRequest('/contacts', {
            method: 'POST',
            body: JSON.stringify(contact)
        });
        const data = await response.json();
        if (!response.ok) {
            throw { ...data, status: response.status };
        }
        return data;
    },

    /**
     * Update an existing contact
     * @param {string} id - Contact ID
     * @param {object} contact - Updated contact data
     * @returns {Promise<object>} Updated contact
     */
    async update(id, contact) {
        const response = await apiRequest(`/contacts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(contact)
        });
        const data = await response.json();
        if (!response.ok) {
            throw { ...data, status: response.status };
        }
        return data;
    },

    /**
     * Delete a contact
     * @param {string} id - Contact ID
     * @returns {Promise<object>} Deletion result
     */
    async delete(id) {
        const response = await apiRequest(`/contacts/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        if (!response.ok) {
            throw { ...data, status: response.status };
        }
        return data;
    }
};
