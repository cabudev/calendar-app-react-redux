import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './sidebar.scss';

const Sidebar = () => {
    const { sidebarOpen } = useSelector( state => state.ui );
    const [width, setWidth] = useState(0);
    
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

    return (
        <div data-component="sidebar">
            <div className={`
                ${width>1079 ? 'sidebar' : 'sidebar-mob' }
                ${sidebarOpen && 'sidebar-open'}`
            }>
                <ul className={`list-group flex-column d-inline-block 
                    ${width>1079 ? 'first-menu' : 'first-menu first-menu-mob' }
                    bg-dark`
                }>
                    <li className="list-group-item pl-4 py-2">
                        <Link to="/">
                            <i className="far fa-calendar-alt" aria-hidden="true">
                                <span className="ml-2 align-middle">Agenda</span>
                            </i>
                        </Link>
                    </li>

                    <li className="list-group-item pl-4 py-2">
                        <Link to="/tasks">
                            <i className="fas fa-tasks" aria-hidden="true">
                                <span className="ml-2 align-middle">Tareas</span>
                            </i>
                        </Link>
                    </li>

                    <li className="list-group-item pl-4 py-2">
                        <Link to="/clients">
                            <i className="fas fa-id-card" aria-hidden="true">
                                <span className="ml-2 align-middle">Clientes</span>
                            </i>
                        </Link>
                    </li>

                    <li className="list-group-item pl-4 py-2">
                        <Link to="/users">
                            <i className="fas fa-users" aria-hidden="true">
                                <span className="ml-2 align-middle">Usuarios</span>
                            </i>
                        </Link>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default Sidebar;
