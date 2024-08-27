import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {IFormData} from "../interfaces";
import {pokemonService} from "../services";

interface PokemonFormState {
    formData: IFormData | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    url:string;
}

const initialState: PokemonFormState = {
    formData: null,
    status: 'idle',
    error: null,
    url:""
};

export const getPokemonFormByUrl = createAsyncThunk(
    'pokemonForm/fetchPokemonFormByUrl',
    async (url: string) => {
        const response = await pokemonService.getPokemonFormBuUrl(url);
        return response.data;
    }
);

export const pokemonFormSlice = createSlice({
    name: 'pokemonForm',
    initialState,
    reducers: {
        clearFormState(state) {
            state.formData = null;
            state.status = 'idle';
            state.error = null;
        },
        setUrl(state,action){
            state.url = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPokemonFormByUrl.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.formData=null
            })
            .addCase(getPokemonFormByUrl.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.formData = action.payload;
            })
            .addCase(getPokemonFormByUrl.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch data';
            });
    },
});


export const pokemonFormAction = {
    ...pokemonFormSlice.actions,
    getPokemonFormByUrl
};
