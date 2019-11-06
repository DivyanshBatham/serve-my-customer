import styled from 'styled-components';

const Subject = styled.div`
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 0.9rem;
`;

Subject.displayName = 'Subject';

export default Subject;