import React from 'react'

const SearchCollege = (props)=>{
    return (
        <input type='search'
        className='search'
        placeholder={props.placeholder}
        onChange = {props.SimilarCollege}
        style={{justifyContent: 'right'}}
        
        />
    )
}
export default SearchCollege