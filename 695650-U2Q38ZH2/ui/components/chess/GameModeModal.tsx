import React from "react";

const Modal = ({ isOpen, onClose, onModeSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-customC w-3/4 md:w-1/3 rounded-lg shadow-lg z-50">
        <div className="modal-header flex justify-end">
          <button onClick={onClose} className="modal-close-button p-2">
            <svg
              className="w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="modal-content p-4">
          <h2 className="text-xl font-bold mb-4">Select Game Mode</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => onModeSelect(1)}
              className="modal-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              1 Tez
            </button>
            <button
              onClick={() => onModeSelect(5)}
              className="modal-button bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              5 Tez
            </button>
            <button
              onClick={() => onModeSelect(10)}
              className="modal-button bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
            >
              10 Tez
            </button>
            <button
              onClick={() => onModeSelect(20)}
              className="modal-button bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              20 Tez
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
