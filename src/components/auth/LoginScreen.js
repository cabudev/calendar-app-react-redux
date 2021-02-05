import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startLogin } from '../../actions/auth';
import { startRegister } from '../../actions/users';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
    
    const dispatch = useDispatch();
    
    //useForm para los inputs del Login
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        lEmail: 'budaimc@gmail.com',
        lPassword: '123456'
    });

    //useForm para los inputs del Register
    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rCompany: 'iLEAN',
        rName: 'Cata',
        rEmail: 'budaimc@gmail.com',
        rPassword1: '123456',
        rPassword2: '123456'
    });

    const { lEmail, lPassword } = formLoginValues;

    const { rCompany, rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

    //submit del Login
    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(startLogin(lEmail, lPassword));
    }

    //submit del Register
    const handleRegister = (e) => {
        e.preventDefault();

        if( rPassword1 !== rPassword2 ){
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
        }

        dispatch(startRegister(rCompany, rEmail, rPassword1, rName));
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Inicia sesión</h3>
                    <form 
                        onSubmit={ handleLogin }
                        className="animate__animated animate__fadeIn animate__faster"
                    >
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>

                        

                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Iniciar sesión" 
                            />
                        </div>
                        <Link to="/forget-password" className="forgetPwd">¿Olvidaste tu contraseña?</Link>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Regístrate</h3>
                    <form 
                        onSubmit={ handleRegister }
                        className="animate__animated animate__fadeIn animate__faster"    
                    >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Empresa"
                                name="rCompany"
                                value={ rCompany }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={ rName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="rPassword1"
                                value={ rPassword1 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="rPassword2"
                                value={ rPassword2 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Registrarse" 
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}