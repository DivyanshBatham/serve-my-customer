import React, { Component } from 'react';
import { firestore } from '../../config/clientSdk';
import { Container, Text, Flex } from '../../atoms';
import { Loader } from '../../components';
import { StyledCard, StatNumber } from './styles';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: null
        }
    }

    componentDidMount() {
        // /companies/{companyId} 🏛 /sessions/{sessionId} 📦 
        let companyId = 'HLt6Aw07YQljGsU3Jg7x';

        this.activeSessionsListener =
            firestore.collection(`companies/${companyId}/sessions`).where('sessionStatus', "==", "active")
                .onSnapshot((activeSessions) => {
                    let length = activeSessions.docs.length;
                    this.setState({
                        // activeSessions: activeSessions.docs.map(session => ({
                        //     id: session.id,
                        //     ...session.data()
                        // }))
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

    render() {
        const { activeSessionsCount, pendingSessionsCount, inactiveSessionsCount, completedSessionsCount } = this.state;
        return (
            <Container>
                <h1>Dashboard</h1>

                <Flex justifyContent="center" flexWrap="wrap" m="1rem 0">
                    <StyledCard>
                        <Text fontSize="1rem" fontWeight="medium">Pending</Text>
                        <Text fontSize="1rem" fontWeight="medium">Requests</Text>
                        <StatNumber color={pendingSessionsCount > 0 ? 'primary' : null}>{pendingSessionsCount ?
                            pendingSessionsCount :
                            <Loader sizes={['1rem', '1.1rem', '1rem']} />}
                        </StatNumber>
                    </StyledCard>

                    <StyledCard>
                        <Text fontSize="1rem" fontWeight="medium">Active</Text>
                        <Text fontSize="1rem" fontWeight="medium">Sessions</Text>
                        <StatNumber>{activeSessionsCount ?
                            activeSessionsCount :
                            <Loader sizes={['1rem', '1.1rem', '1rem']} />}
                        </StatNumber>
                    </StyledCard>

                    <StyledCard>
                        <Text fontSize="1rem" fontWeight="medium">Inactive</Text>
                        <Text fontSize="1rem" fontWeight="medium">Sessions</Text>
                        <StatNumber>{inactiveSessionsCount ?
                            inactiveSessionsCount :
                            <Loader sizes={['1rem', '1.1rem', '1rem']} />}
                        </StatNumber>
                    </StyledCard>

                    <StyledCard>
                        <Text fontSize="1rem" fontWeight="medium">Completed</Text>
                        <Text fontSize="1rem" fontWeight="medium">Sessions</Text>
                        <StatNumber>{completedSessionsCount ?
                            completedSessionsCount :
                            <Loader sizes={['1rem', '1.1rem', '1rem']} />}
                        </StatNumber>
                    </StyledCard>
                </Flex>

                {/* <h3>Active Sessions:</h3>
                <ul>
                    {
                        activeSessions && activeSessions.map(session => <li key={session.id}>{session.customerEmail} + {session.id}</li>)
                    }
                </ul>
                <h3>Pending Sessions:</h3>
                <ul>
                    {
                        pendingSessions && pendingSessions.map(session => <li key={session.id}>{session.customerEmail} + {session.id}</li>)
                    }
                </ul> */}
            </Container>
        );
    }
}

export default Dashboard;