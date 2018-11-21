import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';

import { getAccountInfo } from '../../config/api';
import { fetchAccountInfo } from '../../actions/account_info';
import Loader from '../loader/loader';


class AccountInfo extends React.Component {
    state = {
        hasError: false,
        errorCode: 0,
        loaded: false,
        dataEmails: {},
        dataReports : {}
    }

    componentDidMount(){ 
        const { user } = this.props.user;    
        const { dispatch } = this.props;    
            getAccountInfo(user.userName, user.serverId)
            .then((res) => {
                this.setState({ 
                    dataEmails:{
                        labels: [
                            'Disponibles',
                            'Enviados',
                        ],
                        datasets: [{
                            data: [ res.data.object.BillingPeriodMessageCount , res.data.object.MessageAllowance , ],
                            backgroundColor: [
                            '#141e57',
                            '#29388f',
                            ],
                            hoverBackgroundColor: [
                            '#00d1b2',
                            '#00d1b2',
                            ]
                        }]
                    },
                    dataReports : {
                        labels: [
                            'Realizadas',
                            'Disponibles',
                        ],
                        datasets: [{
                            data: [ res.data.object.BillingPeriodApiCount, res.data.object.ApiAllowance ],
                            backgroundColor: [
                            '#141e57',
                            '#29388f',
                            ],
                            hoverBackgroundColor: [
                            '#00d1b2',
                            '#00d1b2',
                            ]
                        }]
                    }
                
                })
                dispatch(fetchAccountInfo(res))
                })                
            .catch((res)=>{
                if(res.response.status === 404){
                    this.setState({ hasError: true, errorCode: 404 });
                }else{
                    this.setState({ hasError: true, errorCode: 500 });
                }
            });
        
    }    

    checkIfHasError(hasError){
        if(hasError){
            return(  
                this.state.errorCode === 404 ? 
                <div class="notification is-warning">
                    No se encontraron datos
                </div> : 
                <div class="notification is-danger">
                    Error en el servidor o falla de conexión, intente más tarde
                </div>
            );
        }
    }

    render() {  
        const { accountInfo, accountInfoFetched } = this.props.account;
        if(!this.props.user.loggedIn){
            return (
                <Redirect to='/Login'/>
            )
        }
        
        this.checkIfHasError(this.state.hasError) 
        
        return(
            <React.Fragment>
                { accountInfoFetched === false ?  
                    <Loader />
                :
                <div>
                    <nav className="level nav-style">
                        <div className="level-item has-text-left">
                            <div>
                            <p className="heading">Bienvenido</p>
                            <h4>{ this.props.user.user.friendlyName }</h4>
                            </div>
                        </div>
                        <div className="level-item has-text-right">
                            <div>
                            <p className="heading">Periodo Faturación</p>
                            <h4>{ `${ accountInfo.object.PlanBillingPeriodStart } / ${ accountInfo.object.PlanBillingPeriodEnd }`}</h4>
                            </div>
                        </div>
                    </nav>             
                    <div className='columns'>
                        <div className='column is-4 is-offset-2'>
                            <Doughnut
                                data={this.state.dataEmails}
                                width={250}
                                options={{
                                    maintainAspectRatio: true
                                }}/>                                
                            <div className='has-text-centered'>
                                <p className="heading">Emails</p>
                                <p className="heading">Enviados / Disponibles</p>
                                <p className="title">{ `${ accountInfo.object.BillingPeriodMessageCount } / ${ accountInfo.object.MessageAllowance }`}</p>
                            </div>
                        </div>
                        <div className='column is-4'>
                        <Doughnut
                                data={this.state.dataReports}
                                width={250}
                                options={{
                                    maintainAspectRatio: true
                                }}/>                                                               
                            <div className='has-text-centered'>
                                <p className="heading">Reportes</p>
                                <p className="heading">Realizadas / Disponibles</p>
                                <p className="title">{ `${ accountInfo.object.BillingPeriodApiCount } / ${ accountInfo.object.ApiAllowance }`}</p>
                            </div>
                        </div>
                    </div>  
                </div>
                } 
            </React.Fragment>
        )
        
    }
}

function mapState(state){    
    return({
        account: state.accountInfo,
        user: state.user
    });
}

function mapDispatch(dispatch){
    return bindActionCreators({ fetchAccountInfo }, dispatch);
}

export default withRouter(connect(mapState, mapDispatch)(AccountInfo));
