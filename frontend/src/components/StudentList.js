import React from 'react';
import './StudentList.css';

function StudentList({ students, onAddClick, onEditClick, onDeleteClick, onExportClick }) {
  return (
    <div className="student-list-container">
      <div className="list-header">
        <h2>Student List</h2>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={onAddClick}>
            Add Student
          </button>
          <button className="btn btn-export" onClick={onExportClick}>
            Export to CSV
          </button>
        </div>
      </div>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Birth Year</th>
            <th>Major</th>
            <th>GPA</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="7" className="empty-message">No students found</td>
            </tr>
          ) : (
            students.map(student => (
              <tr key={student.id}>
                <td>{student.student_id}</td>
                <td>{student.name}</td>
                <td>{student.birth_year}</td>
                <td>{student.major}</td>
                <td>{student.gpa.toFixed(2)}</td>
                <td>{student.class_id}</td>
                <td className="actions">
                  <button 
                    className="btn btn-edit"
                    onClick={() => onEditClick(student)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-delete"
                    onClick={() => onDeleteClick(student.student_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
