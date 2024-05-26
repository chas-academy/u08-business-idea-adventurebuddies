interface ButtonProps {
    children: React.ReactNode;
    type: "button" | "submit";
    variant?: "primary" | "secondary" | "danger";
    size?: "small";
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

//Ikoner
//Shadow
//Hover-effekt

//primarybutton type="button/submit " variant="primary" size="/small"
//secondarybutton type="button/submit" variant="secondary" size="/small"
//dangerbutton type="button/submit" variant=" " size="/small"

const Button: React.FC<ButtonProps> = ({ children, type, variant, size, onClick }) => {
   

    return (
        <>
        {variant === "primary" ? (
            <button style={{fontFamily: 'Poppins'}} className={`${size === 'small' ? 'min-h-12 min-w-44': 'min-h-12 min-w-80' } 'cursor-pointer rounded border bg-primaryColor text-textColor font-semibold text-base m-5 '`} type={type} onClick={onClick}>
                {children}
            </button>
        ) : variant === "secondary" ? (
            <button style={{fontFamily: 'Poppins'}} className={`${size === 'small' ? 'min-h-12 min-w-44' : 'min-h-12 min-w-80'}  'cursor-pointer rounded border border-primaryColor text-black font-medium text-base '`} type={type} onClick={onClick}>
                {children}
            </button>
        ) : (
            <button style={{fontFamily: 'Poppins'}} className={`${size === 'small' ? 'min-h-12 min-w-44' : 'min-h-12 min-w-80'} 'cursor-pointer rounded border border-thirdColor text-black font-medium text-base shadow-xl shadow-black m-5 '`} type={type} onClick={onClick}>
                {children}
            </button>
        )}

        </>
    )
}

export default Button;