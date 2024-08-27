import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    ButtonComponent,
    ErrorComponent,
    InputSearchComponent,
    LoadingComponent,
    PokemonComponent,
    SelectComponent
} from "../index.ts";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import { pokemonTypeAction } from "../../redux/types.slice.ts";
import { pokemonAbilityAction } from "../../redux/ability.slice.tsx";
import { searchAction } from "../../redux/search.slice.ts";
import { SelectChangeEvent } from "@mui/material";
import PokemonSearchComponent from "../poke/pokemon-search/pokemon-search-component.tsx";
import styles from './search-component.module.css';

const SearchComponent: FC = () => {
    const { types } = useAppSelector(state => state.typesSlice);
    const { ability } = useAppSelector(state => state.abilitySlice);
    const { pokemon, pokeByType,error,status, }
        = useAppSelector(state => state.searchSlice);
    const dispatch = useAppDispatch();

    const { register, watch, handleSubmit, reset, setValue } = useForm();

    const [isPokemonNameDisabled, setIsPokemonNameDisabled] = useState(false);
    const [isTypeDisabled, setIsTypeDisabled] = useState(false);
    const [isAbilityDisabled, setIsAbilityDisabled] = useState(false);

    const pokemonName = watch("pokemonName");
    const type = watch("type");
    const abilityName = watch("ability");

    useEffect(() => {
        dispatch(pokemonTypeAction.getPokemonTypes());
        dispatch(pokemonAbilityAction.getPokemonAbilities());
    }, [dispatch]);

    useEffect(() => {
        if (pokemonName || type || abilityName) {
            setIsPokemonNameDisabled(!!(type || abilityName));
            setIsTypeDisabled(!!pokemonName || !!abilityName);
            setIsAbilityDisabled(!!pokemonName || !!type);
        } else {
            setIsPokemonNameDisabled(false);
            setIsTypeDisabled(false);
            setIsAbilityDisabled(false);
        }
    }, [pokemonName, type, abilityName]);

    useEffect(() => {
        if (pokemonName === "" && type === "" && abilityName === "") {
            setValue("type", "");
            setValue("ability", "");
        }
    }, [pokemonName, type, abilityName, setValue]);

    const onSubmit = (data: any) => {
        if (data.pokemonName) {
            dispatch(searchAction.getPokemonByName(data.pokemonName));
        } else if (data.type) {
            dispatch(searchAction.getPokemonByType(data.type));
        } else if (data.ability) {
            dispatch(searchAction.getPokemonByAbility(data.ability));
        }
        reset();
    };

    const handleClear = () => {
        reset({
            pokemonName: "",
            type: "",
            ability: ""
        });
        setIsPokemonNameDisabled(false);
        setIsTypeDisabled(false);
        setIsAbilityDisabled(false);
    };

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        setValue("type", event.target.value);
    };

    const handleAbilityChange = (event: SelectChangeEvent<string>) => {
        setValue("ability", event.target.value);
    };

    return (
        <div className={styles.container}>
            <>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    {types && (
                        <SelectComponent
                            name="type"
                            selectArray={types.results}
                            register={register}
                            disabled={isTypeDisabled}
                            value={type || ""}
                            onChange={handleTypeChange}
                        />
                    )}
                    <InputSearchComponent
                        query={pokemonName || ""}
                        placeholder={"Search Pokémon"}
                        register={register}
                        disabled={isPokemonNameDisabled}
                        name="pokemonName"
                    />
                    {ability && (
                        <SelectComponent
                            name="ability"
                            selectArray={ability.results}
                            register={register}
                            disabled={isAbilityDisabled}
                            value={abilityName || ""}
                            onChange={handleAbilityChange}
                        />
                    )}

                    <div className={styles.buttonGroup}>
                        <ButtonComponent disabled={false} name={"Search"} onClick={handleSubmit(onSubmit)}/>
                        <ButtonComponent disabled={false} name={"Clear"} onClick={handleClear}/>
                    </div>
                </form>

                {status==="succeeded"&&<div className={styles.results}>
                    {pokemon &&
                        <PokemonSearchComponent key={pokemon.id} poke={pokemon}/>
                    }
                    {pokeByType && pokeByType.pokemon.length > 0 && (
                        pokeByType.pokemon.map(pokemon =>
                            <PokemonComponent key={pokemon.pokemon.url} pokemon={pokemon.pokemon}
                            />)
                    )}
                </div>}
            </>
            <div className={styles.containerBoxLoadAndErr}>
                {status==="failed"&&error&&<ErrorComponent error={error}/>}
                {status==="loading"&&<LoadingComponent/>}
            </div>
        </div>
    );
};

export default SearchComponent;
