import {configureStore} from "@reduxjs/toolkit";
import { pokemonSlice} from "./pokemon.slice";
import {pokemonTypeSlice} from "./types.slice.ts";
import {pokemonAbilitySlice} from "./ability.slice.tsx";
import {searchSlice} from "./search.slice.ts";
import {pokemonFormSlice} from "./pokemonForm.slice.tsx";


export const store = configureStore({
    reducer:{
        pokemonSlice:pokemonSlice.reducer,
        typesSlice:pokemonTypeSlice.reducer,
        abilitySlice:pokemonAbilitySlice.reducer,
        searchSlice:searchSlice.reducer,
        formDataSlice:pokemonFormSlice.reducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
