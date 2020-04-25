import React, { useState, useEffect, useRef } from 'react'

const Clock = () => {
    const [clockTime, setClockState] = useState({date:'', time:''})
    const clockRef = useRef(clockTime)
    clockRef.current = clockTime

    const setTime = () => {
        const dt = new Date();
        setClockState({date:dt.toLocaleDateString(), time:dt.toLocaleTimeString()})
    }
    useEffect( () => {
       setInterval( setTime, 1000)
    }, [])
    
    return (
        <div className="time-now">
            <span className="badge badge-dark">{`${clockTime.date } ${clockTime.time}`} </span>
        </div>
    )
}

export default Clock