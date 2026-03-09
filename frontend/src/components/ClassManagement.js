import React, { useState, useEffect } from 'react';
import './ClassManagement.css';

function ClassManagement({ classes, onClassAdded, onClassDeleted }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    class_id: '',
    class_name: '',
    advisor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        onClassAdded();
        setFormData({ class_id: '', class_name: '', advisor: '' });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  const handleDeleteClass = async (classId) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await fetch(`/api/classes/${classId}`, {
          method: 'DELETE',
        });
        onClassDeleted();
      } catch (error) {
        console.error('Error deleting class:', error);
      }
    }
  };

  return (
    <div className="class-management-container">
      <div className="class-header">
        <h2>Classes</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Class'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="class-form">
          <div className="form-group">
            <label htmlFor="class_id">Class ID</label>
            <input
              id="class_id"
              name="class_id"
              type="text"
              value={formData.class_id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="class_name">Class Name</label>
            <input
              id="class_name"
              name="class_name"
              type="text"
              value={formData.class_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="advisor">Advisor</label>
            <input
              id="advisor"
              name="advisor"
              type="text"
              value={formData.advisor}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Add Class
          </button>
        </form>
      )}

      <table className="class-table">
        <thead>
          <tr>
            <th>Class ID</th>
            <th>Class Name</th>
            <th>Advisor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.length === 0 ? (
            <tr>
              <td colSpan="4" className="empty-message">No classes found</td>
            </tr>
          ) : (
            classes.map(cls => (
              <tr key={cls.id}>
                <td>{cls.class_id}</td>
                <td>{cls.class_name}</td>
                <td>{cls.advisor}</td>
                <td>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDeleteClass(cls.class_id)}
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

export default ClassManagement;
