import React from 'react';
import {NavLink} from 'react-router-dom'
import classes from './Menu.module.css'

import logo from '../img/1.png'


export default () => {
    return (
        <React.Fragment>
            <nav className={classes.nav}>
                <ul className={classes.ul}>
                    <li><NavLink exact
                            to='/'
                            className={classes.NavLink}>Home</NavLink></li>
                    <li><NavLink
                            to='/guide'
                            className={classes.NavLink}>Guide</NavLink></li>

                    <img src={logo} alt=" " className={classes.logo}/>

                    <li><NavLink
                            to='/clients'
                            className={classes.NavLink}>Clients</NavLink></li>
                    <li><NavLink
                            to='/login'
                            className={classes.NavLink}>Log in</NavLink></li>
                </ul>
            </nav>
        </React.Fragment>
    )
};

