import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./events";

export const startLogin = ( email, password ) => {
    
    return async(dispatch) => {
        
        const respC = await fetchWithoutToken( 'auth', { email, password }, 'POST');
        const company = await respC.json();

        if( !company.ok ){
            return Swal.fire('Error', company.msg, 'error');
        }

        const respU = await fetchWithoutToken( 'auth', {company_id: company._id,  email, password }, 'POST');
        const user = await respU.json();

        if( user.ok ){
            localStorage.setItem( 'token', user.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            localStorage.setItem( 'profilePicture', user.urlProfilePicture );
            dispatch( login({
                    uid: user.uid,
                    name: user.name,
                    profilePicture: user.urlProfilePicture
                })
            );
        }else{
            Swal.fire('Error', user.msg, 'error');
        }
    }
}

export const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

export const startChecking = () => {

    return async(dispatch) => {
        const resp = await fetchWithToken( 'auth/renew' );
        const body = await resp.json();

        if( body.ok ){
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            const profilePicture = localStorage.getItem( 'profilePicture' );
            dispatch( login({
                    uid: body.uid,
                    name: body.name,
                    profilePicture
                })
            );
        }else{
            dispatch( checkingFinish() );
        }

    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.clear();
        dispatch( eventLogout() );
        dispatch( logout() );
        dispatch( uiClear() );
    }
}

const logout = () => ({ type: types.authLogout })
const uiClear = () => ({ type: types.uiClear })