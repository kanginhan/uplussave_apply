import React from "react";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import palette from "../utils/palette";

const Container = styled.div`
    background-color: ${palette.pink};
    padding-top: 5%;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 5%;
    color: white;
`;

const LogoName = styled(Typography)`
    margin-bottom: 0.5rem !important;
`;

const Header = () => {
    return (
        <Container>
            <LogoName variant="body2">(주)인화 네트워크 U+ 알뜰모바일</LogoName>
            <Typography variant="h5">온라인 신청서</Typography>
        </Container>
    );
};

export default Header;
