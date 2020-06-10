import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import md5 from 'crypto-js/md5';
import axios from 'axios';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { List, ListItem, ListItemText, Drawer, Divider, Avatar } from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

import { getToken, login, logout, setUser, getUSer } from '../services/auth';

export default function HeaderComponent( { children } = props ) {

    const Router = useRouter();

    const [RA, setRA] = useState("");

    const [Storage, setStorage] = useState("");

    const [DrawerOpen, setDrawerOpen] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        await axios.get('http://127.0.0.1:3333/session',{
            headers: {
                ra: RA,
            }
        }).then( response => {
            if(response.data){
                login( md5(response.data).toString() );
                setUser(response.data.id);
                setStorage( getToken() );
            }else {
                alert("Erro ao efetuar login. Verifique seus dados e tente novamente.");
            }
        });

    }

    const exit = () => {
        logout(); 
        setStorage(""); 
        Router.push('/');

    }

    useEffect(() => {
        setStorage(getToken())
    })

    return (
        <>
        <style global jsx>{`
            header {
                position: fixed;
                z-index: 100;
                width: 100vw;
                overflow: hidden;
                top: 0;
            }
            header > div {
                justify-content: space-between !important;
                flex-flow: row-reverse;
            }
            .Menu {
                display: flex;
                flex-flow: column;
                justify-content: space-between;
                height: 100%;
                padding: 16px 20px;
            }
            .UserItemMenu {
                display: grid;
                grid-template-columns: 1fr 2fr;
                justify-content: center;
                align-items: center;
                padding: 16px;
            }
            .UserDescription{
                display: flex;
                flex-flow: column;
                align-items: center;
                padding: 0;
                margin: 0;
            }
            .formLogin {
                padding: 16px 20px;
            }
            .divider {
                margin: 8px 0;
                padding-top: 1px;
            }
            
            .formLogin > .formGroup {
                padding: 8px 0;
            }
            .formGroup input {
                background-color: #e5e5e5;
                color: #555;
                padding: 10px;
                width: calc( 100% - 20px );
                border: 1px solid #e5e5e5;
                border-radius: 25px;
                text-align: center;
            }
            .formGroup input:focus {
                outline: none;
            }
            .btnLogin {
                background: #193486;
                color: #fff;
                border: 1px solid #193486;
                padding: 5px 10px;
                width: 100%;
                border-radius: 25px;
                cursor: pointer;
                transition: all 0.2s linear;
            }
            .btnLogin:hover {
                color: #193486;
                background: #fff;
            }
            .btnNavigation, .btnExit {
                cursor: pointer;
                outline: none;
                border: 1px solid transparent;
                border-radius: 5px;
                transition: all 0.3s linear;
            }
            .btnNavigation {
                color: #555;
            }
            .btnNavigation:hover {
                color: #193486;
                border: 1px solid #193486;
            }
            .btnExit {
                color: #bb0000;
            }
            .btnExit:hover {
                border: 1px solid #bb0000;
            }
            .btnCadastrese {
                cursor: pointer;
                color: #193486;
                font-size: 12px !important;
                float: right;
                margin-bottom: 5px !important;
                transition: all 0.2s linear;
            }
            .btnCadastrese:hover {
                color: #bb0000;
            }
        `}</style>
        <header>
            <AppBar position="static" style={{ background: '#193486' }}>
                
                <Toolbar>
                    <IconButton onClick={ () => { setDrawerOpen(true) } } edge="start" color="inherit" aria-label="menu">
                        <MenuRoundedIcon />
                    </IconButton>
                    <Typography style={{ cursor: 'pointer' }} variant="h6" onClick={ () => Router.push('/') } >
                        Market
                    </Typography>
                </Toolbar>
                <Drawer anchor="right" open={DrawerOpen} onClose={() => {setDrawerOpen(false)}}>
                    {
                        Storage ? 
                        (
                            <>
                            <div className="Menu">
                                <div>
                                    <div className="UserItemMenu">
                                        <Avatar src="/static/images/avatar/1.jpg" />
                                        <div className="UserDescription">
                                            <Typography component="p" variant="subtitle2" color="textPrimary">
                                                {`CPF ${RA}`}
                                            </Typography>
                                        </div>
                                    </div>
                                    <Divider />
                                    <List>
                                        <ListItem className="btnNavigation">
                                            <ListItemText onClick={ () => { Router.push(`/user/${getUSer()}/advert`); }}>
                                                Meu Anúncio
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                </div>
                                <div>
                                    <List>
                                        <ListItem className="btnExit" onClick={ () => { exit(); }}>
                                            <ListItemText >
                                                Sair
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                </div>
                            </div>
                            </>
                        ) : (
                            <form className="formLogin" noValidate autoComplete="off">
                                <Typography component="h4" variant="subtitle1" align="center" style={{ color: '#193486' }}>Faça login</Typography>
                                <Divider className="divider" />
                                <div className="formGroup">
                                    <input type="text" placeholder="CPF" onChange={ (e) => setRA(e.target.value) } />
                                </div>
                                <Typography component="p" onClick={ () => { Router.push('/begin') }} className="btnCadastrese">Cadastre-se</Typography>
                                <div className="formGroup">
                                    <button className="btnLogin" onClick={ (e) => { submit(e); } }>Enviar</button>
                                </div>
                            </form>
                        )
                    }
                </Drawer>
            </AppBar>
        </header>
        </>
    );
}