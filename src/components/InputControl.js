import React from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const StyledTextField = withStyles({
    root: {
        marginBottom: "1rem",
        "& .MuiInputBase-root": {
            fontSize: "0.9rem",
        },
        "& .MuiFormLabel-root": {
            fontSize: "0.9rem",
        },
    },
})(TextField);

const InputControl = ({
    name,
    label,
    value,
    onChange,
    maxLength,
    numberOnly,
    phoneNumber,
    bankNumber,
    disabled,
    multiline,
}) => {
    if (phoneNumber) {
        maxLength = 13;
    }
    const handleChange = (e) => onChange(e.target.value);
    const handleInput = (e) => {
        if (numberOnly || phoneNumber) {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
        } else if (bankNumber) {
            e.target.value = e.target.value.replace(/[^0-9-]/g, "");
        }
        if (phoneNumber) {
            e.target.value = getPhoneNumber(e.target.value);
        }
        if (maxLength && e.target.value.length > maxLength) {
            e.target.value = e.target.value.slice(0, maxLength);
        }
    };
    const getPhoneNumber = (str) => {
        var tmp = "";
        if (str.length < 4) {
            return str;
        } else if (str.length < 7) {
            tmp += str.substr(0, 3);
            tmp += "-";
            tmp += str.substr(3);
            return tmp;
        } else if (str.length < 11) {
            tmp += str.substr(0, 3);
            tmp += "-";
            tmp += str.substr(3, 3);
            tmp += "-";
            tmp += str.substr(6);
            return tmp;
        } else {
            tmp += str.substr(0, 3);
            tmp += "-";
            tmp += str.substr(3, 4);
            tmp += "-";
            tmp += str.substr(7);
            return tmp;
        }
    };

    return (
        <StyledTextField
            fullWidth
            multiline={multiline}
            rowsMax={4}
            id={name}
            name={name}
            label={label}
            size="small"
            value={value}
            onChange={handleChange}
            onInput={handleInput}
            disabled={disabled}
        />
    );
};

export default InputControl;
