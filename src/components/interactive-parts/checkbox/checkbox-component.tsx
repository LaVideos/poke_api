import { FC } from "react";
import { Checkbox } from "@mui/material";
import {FieldValues, UseFormRegister} from "react-hook-form";

interface CheckBoxProps {
    checked: boolean;
    handleChange: () => void;
    register: UseFormRegister<FieldValues>;
    name:string,
    disabled?:boolean

}

const CheckboxComponent: FC<CheckBoxProps> = ({ checked, handleChange, register,name }) => {
    return (
        <Checkbox
            {...register(name)}
            checked={checked}
            onChange={handleChange}
        />
    );
};

export default CheckboxComponent;
