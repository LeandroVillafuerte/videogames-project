import React from 'react'
import { useDispatch } from 'react-redux';
import { sortdate } from '../actions';
import { ASCENDENTE, DESCENDENE } from '../constants/sortconst';

function SortRating() {
    const dispatch = useDispatch();

    function onSelectChange(e) {
      dispatch(sortdate(e.target.value))    
    }
    return (
      <div className="selectfilters">
        <h4>Sort by date</h4>
        <select name="select" onChange={onSelectChange}>
          <option name="sort by date" disabled selected>--Select one--</option>
          <option value={ASCENDENTE}>Low to high</option>
          <option value={DESCENDENE}>High to low</option>
        </select>
      </div>
    );
}

export default SortRating
