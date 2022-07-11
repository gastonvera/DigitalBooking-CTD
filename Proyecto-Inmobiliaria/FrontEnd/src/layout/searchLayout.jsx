import React from 'react';
import SearchBlock from '../components/searchBlock';

const SearchLayout = ({children}) => {
    return (
        <div>
            <SearchBlock/>
            {children}
        </div>
    )
}

export default SearchLayout;