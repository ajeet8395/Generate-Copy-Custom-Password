import React from 'react';

const StrengthMeter = ({ password }) => {
  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) score++;
    if (pass.match(/\d/)) score++;
    if (pass.match(/[^a-zA-Z\d]/)) score++;
    return score;
  };

  const strength = calculateStrength(password);
  const strengthText = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][strength];
  const strengthColor = ['red', 'orange', 'yellow', 'lime', 'green'][strength];

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Password Strength</span>
        <span className="text-sm font-medium" style={{ color: strengthColor }}>{strengthText}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${(strength + 1) * 20}%`, backgroundColor: strengthColor }}
        ></div>
      </div>
    </div>
  );
};

export default StrengthMeter;