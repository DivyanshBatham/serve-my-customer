import styled from 'styled-components';
import { space } from 'styled-system'

const Step = styled.div`
    ${space}
    position: relative;
    /* background-color: red; */
    /* border: solid 5px red; */
    transition: transform .8s ease-in-out;
    transform: ${props => props.step === 1? 'translateX(0)': 'translateX(-100%) translateX(-2rem);'};
`;

Step.displayName = 'Step';

export default Step;