import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {pokemonService} from "../services";
import {IRequest} from "../interfaces/ITypes.tsx";

interface PokemonTypeState {
    types: IRequest|undefined;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: PokemonTypeState = {
    types: undefined,
    status: 'idle',
    error: null,
};

export const getPokemonTypes = createAsyncThunk<IRequest>(
    'pokemonTypes/getPokemonTypes',
    async () => {
        const response = await pokemonService.getPokemonTypes();
        return response.data;
    }
);

export const pokemonTypeSlice = createSlice({
    name: 'pokemonTypes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPokemonTypes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPokemonTypes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.types = action.payload;
            })
            .addCase(getPokemonTypes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch types';
            });
    },
});

export const pokemonTypeAction = {
    ...pokemonTypeSlice.actions,
    getPokemonTypes

};
