import React from "react";
import { useField } from "formik";
import "./MyDropdownInput.css";
interface Props {
  placeholder: string;
  name: string;
  label?: string;
  className?: string;
  options: { key: string | number; text: string; value: string | number }[];
}

const MyDropdownInput: React.FC<Props> = ({
  label,
  options,
  className,
  ...props
}) => {
  const [field, , helpers] = useField(props.name);

  return (
    <div className={`custom-dropdown-container ${className}`}>
      {label && <label>{label}</label>}
      <select
        {...field}
        {...props}
        onChange={(e) => helpers.setValue(e.target.value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        className="custom-dropdown"
      >
        <option value="" disabled>
          {props.placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MyDropdownInput;
