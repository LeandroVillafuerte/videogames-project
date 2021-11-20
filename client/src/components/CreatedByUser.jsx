import React from 'react'
import { useDispatch } from 'react-redux'
import { videogameOrigin } from '../actions/index.js';
import {SEEALL,CREATEDBYUSER,FROMLIBRARY} from '../constants/createdbyusercons.js'


function CreatedByUser() {


    const dispatch = useDispatch();
    function onSelectChange(e) {
        
        dispatch(videogameOrigin(e.target.value))
    }
    return (
        <div>
            <select name="GameOrigin" onChange={onSelectChange}>
            <option name="--Select one--" disabled selected>--Select one--</option>
            <option value={SEEALL}>See all</option>
            <option value={CREATEDBYUSER}>Created by user</option>
            <option value={FROMLIBRARY}>From library</option>
      </select>
        </div>
    )
}

export default CreatedByUser
