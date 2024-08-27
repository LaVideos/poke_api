import {IPoke} from "../../../interfaces";
import {FC} from "react";
import {Link} from "react-router-dom";
import styles from "../pokemon/pokemon.module.css";
import {ENDPOINTS} from "../../../constants";

interface PokemonSearchProps{
    poke:IPoke
}


const PokemonSearchComponent:FC<PokemonSearchProps> = ({poke}) => {

    return (
        <Link className={styles.pokemonContainer} to={`/${ENDPOINTS.POKEMON}/${poke.name}`} state={poke}>
            {poke && <img src={poke.sprites.front_default} alt={poke.name} className={styles.pokemonSprite} />}
            <div className={styles.pokemonNameContainer}>
                <span className={styles.pokemonText}>{poke.name.toUpperCase()}</span>
            </div>
        </Link>
    );
};

export default PokemonSearchComponent;
