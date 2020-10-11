import React from 'react';
import styled from "styled-components";
import palette from "../utils/palette";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem !important;
    font-size: 0.8rem;
`;

const Label = styled.div`
    color: ${palette.gray};
`;

const Value = styled.div`
    color: ${palette.green};
    font-weight: bold;
`;

const InfoItem = ({label, value}) => {
    return (
        <Container>
            <Label>{label}</Label>
            <Value>{value}</Value>
        </Container>
    );
};

export default InfoItem;