import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {pokemonService} from "../services";
import {IRequest} from "../interfaces/ITypes.tsx";

interface PokemonAbilityState {
    ability: IRequest|undefined;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: PokemonAbilityState = {
    ability: undefined,
    status: 'idle',
    error: null,
};

export const getPokemonAbilities = createAsyncThunk<IRequest>(
    'pokemonTypes/getPokemonAbilities',
    async () => {
        const response = await pokemonService.getPokemonAbility();
        return response.data;
    }
);

export const pokemonAbilitySlice = createSlice({
    name: 'pokemonAbility',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPokemonAbilities.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPokemonAbilities.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ability = action.payload;
            })
            .addCase(getPokemonAbilities.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch types';
            });
    },
});

export const pokemonAbilityAction = {
    ...pokemonAbilitySlice.actions,
    getPokemonAbilities
};
