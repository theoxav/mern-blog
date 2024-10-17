import { forwardRef } from "react";

const InputField = forwardRef(
  ({ id, type, placeholder, label, error, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          ref={ref}
          className={`p-2 border ${
            error ? "border-red-600" : "border-gray-300"
          } rounded-lg`}
          {...rest}
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
