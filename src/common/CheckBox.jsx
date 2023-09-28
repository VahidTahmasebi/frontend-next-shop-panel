import React from "react";

function CheckBox({ name, id, checked, value, onChange, label }) {
  return (
    <div className="flex items-center gap-x-2 text-secondary-600">
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        value={value}
        onChange={onChange}
        className="w-4 h-4 border-none rounded=[5px] bg-secondary-100/80 cursor-pointer form-checkbox checked:text-primary-900"
      />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
}

export default CheckBox;
