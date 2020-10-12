import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    text-align: center;
    margin-top: 3rem;
    line-height: 3rem;
    font-size: 1.2rem;
    font-weight: lighter;
`;

const Success = () => {
    return (
        <Container>
            U+ 알뜰폰 신청이 정상적으로 완료되었습니다<br/>
            빠른 시일내에 확인 후 연락드리도록 하겠습니다 : )
        </Container>
    );
};

export default Success;