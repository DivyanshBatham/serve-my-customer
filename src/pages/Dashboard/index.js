import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../../config/clientSdk';
import { Column, Text, Flex } from '../../atoms';
import { Loader } from '../../components';
import { StyledCard, StatNumber, StyledCardNotifier } from './styles';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: null
        }
    }

    componentDidMount() {
        // /companies/{companyId} 🏛 /sessions/{sessionId} 📦 
        const { companyId, uid } = this.props.user;

        this.activeSessionsListener =
            firestore.collection(`companies/${companyId}/sessions`).where('status', "==", "active")
                .onSnapshot((activeSessions) => {
                    let length = activeSessions.docs.length;
                    this.setState({
                        // activeSessions: activeSessions.docs.map(session => ({
                        //     id: session.id,
                        //     ...session.data()
                        // }))
                        activeSessionsCount: length < 10 ? '0' + length : length,
                        curEmployeeHasActiveSession: activeSessions.docs.findIndex(session => session.data().employeeId === uid) !== -1,
                    })
                }, (err) => {
                    console.log(err);
                });

        this.pendingSessionsListener =
            firestore.collection(`companies/${companyId}/sessions`).where('status', "==", "pending")
                .onSnapshot((pendingSessions) => {
                    let length = pendingSessions.docs.length;
                    this.setState({
                        pendingSessionsCount: length < 10 ? '0' + length : length
                    })
                }, (err) => {
                    console.log(err);
                });

        this.inactiveSessionsListener =
            firestore.collection(`companies/${companyId}/sessions`).where('status', "==", "inactive")
                .onSnapshot((inactiveSessions) => {
                    let length = inactiveSessions.docs.length;
                    this.setState({
                        inactiveSessionsCount: length < 10 ? '0' + length : length
                    })
                }, (err) => {
                    console.log(err);
                });

        this.completedSessionsListener =
            firestore.collection(`companies/${companyId}/sessions`).where('status', "==", "completed")
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
        const {
            activeSessionsCount,
            pendingSessionsCount,
            inactiveSessionsCount,
            completedSessionsCount,
            curEmployeeHasActiveSession
        } = this.state;
        return (
            <Column minHeight="100%">
                <h1>Dashboard</h1>

                <Flex justifyContent="center" flexWrap="wrap" m="1rem 0">
                    <StyledCard as={Link} to="/app/sessions/pending">
                        <Text fontSize="1rem" fontWeight="medium">Pending</Text>
                        <Text fontSize="1rem" fontWeight="medium">Sessions</Text>
                        <StatNumber>{pendingSessionsCount ?
                            pendingSessionsCount :
                            <Loader sizes={['1rem', '1.1rem', '1rem']} />}
                        </StatNumber>
                        {pendingSessionsCount > 0 && <StyledCardNotifier bg="primary" />}
                    </StyledCard>

                    <StyledCard as={Link} to="/app/sessions/active">
                        <Text fontSize="1rem" fontWeight="medium">Active</Text>
                        <Text fontSize="1rem" fontWeight="medium">Sessions</Text>
                        <StatNumber>{activeSessionsCount ?
                            activeSessionsCount :
                            <Loader sizes={['1rem', '1.1rem', '1rem']} />}
                        </StatNumber>
                        {curEmployeeHasActiveSession && <StyledCardNotifier bg="primary" />}
                    </StyledCard>

                    <StyledCard as={Link} to="/app/sessions/inactive">
                        <Text fontSize="1rem" fontWeight="medium">Inactive</Text>
                        <Text fontSize="1rem" fontWeight="medium">Sessions</Text>
                        <StatNumber>{inactiveSessionsCount ?
                            inactiveSessionsCount :
                            <Loader sizes={['1rem', '1.1rem', '1rem']} />}
                        </StatNumber>
                    </StyledCard>

                    <StyledCard as={Link} to="/app/sessions/completed">
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
            </Column>
        );
    }
}

export default Dashboard;