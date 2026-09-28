# Placement Tracker System

A full-stack web application designed to help students manage job opportunities, applications, interviews, deadlines, and placement progress in one place.

## Features

- User registration and login
- Secure authentication using JWT
- Add and manage job opportunities
- Track application status
- Dashboard with application statistics
- Application calendar
- Search and filtering
- Responsive user interface

## Tech Stack

### Frontend

- React.js
- Vite
- TailwindCSS
- Axios

### Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcrypt

### Database

- MongoDB
- Mongoose

## Project Structure

```text
Placement-tracker-system/
├── client/
│   ├── public/
│   └── src/
└── server/
    ├── models/
    ├── routes/
    └── server.js
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Git

### Clone the Repository

```bash
git clone https://github.com/HARSHITKALRAAA/Placement-tracker-system.git
cd Placement-tracker-system
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

### Run the Backend

```bash
npm run dev
```

### Run the Frontend

```bash
cd client
npm run dev
```

The application will then be available through the local Vite development URL.

## Future Improvements

- Advanced analytics
- Improved application filtering
- Deployment
- Additional application management features
- Enhanced user profile settings