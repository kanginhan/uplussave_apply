import React from "react";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import styled from "styled-components";

const StyledControl = styled(FormControl)`
    /* min-width: 300px; */
    margin-bottom: 1rem !important;
`;

const StyledSelect = styled(Select)`
    font-size: 0.9rem !important;
`;

const SelectControl = ({ name, value, label, options, onChange }) => {
    const handleChange = (e) => onChange(e.target.value);

    return (
        <StyledControl>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <StyledSelect native autoWidth inputProps={{ name }} value={value} onChange={handleChange}>
                {options.map((option, i) => {
                    return <option key={i} value={option}>{option}</option>;
                })}
            </StyledSelect>
        </StyledControl>
    );
};

export default SelectControl;
