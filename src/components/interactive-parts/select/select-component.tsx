import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC } from "react";
import { IType } from "../../../interfaces/IPoke.ts";
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface SelectProps {
    selectArray: IType[];
    name: string;
    register: UseFormRegister<FieldValues>;
    disabled: boolean;
    value: string;
    onChange?: (event: SelectChangeEvent<string>) => void;
}

const SelectComponent: FC<SelectProps> = ({ selectArray, name, register, disabled, value, onChange }) => {
    const { ref, ...inputProps } = register(name);

    return (
        <FormControl sx={{ m: 1, minWidth: 80 }} disabled={disabled}>
            <InputLabel id={`${name}-label`}>{name}</InputLabel>
            <Select
                {...inputProps}
                inputRef={ref}
                labelId={`${name}-label`}
                id={`${name}-select`}
                autoWidth
                label={name}
                value={value}
                onChange={onChange}
            >
                <MenuItem value={""}>choose</MenuItem>
                {selectArray.map((item) => (
                    <MenuItem value={item.name} key={item.url}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectComponent;
