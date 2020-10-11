import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import palette from "../../utils/palette";
import InputControl from "../InputControl";
import SearchAddress from "../SearchAddress";
import MoveSteps from "../MoveSteps";

const StyledFormControlLabel = withStyles({
    root: {
        color: palette.gray,
        marginTop: "1rem",
        marginLeft: "0",
        "& .MuiTypography-body1": {
            fontSize: "0.8rem",
            marginLeft: "0.5rem",
        },
        "& .PrivateSwitchBase-root-3": {
            padding: "0",
        },
    },
})(FormControlLabel);

const SubContainer = styled.div`
    display: flex;
    align-items: center;
`;

const DeliveryInfo = ({ applyData, setApplyData, movePrev, moveNext, showAlert }) => {
    const validate = () => {
        if (!applyData.rname) {
            showAlert("수령인을 입력해 주시기 바랍니다");
            return false;
        }
        if (!applyData.rhp) {
            showAlert("배송지 연락처를 입력해 주시기 바랍니다");
            return false;
        }
        if (!applyData.rzip) {
            showAlert("배송지 우편번호를 입력해 주시기 바랍니다");
            return false;
        }
        if (!applyData.raddr1) {
            showAlert("배송지 주소를 입력해 주시기 바랍니다");
            return false;
        }
        if (!applyData.raddr2) {
            showAlert("배송지 상세주소를 입력해 주시기 바랍니다");
            return false;
        }
        return true;
    };
    const applyOf = (key) => (x) => setApplyData({ ...applyData, [key]: x });
    const handleAddress = (zip, addr) => {
        setApplyData({ ...applyData, rzip: zip, raddr1: addr });
    };
    const handleCopyAddress = (e) => {
        if (e.target.checked) {
            setApplyData({
                ...applyData,
                raddr_copy: e.target.checked,
                rzip: applyData.zip,
                raddr1: applyData.addr1,
                raddr2: applyData.addr2,
            });
        } else {
            setApplyData({ ...applyData, raddr_copy: e.target.checked });
        }
    };

    return (
        <>
            <InputControl
                name="rname"
                label="수령인*"
                value={applyData.rname}
                onChange={applyOf("rname")}
                maxLength="20"
            ></InputControl>
            <InputControl
                name="rhp"
                label="배송지 연락처*"
                value={applyData.rhp}
                onChange={applyOf("rhp")}
                phoneNumber
            ></InputControl>

            <StyledFormControlLabel
                control={<Checkbox value={applyData.raddr_copy} color="default" onChange={handleCopyAddress} />}
                label="가입정보 주소와 동일합니다"
            />
            <SubContainer>
                <InputControl
                    name="rzip"
                    label="배송지 우편번호*"
                    value={applyData.rzip}
                    onChange={applyOf("rzip")}
                    maxLength="20"
                    numberOnly
                    disabled={applyData.raddr_copy}
                ></InputControl>
                <SearchAddress onComplete={handleAddress}></SearchAddress>
            </SubContainer>

            <InputControl
                name="raddr1"
                label="배송지 주소*"
                value={applyData.raddr1}
                onChange={applyOf("raddr1")}
                maxLength="100"
                disabled={applyData.raddr_copy}
            ></InputControl>
            <InputControl
                name="raddr2"
                label="배송지 상세주소*"
                value={applyData.raddr2}
                onChange={applyOf("raddr2")}
                maxLength="100"
                disabled={applyData.raddr_copy}
            ></InputControl>

            <MoveSteps movePrev={movePrev} moveNext={moveNext} validate={validate}></MoveSteps>
        </>
    );
};

export default DeliveryInfo;
