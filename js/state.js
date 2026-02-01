// State Management
export let currentUser = null;
export let authToken = null;
export let editingContactId = null;

// State setters
export function setCurrentUser(user) {
    currentUser = user;
}

export function setAuthToken(token) {
    authToken = token;
}

export function setEditingContactId(id) {
    editingContactId = id;
}

export function clearState() {
    currentUser = null;
    authToken = null;
    editingContactId = null;
}
