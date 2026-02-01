# Contacts Management Frontend

A clean, modern frontend application for managing contacts built with vanilla JavaScript, HTML, and CSS.

> **Note:** This is a standalone frontend repository. Make sure the [Contacts Management API](https://github.com/yourusername/Contacts-Management-API) backend is running for full functionality.

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Contacts-Management-Frontend
   ```

2. **Ensure the backend API is running:**
   - See the [Contacts Management API](https://github.com/yourusername/Contacts-Management-API) repository for backend setup
   - Backend should be running on `http://localhost:3000`

3. **Serve the frontend files:**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Node.js http-server
   npx http-server -p 8000
   ```

4. **Open in browser:**
   Navigate to `http://localhost:8000`

## Features

- User registration and login
- Create new contacts
- View all contacts in a responsive grid layout
- Edit existing contacts
- Delete contacts
- Clean, modern UI with gradient design
- Responsive design for mobile and desktop
- Secure authentication with JWT tokens

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- The [Contacts Management API](https://github.com/yourusername/Contacts-Management-API) backend server running
  - See the backend repository for setup instructions

## Detailed Setup Instructions

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Contacts-Management-Frontend
```

### Step 2: Configure API URL

Open `app.js` and verify the API base URL matches your backend server:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

**If your backend runs on a different URL or port**, update this constant:
```javascript
// Example for different port
const API_BASE_URL = 'http://localhost:5000/api';

// Example for remote backend
const API_BASE_URL = 'https://your-backend-domain.com/api';
```

### Step 3: Ensure Backend is Running

Before starting the frontend, make sure the backend API is running:
- Backend should be accessible at the URL specified in `API_BASE_URL`
- See the [Contacts Management API](https://github.com/yourusername/Contacts-Management-API) repository for backend setup

### Step 4: Serve the Frontend

Choose one of the following methods to serve the frontend files:

### Option 1: Using Python (if installed)
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Option 2: Using Node.js http-server (if installed)
```bash
npx http-server -p 8000
```

### Option 3: Using VS Code Live Server Extension
- Install the "Live Server" extension in VS Code
- Right-click on `index.html` and select "Open with Live Server"

### Option 4: Open directly in browser
- Simply open `index.html` in your web browser (note: some features may not work due to CORS restrictions)

4. Open your browser and navigate to:
```
http://localhost:8000
```
(or the port you specified)

## Usage

### Registration
1. Click on "Register here" if you don't have an account
2. Fill in your name, email, and password (minimum 6 characters)
3. Click "Register"
4. You'll be automatically logged in

### Login
1. Enter your email and password
2. Click "Login"
3. You'll be redirected to the contacts management interface

### Managing Contacts

#### Add a Contact
1. Fill in the contact form with:
   - Name
   - Email
   - Phone number
2. Click "Add Contact"

#### Edit a Contact
1. Click the "Edit" button on any contact card
2. The contact information will populate the form
3. Make your changes
4. Click "Update Contact"
5. Or click "Cancel" to discard changes

#### Delete a Contact
1. Click the "Delete" button on any contact card
2. Confirm the deletion in the popup dialog

### Logout
Click the "Logout" button in the top right corner to sign out.

## Project Structure

```
contact.management.frontend/
├── index.html              # Main HTML entry point
├── app.js                  # Application logic and API integration
├── styles.css              # All styling and responsive design
├── package.json            # Project metadata and scripts
├── .gitignore             # Git ignore rules
├── .editorconfig          # Editor configuration
├── README.md              # Main documentation
└── docs/                  # Additional documentation
    ├── IMPLEMENTATION_STATUS.md
    ├── REQUIREMENTS_CHECKLIST.md
    ├── SETUP.md
    └── PUSH_SUMMARY.md
```

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed structure documentation.

## API Integration

The frontend communicates with the backend API at `http://localhost:3000/api`. Make sure:

1. The backend server is running
2. CORS is enabled on the backend (it should be by default)
3. The API base URL in `app.js` matches your backend server URL

## Features in Detail

### Authentication
- JWT tokens are stored in localStorage
- Automatic login persistence (stays logged in after page refresh)
- Secure token-based API requests

### User Interface
- Modern gradient design
- Responsive grid layout for contacts
- Smooth transitions and hover effects
- Clear error messages
- Intuitive form validation

### Data Management
- Real-time contact list updates
- Optimistic UI updates
- Error handling for network issues
- User-specific contact isolation (handled by backend)

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- Vanilla JavaScript (ES6+)
- HTML5
- CSS3 (with Flexbox and Grid)
- Fetch API for HTTP requests
- LocalStorage for token persistence

## Troubleshooting

### "Network error" messages
- Ensure the backend server is running
- Check that the API URL in `app.js` is correct
- Verify CORS is enabled on the backend

### Contacts not loading
- Check browser console for errors
- Verify you're logged in (check localStorage)
- Ensure the backend API is accessible

### Styling issues
- Clear browser cache
- Ensure `styles.css` is in the same directory as `index.html`

## License

ISC
