import React from 'react';
import '../App.css';

const SearchBar = (props) => {
    console.log(props.val);
    return (
        <div className="searchBarContainer">
            <form id="myForm" onSubmit={props.handleClick}>
            <input 
                className="searchBar" type="text"
                placeholder="Enter locations to search ATMS"
            />
            <input className="search-btn" type="submit" text="Search"/>
            </form>
        </div>
    )
}

export default SearchBar;