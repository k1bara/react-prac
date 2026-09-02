/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";

const ButtonContainer = ({ children, className, width, ...props }) => {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

export const Button = styled(ButtonContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    font-size: 18px;
    width: ${({ width = "100%" }) => width};
    height: 32px;
    background-color: #eee;
    &:hover {
        cursor: pointer;
    }
`;
