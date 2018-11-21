import React from 'react';

const CardCounter = (props) => {
    return (        
        <div className="card card-style">
            <div className="card-content">
                <p className="title">                            
                    { props.emailCount }
                </p>
                <p className="subtitle">
                    Total de Correos { props.title }
                </p>
            </div>
        </div> 
    );
}

export default CardCounter;
