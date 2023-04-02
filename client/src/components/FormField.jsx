import React from 'react';

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  onChange,
  isSurpriseMe,
  onSurpriseMe
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block tetx-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={onSurpriseMe}
            className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
          >
            I need a hint!
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] border focus:border-[#4649ff] outline-none block w-full p-3"
      ></input>
    </div>
  );
};

export default FormField;
