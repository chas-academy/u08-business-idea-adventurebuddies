import * as React from 'react';
import Button from '../button/Button';

const FilterItem = () => {

    const handleDropdownItemClick = () => {
        console.log('Filter item open')
    }

    return (
        <>
        <Button type="button" variant="secondary" icon="faChevronDown" onClick={handleDropdownItemClick} filterButton="fa18">
            {}
        </Button>
        Filter item
        </>
    )
}

export default FilterItem;