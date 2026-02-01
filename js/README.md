# JavaScript Modules

This directory contains the modular JavaScript code organized by functionality.

## Module Structure

### `app.js`
Main application entry point. Initializes all modules and sets up event listeners.

### `config.js`
API configuration constants (base URL, endpoints).

### `state.js`
Application state management (user, auth token, editing state).

### `dom.js`
Centralized DOM element references for better maintainability.

### `api.js`
API service layer with all HTTP requests:
- `authAPI` - Authentication endpoints
- `contactsAPI` - Contact CRUD operations

### `auth.js`
Authentication logic:
- Login/Register handlers
- Session management
- Logout functionality

### `contacts.js`
Contact management logic:
- Create/Read/Update/Delete operations
- Form handling
- Edit mode management

### `ui.js`
UI manipulation functions:
- Show/hide sections
- Display contacts
- Load and render data

### `utils.js`
Utility functions:
- HTML escaping (XSS protection)
- Error message display
- Helper functions

## Benefits of This Structure

✅ **Separation of Concerns** - Each module has a single responsibility
✅ **Maintainability** - Easy to find and modify specific functionality
✅ **Testability** - Modules can be tested independently
✅ **Scalability** - Easy to add new features without cluttering
✅ **Code Reusability** - Functions can be imported where needed
✅ **ES6 Modules** - Modern JavaScript standard

## Import/Export Pattern

All modules use ES6 import/export syntax:

```javascript
// Export
export function myFunction() { ... }
export const myConstant = ...;

// Import
import { myFunction, myConstant } from './module.js';
```

## Dependencies

```
app.js
├── auth.js
│   ├── api.js
│   │   ├── config.js
│   │   └── state.js
│   └── ui.js
│       ├── dom.js
│       ├── state.js
│       └── utils.js
└── contacts.js
    ├── api.js
    ├── dom.js
    ├── state.js
    └── utils.js
```
