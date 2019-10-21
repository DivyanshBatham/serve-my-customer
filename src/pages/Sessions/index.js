import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { firestore } from '../../config/clientSdk';
import { Container, Flex, Text } from '../../atoms';
import { Loader } from '../../components';
import { StyledCard, StatNumber, StyledCardNotifier, StyledRow, StyledIconContainer } from './styles';

class Sessions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: null
        }
    }

    componentDidMount() {
        // /companies/{companyId} 🏛 /sessions/ 📦 
        let companyId = 'HLt6Aw07YQljGsU3Jg7x';

        this.activeSessionsListener =
            firestore.collection(`companies/${companyId}/sessions`).where('sessionStatus', "==", "active")
                .onSnapshot((activeSessions) => {
                    let length = activeSessions.docs.length;
                    this.setState({
                        activeSessions: activeSessions.docs.map(session => ({
                            id: session.id,
                            ...session.data()
                        })),
                        activeSessionsCount: length < 10 ? '0' + length : length
                    })
                }, (err) => {
                    console.log(err);
                });

        this.pendingSessionsListener =
            firestore.collection(`companies/${companyId}/sessions`).where('sessionStatus', "==", "pending")
                .onSnapshot((pendingSessions) => {
                    let length = pendingSessions.docs.length;
                    this.setState({
                        pendingSessions: pendingSessions.docs.map(session => ({
                            id: session.id,
                            ...session.data()
                        })),
                        pendingSessionsCount: length < 10 ? '0' + length : length
                    })
                }, (err) => {
                    console.log(err);
                });

        this.inactiveSessionsListener =
            firestore.collection(`companies/${companyId}/sessions`).where('sessionStatus', "==", "inactive")
                .onSnapshot((inactiveSessions) => {
                    let length = inactiveSessions.docs.length;
                    this.setState({
                        inactiveSessions: inactiveSessions.docs.map(session => ({
                            id: session.id,
                            ...session.data()
                        })),
                        inactiveSessionsCount: length < 10 ? '0' + length : length
                    })
                }, (err) => {
                    console.log(err);
                });

        this.completedSessionsListener =
            firestore.collection(`companies/${companyId}/sessions`).where('sessionStatus', "==", "completed")
                .onSnapshot((completedSessions) => {
                    let length = completedSessions.docs.length;
                    this.setState({
                        completedSessions: completedSessions.docs.map(session => ({
                            id: session.id,
                            ...session.data()
                        })),
                        completedSessionsCount: length < 10 ? '0' + length : length
                    })
                }, (err) => {
                    console.log(err);
                });
    }

    componentWillUnmount() {
        this.activeSessionsListener();
        this.pendingSessionsListener();
        this.inactiveSessionsListener();
        this.completedSessionsListener();
    }

    renderSessionList = (status) => {
        const { activeSessions, pendingSessions, inactiveSessions, completedSessions } = this.state;
        let sessions;
        switch (status) {
            case 'pending':
                sessions = pendingSessions;
                break;
            case 'active':
                sessions = activeSessions;
                break;
            case 'inactive':
                sessions = inactiveSessions;
                break;
            default:
                sessions = completedSessions;
                break;
        }
        return (
            sessions ? (
                sessions.map((session, index) => (
                    <StyledRow as={Link} to={`/app/sessions/${session.id}`} m="1rem 0" key={session.id}>
                        <Flex.verticallyCenter>
                            <Text mr="2rem">{index + 1}.</Text>
                            <Text mr="2rem">{session.customerName}</Text>
                            <Text.italics mr="2rem">{session.customerEmail}</Text.italics>
                            <Text mr="2rem">Subject: {session.sessionSubject}</Text>
                        </Flex.verticallyCenter>
                        <Flex.verticallyCenter>
                            <StyledIconContainer>
                                <FontAwesomeIcon
                                    icon="comment-medical"
                                />
                            </StyledIconContainer>
                        </Flex.verticallyCenter>
                    </StyledRow>))
            ) : (
                    <StyledRow justifyContent="center" m="1rem 0">
                        <Loader sizes={['0.8rem', '0.9rem', '0.8rem']} />
                    </StyledRow>
                )
        );
    }

    render() {
        const { status } = this.props.match.params;
        const { activeSessionsCount, pendingSessionsCount, inactiveSessionsCount, completedSessionsCount } = this.state;
        return (
            <Container>
                <h1>Sessions</h1>

                <Flex justifyContent="center" flexWrap="wrap" m="1rem 0">
                    <StyledCard as={NavLink} to="/app/sessions/pending">
                        <Text fontSize="1rem" fontWeight="medium">Pending</Text>
                        <Text fontSize="1rem" fontWeight="medium">Sessions</Text>
                        <StatNumber>{pendingSessionsCount ?
                            pendingSessionsCount :
                            <Loader bg={status === "pending" ? 'white' : 'primary'} sizes={['1rem', '1.1rem', '1rem']} />}
                        </StatNumber>
                        <StyledCardNotifier bg={pendingSessionsCount > 0 && status !== 'pending' ? 'primary' : 'white'} />
                    </StyledCard>

                    <StyledCard as={NavLink} to="/app/sessions/active">
                        <Text fontSize="1rem" fontWeight="medium">Active</Text>
                        <Text fontSize="1rem" fontWeight="medium">Sessions</Text>
                        <StatNumber>{activeSessionsCount ?
                            activeSessionsCount :
                            <Loader bg={status === "active" ? 'white' : 'primary'} sizes={['1rem', '1.1rem', '1rem']} />}
                        </StatNumber>
                    </StyledCard>

                    <StyledCard as={NavLink} to="/app/sessions/inactive">
                        <Text fontSize="1rem" fontWeight="medium">Inactive</Text>
                        <Text fontSize="1rem" fontWeight="medium">Sessions</Text>
                        <StatNumber>{inactiveSessionsCount ?
                            inactiveSessionsCount :
                            <Loader bg={status === "inactive" ? 'white' : 'primary'} sizes={['1rem', '1.1rem', '1rem']} />}
                        </StatNumber>
                    </StyledCard>

                    <StyledCard as={NavLink} to="/app/sessions/completed">
                        <Text fontSize="1rem" fontWeight="medium">Completed</Text>
                        <Text fontSize="1rem" fontWeight="medium">Sessions</Text>
                        <StatNumber>{completedSessionsCount ?
                            completedSessionsCount :
                            <Loader bg={status === "completed" ? 'white' : 'primary'} sizes={['1rem', '1.1rem', '1rem']} />}
                        </StatNumber>
                    </StyledCard>
                </Flex>

                {this.renderSessionList(status)}

            </Container>
        );
    }
}

export default Sessions;