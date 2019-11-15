
import styled from 'styled-components';
import IconContainer from '../../atoms/IconContainer';


const Rating = styled(IconContainer)`
    font-size: 1.6rem;
    /* color: #d3d8de; */
    color: ${props => props.theme.colors.secondaryText};
    cursor: pointer;
    
    &.active, &:hover {
        color: ${props => props.theme.colors.primary};
    }
`;

Rating.displayName = 'Rating';

export default Rating;