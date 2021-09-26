import React from 'react'

const SearchFeature = (props)=>{
    return (
        <input type='search'
        className='search'
        placeholder={props.placeholder}
        onChange = {props.handleChange}
        maxLength={1000}
        height= {150}
        style={{display: 'flex', justifyContent: 'right'}}
        />
    )
}
export default SearchFeature