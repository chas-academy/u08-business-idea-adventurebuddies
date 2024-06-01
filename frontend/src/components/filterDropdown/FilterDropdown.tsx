import * as React from "react";
import Button from "../button/Button";
import { useState, useRef, useEffect } from "react";
import FilterDropdownItem from "./FilterDropdownItem";
import { IEvent } from "../../../../backend/src/interfaces/IEvent";

interface FilterDropdownProps {
  events: IEvent[];
  onFilter: (filteredEvents: IEvent[]) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  events,
  onFilter,
}) => {
  const [selectedVenue, setSelectedVenue] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // skapa en switch och sätt handleSelect till switch case istället.



  const handleVenueSelect = (value: string) => {
    if (selectedVenue.includes(value)) {
        setSelectedVenue(selectedVenue.filter((v) => v !== value));
        console.log('selected', selectedVenue)
    } else {
        setSelectedVenue([value]);
    }
  };

  const handleGenderSelect = (value: string) => {
    if (selectedGender.includes(value)) {
        setSelectedGender(selectedGender.filter((v) => v !== value));
    } else {
        setSelectedGender([value]);
    }
  };

  const handleLanguageSelect = (value: string) => {
    if (selectedLanguage.includes(value)) {
        setSelectedLanguage(selectedLanguage.filter((v) => v !== value));
    } else {
        setSelectedLanguage([value]);
    }
  };

  const handlePriceSelect = (value: string) => {
    if (selectedPrice.includes(value)) {
        setSelectedPrice(selectedPrice.filter((v) => v !== value));
    } else {
        setSelectedPrice([value]);
    }
  };

  const handleExperienceSelect = (value: string) => {
    if (selectedExperience.includes(value)) {
        setSelectedExperience(selectedExperience.filter((v) => v !== value));
    } else {
        setSelectedExperience([value]);
    }
  };


  const handleFilterChange = () => {
    if (!events) {
        return;
    }

    let filteredEvents = [...events];

    if (selectedVenue && selectedVenue?.length > 0) {
      filteredEvents = filteredEvents.filter((event) => selectedVenue?.includes(event.venue));
    }
    if (selectedGender && selectedGender?.length > 0) {
      filteredEvents = filteredEvents.filter(
        (event) => selectedGender?.includes(event.gender));
    }
    if (selectedLanguage && selectedLanguage?.length > 0) {
      filteredEvents = filteredEvents.filter(
        (event) => selectedLanguage?.includes(event.language));
    }
    if (selectedPrice && selectedPrice?.length > 0) {
      filteredEvents = filteredEvents.filter(
        (event) => selectedPrice?.includes(event.price));
    }
    if (selectedExperience && selectedExperience?.length > 0) {
      filteredEvents = filteredEvents.filter(
        (event) => selectedExperience?.includes(event.experience));
    }

    console.log(events)
    onFilter(filteredEvents);
    console.log(selectedVenue)
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
          selectedValues={selectedVenue}
          onSelect={handleVenueSelect}
        />
        <FilterDropdownItem
          label="Kön"
          type="gender"
          selectedValues={selectedGender}
          onSelect={handleGenderSelect}
        />
        <FilterDropdownItem
          label="Språk"
          type="language"
          selectedValues={selectedLanguage}
          onSelect={handleLanguageSelect}
        />
        <FilterDropdownItem
          label="Pris"
          type="price"
          selectedValues={selectedPrice}
          onSelect={handlePriceSelect}
        />
        <FilterDropdownItem
          label="Erfarenhet"
          type="experience"
          selectedValues={selectedExperience}
          onSelect={handleExperienceSelect}
        />
        <Button type="button" variant="secondary" size="small" onClick={handleFilterChange} >Filtrera</Button>
        </div>
      )}
    </div>
  );
};


export default FilterDropdown;
