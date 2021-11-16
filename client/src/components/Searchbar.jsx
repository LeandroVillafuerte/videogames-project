import React from 'react';
import {useState} from 'react'


function Searchbar() {
    const [search,setSearch] = useState('')

    function onSubmit(e) {
        e.preventDefault()
    }

    function onInputChange(e) {
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
