import React from 'react';
import { SearchGroup, SearchIcon, SearchMethod } from '../../styles/BookSearchStyle';

const SearchGroups = (props) => {
  const { iconSrc, methodText } = props;

  return (
    <SearchGroup>
      <SearchIcon src={iconSrc} alt='icon' />
      <SearchMethod><span>{methodText}</span></SearchMethod>
    </SearchGroup>
  );
};

export default SearchGroups;