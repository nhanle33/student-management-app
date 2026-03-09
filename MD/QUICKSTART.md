# 🚀 Quick Start Guide

## Prerequisites
- Python 3.7 or higher
- Node.js 14 or higher
- npm (comes with Node.js)

---

## ⚡ Start in 2 Minutes

### Terminal 1: Start Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

✅ Backend ready at: http://localhost:8000

---

### Terminal 2: Start Frontend
```bash
cd frontend
npm install
npm start
```

✅ Frontend opens at: http://localhost:3000

---

## 🎯 First Steps (Try This!)

### Step 1: Create a Class (Required)
1. Click **Classes** tab
2. Click **Add Class**
3. Enter:
   - Class ID: `C01`
   - Class Name: `Computer Science 1`
   - Advisor: `Dr. Smith`
4. Click **Add Class**

### Step 2: Add a Student
1. Click **Students** tab
2. Click **Add Student**
3. Fill the form:
   - Student ID: `SV001`
   - Name: `John Doe`
   - Birth Year: `2005`
   - Major: `Computer Science`
   - GPA: `3.8`
   - Class: Select `C01 - Computer Science 1`
4. Click **Add Student**

### Step 3: See Your Data
- Table shows your new student
- Try **Edit** or **Delete**

### Step 4: Try Features
- **Search**: Type a name in search box
- **Statistics**: Click Statistics tab to see metrics
- **Export**: Click "Export to CSV" to download data
- **Classes**: Add more classes or manage existing ones

---

## 📱 Main Features Quick Overview

| Feature | Location | What it does |
|---------|----------|-------------|
| Add Student | Students → Add Student button | Create new student |
| Edit Student | Students → Edit button in table | Modify student info |
| Delete Student | Students → Delete button | Remove student |
| Search | Students → Search box | Find by name |
| Statistics | Statistics tab | View counts & averages |
| Export | Students → Export to CSV | Download as spreadsheet |
| Classes | Classes tab | Manage classes |

---

## 🔗 API (For Testing)

Open browser to test:

```
Students:
http://localhost:8000/api/students
http://localhost:8000/api/students/SV001

Classes:
http://localhost:8000/api/classes

Statistics:
http://localhost:8000/api/statistics

Health:
http://localhost:8000/api/health
```

---

## ❌ Something Not Working?

### Backend won't start
```bash
cd backend
python --version          # Check Python 3.7+
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend won't start
```bash
cd frontend
node --version          # Check Node 14+
npm install
npm start
```

### Can't add student
- ✅ Create a class first!
- ✅ Select the class in form
- ✅ Make sure backend is running

### Student doesn't show up
- ✅ Refresh the page (F5)
- ✅ Check if you clicked "Add Student" button
- ✅ Check backend console for errors

---

## 📊 Database

SQLite database is created automatically:
- **Location**: `backend/students.db`
- **Created**: First time you run backend
- **Deleted**: You can manually delete to reset

---

## 🎓 Video Tutorial Topics

If creating videos, cover:
1. Setup and installation
2. Creating first class
3. Adding students
4. Searching functionality
5. Statistics view
6. CSV export
7. Editing and deleting
8. Understanding the API

---

## 💿 Database Reset

To start fresh with clean data:

```bash
# Stop the backend (Ctrl+C)
# In backend folder:
rm students.db
# Restart backend

# Backend will create new empty database
```

---

## 🎯 Common Tasks

### What's the student ID format?
Anything unique: SV001, ST-2024-001, A123, etc.

### Can I change student ID?
No, the field is disabled when editing. Delete and recreate if needed.

### What GPA range?
0 to 4.0 (0.00 to 4.00 format)

### How many classes can I create?
Unlimited!

### Can one student be in multiple classes?
No, each student belongs to one class.

### How to backup data?
The `students.db` file contains all data. Copy it to backup.

---

## 📞 Need Help?

1. Check FEATURES.md for detailed feature descriptions
2. Check README.md for technical setup
3. Check backend/main.py for API code
4. Check frontend/src/App.js for UI code

---

## 🎉 You're Ready!

The app is fully functional with both Part 1 (MVP) and Part 2 (Extended) features:

✅ CRUD for students
✅ CRUD for classes
✅ Search by name
✅ Statistics dashboard
✅ CSV export
✅ Clean, modern UI
✅ RESTful API

Happy coding! 🚀
