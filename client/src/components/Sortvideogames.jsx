import React from "react";
import { ASCENDENTE , DESCENDENE } from "../constants/sortconst.js";
import { sort } from "../actions/index.js";
import { useDispatch } from "react-redux";




function Sortvideogames() {

  const dispatch = useDispatch();

  function onSelectChange(e) {
    dispatch(sort(e.target.value))    
  }
  return (
    <div>
      <select name="select" onChange={onSelectChange}>
        <option value={ASCENDENTE}>Z-A</option>
        <option value={DESCENDENE}>A-Z</option>
      </select>
    </div>
  );
}

export default Sortvideogames;
