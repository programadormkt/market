import React, {useEffect} from "react";
import axios from 'axios';

function Home() {

    const init = async () => {
        const response = await axios(
            `http://localhost:3030/advert`,{
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
