import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import { resetPassword } from '../../actions/users';

export const ResetPasswordScreen = ({match}) => {
    const dispatch = useDispatch();

    const [ formValues, handleRegisterInputChange ] = useForm({
        password1: '',
        password2: ''
    });
    
    const { password1, password2 } = formValues;
    const { token } = match.params;

    const handleChangePassword = (e) => {
        e.preventDefault();

        if( password1 !== password2 ){
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
        }

        dispatch( resetPassword(token, password1) );
    }
    
    return (
        <div className="container">
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="reset-password-container animate__animated animate__fadeIn">
                    <h1 className="reset-password-title">Resetear contraseña</h1>
                    <form 
                        onSubmit={ handleChangePassword }
                    >

                        <div className="form-group">
                            <label>Contraseña nueva</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password1"
                                value={ password1 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirmar contraseña nueva</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password2"
                                value={ password2 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group d-flex justify-content-center align-items-center">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Cambiar mi contraseña" 
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordScreen
