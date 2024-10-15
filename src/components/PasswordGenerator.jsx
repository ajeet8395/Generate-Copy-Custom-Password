import React, { useState, useCallback, useEffect, useContext } from 'react';
import { PasswordContext } from '../context/PasswordContext';
import StrengthMeter from './StrengthMeter';

const PasswordGenerator = () => {
  const { addToHistory } = useContext(PasswordContext);
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: false,
  });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = '';
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
    addToHistory(newPassword);
  }, [length, options, addToHistory]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, options, generatePassword]);

  const handleOptionChange = (option) => {
    setOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={password}
          readOnly
          className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          onClick={copyToClipboard}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div>
        <label className="block mb-2 text-black">Password Length: {length}</label>
        <input
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(options).map(([key, value]) => (
          <label key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value}
              onChange={() => handleOptionChange(key)}
              className="form-checkbox"
            />
            <span className="capitalize text-black">{key}</span>
          </label>
        ))}
      </div>
      <button
        onClick={generatePassword}
        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
      >
        Generate New Password
      </button>
      <StrengthMeter password={password} />
    </div>
  );
};

export default PasswordGenerator;