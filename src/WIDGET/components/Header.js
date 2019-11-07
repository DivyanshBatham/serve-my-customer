import styled from 'styled-components';

const Header = styled.div`
    margin: -1rem -1rem 1rem -1rem;
    /* padding: 1rem 2rem 3.5rem; */
    /* margin: -1rem -1rem 0rem -1rem; */
    background: ${props => props.theme.colors.primary};
    position: relative;
    height: 128px;
    padding: 1rem 2rem 0rem;
    box-sizing: border-box;
`;

Header.displayName = 'Header';

export default Header;