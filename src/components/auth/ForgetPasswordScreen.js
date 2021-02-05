import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendToken } from '../../actions/users';
import { useForm } from '../../hooks/useForm';

 export const ForgetPasswordScreen = ({history}) => {
    const dispatch = useDispatch();
    
    const [ formValues, handleInputChange ] = useForm({
        email: 'budaimc@gmail.com',
    });

    const { email } = formValues;

    const handleSubmit = (e) =>{
        e.preventDefault();

        dispatch( sendToken( email ));
        setTimeout(function() {history.push('/login')},4000);
    }


    return (
        <div className="container">
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="forget-password-container">
                    <h3 className="forget-password-title">¿Olvidaste tu contraseña?</h3>
                    <p className="forget-password-description">Para restaurar tu contraseña, ingresa tu dirección de correo electrónico. Es posible que tengas que consultar tu carpeta de spam o desbloquear la dirección no-reply@calendarapp.com.</p>
                    
                    <form 
                        onSubmit={ handleSubmit }
                        className="animate__animated animate__fadeIn animate__faster"
                    >
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="email"
                                value={ email }
                                onChange={ handleInputChange }
                            />
                        </div>
                        
                        <div className="form-group d-flex flex-row-reverse">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Enviar email" 
                            />
                        </div>
                        <Link to="/login" className="forget-password-back-login">Si recuerdas tu contraseña pincha aqui</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

