# Authentication System Documentation

## Overview
Complete authentication system for the Job Portal application with login, register, logout, and session management.

## Features Implemented

### ✅ User Registration
- User registration with optional profile picture upload
- Auto-login after successful registration
- Validation for all required fields
- Error handling with user-friendly messages
- Loading states during submission

### ✅ User Login
- Email and password authentication
- Remember attempted route for redirect after login
- Loading states during submission
- Comprehensive error handling
- Auto-redirect to home or intended page

### ✅ User Logout
- Logout button in navbar user menu dropdown
- Clears user session from Zustand store
- Clears authentication cookie on server
- Redirects to landing page

### ✅ Session Management
- JWT token-based authentication with httpOnly cookies
- Token verification on app load
- Auto-redirect to login for protected routes
- Persistent login using localStorage (Zustand persist)

### ✅ Protected Routes
- All main routes require authentication
- Public routes: Landing, Login, Register, FAQ
- Protected routes: Home, Create Job, Job Details, Applied, Admin Panel
- Auto-redirect to login when accessing protected routes without auth

### ✅ State Management (Zustand)
- Centralized user state
- Logout action to clear all user data
- Persisted to localStorage
- Jobs and other app state management

## File Structure

```
client/src/
├── components/
│   ├── Navbar/
│   │   └── Navbar.jsx          # Logout functionality & user menu
│   └── ProtectedRoute/
│       └── ProtectedRoute.jsx   # Route protection wrapper
├── pages/
│   └── userCredentials/
│       ├── Login.jsx            # Login page
│       └── RegisterPage.jsx     # Registration page
├── utils/
│   └── authUtils.js             # Authentication API calls
├── Zustand/
│   └── ZustandStore.jsx         # State management
└── App.jsx                      # Route configuration & auth verification
```

## Usage

### Login Flow
1. User navigates to `/login`
2. Enters email and password
3. System validates input
4. Sends request to `/api/login`
5. Server returns JWT cookie and user data
6. User stored in Zustand
7. Redirects to intended page or home

### Register Flow
1. User navigates to `/register`
2. Fills form (name, email, password, optional profile pic)
3. System validates input
4. Sends FormData to `/api/register`
5. After successful registration, auto-login
6. Redirects to home page

### Logout Flow
1. User clicks profile picture in navbar
2. Dropdown menu appears
3. User clicks "Logout"
4. Request sent to `/api/logout`
5. Server clears cookie
6. Zustand store cleared
7. Redirects to landing page

### Protected Route Access
1. User tries to access protected route (e.g., `/home`)
2. ProtectedRoute component checks if user exists
3. If no user: redirect to `/login` with saved location
4. If user exists: render the component
5. After login: redirect to originally requested page

## API Endpoints Used

- `POST /api/register` - Create new user account
- `POST /api/login` - Authenticate user
- `POST /api/logout` - Clear user session
- `GET /api/me` - Verify JWT token and get user data

## Security Features

- JWT tokens stored in httpOnly cookies (not accessible via JavaScript)
- Credentials sent with requests (`withCredentials: true`)
- CORS configured for specific frontend origin
- Automatic token verification on app load
- Protected routes prevent unauthorized access

## State Structure (Zustand)

```javascript
{
  user: null | UserObject,
  jobs: [],
  jobDetails: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  
  // Actions
  setUser: (user) => void,
  setJobs: (jobs) => void,
  setJobDetails: (jobDetails) => void,
  setIsLoading: (isLoading) => void,
  setError: (error) => void,
  setIsAuthenticated: (isAuthenticated) => void,
  clearUser: () => void,
  logout: () => void
}
```

## User Object Structure

```javascript
{
  _id: string,
  name: string,
  email: string,
  profilePic: string,
  savedPosts: [ObjectId],
  AppliedJobs: [ObjectId],
  Createdjobs: [ObjectId],
  createdAt: Date
}
```

## Testing the Authentication

1. **Register a new user:**
   - Go to `/register`
   - Fill in name, email, password
   - Optionally upload profile picture
   - Should auto-login and redirect to home

2. **Login:**
   - Go to `/login`
   - Enter credentials
   - Should redirect to home

3. **Protected Routes:**
   - While logged out, try accessing `/home`
   - Should redirect to login
   - After login, should return to `/home`

4. **Logout:**
   - Click profile picture in navbar
   - Click "Logout" button
   - Should redirect to landing page
   - Try accessing `/home` - should redirect to login

5. **Session Persistence:**
   - Login
   - Refresh page
   - Should remain logged in
   - Close browser and reopen
   - Should remain logged in (until token expires)

## Environment Variables Required

```env
VITE_BACKEND_URL=http://localhost:8000/api
```

## Known Limitations & Improvements Needed

### Security Improvements Needed:
1. ⚠️ **Password Hashing** - Passwords currently stored in plain text
2. ⚠️ **JWT Secret** - Currently hardcoded, should use environment variable
3. Add password strength validation
4. Add email verification
5. Add password reset functionality
6. Add rate limiting for login attempts
7. Add CSRF protection

### UX Improvements:
1. Add "Remember Me" functionality
2. Add password visibility toggle
3. Add form validation feedback
4. Add session timeout warning
5. Add "Stay logged in" option

## Next Steps

To make the authentication production-ready:

1. **Server Side:**
   - Implement bcrypt for password hashing
   - Move JWT secret to environment variable
   - Add input sanitization
   - Add rate limiting
   - Add refresh token mechanism

2. **Client Side:**
   - Add better loading states
   - Add form validation
   - Add password strength meter
   - Implement refresh token handling
   - Add session timeout handling
