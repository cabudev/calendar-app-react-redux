import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSlotClear, eventStartAddNew, eventStartUpdate } from '../../actions/events';

const customStyles = {
    content : {
      margin                 : 'auto',
    }
  };

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours');
const endDate = now.clone().add(1,'hour');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: endDate.toDate()
}

export const CalendarModal = () => {

    const { modalOpen } = useSelector( state => state.ui);
    const { activeEvent } = useSelector( state => state.calendar);
    const { slot } = useSelector( state => state.calendar );

    const dispatch = useDispatch();

    const [titleValid, setTitleValid] = useState( true )

    const[ formValues, setFormValues ] = useState( initEvent );

    const { notes, title, start, end } = formValues;

    //Se ejecuta al abrir el modal
    useEffect(() => {
        //si tiene evento en la store carga los datos en el formulario
        if( activeEvent ){
            setFormValues( activeEvent )
        } else if( slot ){
            setFormValues({
                title: '',
                notes: '',
                start: slot.start,
                end: slot.end
            });
        } else {
            setFormValues( initEvent );
        }

    }, [ activeEvent, slot ])

    
    //Actualiza Fecha/Hora INICIO en el input
    const handleStartDateChange = (e) => {
        console.log(e)
        setFormValues({
            ...formValues,
            start: e
        })
    }
    
    //Actualiza Fecha/Hora FIN en el input
    const handleEndDateChange = (e) => {
        setFormValues({
            ...formValues,
            end: e
        })
    }

    //Actualiza los inputs del formulario
    const handleInputChange = ( { target } ) =>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    //Cierra el modal y limpia el evento activo
    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        dispatch( eventSlotClear() );
        setFormValues( initEvent );
    }

    //Crea o Actualiza un evento al guardar
    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );
        const allDay = ( momentStart.isSame( momentEnd ) && momentStart.format('HH:mm:ss')===( momentEnd.format('HH:mm:ss')) );

        if( !allDay && momentStart.isSameOrAfter( momentEnd )){
            Swal.fire('Error','La fecha fin debe de ser mayor a la fecha de inicio','error');
            return;
        }

        //comprueba que el titulo tenga mas de 2 caracteres
        if( title.trim().length < 2 ){
            setTitleValid(false);
            return;
        }

        if( activeEvent ){
            //actualiza el evento
            dispatch( eventStartUpdate( formValues ) );
        }else{
            //añade un nuevo evento
            dispatch( eventStartAddNew( formValues ) );
        }
        
        setTitleValid(true);
        closeModal();
    }

    return (
        <Modal
          isOpen={ modalOpen }
          onRequestClose={ closeModal }
          style={customStyles}
          closeTimeoutMS= { 200 }
          className="modal"
          overlayClassName="modal-fondo"
        >   
            <div className="container">
                <h1 className=""> { (activeEvent)? 'Editar evento': 'Nuevo evento' }  
                    <i className="float-right fas fa-times close-modal"
                        onClick={closeModal}
                    ></i>
                </h1>
                   
            </div>
            
            <hr />

            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ start }
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ end }
                        minDate= { start }
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${ !titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
