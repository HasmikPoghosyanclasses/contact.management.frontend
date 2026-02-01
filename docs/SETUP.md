# Setup Instructions for Separate Repository

## Repository Name
**Contacts Management Frontend** (or your preferred name)

## Initial Git Setup

1. **Initialize Git repository:**
   ```bash
   # If you're in the frontend directory already:
   git init
   
   # Or if you need to navigate there:
   cd Contacts-Management-Frontend
   git init
   ```

2. **Add all files:**
   ```bash
   git add .
   ```

3. **Create initial commit:**
   ```bash
   git commit -m "Initial commit: Contacts Management Frontend"
   ```

4. **Add remote repository (after creating on GitHub):**
   ```bash
   git remote add origin https://github.com/yourusername/Contacts-Management-Frontend.git
   ```

5. **Push to GitHub:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Important Notes

- The frontend is a standalone application
- It requires the backend API to be running (see Contacts Management API repository)
- Update `API_BASE_URL` in `app.js` if your backend runs on a different URL
- No build process required - just serve the static files

## Configuration

If your backend runs on a different URL, update `app.js`:

```javascript
const API_BASE_URL = 'http://your-backend-url:port/api';
```
