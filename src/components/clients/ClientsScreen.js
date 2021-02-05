import React from 'react';
//import { useDispatch, useSelector } from 'react-redux';

import { Header } from '../ui/Header';
import NavBarProfile from '../ui/NavBarProfile';
import Sidebar from '../ui/Sidebar';

export const ClientsScreen = () => {

    //const dispatch = useDispatch();

    //const { uid } = useSelector( state => state.auth );

    return (
        <>
            <Header />

            <div className="d-flex">
                    <Sidebar />
                <main className="calendar-screen mt-3">
                    <h1>Cleints</h1>
                </main>
                <NavBarProfile />
            </div>
        </>
    )
}