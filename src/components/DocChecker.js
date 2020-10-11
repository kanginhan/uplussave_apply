import React, { useState } from "react";
import { Icon, Dialog, Button, useMediaQuery } from "@material-ui/core";
import { withStyles, useTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import palette from "../utils/palette";

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 0.7rem;
    background-color: ${(props) => (props.check ? palette.yellow : palette.light_gray)};
    font-size: 0.87rem;
    border-radius: 0.2rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    cursor: pointer;
`;

const CheckIcon = styled(Icon)`
    color: ${(props) => (props.check ? "black" : palette.gray)};
`;
const Label = styled.div`
    margin-left: 0.5rem;
`;

const DocContents = styled.div`
    font-size: 0.8rem;
    padding: 1rem;
`;

const HeaderBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    left: 0;
    top: 0;
    right: 0;
    padding: 1rem;
    color: white;
    background-color: ${palette.deep_indigo};
`;

const FooterBar = styled.div`
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
`;

const FooterButton = withStyles({
    root: {
        borderRadius: 0,
        backgroundColor: palette.yellow,
        width: "100%",
        padding: "0.7rem",
        "&:hover": {
            backgroundColor: palette.yellow,
        },
        "&:active": {
            backgroundColor: palette.yellow,
        },
    },
})(Button);

const DocChecker = ({ children, check, title, hadleAgree }) => {
    const [docOpen, setDocOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleClickChecker = () => setDocOpen(true);
    const handleDocClose = () => setDocOpen(false);
    const handleClickAgree = () => {
        setDocOpen(false);
        hadleAgree();
    };

    return (
        <>
            <Container check={check} onClick={handleClickChecker}>
                <CheckIcon fontSize="small" check={check}>
                    {check ? "check" : "check_circle_outlined"}
                </CheckIcon>
                <Label>{title}</Label>
                <div></div>
                <Icon>chevron_right</Icon>
            </Container>

            <Dialog fullScreen={fullScreen} open={docOpen} onClose={handleDocClose}>
                <HeaderBar>
                    <Icon>description</Icon>
                    {title}
                    <div></div>
                </HeaderBar>

                <DocContents>{children}</DocContents>
                <FooterBar>
                    <FooterButton variant="contained" disableElevation onClick={handleClickAgree}>
                        동의합니다
                    </FooterButton>
                </FooterBar>
            </Dialog>
        </>
    );
};

export default DocChecker;
