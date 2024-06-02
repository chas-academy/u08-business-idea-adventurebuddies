import * as React from "react";
import Input from "../input/Input";

interface FilterItemProps {
  type: "venue" | "gender" | "language" | "price" | "experience";
  selectedValues: string[];
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
            type="checkbox"
            name={`${type}-${option}`}
            label={option}
            checked={selectedValues.includes(option)}
            onChange={() => onSelect(option)}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterItem;
