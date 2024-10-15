import React, { useContext } from 'react';
import { PasswordContext } from '../context/PasswordContext';

const PasswordHistory = () => {
  const { history, clearHistory } = useContext(PasswordContext);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Password History</h2>
      {history.length > 0 ? (
        <ul className="space-y-2">
          {history.map((password, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span className="font-mono text-gray-800">{password}</span>
              <button
                onClick={() => navigator.clipboard.writeText(password)}
                className="text-blue-500 hover:text-blue-700"
              >
                Copy
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-800">No password history yet.</p>
      )}
      {history.length > 0 && (
        <button
          onClick={clearHistory}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Clear History
        </button>
      )}
    </div>
  );
};

export default PasswordHistory;