import React, { useState, useEffect } from 'react';
import './StudentForm.css';

function StudentForm({ student, onSubmit, onBack }) {
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState(
    student || {
      student_id: '',
      name: '',
      birth_year: new Date().getFullYear(),
      major: '',
      gpa: 0,
      class_id: '',
    }
  );

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/classes');
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    if (name === 'birth_year') {
      processedValue = parseInt(value);
    } else if (name === 'gpa') {
      processedValue = parseFloat(value);
    }
    
    setFormData({
      ...formData,
      [name]: processedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.class_id) {
      alert('Please select a class');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="student-form-container">
      <div className="form-header">
        <h2>{student ? 'Edit Student' : 'Add Student'}</h2>
      </div>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="student_id">Student ID</label>
          <input
            id="student_id"
            name="student_id"
            type="text"
            value={formData.student_id}
            onChange={handleChange}
            disabled={!!student}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="birth_year">Birth Year</label>
          <input
            id="birth_year"
            name="birth_year"
            type="number"
            value={formData.birth_year}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="major">Major</label>
          <input
            id="major"
            name="major"
            type="text"
            value={formData.major}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gpa">GPA</label>
          <input
            id="gpa"
            name="gpa"
            type="number"
            step="0.01"
            min="0"
            max="4"
            value={formData.gpa}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="class_id">Class</label>
          <select
            id="class_id"
            name="class_id"
            value={formData.class_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a class --</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.class_id}>
                {cls.class_id} - {cls.class_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-success">
            {student ? 'Update Student' : 'Add Student'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
