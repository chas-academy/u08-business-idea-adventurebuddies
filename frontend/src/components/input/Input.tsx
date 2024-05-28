interface InputProps {
  type: "text" | "checkbox" | "radio";
  label?: string;
  name: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  checked?: boolean;
}

// För att använda denna komponent i din komponent:
// 1. När du importerat Input där du vill ha den så lägger du till props inuti Input-taggen.
// 2. Vill du ha checkbox eller radio så lägger du till någon av de som type annars text.
// 3. checked-propen är för checkboxes.
// 4. Skapa funktion i din fil för att hantera onChange i Input.

const Input: React.FC<InputProps> = ({
  type,
  label,
  name,
  value,
  onChange,
  placeholder,
  checked,
}) => {
  return (
    <div className="flex flex-row max-w-80 shadow-md m-3">
      {type === "checkbox" || type === "radio" ? (
        <div className="flex flex-row justify-between items-center w-full border p-2 rounded border-[#6278EF]">
          {label && <label htmlFor={label}>{label}</label>}
          <input
            type={type}
            id={label}
            name={name}
            value={value}
            onChange={onChange}
            checked={checked}
            className="size-5 border border-[#FC5D41] checked:bg-[#FC5D41]"
          />
        </div>
      ) : (
        <div className="flex flex-col items-start w-full">
          {label && <label htmlFor={label}>{label}</label>}
          <div className="w-full border p-2 rounded border-[#6278EF]">
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
