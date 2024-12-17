import React, { useState } from 'react';

import './addemp.css'
const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    phoneNumber: '',
    department: '',
    dateOfJoining: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const departments = ['HR', 'Engineering', 'Marketing', 'Finance'];

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.employeeId || formData.employeeId.length > 10)
      newErrors.employeeId = 'Employee ID is required and must be <= 10 characters.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email))
      newErrors.email = 'Invalid email format.';
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Phone number must be 10 digits.';
    if (!formData.department) newErrors.department = 'Department is required.';
    if (!formData.dateOfJoining || new Date(formData.dateOfJoining) > new Date())
      newErrors.dateOfJoining = 'Date of Joining cannot be in the future.';
    if (!formData.role) newErrors.role = 'Role is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Employee added successfully!');
        setFormData({
          name: '',
          employeeId: '',
          email: '',
          phoneNumber: '',
          department: '',
          dateOfJoining: '',
          role: '',
        });
      } else {
        setErrorMessage(result.message || 'Something went wrong.');
      }
    } catch (error) {
      setErrorMessage('Failed to add employee. Try again later.');
    }
  };

  return (
    <div className="form-container">
      <h1>Add Employee</h1>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            maxLength="10"
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
          />
          {errors.employeeId && <p className="error">{errors.employeeId}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            maxLength="10"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>

        <div>
          <label>Department:</label>
          <select
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && <p className="error">{errors.department}</p>}
        </div>

        <div>
          <label>Date of Joining:</label>
          <input
            type="date"
            value={formData.dateOfJoining}
            onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
          />
          {errors.dateOfJoining && <p className="error">{errors.dateOfJoining}</p>}
        </div>

        <div>
          <label>Role:</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          {errors.role && <p className="error">{errors.role}</p>}
        </div>

        <button type="submit">Submit</button>
        <button type="reset" onClick={() => setFormData({})}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
