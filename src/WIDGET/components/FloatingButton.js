import styled from 'styled-components';

const FloatingButton = styled.button`
    position: fixed;
    bottom: 1.5rem;
    right: 2rem;
    height: 3rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.colors.primary};
    border: none;
    border-radius: 100%;
    box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.2);
    cursor: pointer;
    color: ${props => props.theme.colors.tertiaryText};
    font-size: 1.2rem;

    &:hover,
    &:focus {
        outline: none;
        box-shadow: 2px 4px 8px 0 rgba(46, 61, 73, 0.2);
    }
`;

FloatingButton.displayName = 'FloatingButton';

export default FloatingButton;