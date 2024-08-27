import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import { pokemonFormAction } from "../../redux/pokemonForm.slice.tsx";
import {
    ButtonComponent,
    CheckboxComponent,
    ErrorComponent,
    InputSearchComponent,
    LoadingComponent,
    SelectComponent
} from "../index.ts";
import { pokemonTypeAction } from "../../redux/types.slice.ts";
import styles from './poke-form-component.module.css';

const PokeFormComponent: FC = () => {
    const location = useLocation();
    const { status, formData } =
        useAppSelector(state => state.formDataSlice);
    const { types } = useAppSelector(state => state.typesSlice);
    const dispatch = useAppDispatch();
    const [data, setData] = useState(null);

    const { register, handleSubmit, watch, reset } = useForm({

    });



    useEffect(() => {
        dispatch(pokemonFormAction.clearFormState());
        dispatch(pokemonFormAction.getPokemonFormByUrl(location.state.url));
        dispatch(pokemonTypeAction.getPokemonTypes());
    }, [dispatch, location.state.url]);

    useEffect(() => {
        if (formData) {
            reset({
                name: formData.name,
                is_battle_only: formData.is_battle_only,
                is_default: formData.is_default,
                is_mega: formData.is_mega,
            });
        }
    }, [formData, reset]);


    const onSubmit = (formData: any) => {
        setData(formData);
    };

    return (
        <div className={styles.wrapContainer}>
            {status === "succeeded" && (
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="name">Name</label>
                            <InputSearchComponent
                                name="name"
                                query={watch('name')}
                                placeholder="Pokemon Name"
                                register={register}
                                readOnly={true}
                            />
                        </div>

                        {
                            formData&& <>
                                <div className={styles.checkboxGroup}>
                                    <CheckboxComponent
                                        checked={formData.is_battle_only}
                                        handleChange={() => undefined}
                                        register={register}
                                        name="is_battle_only"

                                    />
                                    <span>is Battle only</span>
                                </div>

                                <div className={styles.checkboxGroup}>
                                    <CheckboxComponent
                                        checked={formData.is_default}
                                        handleChange={() => undefined}
                                        register={register}
                                        name="is_default"

                                    />
                                    <span>Is Default</span>
                                </div>

                                <div className={styles.checkboxGroup}>
                                    <CheckboxComponent
                                        checked={formData.is_mega}
                                        handleChange={() => undefined}
                                        register={register}
                                        name="is_mega"
                                        disabled={true}
                                    />
                                    <span>Is Mega</span>
                                </div>
                            </>
                        }

                        <div className={styles.selectGroup}>
                            {formData && types && formData.types.map((type) => (
                                <SelectComponent
                                    key={type.type.name}
                                    disabled={false}
                                    selectArray={types.results}
                                    name={`type_${type.slot}`}
                                    register={register}
                                    value={type.type.name}
                                />
                            ))}
                        </div>

                        <div className={styles.submitButton}>
                            <ButtonComponent onClick={handleSubmit(onSubmit)} name="Send"></ButtonComponent>
                        </div>
                    </form>

                    {data && (
                        <div className={styles.dataContainer}>
                            <h3>Submitted Data:</h3>
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    )}
                </div>
            )}

            {status === "failed" && <ErrorComponent error={"Error"}/>}
            {status === "loading" && <span className={styles.loadingContainer}><LoadingComponent/></span>}
        </div>
    );
};

export default PokeFormComponent;
