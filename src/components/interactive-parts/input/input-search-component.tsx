import {FC} from 'react';
import {InputBase, Paper} from "@mui/material";
import {UseFormRegister, FieldValues} from 'react-hook-form';

interface InputProps {
    query: string;
    placeholder: string;
    register: UseFormRegister<FieldValues>;
    disabled?: boolean;
    name: string;
    readOnly?: boolean

}

const InputSearchComponent: FC<InputProps> = ({
                                                  query,
                                                  placeholder,
                                                  register,
                                                  disabled = false,
                                                  name,
                                                  readOnly = false
                                              }) => {

    return (
        <Paper
            component="span"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
        >
            <InputBase
                {...register(name)}
                sx={{ml: 1, flex: 1}}
                placeholder={placeholder}
                type="text"
                value={query}
                disabled={disabled}
                readOnly={readOnly}
            />
        </Paper>
    );
};

export default InputSearchComponent;
