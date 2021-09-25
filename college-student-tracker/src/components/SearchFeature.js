import React from 'react'

const SearchFeature = (props)=>{
    return (
        <input type='search'
        className='search'
        placeholder={props.placeholder}
        onChange = {props.handleChange}
        
        />
    )
}
export default SearchFeature