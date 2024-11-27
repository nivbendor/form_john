import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  steps: string[];  // This will dynamically define the number of steps
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, steps }) => {
  const totalSteps = steps.length;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center justify-between w-full max-w-5xl px-4 py-2 pb-9">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div className={`relative w-[34px] h-[34px] flex justify-center items-center rounded-full ${currentStep >= index + 1 ? 'bg-[#2d5ff1] text-white' : 'bg-[#eff0f6] text-[#6e6b8f]'}`}>
                <span className="font-medium">{index + 1}</span>
              </div>
              {/* Step Label */}
              <span className="text-xs text-center mt-1">{step}</span>
            </div>
            
            {/* Progress Bar (skip the last step to avoid trailing bar) */}
            {index < totalSteps - 1 && (
              <div className="flex-1 mx-2">
                <div className="w-full h-1.5 rounded-full bg-[#eff0f6]">
                  <div
                    className={`h-1.5 rounded-full ${currentStep > index + 1 ? 'bg-[#2d5ff1]' : ''}`}
                    style={{ width: currentStep > index + 1 ? '100%' : '0%' }}
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
