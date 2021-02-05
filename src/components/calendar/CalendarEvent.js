import React from 'react'

export const CalendarEvent = ({ event }) => {
    
    const { title } = event;
    return (
        <div>
            <span> { title } </span>
            <strong> {event.user.name} </strong>
        </div>
    )
}
