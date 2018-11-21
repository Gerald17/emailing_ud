import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuItem = props => {
    return (         
        <span className='navbar-item'>
            <NavLink to={props.to} className='button is-primary is-inverted'>                               
                    <span className='icon'>
                    <i className={props.icon}></i>
                    </span>
                    <span>{props.text}</span>
            </NavLink>
        </span> 
     );
}
 
export default MenuItem;