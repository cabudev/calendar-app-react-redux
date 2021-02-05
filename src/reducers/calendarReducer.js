import { types } from '../types/types';

const initialState = {
    events: [],
    activeEvent: null,
    slot: null,
}

export const calendarReducer = (state = initialState, action) => {

    switch ( action.type ) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => (e.id === action.payload.id ) ? action.payload : e
                )
            }
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => (e.id !== state.activeEvent.id )
                ),
                activeEvent: null
            }
        case types.eventLoaded:
            return{
                ...state,
                events: [ ...action.payload ]
            }
        case types.eventLogout:
            return{
                ...initialState
            }
        case types.eventSlotSelected:
            return {
                ...state,
                slot: {
                    start: action.payload.start,
                    end: action.payload.end
                }
            }
        case types.eventSlotClear:
            return {
                ...state,
                slot: null
            }
        default:
            return state;
    }


}