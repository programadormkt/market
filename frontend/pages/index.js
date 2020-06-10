import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link';
import {CircularProgress} from '@material-ui/core';
import InfiniteScroll from "react-infinite-scroll-component";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { useRouter } from 'next/router';

import HeadComponent from '../components/head';
import BodyComponent from '../components/body';
import WeekComponent from '../components/week';

function Home({adverts}) {

    const Router = useRouter();
    
    const [Adverts, setAdverts] = useState(adverts.data);

    const [HasMore, setHasMore] = useState(false);

    const [Page, setPage] = useState(adverts.page+1);

    const fetchData = async () => {

        await axios.get(
            `http://127.0.0.1:3030/advert`,{
            headers: {
                page: Page
            }
        }).then( (response) => {
            if( response.status === 200 ) {

                response.data.data.map( advert => {
                    setAdverts( prevAdverts => [ ...prevAdverts, advert ] );
                });
                if( Page === response.data.lastPage ) {setHasMore( false )}
                else { setPage( Page + 1 ) }
            }
        });
    }

    return (
        <>
            <style global jsx>{`
                .infinite-scroll-component {
                    display: grid;
                    grid-template-columns: 1fr;
                }
                @media(min-width: 700px) {
                    .infinite-scroll-component {
                        display: flex;
                        flex-flow: wrap;
                        align-items: center;
                        justify-content: space-evenly;
                    }   
                }
                @media(min-width: 960px){
                    .infinite-scroll-component {
                        margin-top: 20px;
                        display: flex;
                    }   
                }
            `}</style>
            <style jsx>{`
                .content {
                    display: grid;
                    grid-template-columns: 1fr;
                    width: 100%;
                }
                @media(min-width: 960px){
                    .content {
                        grid-template-columns: 1fr 3fr;
                    }   
                }
                .containerGrid {
                    min-height: calc( 100vh - 56px );
                }
                .advert{
                    width: 100%;
                    overflow: hidden;
                    padding: 10px 0;
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    transition: all 0.2s linear;
                    background-color: #fff;
                }
                @media(min-width: 700px){
                    .advert{
                        width: 45%;
                        display: flex;
                        float: left;
                        flex-flow: column;
                        border-radius: 10px;
                        margin: 10px 0;
                    }
                    .advert:hover {
                        box-shadow: 0px 5px 20px -1px rgba(25,52,134,0.5);
                    }
                }
                @media(min-width: 1280px){
                    .advert{
                        width: 30%;
                    }
                }
                .advert img {
                    max-width: 100%;
                    object-fit: cover;
                }
                @media(min-width: 700px){
                    .advert img {
                        max-width: 150px;
                        object-fit: cover;
                        margin: 0 auto;
                        display: flex;
                    }
                }
                @media(min-width: 1280px){
                    .advert img {
                        max-width: 125px;
                    }
                }
                .advertInfo {
                    display: flex;
                    flex-flow: column;
                    justify-content: space-evenly;
                    align-items: center;
                }
                .advertInfo h5,
                .advertInfo p {
                    margin: 5px 0;
                }
                .advertInfo h5 {
                    font-size: 20px;
                    color: #193486;
                }
                .advertInfo p {
                    font-size: 12px;
                    color: #3d3d3d;
                }
                .advertShare {
                    display: flex;
                }
                .advertShare a {
                    margin-right: 10px;
                    width: 35px;
                    height: 35px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    overflow: hidden;
                    transition: all 0.2s linear;
                }
                .btnWhatsapp {
                    background-color: #25d366;
                    border: 1px solid #25d366;
                    color: #fff;
                }
                .btnWhatsapp:hover {
                    color: #fff;
                    background-color: #128C7E;
                    border: 1px solid #128C7E;
                }
                .btnInstagram {
                    background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);
                    border: 1px solid #fff;
                    color: #fff;
                }
                .btnInstagram:hover {
                    background: radial-gradient(circle at 0% 77%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);
                }
                .btnFacebook {
                    background-color: #1877f2;
                    border: 1px solid #1877f2;
                    color: #fff;
                }
                .btnFacebook:hover {
                    color: #1877f2;
                    background-color: #fff;
                }
                .advertShare a:focus {
                    outline: none;
                }
            `}</style>
            <HeadComponent 
                url={Router.pathname}
                title="Market - UNIFACEX"
                description="Página de divulgação dos produtos e serviços oferecidos pelos alunos e professores do UNIFACEX"
                image={`${Router.pathname}/favicon.ico`}
            />
            <BodyComponent>
                <div className="content">
                    <div className="finder">

                    </div>
                    <div className="containerGrid">
                        <InfiniteScroll
                        dataLength={adverts.total}
                        next={fetchData}
                        hasMore={HasMore}
                        loader={
                            <div style={{ position: 'fixed', width: '100vw', height: '100vh', zIndex: '1000', top: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column', backgroundColor: 'rgba(255,255,255,0.7)' }}>
                                <CircularProgress color="primary"/>
                                <h4>Loading...</h4>
                            </div>
                        }
                        endMessage={
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0', width: '100%' }}>
                                <p style={{textAlign: 'center'}}>
                                    <b>Você já viu tudo</b>
                                </p>
                            </div>
                        }>
                        {Adverts.map( (item, index) => {
                            return(
                                <div className="advert" key={index}>
                                    <div>
                                        <img src={`http://127.0.0.1:3030/uploads/${item.photo}`} />
                                    </div>
                                    <div className="advertInfo">
                                        <h5>{item.title}</h5>
                                        <div className="advertInfoWeek">
                                            <WeekComponent week={JSON.parse(item.week)}/>
                                        </div>
                                        <p>{`Funcionamento: ${item.open} - ${item.close}`}</p>
                                        <div className="advertShare">
                                            <Link href={`//api.whatsapp.com/send?phone=55${item.whatsapp}`} >
                                                <a target="__blank" className="btnWhatsapp">
                                                    <WhatsAppIcon />
                                                </a>
                                            </Link>
                                            <Link href={`//instagram.com/${item.instagram}`} >
                                                <a target="__blank" className="btnInstagram">
                                                    <InstagramIcon />
                                                </a>
                                            </Link>
                                            <Link href={`//facebook.com.br/${item.facebook}`} >
                                                <a target="__blank" className="btnFacebook">
                                                    <FacebookIcon />
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        </InfiniteScroll>
                    </div>
                </div>
            </BodyComponent>
        </>
    )
}

Home.getInitialProps = async () => {

    const response = await axios(
        `http://127.0.0.1:3030/advert`,{
            method: 'get',
            headers: {
                page: 1
            } 
        }
    );
    
    const adverts = response.data

    return { adverts  }
}

export default Home;
