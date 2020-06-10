import React, {useRef, useState} from 'react';
import axios from 'axios';
import HeadComponent from '../../components/head';
import BodyComponent from '../../components/body';
import { useRouter } from 'next/router';

export default function Comecar() {

    const Router = useRouter();

    const [RA, setRA] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [week, setWeek] = useState([false, false, false, false, false, false, false]);
    const [open, setOpen] = useState("00:00");
    const [close, setClose] = useState("00:00");
    const [instagram, setInstagram] = useState("");
    const [facebook, setFacebook] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    
    const fileUploader = useRef(null);

    const [URL, setURL] = useState('/assets/images/img-default.jpg');

    const handleClick = () => {
        fileUploader.current.click();
    }

    const verifyInput = async () => {
        if( fileUploader.current.files[0] === undefined ) return false;

        const data = new FormData();
        const date = new Date();
        const fileName = date.getDay() + date.getMonth() + date.getFullYear() + date.getHours() + date.getMinutes() + date.getSeconds();
        
        data.append('file', fileUploader.current.files[0], String( fileName + '.' + fileUploader.current.files[0].type.split('/')[1] ));
        
        setURL( window.URL.createObjectURL(fileUploader.current.files[0]) );

    }

    const updateWeek = async (day) => {
        var newWeek = [...week];
        newWeek[day] = !week[day];
        await setWeek(newWeek);
    }

    const publish = async () => {

        var data = new FormData();
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        data.append("photo", fileUploader.current.files[0]);
        data.append("RA", RA);
        data.append("title", title);
        data.append("description", description);
        data.append("address", address);
        data.append("week", JSON.stringify(week));
        data.append("open", open);
        data.append("close", close);
        data.append("instagram", instagram);
        data.append("facebook", facebook);
        data.append("whatsapp", whatsapp);

        console.log

        await axios.post("http://127.0.0.1:3030/advert", data, config)
        .then(response => {
            console.log(response)
            Router.push(`/user/${response.data}/advert`);
        })
        .catch(err => {
            console.log(err);
        });
    }


    return (
        <>
        <style jsx>{`
        .containerProfile {
            display: flex;
            background-color: #e5e5e5;
            min-height: calc( 100vh - 56px );
            width:100%;
            justify-content: center;
            
        }
        .contentProfile {
            overflow: auto hidden;
            display: flex;
            flex-flow: column;
            width:calc( 100vw - 48px );
            align-items: center;
            padding: 40px 24px;
        }
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
        .twoColumns {
            display: flex;
            flex-flow: row;
            justify-content: space-between;
            padding: 0px 10px;
            width: calc( 100% - 20px );
        }
        .inpProfile, .textareaProfile {
            width: 90%;
            border: 1px solid #fff;
            border-radius: 25px;
            background-color: #fff;
            color: #999;
            text-align: center;
            padding: 10px;
            margin: 10px 0;
            transition: all 0.2s linear;
        }
        .inpProfile:focus,
        .textareaProfile:focus {
            outline: none;
        }
        .twoColumns .formGroup{
            display: flex;
            flex-flow: column;
            width: 90%;
            margin: 0 auto;
        }
        .formGroup label {
            font-size: 12px;
            color: #555;
            text-align: center;
        }
        .twoColumns .inpProfile {
            width: 75%;
        }
        .contentProfile input,
        .contentProfile > textarea, 
        .contentProfile > div{
            margin: 10px auto;
        }
        .sevenColumns {
            display: grid;
            grid-template-columns: repeat( 7, 1fr );
            align-items: center;
            justify-content: space-around;
            width: calc( 90% - 20px );
            margin: 0 auto;
        }
        .sevenColumns .formGroup {
            display: flex;
            flex-flow: column;
        }
        .sevenColumns .formGroup label {
            font-size: 12px;
            align-items: center;
            justify-content: center;
            display: flex;
        }
        .btnProfile {
            background-color: #193486;
            color: #fff;
            border: 1px solid #193486;
            padding: 10px;
            width: 50%;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.2s linear;
            margin-top: 10px;
        }
        .btnProfile:hover {
            color: #193486;
            background-color: #fff;
        }
        @media(min-width:960px){
            .containerProfile {
                justify-content: space-between;
            }
            .contentProfile {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 70%;
                margin: 0 auto;
            }
        }
        `}</style>
        <HeadComponent 
            url={Router.pathname}
            title="Market - UNIFACEX"
            description="Página de cadastro dos produtos e serviços oferecidos pelos alunos e professores do UNIFACEX"
            image={`${Router.pathname}/favicon.ico`}
        />
        <BodyComponent>
            <div className="containerProfile">
                <div className="contentProfile">
                    <div className="inpImage" onClick={() => { handleClick() }}>
                        <input style={{ display: 'none' }} onChange={ () => { verifyInput() } } ref={fileUploader} id="file" type="file" />
                    </div>
                    <input className="inpProfile" onChange={ e => setRA( e.target.value ) } type="text" placeholder="RA do aluno" />
                    <input className="inpProfile" onChange={ e => setTitle( e.target.value ) } type="text" placeholder="Nome do produto ou empresa" />
                    <textarea className="textareaProfile" onChange={ e => setDescription( e.target.value ) } id="descricao" placeholder="Descrição" />
                    <input className="inpProfile" type="text" onChange={ e => setAddress( e.target.value ) } placeholder="Endereço completo" />
                    <div className="twoColumns">
                        <div className="formGroup">
                            <label htmlFor="abertura">Abertura</label>
                            <input className="inpProfile" onChange={ e => setOpen( e.target.value ) } id="abertura" type="time" placeholder="Abertura" />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="encerramento">Encerramento</label>
                            <input className="inpProfile" onChange={ e => setClose( e.target.value ) } id="encerramento" type="time" placeholder="encerramento" />
                        </div>
                    </div>
                    <div style={{ width: 'calc( 100% - 20px )', margin: '0 10px' }}>
                        <legend style={{ color: '#555', fontSize: '12px', textAlign: 'center' }}>Dias de funcionamento</legend>
                        <div className="sevenColumns">
                            <div className="formGroup">
                                <input type="checkbox" className="inpProfile" onClick={ () => updateWeek(0)} name="dom" id="dom"/>
                                <label htmlFor="dom">Dom</label>
                            </div>
                            <div className="formGroup">
                                <input type="checkbox" className="inpProfile" onClick={ () => updateWeek(1)} name="seg" id="seg"/>
                                <label htmlFor="seg">Seg</label>
                            </div>
                            <div className="formGroup">
                                <input type="checkbox" className="inpProfile" onClick={ () => updateWeek(2)} name="ter" id="ter"/>
                                <label htmlFor="ter">Ter</label>
                            </div>
                            <div className="formGroup">
                                <input type="checkbox" className="inpProfile" onClick={ () => updateWeek(3)} name="qua" id="qua"/>
                                <label htmlFor="qua">Qua</label>
                            </div>
                            <div className="formGroup">
                                <input type="checkbox" className="inpProfile" onClick={ () => updateWeek(4)} name="qui" id="qui"/>
                                <label htmlFor="qui">Qui</label>
                            </div>
                            <div className="formGroup">
                                <input type="checkbox" className="inpProfile" onClick={ () => updateWeek(5)} name="sex" id="sex"/>
                                <label htmlFor="sex">Sex</label>
                            </div>
                            <div className="formGroup">
                                <input type="checkbox" className="inpProfile" onClick={ () => updateWeek(6)} name="sab" id="sab"/>
                                <label htmlFor="sab">Sab</label>
                            </div>
                        </div>
                    </div>
                    <input className="inpProfile" onChange={ e => setWhatsapp( e.target.value ) } type="text" placeholder="Número do Whatsapp" />
                    <input className="inpProfile" onChange={ e => setInstagram( e.target.value ) } type="text" placeholder="Perfil do Instagram" />
                    <input className="inpProfile" onChange={ e => setFacebook( e.target.value ) } type="text" placeholder="Perfil do Facebook" />
                    <button className="btnProfile" onClick={ () => { publish() } }>Publicar</button>
                </div>
            </div>
        </BodyComponent>
    </>
    )
}
