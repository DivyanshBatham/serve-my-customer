
import styled from 'styled-components';
import IconContainer from '../../atoms/IconContainer';


const Rating = styled(IconContainer)`
    font-size: 1.6rem;
    /* color: ${props => props.theme.colors.secondaryText}; */
    color: #d3d8de;
    cursor: pointer;
    
    &.active, &:hover {
        color: ${props => props.theme.colors.primary};
    }
`;

Rating.displayName = 'Rating';

export default Rating;