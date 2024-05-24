
interface InputProps {
    type: 'text' | 'checkbox';
    label?: string;
    name: string;
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    checked?: boolean;
}

const Input: React.FC<InputProps> = ({ type, label, name, value, onChange, placeholder, checked }) => {

    return (
        <div className="flex flex-row w-80 p-2">
            {type === 'checkbox' ? (
                <div className="w-full ">
                <input 
                type={type}
                id={label}
                name={name}
                value={value}
                onChange={onChange}
                checked={checked}
                />
                {label && <label htmlFor={label}>{label}</label>}
                </div>
            ) : (
                <div className="w-full">
                <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                />
                </div>
            )}
        </div>
    )
}

export default Input;