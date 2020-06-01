import React from 'react';
import Head from 'next/head';

export default function HeadComponent() {    
    return (
        <Head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta property="post" content="<?php echo $post->ID; ?>" />
            
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            <meta httpEquiv="Content-Language" content="pt-br"/>
            <meta name="keywords" content="universidade,centro,ensino,qualidade,formação,superior,melhor,unifacex,facex,uni,universitário"/>
            <meta name="robots" content="index,follow"/>
            <meta name="description" content="<?php echo bloginfo('description'); ?>" />
            
            {/* <!-- Título --> */}
            <title>UNIFACEX - Market</title>


            {/* <!-- Open Graph / Facebook --> */}
            <meta property="og:type" content="website"/>
            <meta property="og:url" content="<?php echo get_the_permalink($post->ID); ?>"/>
            <meta property="og:title" content="<?php echo $post->post_title; ?>"/>
            <meta property="og:description" content="<?php echo get_description(get_the_excerpt($post->ID)); ?>"/>
            <meta property="og:image" content="<?php echo get_thumb(get_the_post_thumbnail_url($post->ID)); ?>"/>

            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content="<?php echo get_the_permalink($post->ID); ?>"/>
            <meta property="twitter:title" content="<?php echo $post->post_title; ?>"/>
            <meta property="twitter:description" content="<?php echo get_description(get_the_excerpt($post->ID)); ?>"/>
            <meta property="twitter:image" content="<?php echo get_thumb(get_the_post_thumbnail_url($post->ID)); ?>"/>


            {/* <!-- Links --> */}
            <link rel="canonical" href="<?php echo bloginfo(url); ?>" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,500,700" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
    );
}