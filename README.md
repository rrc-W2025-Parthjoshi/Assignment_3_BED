# Event Registration API

## Project Overview

The Event Registration API is a RESTful backend service built with Node.js, TypeScript, and Express. It allows users to create, manage, and track events with full CRUD functionality. Each event includes details like name, date, capacity, status, and category.

This API solves the problem of managing event registrations in a structured and validated way. It ensures data integrity through Joi validation and stores data persistently using Firebase Firestore.

It is intended for developers who want to integrate event management functionality into their applications.

## Installation Instructions

### Prerequisites
- Node.js v20 or higher
- npm
- A Firebase project with Firestore enabled

### Steps

1. Clone the repository:
```bash
git clone https://github.com/rrc-W2025-Parthjoshi/Assignment_3_BED.git
cd Assignment_3_BED
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Then open `.env` and fill in your Firebase credentials:
```
NODE_ENV=development
PORT=3000
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key-here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
```

4. Start the server:
```bash
npm start
```

The server will run at `http://localhost:3000`

## API Request Examples

### 1. Health Check

**Request:**
```bash
curl -X GET http://localhost:3000/api/v1/health
```

**Response (200 OK):**
```json
{
    "status": "OK",
    "uptime": 123.45,
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "1.0.0"
}
```

### 2. Create Event

**Request:**
```bash
curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Conference 2024",
    "date": "2024-12-01T10:00:00Z",
    "capacity": 100,
    "status": "active",
    "category": "conference"
  }'
```

**Response (201 Created):**
```json
{
    "status": "success",
    "data": {
        "id": "abc123"
    },
    "message": "Event created successfully"
}
```

### 3. Get All Events

**Request:**
```bash
curl -X GET http://localhost:3000/api/v1/events
```

**Response (200 OK):**
```json
{
    "status": "success",
    "data": [
        {
            "id": "abc123",
            "name": "Tech Conference 2024",
            "date": "2024-12-01T10:00:00Z",
            "capacity": 100,
            "registrationCount": 0,
            "status": "active",
            "category": "conference"
        }
    ]
}
```

### 4. Get Event by ID

**Request:**
```bash
curl -X GET http://localhost:3000/api/v1/events/abc123
```

**Response (200 OK):**
```json
{
    "status": "success",
    "data": {
        "id": "abc123",
        "name": "Tech Conference 2024",
        "date": "2024-12-01T10:00:00Z",
        "capacity": 100,
        "registrationCount": 0,
        "status": "active",
        "category": "conference"
    }
}
```

## API Documentation

Full API documentation is available at:
**https://rrc-w2025-parthjoshi.github.io/Assignment_3_BED/**

## Local Documentation Access

When running locally, access the Swagger UI documentation at:
**http://localhost:3000/api-docs**