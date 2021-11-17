import React from 'react';
import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { searchVideogames } from '../actions';


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
                <input type="text" onChange={onInputChange} value={search}/>
                <input type="submit" value="Buscar"/>
            </form>
        </div>
    )
}

export default Searchbar
