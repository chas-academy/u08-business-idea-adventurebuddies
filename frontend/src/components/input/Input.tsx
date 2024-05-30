import React from "react";

interface InputProps {
  type:
    | "text"
    | "checkbox"
    | "radio"
    | "email"
    | "date"
    | "time"
    | "number"
    | "datetime-local"
    | "password"
  label?: string;
  name: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  checked?: boolean;
  timeName?: string;
  timeValue?: string;
  min?: string;
  max?: string;
  inputMode?: "numeric";
}

// För att använda denna komponent i din komponent:
// 1. När du importerat Input där du vill ha den så lägger du till props inuti Input-taggen.
// 2. Vill du ha checkbox eller radio så lägger du till någon av de som type annars text.
// 3. checked-propen är för checkboxes.
// 4. Skapa funktion i din fil för att hantera onChange (och om date & time, onTimeChange) i Input.

const Input: React.FC<InputProps> = ({
  type,
  label,
  name,
  value,
  onChange,
  // onTimeChange,
  placeholder,
  checked,
  timeName,
  min,
  max,
  inputMode,
  // timeValue,
}) => {
  return (
    <div className={`flex flex-row md:min-w-80 m-3`}>
      {type === "checkbox" ? (
        <div className="flex flex-row justify-between items-center w-full p-2 border rounded border-primaryColor">
          {label && <label htmlFor={name}>{label}</label>}
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            checked={checked}
            className="size-5 border checked:bg-primaryColor mr-1"
          />
        </div>
      ) : type === "text" || type === "email" || type === "password" ? (
        <div className="flex flex-col items-start w-full">
          {label && <label htmlFor={name}>{label}</label>}
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            inputMode={inputMode}
            placeholder={placeholder}
            className="w-full h-full border rounded border-primaryColor p-2 focus:outline-none focus:ring-1 focus:ring-primaryColor invalid:border-thirdColor invalid:text-thirdColor
              focus:invalid:border-thirdColor focus:invalid:ring-thirdColor"
          />
        </div>
      ) : type === "datetime-local" ? (
        <div className="flex flex-col items-start w-11/12 h-18">
          {label && <label htmlFor={name}>{label}</label>}
          <div className="flex flex-row w-full justify-between items-start">
            <input
              type="datetime-local"
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              className="border rounded border-primaryColor p-2 focus:outline-none focus:ring-1 focus:ring-primaryColor invalid:border-thirdColor invalid:text-thirdColor
            focus:invalid:border-thirdColor focus:invalid:ring-thirdColor"
            />
            {/* <input name={timeName} /> */}
          </div>
        </div>
      ) : type === "radio" ? (
        <div className="">
          {label && <label htmlFor={name}>{label}</label>}
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
          />
        </div>
      ) : (
        <div className="flex flex-col items-start w-full">
          {label && <label htmlFor={name}>{label}</label>}
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full h-full border rounded border-primaryColor p-2 focus:outline-none focus:ring-1 focus:ring-primaryColor invalid:border-thirdColor invalid:text-thirdColor
            focus:invalid:border-thirdColor focus:invalid:ring-thirdColor"
          />
        </div>
      )}
    </div>
  );
};

export default Input;
