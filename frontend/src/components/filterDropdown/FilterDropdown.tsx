import * as React from "react";
import Button from "../button/Button";
import { useState, useRef, useEffect } from "react";
import FilterDropdownItem from "./FilterDropdownItem";
import { IEvent, ISelectedFilters } from "../../utils/types";
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
  onFilter: (queryParams: Record<string, string[]>) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
    events,
  onFilter,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilters>({
    venue: [],
    gender: [],
    language: [],
    price: [],
    experience: [],
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
    if (type in selectedFilters) {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [type]: (prevFilters[type] as string[]).includes(value)
          ? (prevFilters[type] as string[]).filter((item) => item !== value)
          : [...(prevFilters[type] as string[]), value],
      }));
    } else {
        console.error(`Invalid filter type: ${type}`)
    }
  };

  const handleFilterChange = () => {
    const queryParams = Object.entries(selectedFilters).reduce((acc, [key, values]) => {
        if (values.length > 0) {
            acc[key] = values;
        }
        return acc;
    }, {} as Record<string, string[]>);

    onFilter(queryParams);
  };

  return (
    <div ref={dropdownRef}>
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
        <div>
          <FilterDropdownItem
            label="Plats"
            type="venue"
            selectedValues={selectedFilters.venue}
            onSelect={(value) => handleFilterSelect("venue", value)}
            options={VENUES}
          />
          <FilterDropdownItem
            label="Kön"
            type="gender"
            selectedValues={selectedFilters.gender}
            onSelect={(value) => handleFilterSelect("gender", value)}
            options={GENDERS}
          />
          <FilterDropdownItem
            label="Språk"
            type="language"
            selectedValues={selectedFilters.language}
            onSelect={(value) => handleFilterSelect("language", value)}
            options={LANGUAGES}
          />
          <FilterDropdownItem
            label="Pris"
            type="price"
            selectedValues={selectedFilters.price}
            onSelect={(value) => handleFilterSelect("price", value)}
            options={PRICES}
          />
          <FilterDropdownItem
            label="Erfarenhet"
            type="experience"
            selectedValues={selectedFilters.experience}
            onSelect={(value) => handleFilterSelect("experience", value)}
            options={EXPERIENCES}
          />
          <Button
            type="button"
            variant="secondary"
            size="small"
            onClick={handleFilterChange}
          >
            Filtrera
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
