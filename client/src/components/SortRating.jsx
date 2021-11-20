import React from 'react'
import { useDispatch } from 'react-redux';
import { sortRating } from '../actions';
import { ASCENDENTE, DESCENDENE } from '../constants/sortconst';

function SortRating() {
    const dispatch = useDispatch();

    function onSelectChange(e) {
      dispatch(sortRating(e.target.value))    
    }
    return (
      <div>
        <select name="select" onChange={onSelectChange}>
          <option name="sort by rating" disabled selected>Sort by rating</option>
          <option value={ASCENDENTE}>Low to high</option>
          <option value={DESCENDENE}>High to low</option>
        </select>
      </div>
    );
}

export default SortRating
