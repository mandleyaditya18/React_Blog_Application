import React from 'react';
import HorizonLogo from '../../assets/horizon.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={HorizonLogo} alt="Horizon" />
    </div>
);

export default logo;