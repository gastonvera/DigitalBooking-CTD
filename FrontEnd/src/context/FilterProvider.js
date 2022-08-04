import React, {createContext, useContext, useState} from 'react'

const FilterContext = createContext();

const initialState = {
  city: null,
  startDate:null,
  endDate:null
}

const FilterProvider = ({children}) => {
  const [filters, setFilters] = useState(initialState);  

  const handleChangeFilters = (filters) => {
    setFilters(filters);
  }

  return (
    <FilterContext.Provider value={{filters, handleChangeFilters}}>
        {children}
    </FilterContext.Provider>
  )
}

export {FilterContext}

export default FilterProvider