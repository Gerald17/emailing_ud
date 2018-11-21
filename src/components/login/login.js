import React from 'react';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { fetchUser } from '../../actions/user';
import { login } from '../../config/api';
import { connect } from 'react-redux';

import RRDLogo from '../../assets/logo_rrd.png';

class Login extends React.Component {
    state = {
        hasError: false,
        errorCode: 0,
    }

    submitForm(values){
        const { dispatch } = this.props;
        login(values)
        .then((res) => {
            dispatch(fetchUser(res))
        })
        .catch((res)=>{
            if(res.response.status === 404){
                this.setState({ hasError: true, errorCode: 404 });
            }else{
                this.setState({ hasError: true, errorCode: 500 });
            }
        });
    }

    //Formulario
    formField(fieldProps){
        const { meta: { touched, error } } = fieldProps;
        const classDanger = `${fieldProps.className} ${touched && error ? 'is-warning' : ''}`;
        return(
            <React.Fragment>
            <input
                className={ classDanger }
                type={fieldProps.type}
                name={fieldProps.input.name}
                {...fieldProps.input}
            />
            {   touched && error ?                
                <article class="message is-warning">
                    <div class="message-body">
                        { error }
                    </div>
                </article> 
                : 
                ''
            }
            </React.Fragment>
        )
    };

    checkIfHasError(hasError){
        if(hasError){
          return(  
              this.state.errorCode === 404 ? 
                <div class="notification is-warning">
                    Credenciales erroneas, por favor revisar
                </div> : 
                <div class="notification is-danger">
                    Error en el servidor o falla de conexión, intente más tarde
                </div>
            );
        }
    }

    render() { 
        const { handleSubmit } = this.props;
        return (
            <section className="section">
                <div className="container">
                    <div className='columns bordered'>
                        <div className='column is-8 login-bg'>
                            <img src={RRDLogo} alt='RRD Logo' className='logo-style' />
                            <p className='login-paragraph'>
                                Bienvenido a nuestro dashboard de emailing, nuestras soluciones
                                digitales te ayudarán a comunicarte con tus clientes de manera
                                rápida.
                            </p>
                        </div>
                        <div className='column is-4 whitesmoke-bg'>
                            <form onSubmit={handleSubmit(this.submitForm.bind(this))} className='form-style'>      
                                
                                <h3 className='login-title'>
                                    Login
                                </h3>

                                <div className='field'>
                                    <p className='control has-icons-left'>          
                                        <Field         
                                            className='input'
                                            type='text'
                                            label='Usuario'
                                            name='userName'
                                            placeholder='Usuario'
                                            component={this.formField}
                                        />                    
                                        <span className='icon is-small is-left'>
                                        <i className='fas fa-user'></i>
                                        </span>
                                    </p>
                                    </div>
                                    <div className='field'>
                                    <p className='control has-icons-left'>                               
                                        <Field                        
                                            className='input' 
                                            type='password'
                                            label='Contraseña'
                                            name='userPassword'
                                            placeholder='Contraseña'
                                            component={this.formField}
                                        />
                                        <span className='icon is-small is-left'>
                                        <i className='fas fa-lock'></i>
                                        </span>
                                    </p>
                                    </div>
                                    <div className='field'>
                                    <p className='control'>
                                        <button type='submit' className='button is-primary'>
                                        Iniciar Sesion
                                        </button>
                                    </p>
                                </div>
                                { this.checkIfHasError(this.state.hasError) }
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

function mapState(state) {
    return({
        user: state.user
    })
}

function mapDispatch(dispatch){
    return bindActionCreators({ fetchUser }, dispatch);
}


function validate(values){
    const errors = {};
    if(!values.userName){
        errors.userName = 'Por favor escriba su usuario';
    }
    if(!values.userPassword){
        errors.userPassword = 'Por favor escriba su contraseña';
    }
    return errors;
}


//Login = connect(mapState, mapDispatch)(Login);

//class name and configuration function
export default reduxForm({
    validate, // is the same as => validate: validateForm,
    form: 'loginForm'
})(connect(mapState, mapDispatch)(Login));


//same as
/**
 * 
// create new, "configured" function
createReduxForm = reduxForm({ form: 'contact' })

// evaluate it for ContactForm component
ContactForm = createReduxForm(ContactForm)

export default ContactForm
 */
