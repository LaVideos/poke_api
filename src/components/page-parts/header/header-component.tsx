import logo from "../../../assets/pokeapi_.png";
import styles from './header.module.css';
import { NavLink } from "react-router-dom";
import { ENDPOINTS } from "../../../constants";

const HeaderComponent = () => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerbox}>
                <img className={styles.pokeapiPng} src={logo} alt=""/>
            </div>
            <div className={styles.navBox}>
                <NavLink
                    to={`/${ENDPOINTS.POKEMONS}`}
                    className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                >
                    {ENDPOINTS.POKEMONS}
                </NavLink>
                <NavLink
                    to={`/${ENDPOINTS.SEARCH}`}
                    className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                >
                    {ENDPOINTS.SEARCH}
                </NavLink>
            </div>
        </div>
    );
};

export default HeaderComponent;
