import React, {useEffect} from "react";
import axios from 'axios';

function Home({adverts}) {

    const init = async () => {
        const response = await axios(
            `http://127.0.0.1:3030/advert`,{
                method: 'get',
                headers: {
                    page: 1
                } 
            }
        );
        console.log(response);
    }

    useEffect(() => {
        init();
    }, [])
    return <div></div>
}

export default Home;
