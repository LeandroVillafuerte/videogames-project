import React from 'react';
import { connect } from 'react-redux'

const Videojuegos = () => {
    return (
        <div>
            
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        videojuegos: state.videojuegos,
    };
}

export default connect(mapStateToProps,{})(Videojuegos)
