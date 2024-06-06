import * as React from "react";
import Input from "../input/Input";
import { Experience, Gender, Language, Price, Venue } from "../../utils/enums";

interface FilterItemProps {
  type: Venue | Gender | Language | Price | Experience;
  selectedValues: string;
  onSelect: (value: string) => void;
  options: string[];
}

const FilterItem: React.FC<FilterItemProps> = ({
  type,
  selectedValues,
  onSelect,
  options,
}) => {
    if (!options || options.length === 0) {
        return null;
    }

  return (
    <div>
      {options.map((option) => (
        <div key={option} className="flex items-center">
          <Input
            type="radio"
            name={`${type}-${option}`}
            label={option}
            checked={selectedValues.includes(option)}
            onChange={() => onSelect(option)}
            filterItem="filterItem"
          />
        </div>
      ))}
    </div>
  );
};

export default FilterItem;
