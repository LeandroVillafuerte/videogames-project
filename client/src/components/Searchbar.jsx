import React from 'react';
import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { searchVideogames } from '../actions';
import "./styles/Home.css"


function Searchbar() {
    const [search,setSearch] = useState('')
    const dispatch = useDispatch()
    function onSubmit(e) {
        e.preventDefault()
        dispatch(searchVideogames(search))
    }

    function onInputChange(e) {
        e.preventDefault()
        setSearch(e.target.value)
    }

    return (
        <div>
            <form onSubmit= {onSubmit}>
                <input id="inpsearch" type="text" onChange={onInputChange} value={search} placeholder="Search by name..."/>
                <input className="navbutton" type="submit" value="Search" />
            </form>
        </div>
    )
}

export default Searchbar
