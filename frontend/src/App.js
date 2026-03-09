import React, { useState, useEffect } from 'react';
import './App.css';
import StudentList from './components/StudentList';
import StudentSearch from './components/StudentSearch';
import StudentForm from './components/StudentForm';
import ClassManagement from './components/ClassManagement';
import Statistics from './components/Statistics';

function App() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState('list');
  const [editingStudent, setEditingStudent] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/classes');
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleAddClick = () => {
    setEditingStudent(null);
    setCurrentPage('form');
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setCurrentPage('form');
  };

  const handleDeleteClick = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await fetch(`/api/students/${studentId}`, {
          method: 'DELETE',
        });
        fetchStudents();
        setFilteredStudents(students.filter(s => s.student_id !== studentId));
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingStudent) {
        await fetch(`/api/students/${editingStudent.student_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch('/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      fetchStudents();
      setCurrentPage('list');
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleBackClick = () => {
    setCurrentPage('list');
    setEditingStudent(null);
  };

  const handleSearchResults = (results) => {
    setFilteredStudents(results);
    setIsSearching(true);
  };

  const handleClearSearch = () => {
    setFilteredStudents(students);
    setIsSearching(false);
  };

  const handleExportClick = async () => {
    try {
      const response = await fetch('/api/export/csv');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'students.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  const handleClassAdded = () => {
    fetchClasses();
  };

  const handleClassDeleted = () => {
    fetchClasses();
    fetchStudents();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Management System</h1>
        <nav className="App-nav">
          <button 
            className={`nav-btn ${currentPage === 'list' ? 'active' : ''}`}
            onClick={() => {
              setCurrentPage('list');
              setIsSearching(false);
            }}
          >
            Students
          </button>
          <button 
            className={`nav-btn ${currentPage === 'classes' ? 'active' : ''}`}
            onClick={() => setCurrentPage('classes')}
          >
            Classes
          </button>
          <button 
            className={`nav-btn ${currentPage === 'statistics' ? 'active' : ''}`}
            onClick={() => setCurrentPage('statistics')}
          >
            Statistics
          </button>
        </nav>
      </header>

      <main>
        {currentPage === 'list' && (
          <>
            <StudentSearch 
              onSearchResults={handleSearchResults}
              onClearSearch={handleClearSearch}
            />
            {isSearching && (
              <div className="search-message">
                Showing {filteredStudents.length} result(s) - {' '}
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  handleClearSearch();
                  setCurrentPage('list');
                }}>
                  Clear search
                </a>
              </div>
            )}
            <StudentList 
              students={filteredStudents}
              onAddClick={handleAddClick}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
              onExportClick={handleExportClick}
            />
          </>
        )}
        
        {currentPage === 'form' && (
          <StudentForm 
            student={editingStudent}
            onSubmit={handleFormSubmit}
            onBack={handleBackClick}
          />
        )}

        {currentPage === 'classes' && (
          <ClassManagement 
            classes={classes}
            onClassAdded={handleClassAdded}
            onClassDeleted={handleClassDeleted}
          />
        )}

        {currentPage === 'statistics' && (
          <Statistics />
        )}
      </main>
    </div>
  );
}

export default App;
