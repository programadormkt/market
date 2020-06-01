import React, { useState, useEffect } from 'react';

const WeekComponent = ({week}) => {
    
    const [Week, setWeek] = useState([])
    
    const weekday = [
        "D",
        "S",
        "T",
        "Q",
        "Q",
        "S",
        "S"
    ]

    const init = () => {
        for (var [key, value] of Object.entries(week)) {
            setWeek( prevWeek => [ ...prevWeek, key ])
        }
    }

    useEffect(() => {
        init();
    }, [week])
    
    return(
        <>
        <style>{`
            .advertInfoDay {
                font-size: 10px;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                padding: 5px 8px;
                margin-right: 5px;
                color: #fff;
            }
            .advertInfoDay.open {
                background-color: #193486;
            }
            .advertInfoDay.close {
                background-color: #999;
            }
        `}</style>
            <span className={`advertInfoDay ${ (week[0]) ? 'open': 'close'}`}>{weekday[0]}</span>
            <span className={`advertInfoDay ${ (week[1]) ? 'open': 'close'}`}>{weekday[1]}</span>
            <span className={`advertInfoDay ${ (week[2]) ? 'open': 'close'}`}>{weekday[2]}</span>
            <span className={`advertInfoDay ${ (week[3]) ? 'open': 'close'}`}>{weekday[3]}</span>
            <span className={`advertInfoDay ${ (week[4]) ? 'open': 'close'}`}>{weekday[4]}</span>
            <span className={`advertInfoDay ${ (week[5]) ? 'open': 'close'}`}>{weekday[5]}</span>
            <span className={`advertInfoDay ${ (week[6]) ? 'open': 'close'}`}>{weekday[6]}</span>
        </>
    )
}

export default WeekComponent;