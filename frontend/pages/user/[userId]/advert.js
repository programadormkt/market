import React from 'react';
import HeadComponent from '../../../components/head';
import BodyComponent from '../../../components/body';
import UploadComponent from '../../../components/upload';

export default function Profile(  ) {
    
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

            .btnProfile {
                background-color: #99bd11;
                width: 90%;
                padding: 10px;
                border-radius: 25px;
                border: 1px solid #99bd11;
                transition: all 0.2s linear;
                color: #fff;
                margin-top: 10px;
                box-shadow: 0px 2px 5px 0px rgba(85,85,85,1);
                cursor: pointer;
            }
            .btnProfile:hover {
                background-color: #fff;
                color: #99bd11;
                box-shadow: 0px 0px 0px 0px rgba(0,0,0,1);
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
            }
            .sevenColumns .formGroup {
                display: flex;
                flex-flow: column;
            }
            .sevenColumns .formGroup label {
                font-size: 16px;
                align-items: center;
                justify-content: center;
                display: flex;
            }
            @media(min-width:960px){
                .containerProfile {
                    justify-content: space-between;
                }
                .contentProfile {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    justify-content: center;
                    align-items: center
                }
            }
            `}</style>
            <HeadComponent />
            <BodyComponent>
                <div className="containerProfile">
                    <div className="contentProfile">
                        <UploadComponent />
                        <input className="inpProfile" type="text" placeholder="RA do aluno" />
                        <input className="inpProfile" type="text" placeholder="Nome do produto ou empresa" />
                        <textarea className="textareaProfile" id="descricao" placeholder="Descrição" />
                        <input className="inpProfile" type="text" placeholder="Endereço completo" />
                        <div className="twoColumns">
                            <div className="formGroup">
                                <label htmlFor="abertura">Abertura</label>
                                <input className="inpProfile" id="abertura" type="time" placeholder="Abertura" />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="encerramento">Encerramento</label>
                                <input className="inpProfile" id="encerramento" type="time" placeholder="encerramento" />
                            </div>
                        </div>
                        <div className="sevenColumns">
                            <div className="formGroup">
                                <input type="checkbox" className="inpProfile" name="dom" id="dom"/>
                                <label htmlFor="dom">Dom</label>
                            </div>
                            <div className="formGroup">
                                <input type="checkbox" className="inpProfile" name="seg" id="seg"/>
                                <label htmlFor="seg">Seg</label>
                            </div>
                            <div className="formGroup">
                                <input type="checkbox" className="inpProfile" name="ter" id="ter"/>
                                <label htmlFor="ter">Ter</label>
                            </div>
                            <div className="formGroup">
                                <input type="checkbox" className="inpProfile" name="qua" id="qua"/>
                                <label htmlFor="qua">Qua</label>
                            </div>
                            <div className="formGroup">
                                <input type="checkbox" className="inpProfile" name="qui" id="qui"/>
                                <label htmlFor="qui">Qui</label>
                            </div>
                            <div className="formGroup">
                                <input type="checkbox" className="inpProfile" name="sex" id="sex"/>
                                <label htmlFor="sex">Sex</label>
                            </div>
                            <div className="formGroup">
                                <input type="checkbox" className="inpProfile" name="sab" id="sab"/>
                                <label htmlFor="sab">Sab</label>
                            </div>
                        </div>
                        <input className="inpProfile" type="text" placeholder="Número do Whatsapp" />
                        <input className="inpProfile" type="text" placeholder="Perfil do Instagram" />
                        <input className="inpProfile" type="text" placeholder="Perfil do Facebook" />
                        <button className="btnProfile">Publicar</button>
                    </div>
                </div>
            </BodyComponent>
        </>
    )
}

Profile.getInitialProps = async ({query}) => {

    const id = Number(query.userId)
    
    const response = await axios(
        `http://127.0.0.1:3333/advert/${id}`,{
            method: 'get'
        }
    );
    
    // const adverts = response.data

    // return { adverts }
    return { response }
}