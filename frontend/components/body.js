import HeaderComponent from './header';
import MainComponent from './main';
import FooterComponent from './footer';

export default function BodyComponent( { children, className } = props ) {
    return(
        <>
            <HeaderComponent />
            <MainComponent className={ className }>
                { children }
            </MainComponent>
            <FooterComponent />
        </>
    );
}