import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import moment from 'moment';

import { Header } from '../ui/Header';
import { uiOpenModal } from '../../actions/ui';
import { messages } from '../../helpers/calendar-messages-es';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import 'moment/locale/es';

import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { 
    eventClearActiveEvent, 
    eventSetActive, 
    eventSlotSelected, 
    eventStartLoading, 
    eventStartMoveOrResize 
} from '../../actions/events';

import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import NavBarProfile from '../ui/NavBarProfile';
import Sidebar from '../ui/Sidebar';


moment.locale('es');
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { uid } = useSelector( state => state.auth );

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month' );

    const [currentDate, setCurrentDate] = useState( moment().hours(0).minutes(0).seconds(0).toDate() );
    
    //funcion que se llama desde el Navbar al cambiar la fecha en el input
    const changeDate = (e) => {
        setCurrentDate(e);
    }

    //funcion que actualiza la fecha con Hoy < >
    const onNavigate = (e) => {
        setCurrentDate(e);
    }

    //al acceder al calendario carga los eventos de la base de datos en la store
    useEffect(() => {
        dispatch( eventStartLoading() );
    }, [dispatch])

    //dobleclick en un evento abre el modal
    const onDoubleClick = (e) => {
        dispatch( uiOpenModal() );
    }

    //click en un evento lo marca como activo en la store
    const onSelectEvent = (e) => {
        dispatch( eventSetActive(e) );
    }

    //guarda en el localStorage la vista (dia,semana,mes o agenda)
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    //al seleccionar slots vacios abre el Modal
    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() );
        dispatch( eventSlotSelected(e) );
        dispatch( uiOpenModal() );
    }
    
    //controla cuando arrastramos un evento y lo actualiza con las nuevas fechas
    const onEventDrop = (payload) => {
        dispatch( eventStartMoveOrResize(payload) );
    }

    //controla cuando redimensionamos un evento y lo actualiza con las nuevas fechas
    const onEventResize = (payload) => {
        dispatch( eventStartMoveOrResize(payload) );
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        //console.log(event, start, end, isSelected);
        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    };


    return (
        <>
            <Header 
                changeDate={ changeDate }
                currentDate={ currentDate }
            />

            <div className="d-flex">
                    <Sidebar />
                <main className="calendar-screen mt-3">
                    <DragAndDropCalendar
                        localizer={ localizer }
                        events={ events }
                        startAccessor="start"
                        endAccessor="end"
                        messages={ messages }
                        eventPropGetter={ eventStyleGetter }
                        onDoubleClickEvent={ onDoubleClick }
                        onSelectEvent={ onSelectEvent }
                        onView={ onViewChange }
                        onSelectSlot={ onSelectSlot }
                        selectable={ true }
                        view={ lastView }
                        components={{
                            event: CalendarEvent
                        }}
                        onEventDrop={ onEventDrop }
                        resizable
                        onEventResize={ onEventResize }
                        date={ currentDate }
                        onNavigate={ onNavigate }
                    />

                    <AddNewFab />

                    {
                        ( activeEvent ) && <DeleteEventFab />
                    }
                    
                    <CalendarModal />    
                </main>
                <NavBarProfile />
            </div>
        </>
    )
}
