import React, {useEffect} from "react";
import api from '../../services/api';

function Home() {

    const init = async () => {
        const response = await api(
            `/advert`,{
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
