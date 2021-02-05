import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker';
import { uiToggleNavProfile, uiToggleSidebar } from '../../actions/ui';


export const Header = ({changeDate, currentDate}) => {
    
    const dispatch = useDispatch();
    const { navProfileOpen } = useSelector( state => state.ui );
    const { sidebarOpen } = useSelector( state => state.ui );
    const { name } = useSelector( state => state.auth );

    const handleDateChange = (e) => {
        changeDate(e);
    }

    const handleToggleNavProfile = () => {
        dispatch( uiToggleNavProfile(!navProfileOpen) );
    }

    const handleToggleSidebar = () => {
        dispatch( uiToggleSidebar(!sidebarOpen) );
    }
    
    return (
        <header className="header navbar navbar-dark bg-dark">

        <div 
            className="btn-menu bg-dark"
            onClick={handleToggleSidebar}
        >
            <i className="fas fa-bars"></i>
        </div>

            <a className="navbar-brand d-flex align-items-center" href="/">
                Company Name
            </a>

            {
                (localStorage.getItem('lastView')==='day') &&
                    <div className="form-group mb-0">
                        <DateTimePicker
                            onChange={ handleDateChange }
                            value={ currentDate }
                            className="form-control"
                        />
                    </div>
            }

            <div
                className="circular--portrait portrait-s1"
                onClick={handleToggleNavProfile}
            >
                {name.toUpperCase().charAt(0)}
                {name.split(" ").pop().charAt(0)}
            </div>

        </header>
    )
}
