import React from 'react';
import LoadingGif from '../../assets/loading.gif';

const Loader = (props) => {
    return (     
        <div className='columns'>
            <div className='column is-half is-offset-one-quarter has-text-centered'>
                <img src={LoadingGif} alt='loading...'/>
                <p>cargando...</p>
            </div>
        </div>
    );
}
 
export default Loader;
