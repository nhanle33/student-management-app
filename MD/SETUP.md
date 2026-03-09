# Student Management System

A complete web application for managing students, classes, and statistics. Built with React and FastAPI.

## Project Structure

```
student-management-app/
├── backend/          # FastAPI backend
│   ├── main.py      # Main API application
│   ├── models.py    # SQLAlchemy models
│   ├── schemas.py   # Pydantic schemas
│   ├── database.py  # Database configuration
│   └── requirements.txt
└── frontend/         # React frontend
    ├── src/
    │   ├── components/  # React components
    │   ├── App.js
    │   └── ...
    └── package.json
```

## Features

### Part 1 - MVP ✅
- ✅ Add students
- ✅ View all students
- ✅ Edit student information
- ✅ Delete students
- ✅ Clean UI with table and form

### Part 2 - Extended Features ✅
- ✅ Class management (Create, Read, Delete classes)
- ✅ Student-Class relationships
- ✅ Search students by name
- ✅ Statistics dashboard
  - Total students count
  - Average GPA
  - Students distribution by major
- ✅ Export students to CSV

## Tech Stack

- **Frontend**: React 18.2
- **Backend**: FastAPI
- **Database**: SQLite
- **Styling**: CSS

## Setup & Run

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/{student_id}` - Get a specific student
- `GET /api/students/search/by-name?name=<name>` - Search students by name
- `POST /api/students` - Create a new student
- `PUT /api/students/{student_id}` - Update a student
- `DELETE /api/students/{student_id}` - Delete a student

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/{class_id}` - Get a specific class
- `POST /api/classes` - Create a new class
- `PUT /api/classes/{class_id}` - Update a class
- `DELETE /api/classes/{class_id}` - Delete a class

### Statistics & Export
- `GET /api/statistics` - Get statistics (total, average GPA, by major)
- `GET /api/export/csv` - Export all students as CSV
- `GET /api/health` - Health check

## Data Models

### Student Fields
- `student_id` - Student ID (unique)
- `name` - Full name
- `birth_year` - Year of birth
- `major` - Major/Field of study
- `gpa` - Grade Point Average (0-4.0)
- `class_id` - Reference to Class (required)

### Class Fields
- `class_id` - Class ID (unique)
- `class_name` - Name of the class
- `advisor` - Advisor/Instructor name

## UI Navigation

The application has a tabbed interface with three main sections:

1. **Students Tab**
   - View all students in a table
   - Search students by name
   - Add new student
   - Edit student information
   - Delete student
   - Export all students to CSV

2. **Classes Tab**
   - View all classes
   - Create new class
   - Delete class

3. **Statistics Tab**
   - Total number of students
   - Average GPA
   - Number of students by major

## Notes

- A student must belong to a class (class_id is required)
- When adding or editing a student, you must select an existing class
- The database uses SQLite and will be created automatically on first run
- Search is case-insensitive and matches partial names
- CSV export includes all student fields

## Learning Goals

This project demonstrates:
1. How to use AI prompts to generate a working application
2. How to modify business logic through prompts
3. Full-stack web development with React and FastAPI
4. Database relationships and CRUD operations
5. RESTful API design

