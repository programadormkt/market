import React, { useState, useEffect } from 'react';

const WeekComponent = ({week}) => {
        
    const weekday = [
        "D",
        "S",
        "T",
        "Q",
        "Q",
        "S",
        "S"
    ]
    
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
            {
                week.map( (item, index) => {
                    return <span key={index} className={`advertInfoDay ${ (item) ? 'open': 'close'}`}>{weekday[index]}</span>
                })
            }
        </>
    )
}

export default WeekComponent;