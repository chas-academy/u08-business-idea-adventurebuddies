import * as React from 'react';
import Button from '../button/Button';

const FilterDropdown = () => {

    const handleDropdownClick = () => {
        console.log('filter dropdown');
    }

    return (
        <>
        <Button type="button" variant="primary" icon="faChevronDown" onClick={handleDropdownClick} filterButton='filterButton'>
            Filter
        </Button>
        </>
    )
}

export default FilterDropdown;