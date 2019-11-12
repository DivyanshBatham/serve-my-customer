import styled from 'styled-components';

const Heading = styled.div`
    position: absolute;
    transition: ${props => props.theme.transition};
    left: ${props => props.step === 1 ? '2rem' : '4.5rem'};
    color: ${props => props.theme.colors.white};
    font-size: 2rem;
    font-weight: medium;
    font-family: ${props => props.theme.fonts.pacifico};
    background-color: ${props => props.theme.colors.primary};
`;

Heading.displayName = 'Heading';

export default Heading;