
import Swal from 'sweetalert2';
import { fetchWithoutToken } from '../helpers/fetch';
import { types } from '../types/types';
import { fileUpload } from '../helpers/fileUpload';
import { login } from './auth';


export const startRegister = ( company, email, password, name ) => {
    return async( dispatch ) => {
        const resp = await fetchWithoutToken( 'users/new', {company, email, password, name}, 'POST');
        const body = await resp.json();

        if( body.ok ){
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch( login({
                    uid: body.uid,
                    name: body.name
                })
            );
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const sendToken = ( email ) => {

    return async() => {
        const resp = await fetchWithoutToken( 'users/reset-password', { email }, 'POST');
        const body = await resp.json();

        if( body.ok ){
            
            Swal.fire({
                title:'Email enviado con exito',
                text:'Recibirá un correo electrónico con instrucciones sobre cómo restablecer su contraseña en unos minutos.',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
            });

        }else{
            Swal.fire('Error', body.msg, 'error');
        }
        
    }

}

export const resetPassword = (token, password) => {
    return async( dispatch ) => {
        const resp = await fetchWithoutToken( 'users/reset-password', { token, password }, 'PUT');
        const body = await resp.json();

        if( body.ok ){
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch( login({
                    uid: body.uid,
                    name: body.name
                })
            );
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startUploadingPicture = ( uid, file ) => {
    return async( dispatch ) => {
        const fileUrl = await fileUpload( file );

        const resp = await fetchWithoutToken( 'users/change-picture', { uid, fileUrl }, 'PUT');
        const body = await resp.json();

        if( body.ok ){
            dispatch( setProfilePicture( body.fileUrl ) );
            Swal.fire({
                title:'Foto de perfil actualizada',
                text:'Se ha actualizado con existo su foto de perfil.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

const setProfilePicture = ( fileUrl ) => ({ 
    type: types.userSetProfilePicture,
    fileUrl
});