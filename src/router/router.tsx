import MainLayout from "../layouts/main/main-layout.tsx";
import {createBrowserRouter} from "react-router-dom";
import {PokeFormPage, PokemonDetailPage, PokemonsPage, SearchPage} from "../pages";
import {ENDPOINTS} from "../constants";


export const router = createBrowserRouter([
    {
        path:'',
        element:<MainLayout/>,
        children:[
            {path:`${ENDPOINTS.POKEMONS}`,element:<PokemonsPage/>},
            {path:`${ENDPOINTS.SEARCH}`,element:<SearchPage/>},
            {path:`${ENDPOINTS.POKEMON}/:name`,element:<PokemonDetailPage/>},
            {path:`${ENDPOINTS.FORM}/:name`,element:<PokeFormPage/>}
        ]
    }
])

