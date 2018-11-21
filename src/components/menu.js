import React from 'react';

import './App.css';
import MenuItem from './menu_item';
import RRDLogo from '../assets/logo_rrd.png';
import { logOut } from '../actions/user';

class Menu extends React.Component {  

    closeSession = () => {
        const { dispatch } = this.props;
        dispatch(logOut());
      }

    render() {
        return (
            <React.Fragment>
                <section className='hero is-rrd-color is-medium'>
                    <div className='hero-head'>
                        <nav className='navbar'>
                        <div className='container'>
                            <div className='navbar-brand'>                        
                                <img src={RRDLogo} alt='RRD Logo' className='logo-menu-style' />
                            <span className='navbar-burger burger' data-target='navbarMenuHeroA'>
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                            </div>
                            <div id='navbarMenuHeroA' className='navbar-menu'>
                                <div className='navbar-end'>           
                                    <MenuItem icon='fa fa-caret-down' to='/received' text='Recibidos'/>  
                                    <MenuItem icon='fa fa-caret-down' to='/failed' text='Fallidos'/>  
                                    <MenuItem icon='fa fa-caret-down' to='/opened' text='Abiertos'/>    
                                    <MenuItem icon='fa fa-caret-down' to='/spam' text='Spam'/>    
                                    <MenuItem icon='fa fa-caret-down' to='/queued' text='Procesados'/>                                        
                                    <span className='navbar-item' onClick={() => this.closeSession()}>
                                        <div className='button is-primary is-inverted'>                               
                                                <span className='icon'>
                                                <i className='fa fa-caret-down'></i>
                                                </span>
                                                <span>Salir</span>
                                        </div>
                                    </span> 
                                </div>
                            </div>
                        </div>
                        </nav>
                    </div>          
                </section>
            </React.Fragment> 

        );
    }
}

export default Menu;
