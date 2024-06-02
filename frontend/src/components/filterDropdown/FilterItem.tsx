import * as React from "react";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import Input from "../input/Input";
import {
  EXPERIENCES,
  GENDERS,
  LANGUAGES,
  PRICES,
  VENUES,
} from "../../utils/enums";

interface FilterItemProps {
  type: "venue" | "gender" | "language" | "price" | "experience";
  selectedValues: string[];
  onSelect: (value: string) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({
  type,
  selectedValues,
  onSelect,
}) => {
  const options = {
    venue: VENUES,
    gender: GENDERS,
    language: LANGUAGES,
    experience: EXPERIENCES,
    age: "",
    price: PRICES,
  }[type];

  const handleCheckboxChange = (option: string) => {
    console.log(`Clicked checkbox for option: ${option}`)
    if (selectedValues.includes(option)) {
        onSelect(option);
    } else {
        onSelect(option);
    }
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option} className="flex items-center">
          <Input
            type="checkbox"
            name={`${type}-${option}`}
            label={option}
            checked={selectedValues?.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterItem;
