import React from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
`;

const StyledButton = withStyles({
    root: {
        borderRadius: "5rem",
        "& + &": {
            marginLeft: "0.5rem",
        }
    },
})(Button);

const MoveSteps = ({ movePrev, moveNext, validate, finish }) => {
    const handleMoveNext = () => {
        if (validate && !validate()) {
            return;
        }
        moveNext();
    };
    const handleFinish = () => {
        if (validate && !validate()) {
            return;
        }
        finish();
    };

    return (
        <Container>
            {movePrev && (
                <StyledButton variant="contained" color="default" size="small" onClick={movePrev}>
                    이전
                </StyledButton>
            )}
            {moveNext && (
                <StyledButton variant="contained" color="primary" size="small" onClick={handleMoveNext}>
                    다음
                </StyledButton>
            )}
            {finish && (
                <StyledButton variant="contained" color="secondary" size="small" onClick={handleFinish}>
                    신청하기
                </StyledButton>
            )}
        </Container>
    );
};

export default MoveSteps;
