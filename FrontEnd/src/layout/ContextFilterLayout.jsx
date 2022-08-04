import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchBlock from '../components/searchBlock';
import FilterProvider from '../context/FilterProvider';

const ContextFilterLayout = () => {


  return (
    <FilterProvider>
      <SearchBlock />
      <Outlet />
    </FilterProvider>
  );
};

export default ContextFilterLayout;