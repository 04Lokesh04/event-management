# Event Management System

A full-stack Event Management application that allows users to:

- Create events
- Edit events
- Track timezones correctly
- View detailed event update logs
- Manage attendee profiles
- Persist data with MongoDB

Built using MERN + Redux Toolkit + Day.js

# Tech Stack
### Frontend

React (Vite)

Redux Toolkit

React-Bootstrap

React-DatePicker

Day.js (with timezone support)

### Backend

Node.js

Express

MongoDB (Mongoose)

Day.js (backend conversion utilities)

# Features
### Event Management

- Create events
- Edit events
- Uses local time → converts to UTC for safe storage
- Validates start/end times
- Multiple attendees (profiles)

### Timezone Support

View event times in your timezone

Each event stores its original timezone

Convert correctly using Day.js

# Change Logs

Every update to an event records:

Fields changed

New value

Timestamp

Logged fields:

Profiles

Timezone

Start time

End time

# Profiles

Create profiles dynamically

Attach profiles to events

# Environment Setup
### Prerequisites

Node.js ≥ 18

MongoDB

# Backend Setup
```
cd backend
npm install
```
# Environment Variables

Create .env:

```
MONGODB_URI=############
PORT=5000
```
# Run Server
```
npm start
```

Runs at http://localhost:5000

# Frontend Setup
```
cd frontend
npm install
npm run dev
```

Runs at http://localhost:5173
