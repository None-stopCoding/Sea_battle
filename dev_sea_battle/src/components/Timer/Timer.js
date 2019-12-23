import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ action }) => {
    const [time, update] = useState(0);
    const [interval, change] = useState(null);
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);

    const start = () =>
        change(setInterval(() => {
            update(prev => prev + 1)
        }, 1000));

    const stop = () => clearInterval(interval);

    useEffect(() => action ? start() : stop(), [action]);

    // useEffect(() => changeStopTime(time));

    useEffect(() => {
        let hours = 0, minutes = 0, seconds = 0;

        hours = Math.floor(time / 3600);
        minutes = Math.floor((time - hours * 3600) / 60);
        seconds = time - (hours * 3600 + minutes * 60);

        setHours(String(hours).padStart(2, "0"));
        setMinutes(String(minutes).padStart(2, "0"));
        setSeconds(String(seconds).padStart(2, "0"));
    }, [time]);

    return(
        <div id='timer'>
            <strong>{hours} : {minutes} : {seconds}</strong>
        </div>
    )
};

export default Timer;