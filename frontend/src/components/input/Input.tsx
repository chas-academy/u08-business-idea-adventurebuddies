interface InputProps {
  type: "text" | "checkbox" | "radio" | "email" | "date" | "time";
  label?: string;
  name: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  checked?: boolean;
  timeName?: string;
  timeValue?: string;
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
  onTimeChange,
  placeholder,
  checked,
  timeName,
  timeValue,
}) => {
  return (
    <div className="flex flex-row max-w-80 m-3">
      {type === "checkbox" || type === "radio" ? (
        <div className="flex flex-row justify-between items-center w-full p-2 border rounded border-primaryColor">
          {label && <label htmlFor={label}>{label}</label>}
          <input
            type={type}
            id={label}
            name={name}
            value={value}
            onChange={onChange}
            checked={checked}
            className="size-5 border checked:bg-primaryColor mr-1"
          />
        </div>
      ) : type === 'text' || type === 'email' ? (
        <div className="flex flex-col items-start w-full">
          {label && <label htmlFor={label}>{label}</label>}
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="w-full h-full border rounded border-primaryColor p-2 focus:outline-none focus:ring-1 focus:ring-primaryColor invalid:border-thirdColor invalid:text-thirdColor
              focus:invalid:border-thirdColor focus:invalid:ring-thirdColor"
            />
        </div>
      ) : type === 'date' && timeName ? (
        <div className="flex flex-col items-start w-11/12 h-18">
        {label && <label htmlFor={label}>{label}</label>}
        <div className="flex flex-row w-full justify-between items-start">
          <input
            type="date"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="border rounded border-primaryColor p-2 focus:outline-none focus:ring-1 focus:ring-primaryColor invalid:border-thirdColor invalid:text-thirdColor
            focus:invalid:border-thirdColor focus:invalid:ring-thirdColor"
          />
          <input
            type="time"
            name={timeName}
            value={timeValue}
            onChange={onTimeChange}
            placeholder={placeholder}
            className="border rounded border-primaryColor p-2 focus:outline-none focus:ring-1 focus:ring-primaryColor invalid:border-thirdColor invalid:text-thirdColor
            focus:invalid:border-thirdColor focus:invalid:ring-thirdColor"
          />
      </div>
      </div>
      ) : (
        <div className="flex flex-col items-start w-full">
        {label && <label htmlFor={label}>{label}</label>}
          <input
            type={type}
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
