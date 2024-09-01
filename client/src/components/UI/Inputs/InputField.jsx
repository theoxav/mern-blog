import { Label, TextInput } from "flowbite-react";

const InputField = ({ id, type, placeholder, label, onChange }) => (
  <div>
    <Label htmlFor={id} value={label} />
    <TextInput
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export default InputField;
