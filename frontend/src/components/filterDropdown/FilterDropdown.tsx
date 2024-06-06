import * as React from "react";
import Button from "../button/Button";
import { useState, useRef, useEffect } from "react";
import FilterDropdownItem from "./FilterDropdownItem";
import { ISelectedFilters } from "../../utils/types";
import {
  GENDERS,
  LANGUAGES,
  VENUES,
  EXPERIENCES,
  PRICES,
} from "../../utils/enums";
import { IEvent2 } from "../../pages/CreateEventPage/CreateEventPage.interface";

interface FilterDropdownProps {
  events: IEvent2[];
  onFilter: (queryParams: Record<string, string>) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilter }) => {
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilters>({
    venue: "",git s
    gender: "",
    language: "",
    price: "",
    experience: "",
  });

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
    setIsDropdownOpen(!isDropdownOpen);
  };

  // skapa en switch och sätt handleSelect till switch case istället.

  const handleFilterSelect = (type: keyof ISelectedFilters, value: string) => {
    setSelectedFilters((prevState) => ({ ...prevState, [type]: value }));
  };

  const handleFilterSubmit = () => {
    const queryParams = Object.entries(selectedFilters).reduce(
      (acc, [key, values]) => {
        if (values.length > 0) {
          acc[key] = values;
        }
        return acc;
      },
      {} as Record<string, string>
    );

    onFilter(queryParams);
    setIsDropdownOpen(false);
  };

  const filterDropdownItems = [
    { label: "Plats", type: "venue", options: VENUES },
    { label: "Kön", type: "gender", options: GENDERS },
    { label: "Språk", type: "language", options: LANGUAGES },
    { label: "Pris", type: "price", options: PRICES },
    { label: "Erfarenhet", type: "experience", options: EXPERIENCES },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-2 ">
      <div ref={dropdownRef} className="flex flex-col items-center">
        <Button
          type="button"
          variant="primary"
          icon={`${isDropdownOpen ? "faChevronUp" : "faChevronDown"}`}
          onClick={toggleDropdown}
          filterButton="filterButton"
        >
          Filtrera sökning
        </Button>
        {isDropdownOpen && (
          <div className="w-full flex flex-col glass-container">
            <div className="md:flex justify-center flex-wrap">
              {filterDropdownItems.map(({ label, type, options }) => (
                <FilterDropdownItem
                  key={label}
                  label={label}
                  type={type}
                  options={options}
                  selectedValues={selectedFilters[type]}
                  onSelect={(value) => handleFilterSelect(type, value)}
                />
              ))}
            </div>
            <div className="m-2 md:flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  size="small"
                  onClick={handleFilterSubmit}
                >
                  Filtrera
                </Button>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;
