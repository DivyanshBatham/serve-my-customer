import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { firestore } from '../../config/clientSdk';
import { Column, Flex, Text, Box } from '../../atoms';
import { Loader, FlexCard } from '../../components';
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
        const { companyId, uid } = this.props.user;

        this.activeSessionsListener =
            firestore.collection(`companies/${companyId}/sessions`).where('status', "==", "active")
                .onSnapshot((activeSessions) => {
                    let length = activeSessions.docs.length;
                    let activeSessionsData = [];
                    let curEmployeeHasActiveSession = false;

                    for (let session of activeSessions.docs) {
                        let sessionData = session.data();
                        let isCurEmployeeSession = false;
                        if (sessionData.employeeId === uid) {
                            curEmployeeHasActiveSession = true;
                            isCurEmployeeSession = true;
                        }

                        activeSessionsData.push({
                            id: session.id,
                            ...sessionData,
                            isCurEmployeeSession
                        });
                    }
                    this.setState({
                        activeSessions: activeSessionsData,
                        curEmployeeHasActiveSession,
                        activeSessionsCount: length < 10 ? '0' + length : length
                    })
                }, (err) => {
                    console.log(err);
                });

        this.pendingSessionsListener =
            firestore.collection(`companies/${companyId}/sessions`).where('status', "==", "pending")
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
            firestore.collection(`companies/${companyId}/sessions`).where('status', "==", "inactive")
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
            firestore.collection(`companies/${companyId}/sessions`).where('status', "==", "completed")
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
        const {
            activeSessions,
            pendingSessions,
            inactiveSessions,
            completedSessions,
        } = this.state;

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

        if (sessions && sessions.length > 0) {
            return (
                sessions.map((session, index) => (
                    <StyledRow as={Link} to={`/app/sessions/${session.id}`} mb="1rem" key={session.id}>
                        <Flex.verticallyCenter>
                            <Text mr="2rem">{index + 1}.</Text>
                            <Text mr="2rem">{session.customerName}</Text>
                            <Text.italics mr="2rem">{session.customerEmail}</Text.italics>
                            <Text mr="2rem">Subject: {session.subject}</Text>
                        </Flex.verticallyCenter>
                        <Flex.verticallyCenter>
                            {
                                session.isCurEmployeeSession &&
                                <Box size="1rem" borderRadius="100%" bg="primary" />
                            }
                        </Flex.verticallyCenter>
                    </StyledRow>))
            );
        } else {
            return <FlexCard>
                {sessions && sessions.length === 0 ? (
                    <Text.span fontSize="1.1rem">No {status} sessions.</Text.span>
                ) : (
                        <Loader sizes={['1rem', '1.1rem', '1rem']} />
                    )
                }
            </FlexCard>
        }

    }

    render() {
        const { status } = this.props.match.params;
        const {
            activeSessionsCount,
            pendingSessionsCount,
            inactiveSessionsCount,
            completedSessionsCount,
            curEmployeeHasActiveSession
        } = this.state;

        return (
            <Column minHeight="100%">
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
                        <StyledCardNotifier bg={curEmployeeHasActiveSession && status !== 'active' ? 'primary' : 'white'} />
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

            </Column>
        );
    }
}

export default Sessions;