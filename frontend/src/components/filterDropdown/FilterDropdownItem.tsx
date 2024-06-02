import Button from "../button/Button";
import * as React from 'react';
import FilterItem from "./FilterItem";

const FilterDropdownItem = () => {

    const handleSaveClick = () => {
        console.log('Save filter preferences');
    }

  return (
    <div className="flex flex-col justify-center items-center max-w-80 border rounded border-darkPurple">
      <FilterItem />
      <Button
        type="button"
        variant="secondary"
        size="small"
        onClick={handleSaveClick}
      >
        Spara filter
      </Button>
    </div>
  );
};

export default FilterDropdownItem;
