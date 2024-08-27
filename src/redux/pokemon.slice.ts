import { IGetPokeArr, IPoke } from "../interfaces";
import { pokemonService } from "../services";
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface initialStateCharacters {
    request_data: IGetPokeArr | undefined;
    pokeFromUrl: { [key: string]: IPoke | undefined };
    poke: IPoke | undefined;
    isLoaded: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: initialStateCharacters = {
    pokeFromUrl: {},
    poke: undefined,
    request_data: undefined,
    isLoaded: false,
    status: 'idle',
    error: null
};

const getPokemonByName = createAsyncThunk(
    'pokemonSlice/getPokemonByName',
    async (name: string, thunkApi) => {
        try {
            const { data } = await pokemonService.getPokemonByName(name);
            return thunkApi.fulfillWithValue(data);
        } catch (e) {
            const e1 = e as AxiosError;
            return thunkApi.rejectWithValue(e1.message);
        }
    }
);

const getPokemons = createAsyncThunk(
    'pokemonSlice/getPokemons',
    async (url: string, thunkApi) => {
        try {
            const { data } = await pokemonService.getPokemons(url);
            return thunkApi.fulfillWithValue(data);
        } catch (e) {
            const e1 = e as AxiosError;
            return thunkApi.rejectWithValue(e1.message);
        }
    }
);

const getPokemonByUrl = createAsyncThunk<IPoke, string>(
    'pokemonSlice/getPokemonByUrl',
    async (url, thunkApi) => {
        try {
            const { data } = await pokemonService.getPokemonByUrl(url);
            return thunkApi.fulfillWithValue(data);
        } catch (e) {
            const e1 = e as AxiosError;
            return thunkApi.rejectWithValue(e1.message);
        }
    }
);

export const pokemonSlice = createSlice({
    name: 'pokemonSlice',
    initialState,
    reducers: { clearPokemonState(state) {
            state.poke = undefined;
            state.status = 'idle';
            state.error = null;
        },},
    extraReducers: (builder) => {
        builder
            .addCase(getPokemons.fulfilled, (state, action) => {
                state.request_data = action.payload;
                state.status = 'succeeded';
            })
            .addCase(getPokemonByName.fulfilled, (state, action) => {
                state.poke = action.payload;
                state.status = 'succeeded';
            })
            .addCase(getPokemonByUrl.fulfilled, (state, action) => {
                const pokemon = action.payload;
                state.pokeFromUrl[pokemon.name] = pokemon;
                state.status = 'succeeded';
            })
            .addMatcher(isPending(getPokemons, getPokemonByName, getPokemonByUrl), (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addMatcher(isRejected(getPokemons, getPokemonByName, getPokemonByUrl), (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addMatcher(isFulfilled(getPokemons), (state) => {
                state.isLoaded = true;
            });
    }
});

export const pokemonAction = {
    ...pokemonSlice.actions,
    getPokemons,
    getPokemonByName,
    getPokemonByUrl,
};
