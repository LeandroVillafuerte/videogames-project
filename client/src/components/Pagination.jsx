import React, { useState } from 'react'

function Pagination({videogames}) {
    // let videogames = useSelector((store)=>store.sortedvideogames);

    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage,setItemsPerPage]=useState(15);


    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id))
    }

    const pages=[]
    for (let i = 1; i < Math.ceil(videogames?.length/itemsPerPage); i++) {
        pages.push(i)
        
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = videogames?.slice(indexOfFirstItem,indexOfLastItem)

    return (
        <>
         <ul className="pageNumbers">
         {pages.map(number=>{
        return(
            <li key={number} id={number} onClick={handleClick} className={currentPage == number ? "active" : null} >{number}</li>
        )
        })}   
         </ul>
        </>
    )
}

export default Pagination
