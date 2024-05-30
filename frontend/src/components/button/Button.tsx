import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import {
  faChevronDown,
  faChevronUp,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  icon?: "faBookmark" | "faCirclePlus" | "faChevronDown" | "faChevronUp";
  type: "button" | "submit";
  variant?: "primary" | "secondary" | "danger";
  size?: "small";
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  filterButton?: "filterButton";
}

// Guide Hur man lägger till en knapp
// För att lägga till en knapp så importerar man Button komponenten och sätter den där du vill ha den i ditt form.
// Ex. <Button type="button" variant="primary" onClick={handleClick} icon="faCirclePlus">Click me!</Button>
// Ovan väljer du vilken type, variant, size och icon samt vad som ska stå i knappen. All styling är klar.

//primarybutton type="button/submit " variant="primary" size="/small"
//secondarybutton type="button/submit" variant="secondary" size="/small"
//dangerbutton type="button/submit" variant=" " size="/small"

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  type,
  variant,
  size,
  onClick,
  filterButton,
}) => {
  const getIcon = () => {
    switch (icon) {
      case "faBookmark":
        return (
          <div className="pl-3 ">
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        );
      case "faCirclePlus":
        return (
          <div className="pl-3 ">
            <FontAwesomeIcon icon={faCirclePlus} />
          </div>
        );
      case "faChevronDown":
        return (
          <div className="pl-3 ">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        );
      case "faChevronUp":
        return (
          <div className="pl-3 ">
            <FontAwesomeIcon icon={faChevronUp} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {variant === "primary" ? (
        <button
          className={`${
            size === "small" ? "min-h-12 min-w-44" : "min-h-12 w-80"
          } 'cursor-pointer rounded bg-primaryColor hover:bg-hoverOnButton text-textColor font-semibold text-base hover:text-lg m-4 font-poppins shadow-custom '`}
          type={type}
          onClick={onClick}
        >
          <div
            className={`flex flex-row ${
              filterButton ? "justify-between pr-4 pl-4" : "justify-center"
            } items-center `}
          >
            {filterButton ? (
              <>
                <div className="flex flex-row items-center">
                  <FontAwesomeIcon className="pr-3" icon={faFilter} />
                  {children}
                </div>
                <>{icon && getIcon()}</>
              </>
            ) : (
              <>
                {children}
                {icon && getIcon()}
              </>
            )}
          </div>
        </button>
      ) : variant === "secondary" ? (
        <button
          className={`${
            size === "small" ? "min-h-12 min-w-44" : "min-h-12 min-w-80"
          }  'cursor-pointer rounded border border-primaryColor hover:outline-none hover:ring hover:ring-primaryColor font-medium text-base hover:text-lg m-4 font-poppins shadow-custom '`}
          type={type}
          onClick={onClick}
        >
          <div className="flex flex-row justify-center items-center ">
            {children}
            {icon && getIcon()}
          </div>
        </button>
      ) : (
        <button
          className={`${
            size === "small" ? "min-h-12 min-w-44" : "min-h-12 min-w-80"
          } 'cursor-pointer rounded border border-thirdColor hover:bg-thirdColor text-black font-medium hover:text-textColor text-base hover:text-lg m-4 font-poppins shadow-custom '`}
          type={type}
          onClick={onClick}
        >
          <div className="flex flex-row justify-center items-center ">
            {children}
            {icon && getIcon()}
          </div>
        </button>
      )}
    </>
  );
};

export default Button;
