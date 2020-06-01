import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';

export default function UploadComponent(props) {
    
    const fileUploader = useRef(null)

    const [URL, setURL] = useState('/assets/images/img-default.jpg')

    const handleClick = () => {
        fileUploader.current.click();
    }
    
    const verifyInput = async () => {
        if( fileUploader.current.files[0] === undefined ) return false;

        const data = new FormData();
        const date = new Date();
        const fileName = date.getDay() + date.getMonth() + date.getFullYear() + date.getHours() + date.getMinutes() + date.getSeconds();
        
        data.append('file', fileUploader.current.files[0], String( fileName + '.' + fileUploader.current.files[0].type.split('/')[1] ));
        // localStorage.setItem(data, token);
        console.log(data);
        setURL( window.URL.createObjectURL(fileUploader.current.files[0]) );

    }

    useEffect(() => {
        if(props.default){
            setURL(props.default)
        }
    }, [props])

    return (
        <>
        <style jsx>{`
            .inpImage {
                width: 160px;
                height: 160px;
                background: #fff;
                background-image: url(${URL});
                border-radius: 5px;
                border: 5px solid #fff;
                display: flex;
                flex-flow: column;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                background-position: center;
                background-size: cover;
                position: relative;
                margin-bottom: 10px;
            }
            @media(min-width:960px){
                .inpImage {
                    margin: auto;
                }
            }
        `}</style>
        <div className="inpImage" onClick={() => { handleClick() }}>
            <input style={{ display: 'none' }} onChange={ () => { verifyInput() } } ref={fileUploader} id="file" type="file" />
        </div>
        </>
    );

}
