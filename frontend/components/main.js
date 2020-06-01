import React from 'react';

export default function MainComponent( { children, className } = props ) {
    return (
        <>
        <style global jsx>{`
            body {
                padding: 0;
                margin: 0;
                font-family: Roboto;
            }
        `}</style>
        <style jsx>{`
            main {
                margin-top: 56px;
            }
            @media(min-width: 600px){
                main {
                    margin-top: 64px;
                }
            }
        `}</style>
        <main className={ className }>
            {children}
        </main>
        </>
    );
}