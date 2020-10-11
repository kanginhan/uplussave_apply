import React, { useState } from "react";
import { Dialog, Button } from "@material-ui/core";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

const SearchButton = styled(Button)`
    margin-left: 1rem !important;
`;

const Postcode = ({ onComplete }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.userSelectedType === "R") {
            fullAddress = data.roadAddress;
        } else {
            fullAddress = data.jibunAddress;
        }

        if (data.userSelectedType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        onComplete && onComplete(data.zonecode, fullAddress);
        setOpen(false);
    };

    return (
        <>
            <SearchButton variant="contained" color="secondary" size="small" onClick={handleClick}>
                검색
            </SearchButton>
            <Dialog open={open} onClose={handleClose}>
                <DaumPostcode onComplete={handleComplete} />
            </Dialog>
        </>
    );
};

export default Postcode;
