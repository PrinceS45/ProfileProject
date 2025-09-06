DevProfiles
DevProfiles is a full-stack web application that allows developers to create, share, and discover professional profiles. It provides a platform for users to showcase their skills, projects, and work experience.

Features
User Authentication: Secure user registration and login functionality.

Profile Management: Users can create, view, update, and delete their own profiles.

Dynamic Profile Sections: Add and manage sections for education, work experience, projects, skills, and personal links.

Discover Profiles: View a list of all developer profiles.

Search by Skill: Filter and find developers based on specific skills.

Responsive Design: A clean and modern user interface that works on all devices.

Technologies Used
Frontend
React: A JavaScript library for building user interfaces.

Vite: A fast and modern build tool for web development.

Zustand: A small, fast, and scalable state-management solution for React.

React Router: For declarative routing in the React application.

Axios: A promise-based HTTP client for making API requests.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

React Hot Toast: For adding beautiful, lightweight, and customizable notifications.

React Icons: A library of popular icon packs.

Backend
Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.

Express: A fast, unopinionated, and minimalist web framework for Node.js.

MongoDB: A NoSQL database for storing application data.

Mongoose: An elegant MongoDB object modeling tool for Node.js.

JWT (JSON Web Tokens): For secure user authentication.

bcrypt.js: A library for hashing passwords.

CORS: For enabling Cross-Origin Resource Sharing.

Dotenv: For managing environment variables.

Getting Started
Prerequisites
Node.js (v14 or later)

npm (or yarn)

MongoDB

Installation
Clone the repository:

git clone https://github.com/PrinceS45/ProfileProject
cd profile-project

Install backend dependencies:

cd backend
npm install

Install frontend dependencies:

cd ../frontend
npm install

Set up environment variables:

Create a .env file in the backend directory and add the following:

PORT=5001
MONGODB_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

Running the Application
Start the backend server:

cd backend
npm run dev

Start the frontend development server:

cd ../frontend
npm run dev

The application will be available at https://profile-project-rho.vercel.app/.

API Endpoints
Auth Routes (/api/auth)
POST /signup: Register a new user.

POST /login: Log in an existing user.

GET /logout: Log out the current user.

GET /checkAuth: Check if a user is authenticated.

Profile Routes (/api/userProfile)
GET /profiles: Get all user profiles.

GET /profile/:id: Get a specific user profile by ID.

GET /profile/skills: Get profiles by skills.

GET /me: Get the profile of the currently logged-in user.

POST /createProfile: Create a new profile.

PATCH /updateProfile/:id: Update a profile.

DELETE /deleteProfile/:id: Delete a profile.

Project Structure
profile-project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   ├── package.json
│   └── .gitignore
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/
    │   ├── assets/
    │   ├── components/
    │   ├── Layout/
    │   ├── pages/
    │   ├── store/
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── package.json
    └── .gitignore

Contributing
Contributions are welcome! Please feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License.