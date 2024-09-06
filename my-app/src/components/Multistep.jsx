import React, { useState } from 'react';
import Logo from './ui/Logo';
import ProgressBar from './ui/ProgressBar';
import BusinessStep from './BusinessStep';
import OwnerStep from './OwnerStep';
import EmployeeStep from './EmployeeStep';
import EnrollmentDateStep from './EnrollmentDateStep';

const Multistep = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Business Step
    legalName: '', ein: '', address: '', billingAddress: '',
    // Owner Step
    ownerFirstName: '', ownerLastName: '', ownerPhone: '', ownerEmail: '', ownerAddress: '',
    // Employee Step
    employeeFirstName: '', employeeLastName: '', employeeEmail: '',
    // Enrollment Date Step
    selectedDate: null, notSure: false
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    // Display success message or navigate to confirmation page
    alert('Form submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 lg:flex xl:flex 2xl:flex flex-col items-center justify-center lg:p-4 xl:p-4 2xl:p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <Logo />
        <ProgressBar currentStep={2} steps={['Business', 'Owner', 'Employee', 'Start Date']} />
        {currentStep === 1 && (
          <BusinessStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
          />
        )}
        {currentStep === 2 && (
          <OwnerStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {currentStep === 3 && (
          <EmployeeStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {currentStep === 4 && (
          <EnrollmentDateStep
            formData={formData}
            setFormData={setFormData}
            onPrev={prevStep}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Multistep;