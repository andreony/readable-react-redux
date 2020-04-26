import React, { useState, useEffect } from 'react'

const Clock = () => {
    const [clockTime, setClockState] = useState({date:'', time:''})
    const setTime = () => {
        const dt = new Date();
        setClockState({date:dt.toLocaleDateString(), time:dt.toLocaleTimeString()})
    }
    useEffect( () => {
        const clockTicks = setInterval( setTime, 1000)

        // cleanup function of the effect (like suggested by react)
        return () => {
            clearInterval(clockTicks)
        };
    },[clockTime.date, clockTime.time])

    return (
        <div className="time-now">
            <span className="badge badge-dark">{`${clockTime.date } ${clockTime.time}`} </span>
        </div>
    )
}

export default Clock