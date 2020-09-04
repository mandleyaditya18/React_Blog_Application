import React from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import classes from './Search.module.css';

const search = (props) => {
    let form = (
        <form>
            <Input 
                elementType="text"
                elementConfig={{type: 'text', placeholder: 'Search'}} />
            <Button style={{marginLeft: '15px'}} btnType="Success">SEARCH</Button>
        </form>
    );

    return (
        <div className={classes.SearchBlogs}>
            <h2>Search Blogs</h2>
            {form}
        </div>

    );
}

export default search;