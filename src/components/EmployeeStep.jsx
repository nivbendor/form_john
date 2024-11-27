import React, { useState } from 'react';
import EmployeeProfile from './EmployeeProfile';

const EmployeeStep = ({ formData, setFormData, onPrev, onNext }) => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleProfileSave = (updatedData) => {
    setFormData((prev) => ({
      ...prev,
      employeeFirstName: updatedData.name.split(' ')[0] || '',
      employeeLastName: updatedData.name.split(' ').slice(1).join(' ') || '',
      employeeEmail: updatedData.email,
      employeeDateOfBirth: updatedData.dateOfBirth,
      employeePhone: updatedData.phone,
      employeeGender: updatedData.gender,
    }));
  };

  const handleNext = () => {
    const newErrors = {};

    if (!formData.employeeFirstName.trim()) newErrors.employeeFirstName = 'First name is required';
    if (!formData.employeeLastName.trim()) newErrors.employeeLastName = 'Last name is required';
    if (!validateEmail(formData.employeeEmail)) newErrors.employeeEmail = 'Invalid email format';

    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="space-y-6">
      <EmployeeProfile
        initialData={{
          name: `${formData.employeeFirstName} ${formData.employeeLastName}`.trim(),
          email: formData.employeeEmail,
          dateOfBirth: formData.employeeDateOfBirth || '',
          phone: formData.employeePhone || '',
          gender: formData.employeeGender || '',
        }}
        onSave={handleProfileSave}
      />
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeStep;