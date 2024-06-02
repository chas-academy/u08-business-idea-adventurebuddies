import * as React from "react";
import FilterItem from "./FilterItem";
import { useState, useRef, useEffect } from "react";
import Button from "../button/Button";

interface FilterDropdownItemProps {
  label: string;
  type: "venue" | "gender" | "language" | "price" | "experience";
  selectedValues?: string[];
  onSelect: (value: string) => void;
  options: string[];
}

const FilterDropdownItem: React.FC<FilterDropdownItemProps> = ({
  label,
  type,
  selectedValues,
  onSelect,
  options,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-80 border rounded border-darkPurple">
      <Button type="button" variant="secondary" onClick={toggleDropdown}>
        {label}
      </Button>
      {isDropdownOpen && (
        <div>
          <FilterItem
            type={type}
            selectedValues={selectedValues || []}
            onSelect={handleSelect}
            options={options}
          />
        </div>
      )}
    </div>
  );
};

export default FilterDropdownItem;
