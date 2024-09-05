import React, { useState } from 'react';
import Logo from './ui/Logo';
import ProgressBar from './ui/ProgressBar';
import BusinessStep from './BusinessStep';
import OwnerStep from './OwnerStep';
import EmployeeStep from './EmployeeStep';

const Multistep = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Business Step
    legalName: '', ein: '', address: '', billingAddress: '',
    // Owner Step
    ownerFirstName: '', ownerLastName: '', ownerPhone: '', ownerEmail: '', ownerAddress: '',
    // Employee Step
    employeeFirstName: '', employeeLastName: '', employeeEmail: '',
    selectedDate: null, notSure: false
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    // Display success message or navigate to confirmation page
    alert('Form submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <Logo />
        <ProgressBar currentStep={currentStep} totalSteps={3} />
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
            onPrev={prevStep}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Multistep;