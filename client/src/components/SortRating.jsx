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
      <div className="selectfilters">
        <h4>Sort by rating</h4>
        <select name="select" onChange={onSelectChange}>
          <option name="sort by rating" disabled selected>--Select one--</option>
          <option value={ASCENDENTE}>Low to high</option>
          <option value={DESCENDENE}>High to low</option>
        </select>
      </div>
    );
}

export default SortRating
