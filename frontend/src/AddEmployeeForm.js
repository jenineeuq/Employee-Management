import React, { useState } from 'react';
import './App.css';  // Assuming you're keeping the CSS in the same file

const AddEmployeeForm = () => {
  const initialFormState = {
    firstName: '',
    lastName: '',
    employeeId: '',
    email: '',
    phoneNumber: '',
    department: '',
    dateOfJoining: '',
    role: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = ['HR', 'Engineering', 'Marketing'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    const {
      firstName,
      lastName,
      employeeId,
      email,
      phoneNumber,
      department,
      dateOfJoining,
      role,
    } = formData;

    if (!firstName.trim()) {
      formErrors.firstName = 'First Name is required.';
    }

    if (!lastName.trim()) {
      formErrors.lastName = 'Last Name is required.';
    }

    if (!employeeId || employeeId.length > 10 || !/^[A-Za-z0-9]+$/.test(employeeId)) {
      formErrors.employeeId = 'Employee ID must be alphanumeric and less than 10 characters.';
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Invalid email format.';
    }

    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      formErrors.phoneNumber = 'Phone number must be exactly 10 digits.';
    }

    if (!department) {
      formErrors.department = 'Please select a department.';
    }

    if (!dateOfJoining || new Date(dateOfJoining) > new Date()) {
      formErrors.dateOfJoining = 'Date of Joining cannot be in the future.';
    }

    if (!role.trim()) {
      formErrors.role = 'Role is required.';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3000/api/employees', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
          alert('Employee added successfully');
          setFormData(initialFormState);
          setErrors({});
        } else {
          alert(result.message || 'Failed to add employee.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
      }
    }

    setIsSubmitting(false);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
  };

  return (
    <div className="App">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleInputChange}
          />
          {errors.employeeId && <p className="error">{errors.employeeId}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>

        <div className="form-group">
          <label>Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
          >
            <option value="">Select a department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && <p className="error">{errors.department}</p>}
        </div>

        <div className="form-group">
          <label>Date of Joining</label>
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleInputChange}
          />
          {errors.dateOfJoining && <p className="error">{errors.dateOfJoining}</p>}
        </div>

        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          />
          {errors.role && <p className="error">{errors.role}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
