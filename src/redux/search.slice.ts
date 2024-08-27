import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pokemonService } from "../services";
import { IAbilityRequest, IPoke } from "../interfaces";

interface SearchState {
    pokemon: IPoke | undefined;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    pokeByType: IAbilityRequest | undefined;
}

const initialState: SearchState = {
    pokemon: undefined,
    status: 'idle',
    error: null,
    pokeByType: undefined,
};

export const getPokemonByName = createAsyncThunk(
    "search/getPokemonByName",
    async (name: string, { rejectWithValue }) => {
        try {
            const response = await pokemonService.getPokemonByName(name);
            return response.data;
        } catch (error) {
            return rejectWithValue("Failed to fetch Pokémon by name");
        }
    }
);

export const getPokemonByType = createAsyncThunk(
    "search/getPokemonByType",
    async (type: string, { rejectWithValue }) => {
        try {
            const response = await pokemonService.getPokemonByType(type);
            return response.data;
        } catch (error) {
            return rejectWithValue("Failed to fetch Pokémon by type");
        }
    }
);

export const getPokemonByAbility = createAsyncThunk(
    "search/getPokemonByAbility",
    async (ability: string, { rejectWithValue }) => {
        try {
            const response = await pokemonService.getPokemonByAbility(ability);
            return response.data;
        } catch (error) {
            return rejectWithValue("Failed to fetch Pokémon by ability");
        }
    }
);

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPokemonByName.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getPokemonByName.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.pokemon = action.payload;
                state.pokeByType = undefined;
            })
            .addCase(getPokemonByName.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(getPokemonByType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getPokemonByType.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.pokeByType = action.payload;
                state.pokemon = undefined;
            })
            .addCase(getPokemonByType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(getPokemonByAbility.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getPokemonByAbility.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.pokeByType = action.payload;
                state.pokemon = undefined;
            })
            .addCase(getPokemonByAbility.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const searchAction = {
    ...searchSlice.actions,
    getPokemonByAbility,
    getPokemonByName,
    getPokemonByType,
};

export default searchSlice.reducer;
