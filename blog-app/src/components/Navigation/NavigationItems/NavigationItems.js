import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/addPost" exact>Add Post</NavigationItem>
        <NavigationItem link="/login" exact>Login</NavigationItem>
        <NavigationItem link="/signup" exact>SignUp</NavigationItem>
    </ul>
);

export default navigationItems;