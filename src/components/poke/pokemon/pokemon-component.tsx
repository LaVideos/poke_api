import { IGetPokeObj } from "../../../interfaces";
import { Link } from "react-router-dom";
import styles from './pokemon.module.css';
import { useEffect, useState } from "react";
import { pokemonAction } from "../../../redux/pokemon.slice.ts";
import { useAppDispatch } from "../../../hooks/useAppDispatch.ts";
import { useAppSelector } from "../../../hooks/useAppSelector.ts";
import { ENDPOINTS } from "../../../constants";
import { LoadingComponent } from "../../index.ts";

interface PokemonProps {
    pokemon: IGetPokeObj;
}

const PokemonComponent = ({ pokemon }: PokemonProps) => {
    const dispatch = useAppDispatch();
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const pokeFromUrl = useAppSelector(state => state.pokemonSlice.pokeFromUrl[pokemon.name]);

    useEffect(() => {
        if (!pokeFromUrl) {
            dispatch(pokemonAction.getPokemonByUrl(pokemon.url));
        }
    }, [dispatch, pokemon.url, pokemon.name, pokeFromUrl]);


    return (
        <Link className={styles.pokemonContainer} to={`/${ENDPOINTS.POKEMON}/${pokemon.name}`} state={pokeFromUrl}>
            {!isImageLoaded && <LoadingComponent />}
            {pokeFromUrl && (
                <img
                    src={pokeFromUrl.sprites.front_default}
                    alt={pokemon.name}
                    className={styles.pokemonSprite}
                    onLoad={()=>setIsImageLoaded(true)}
                    style={{ display: isImageLoaded ? 'block' : 'none' }}
                />
            )}
            <div className={styles.pokemonNameContainer}>
                <span className={styles.pokemonText}>{pokemon.name.toUpperCase()}</span>
            </div>
        </Link>
    );
};

export default PokemonComponent;
