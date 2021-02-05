import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../actions/auth';
import { startUploadingPicture } from '../../actions/users';

const NavBarProfile = () => {
    
    const { navProfileOpen } = useSelector( state => state.ui );
    const { name, uid, profilePicture } = useSelector( state => state.auth );

    const [width, setWidth] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        // crea una función para actualizar el estado con el clientWidth
        const updateWidth = () => {
            const width = document.body.clientWidth
        setWidth(width)
        }

        // actualiza el width al montar el componente
        updateWidth()
        // se suscribe al evento resize de window
        window.addEventListener("resize", updateWidth)

        // devuelve una función para anular la suscripción al evento
        return () => {
            window.removeEventListener("resize", updateWidth)
        }
    })

    //simula el click en el input oculto
    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    //obtiene la imagen y ejecuta el dispatch para subirla
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if ( file ){
            dispatch( startUploadingPicture(uid, file) );
        }
    } 
    
    //dispara el logout
    const handleLogout = () => {
        dispatch( startLogout() );
    }
    
    return (
        <aside className={ `bg-dark
            ${width>1079 ? 'nav-bar-profile' : 'nav-bar-profile-mob' }
            ${navProfileOpen && 'nav-bar-profile-open'}`
        }>
            <div className="container-flex-column">
                <div className="portrait">
                    <div className="circular--portrait portrait-s2">
                        { 
                            !!profilePicture ?
                            <img src={profilePicture} alt="img_profile" /> :
                            name.toUpperCase().charAt(0) + name.split(" ").pop().charAt(0) 
                        }
                    </div>
                    <span className="edit-portrait">
                        <input
                            id="fileSelector"
                            type="file"
                            name="file"
                            style={{display: 'none'}}
                            onChange={ handleFileChange }
                        />

                        <i className="fas fa-camera"
                            onClick={ handlePictureClick }    
                        ></i>
                    </span>   
                </div>
                <div className="user-info">
                    <div>{ name }</div>
                    <div>budaimc@gmail.com</div>
                
                < hr />
                    <Link to="/account">Gestionar tu cuenta</Link>
                </div>
                < hr />
                <button 
                    className="btn btn-logout"
                    onClick={ handleLogout }    
                >

                    <i className="fas fa-sign-out-alt "></i>
                    <span className="br-3"> Salir</span>
                </button>
            </div>                            
        </aside>
    )
}

export default NavBarProfile
