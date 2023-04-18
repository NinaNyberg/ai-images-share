import React from 'react';

const Dialog = ({ onDelete, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/[.54] z-40">
      <div className="flex flex-col items-center justify-center bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 rounded-md">
        <h3 className="text-[#3d3b3b] text-[16px] text-center">
          Are you sure you want to delete?
        </h3>

        <div className="flex items-center mt-3">
          <button
            className="bg-[#000000] rounded-md text-white border-none cursor-pointer p-4"
            onClick={() => onDelete()}
          >
            Yes
          </button>
          <button
            className="bg-[#ff9c60] rounded-md text-white border-none cursor-pointer ml-4 p-4"
            onClick={() => onClose()}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
