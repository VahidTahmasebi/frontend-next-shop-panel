import React from "react";

function RadioInput({ name, id, checked, value, onChange, label }) {
  return (
    <div className="flex items-center gap-x-2 text-secondary-600">
      <input
        type="radio"
        name={name}
        id={id}
        checked={checked}
        value={value}
        onChange={onChange}
        className="w-4 h-4 border-none rounded-full bg-secondary-100/80 cursor-pointer checked:text-primary-900"
      />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
}

export default RadioInput;
