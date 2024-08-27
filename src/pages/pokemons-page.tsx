import {PokemonsComponent} from "../components";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {useEffect, useState} from "react";
import {ENDPOINTS} from "../constants";
import {pokemonAction} from "../redux/pokemon.slice.ts";

const PokemonsPage = () => {
    const {request_data} = useAppSelector(state => state.pokemonSlice);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<string>(`/${ENDPOINTS.POKEMON}/?${ENDPOINTS.LIMIT}=20`);

    useEffect(() => {
        dispatch(pokemonAction.getPokemons(page));
    }, [page]);


    const handlePage=(page:string)=>{
        setPage(page)
    }

    return (
        <>
            {request_data&&<PokemonsComponent request_data={request_data} handlePage={handlePage}  />}
        </>
    );
};

export default PokemonsPage;
