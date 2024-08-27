import {Key, useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';

import styles from './pokemon-details.module.css';
import {IconButton} from '@mui/material';
import {useAppSelector} from '../../../hooks/useAppSelector.ts';
import {useAppDispatch} from '../../../hooks/useAppDispatch.ts';
import {pokemonAction} from '../../../redux/pokemon.slice.ts';
import {ChipComponent, ErrorComponent, LoadingComponent, PokemonFormsComponent, StatsComponent} from '../../index.ts';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {IAbility, IForms, IStats, ITypes} from '../../../interfaces/IPoke.ts';

const PokemonDetailsComponent = () => {
    const { name } = useParams();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { poke, status } = useAppSelector(state => state.pokemonSlice);
    const [openType, setOpenType] = useState<boolean>(false);
    const [openAbility, setOpenAbility] = useState<boolean>(false);
    const [openStats, setOpenStats] = useState<boolean>(false);

    const pokemonFromState = location.state?.poke || poke;

    useEffect(() => {
        if (name) {
            dispatch(pokemonAction.clearPokemonState());
            dispatch(pokemonAction.getPokemonByName(name));
        }
    }, [name, dispatch, location]);

    return (
        <div className={styles.container}>
            {status === "succeeded" && pokemonFromState && (
                <div className={styles.pokemonDetailContainer}>
                    <div className={styles.pokemonImgContainer}>
                        <img
                            className={styles.pokemonImg}
                            src={pokemonFromState.sprites?.['front_default']}
                            alt={pokemonFromState.name}
                        />
                    </div>
                    <div className={styles.dataContainerWrap}>
                        <span className={styles.pokemonTitle}>
                            {pokemonFromState.name.toUpperCase()}
                        </span>
                        <div className={styles.dataContainer}>
                            <div className={styles.center}>
                                <span>Abilities</span>
                                <IconButton onClick={() => setOpenAbility(!openAbility)} aria-label="toggle-abilities">
                                    {!openAbility ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                                </IconButton>
                            </div>
                            {openAbility && (
                                <div>
                                    {pokemonFromState.abilities.map((value: IAbility, index: Key | null | undefined) => (
                                        <ChipComponent key={index} text={value.ability.name}/>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.dataContainer}>
                            <div className={styles.center}>
                                <span>Types</span>
                                <IconButton onClick={() => setOpenType(!openType)} aria-label="toggle-types">
                                    {!openType ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                                </IconButton>
                            </div>
                            {openType && (
                                <div>
                                    {pokemonFromState.types.map((value: ITypes, index: Key | null | undefined) => (
                                        <ChipComponent key={index} text={value.type.name}/>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.dataContainer}>
                            <div className={styles.center}>
                                <span>Stats</span>
                                <IconButton onClick={() => setOpenStats(!openStats)} aria-label="toggle-stats">
                                    {!openStats ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                                </IconButton>
                            </div>
                            {openStats && (
                                <div>
                                    {pokemonFromState.stats.map((stat: IStats, index: Key | null | undefined) => (
                                        <StatsComponent key={index} stats={stat}/>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.formContainer}>
                            {pokemonFromState.forms.map((form: IForms, index: Key | null | undefined) => (
                                <PokemonFormsComponent key={index} forms={form}/>
                            ))}
                        </div>
                    </div>
                </div>


            )}


            {status === "failed" && <ErrorComponent error={"Error"}/>}
            {status === "loading" && <span className={styles.loadingContainer}><LoadingComponent/></span>}
        </div>
    );
};

export default PokemonDetailsComponent;
