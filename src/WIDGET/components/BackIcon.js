import styled from 'styled-components';

const BackIcon = styled.div`
    position: absolute;
    transition: ${props => props.theme.transition};
    left: 2rem;
    color: ${props => props.theme.colors.tertiaryText};
    font-size: 2rem;
    font-weight: medium;
    font-family: ${props => props.theme.fonts.pacifico};
    cursor: pointer;
`;

BackIcon.displayName = 'BackIcon';

export default BackIcon;