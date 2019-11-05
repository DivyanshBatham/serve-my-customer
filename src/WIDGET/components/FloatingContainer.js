import styled from 'styled-components';

const FloatingContainer = styled.div`
    position: fixed;
    bottom: 5.5rem;
    right: 1.5rem;
    background-color: ${props => props.theme.colors.offWhite};
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 2px 4px 36px 0 rgba(46,61,73,.3);
    overflow: hidden;
    width: 350px;

    &.hide {
      display: none;
    }
`;

FloatingContainer.displayName = 'FloatingContainer';

export default FloatingContainer;