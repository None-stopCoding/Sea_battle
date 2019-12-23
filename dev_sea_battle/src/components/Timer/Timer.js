import React, { useState, useEffect } from 'react';
import './Timer.css';
import {convertTime} from "../../utils/Routing";

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
        const { hours, minutes, seconds } = convertTime(time);

        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
    }, [time]);

    return(
        <div id='timer'>
            <strong>{hours} : {minutes} : {seconds}</strong>
        </div>
    )
};

export default Timer;