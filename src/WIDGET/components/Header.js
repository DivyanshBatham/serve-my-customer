import styled from 'styled-components';

const Header = styled.div`
    margin: -1rem -1rem 1rem -1rem;
    padding: 1rem 2rem 3.5rem;
    background: ${props => props.theme.colors.primary};
`;

Header.displayName = 'Header';

export default Header;