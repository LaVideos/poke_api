import { FC } from "react";
import styles from "./pokemons.module.css";
import { ButtonComponent, PokemonComponent } from "../../index.ts";
import { IGetPokeArr } from "../../../interfaces";

interface PokemonsProps {
    request_data: IGetPokeArr;
    handlePage: (page: string) => void;

}

const PokemonsComponent: FC<PokemonsProps> = ({ handlePage, request_data }) => {
    return (
        <>
            {request_data && (
                <div className={styles.container}>
                    <div className={styles.pokemonsFirstPartContainer}>
                        <div className={styles.pokemonsContainer}>
                            {request_data.results.map((value) => (
                                <PokemonComponent pokemon={value} key={value.name} />
                            ))}
                        </div>
                        <div className={styles.btnContainer}>
                            <ButtonComponent disabled={!request_data.previous} name={"Prev"} onClick={() => handlePage(request_data.previous)} />
                            <ButtonComponent disabled={!request_data.next} name={"Next"} onClick={() => handlePage(request_data.next)} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PokemonsComponent;
