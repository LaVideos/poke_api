import {useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";

import styles from './main.module.css'
import {HeaderComponent} from "../../components";



const MainLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        location.pathname === '/'&&navigate('/pokemons')
    },[])
    return (
        <div>
            <HeaderComponent/>
            <div className={styles.main}>
                <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout;
