import React, { useState, useEffect, useRef } from "react";
import { Stepper, Step, StepLabel, StepContent } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import styled from "styled-components";
import emailjs from "emailjs-com";
import {
    callplanOptions,
    hpcolorOptions,
    pay_gubunOptions,
    pay_methodOptions,
    paper_methodOptions,
} from "./utils/constants";
import SnackAlert from "./components/SnackAlert";
import Header from "./components/Header";
import BasicInfo from "./components/steps/BasicInfo";
import ApplicantInfo from "./components/steps/ApplicantInfo";
import FeeInfo from "./components/steps/FeeInfo";
import DeliveryInfo from "./components/steps/DeliveryInfo";
import RecieptInfo from "./components/steps/RecieptInfo";

const Container = styled.div`
    margin: auto;
    max-width: 500px;
`;

const AlertMessage = styled(Alert)`
    font-size: 0.7rem !important;
    padding-top: 3px !important;
    padding-bottom: 3px !important;
`;

function App() {
    const [activeStep, setActiveStep] = useState(0);
    const [completeSteps, setCompleteSteps] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [applyData, setApplyData] = useState({
        callplan: callplanOptions[0], //요금제
        hpcolor: hpcolorOptions[0], //옵션
        conditionCheck: false, //판매조건 안내사항 동의
        uname: "", //가입자명
        birth: "", //생년월일
        hp2: "", //비상연락처
        email: "", //이메일
        zip: "", //우편번호
        addr1: "", //주소1
        addr2: "", //주소2
        hpnumber: "", //희망번호 4자리
        memo: "", //추가 요청사항
        minor: false, //미성년자 여부
        parent: "", //법정대리인 이름
        parent_birth: "", //법정대리인 생년월일
        parent_tel: "", //법정대리인 연락처
        parent_rel: "", //가입자와의 관계
        pay_gubun: pay_gubunOptions[0], //요금청구 방법
        pay_method: pay_methodOptions[0], //요금확인 방법
        paddr_copy: false, //요금청구 주소 복사여부
        pzip: "", //요금청구 우편번호
        paddr1: "", //요금청구 주소1
        paddr2: "", //요금청구 주소2
        bank: "", //은행명
        banknum: "", //계좌번호
        bankowner: "", //예금주
        owner_real: "", //가입자와의 관계
        owner_birth: "", //예금주 생년월일
        rname: "", //수령인
        rhp: "", //배송지 연락처
        raddr_copy: false, //요금청구 주소 복사여부
        rzip: "", //요금청구 우편번호
        raddr1: "", //요금청구 주소1
        raddr2: "", //요금청구 주소2
        paper_method: paper_methodOptions[0], //구비서류 접수방법
        contractCheck: false, //약정관련 동의
        privateInfoCheck: false, //약관 동의서 및 개인정보 취급방침
    });

    const regist_form = useRef(null);

    const movePrev = () => {
        completeSteps[activeStep] = false;
        completeSteps[activeStep - 1] = false;
        setCompleteSteps(completeSteps);
        setActiveStep(activeStep - 1);
    };
    const moveNext = () => {
        completeSteps[activeStep] = true;
        setCompleteSteps(completeSteps);
        setActiveStep(activeStep + 1);
    };

    const showAlert = (message) => {
        setAlertMessage(message);
        setAlertOpen(true);
    };
    const finish = () => {
        if (window.confirm("입력된 내용으로 신청하시겠습니까?")) {
            // emailjs.sendForm("service_z4l7v66", "template_603jw7e", regist_form.current);
            window.alert("U+ 알뜰폰 신청이 정상적으로 완료되었습니다\n빠른 시일내에 확인 후 연락드리도록 하겠습니다");
            setTimeout(function () {
                window.location.reload();
            }, 0);
        }
    };

    //emailjs 초기화
    useEffect(() => {
        emailjs.init("user_qlV684Rp5lGAe1yESBlBA");
    }, []);

    return (
        <Container>
            <Header></Header>

            <AlertMessage severity="success">
                작성하신 정보는 상담 및 접수 확인 외에 다른 용도로 사용되지 않습니다
            </AlertMessage>

            <form id="regist_form" ref={regist_form}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step completed={completeSteps[0]}>
                        <StepLabel>기본정보</StepLabel>
                        <StepContent>
                            <BasicInfo
                                applyData={applyData}
                                setApplyData={setApplyData}
                                moveNext={moveNext}
                                showAlert={showAlert}
                            ></BasicInfo>
                        </StepContent>
                    </Step>

                    <Step completed={completeSteps[1]}>
                        <StepLabel>가입자 정보</StepLabel>
                        <StepContent>
                            <ApplicantInfo
                                applyData={applyData}
                                setApplyData={setApplyData}
                                movePrev={movePrev}
                                moveNext={moveNext}
                                showAlert={showAlert}
                            ></ApplicantInfo>
                        </StepContent>
                    </Step>

                    <Step completed={completeSteps[2]}>
                        <StepLabel>요금청구 정보</StepLabel>
                        <StepContent>
                            <FeeInfo
                                applyData={applyData}
                                setApplyData={setApplyData}
                                movePrev={movePrev}
                                moveNext={moveNext}
                                showAlert={showAlert}
                            ></FeeInfo>
                        </StepContent>
                    </Step>

                    <Step completed={completeSteps[3]}>
                        <StepLabel>배송 정보</StepLabel>
                        <StepContent>
                            <DeliveryInfo
                                applyData={applyData}
                                setApplyData={setApplyData}
                                movePrev={movePrev}
                                moveNext={moveNext}
                                showAlert={showAlert}
                            ></DeliveryInfo>
                        </StepContent>
                    </Step>

                    <Step completed={completeSteps[4]}>
                        <StepLabel>구비서류 접수 및 최종신청</StepLabel>
                        <StepContent>
                            <RecieptInfo
                                applyData={applyData}
                                setApplyData={setApplyData}
                                movePrev={movePrev}
                                finish={finish}
                                showAlert={showAlert}
                            ></RecieptInfo>
                        </StepContent>
                    </Step>
                </Stepper>
            </form>

            <SnackAlert open={alertOpen} setOpen={setAlertOpen} message={alertMessage}></SnackAlert>
        </Container>
    );
}

export default App;
