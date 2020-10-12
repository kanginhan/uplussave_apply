import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import palette from "../../utils/palette";
import { pay_gubunOptions, pay_methodOptions } from "../../utils/constants";
import MoveSteps from "../MoveSteps";
import InputControl from "../InputControl";
import SelectControl from "../SelectControl";
import SearchAddress from "../SearchAddress";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const SubContainer = styled.div`
    display: flex;
    align-items: center;
`;

const SubTitle = styled.div`
    font-size: 0.8rem;
    color: ${palette.gray};
    margin-top: 0.5rem;
`;

const SubDescription = styled.div`
    font-size: 0.8rem;
    color: ${palette.pink};
    margin-top: 0.5rem;
`;

const StyledFormControlLabel = withStyles({
    root: {
        color: palette.gray,
        marginTop: "1rem",
        marginLeft: "0",
        "& .MuiTypography-body1": {
            fontSize: "0.8rem",
            marginLeft: "0.5rem",
        },
        "& .PrivateSwitchBase-root-6": {
            padding: "0",
        },
    },
})(FormControlLabel);

const FeeInfo = ({ applyData, setApplyData, movePrev, moveNext, showAlert }) => {
    const validate = () => {
        if (!applyData.pzip) {
            showAlert("요금청구 우편번호를 입력해 주시기 바랍니다");
            return false;
        }
        if (!applyData.paddr1) {
            showAlert("요금청구 주소를 입력해 주시기 바랍니다");
            return false;
        }
        if (!applyData.paddr2) {
            showAlert("요금청구 상세주소를 입력해 주시기 바랍니다");
            return false;
        }
        if (!applyData.bank) {
            showAlert("은행명을 입력해 주시기 바랍니다");
            return false;
        }
        if (!applyData.banknum) {
            showAlert("계좌번호를 입력해 주시기 바랍니다");
            return false;
        }
        if (!applyData.bankowner) {
            showAlert("예금주를 입력해 주시기 바랍니다");
            return false;
        }
        if (!applyData.owner_real) {
            showAlert("가입자와의 관계를 입력해 주시기 바랍니다");
            return false;
        }
        if (!applyData.owner_birth) {
            showAlert("예금주 생년월일을 입력해 주시기 바랍니다");
            return false;
        }

        return true;
    };
    const applyOf = (key) => (x) => setApplyData({ ...applyData, [key]: x });
    const handleAddress = (zip, addr) => {
        setApplyData({ ...applyData, pzip: zip, paddr1: addr });
    };
    const handleCopyAddress = (e) => {
        if (e.target.checked) {
            setApplyData({
                ...applyData,
                paddr_copy: e.target.checked,
                pzip: applyData.zip,
                paddr1: applyData.addr1,
                paddr2: applyData.addr2,
            });
        } else {
            setApplyData({ ...applyData, paddr_copy: e.target.checked });
        }
    };

    return (
        <Container>
            <SelectControl
                name="pay_gubun"
                label="요금청구 방법*"
                options={pay_gubunOptions}
                value={applyData.pay_gubun}
                onChange={applyOf("pay_gubun")}
            ></SelectControl>
            <SelectControl
                name="pay_method"
                label="요금확인 방법*"
                options={pay_methodOptions}
                value={applyData.pay_method}
                onChange={applyOf("pay_method")}
            ></SelectControl>

            <StyledFormControlLabel
                control={<Checkbox checked={applyData.paddr_copy} color="secondary" onChange={handleCopyAddress} />}
                label="가입정보 주소와 동일합니다"
            />
            <SubContainer>
                <InputControl
                    name="pzip"
                    label="요금청구 우편번호*"
                    value={applyData.pzip}
                    onChange={applyOf("pzip")}
                    maxLength="20"
                    numberOnly
                    disabled={applyData.paddr_copy}
                ></InputControl>
                <SearchAddress onComplete={handleAddress}></SearchAddress>
            </SubContainer>

            <InputControl
                name="paddr1"
                label="요금청구 주소*"
                value={applyData.paddr1}
                onChange={applyOf("paddr1")}
                maxLength="100"
                disabled={applyData.paddr_copy}
            ></InputControl>
            <InputControl
                name="paddr2"
                label="요금청구 상세주소*"
                value={applyData.paddr2}
                onChange={applyOf("paddr2")}
                maxLength="100"
                disabled={applyData.paddr_copy}
            ></InputControl>
            <br />
            <SubTitle>자동이체 정보</SubTitle>
            <InputControl
                name="bank"
                label="은행명*"
                value={applyData.bank}
                onChange={applyOf("bank")}
                maxLength="30"
            ></InputControl>
            <InputControl
                name="banknum"
                label="계좌번호*"
                value={applyData.banknum}
                onChange={applyOf("banknum")}
                maxLength="50"
                bankNumber
            ></InputControl>
            <InputControl
                name="bankowner"
                label="예금주*"
                value={applyData.bankowner}
                onChange={applyOf("bankowner")}
                maxLength="20"
            ></InputControl>
            <InputControl
                name="owner_real"
                label="가입자와의 관계*"
                value={applyData.owner_real}
                onChange={applyOf("owner_real")}
                maxLength="20"
            ></InputControl>
            <InputControl
                name="owner_birth"
                label="예금주 생년월일(6자리)*"
                value={applyData.owner_birth}
                onChange={applyOf("owner_birth")}
                maxLength="6"
                numberOnly
            ></InputControl>
            <SubDescription>
                ※ 자동이체 정보는 은행계좌로만 입력해야 합니다. ( 신용카드 입력 절대 불가. 추후 신용카드로 변경 가능 )
            </SubDescription>

            <MoveSteps movePrev={movePrev} moveNext={moveNext} validate={validate}></MoveSteps>
        </Container>
    );
};

export default FeeInfo;
