import React from 'react';
import Head from 'next/head';

export default function HeadComponent({ url, title, description, image }) { 
    return (
        <Head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            <meta httpEquiv="Content-Language" content="pt-br"/>
            <meta name="keywords" content="universidade,centro,ensino,qualidade,formação,superior,melhor,unifacex,facex,uni,universitário"/>
            <meta name="robots" content="index,follow"/>
            <meta name="description" content={description} />
            
            {/* <!-- Título --> */}
            <title>UNIFACEX - Market</title>


            {/* <!-- Open Graph / Facebook --> */}
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={url}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:image" content={image}/>

            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={url}/>
            <meta property="twitter:title" content={title}/>
            <meta property="twitter:description" content={description}/>
            <meta property="twitter:image" content={image}/>


            {/* <!-- Links --> */}
            <link rel="canonical" href={url} />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,500,700" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
    );
}