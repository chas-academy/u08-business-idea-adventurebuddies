import * as React from 'react';
import Button from '../button/Button';
import { useState } from 'react';
import FilterDropdownItem from './FilterDropdownItem';

const FilterDropdown: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
        console.log('toggle filter dropdown');
    }

    return (
        <>
        <Button type="button" variant="primary" icon={`${isDropdownOpen ? 'faChevronUp' : 'faChevronDown'}`} onClick={handleDropdownClick} filterButton='faFilter'>
            Filtrera sökning
        </Button>
        {isDropdownOpen && (
            <div className='flex flex-col justify-center items-center'>
                <FilterDropdownItem />
            </div>
        )}
        </>
    )
}

export default FilterDropdown;