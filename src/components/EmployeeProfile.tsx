import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiMail, FiCalendar, FiPhone, FiUser } from 'react-icons/fi';

interface EmployeeData {
  name: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  gender: string;
}

const EmployeeProfile: React.FC<{ initialData: EmployeeData, onSave: (data: EmployeeData) => void }> = ({ initialData, onSave }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [employeeData, setEmployeeData] = useState<EmployeeData>(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(employeeData);
    setIsExpanded(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-bgColor-light rounded-lg shadow-md overflow-hidden">
      {!isExpanded ? (
        <div className="px-4 sm:px-6 py-3 flex flex-col items-center gap-3.5">
          <div className="w-24 h-24 relative">
            <div className="w-24 h-24 bg-bgColor-lightPrimary rounded-full overflow-hidden">
              
              <img
                  src={`${process.env.PUBLIC_URL}/profile_avatar.png`}
                  alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-textColor-default text-lg font-bold font-['Nunito']">{employeeData.name}</h2>
            <div className="flex items-center gap-1">
              <span className="text-textColor-default text-sm font-normal font-['Nunito']">{employeeData.email}</span>
              <FiMail className="w-4 h-4" />
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(true)}
            className="px-3 py-1.5 bg-button-neutralOutline-default rounded-lg border border-button-neutralOutline-stroke flex items-center gap-2"
          >
            <span className="text-textColor-secDefault text-xs font-semibold font-['Nunito']">Edit Profile</span>
            <FiEdit2 className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="w-full px-4 sm:px-6 py-3 space-y-3"
          >
            <div className="h-[54px]">
              <div className="px-3 py-4 bg-bgColor-light rounded-lg border border-strokeColor-lightGrey flex items-center">
                <FiUser className="w-[22px] h-[22px] mr-2 flex-shrink-0" />
                <input
                  type="text"
                  name="name"
                  value={employeeData.name}
                  onChange={handleInputChange}
                  className="grow text-textColor-default text-base font-normal font-['Nunito'] leading-snug bg-transparent outline-none"
                />
              </div>
            </div>
            {/* Repeat similar structure for dateOfBirth, email, phone, and gender inputs */}
            <div className="flex gap-3">
              <div className="w-[116px] flex-shrink-0">
                <div className="px-3 py-4 bg-bgColor-light rounded-lg border border-strokeColor-lightGrey flex items-center justify-between">
                  <span className="text-textColor-default text-base font-normal font-['Nunito'] leading-snug">+1 (US)</span>
                  <FiPhone className="w-[22px] h-[22px] flex-shrink-0" />
                </div>
              </div>
              <div className="flex-1">
                <div className="px-3 py-4 bg-bgColor-light rounded-lg border border-strokeColor-lightGrey">
                  <input
                    type="tel"
                    name="phone"
                    value={employeeData.phone}
                    onChange={handleInputChange}
                    className="w-full text-textColor-default text-base font-normal font-['Nunito'] leading-snug bg-transparent outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="pt-3">
              <button
                type="submit"
                className="w-full h-[46px] px-4 py-3 bg-button-primary-default rounded-lg text-textColor-neutral text-base font-semibold font-['Nunito'] leading-snug"
              >
                Save
              </button>
            </div>
          </motion.form>
        </AnimatePresence>
      )}
    </div>
  );
};

export default EmployeeProfile;