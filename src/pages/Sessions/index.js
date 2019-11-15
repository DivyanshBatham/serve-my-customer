import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import TimeAgo from 'react-timeago'
import { firestore } from '../../config/clientSdk';
import { Column, Flex, Text, Box } from '../../atoms';
import { Loader, FlexCard } from '../../components';
import { StyledCard, StatNumber, StyledCardNotifier, StyledRow } from './styles';
import englishString from 'react-timeago/lib/language-strings/en-short'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
 
const formatter = buildFormatter(englishString)

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
            firestore.collection(`companies/${companyId}/sessions`)
                .where('status', "==", "active")
                .orderBy('startTimestamp')
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
            firestore.collection(`companies/${companyId}/sessions`)
                .where('status', "==", "pending")
                .orderBy('receivedTimestamp')
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
            firestore.collection(`companies/${companyId}/sessions`)
                .where('status', "==", "inactive")
                .orderBy('startTimestamp')
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
            firestore.collection(`companies/${companyId}/sessions`)
                .where('status', "==", "completed")
                .orderBy('endTimestamp', 'desc')
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

        let sessions, timestampField;
        switch (status) {
            case 'pending':
                sessions = pendingSessions;
                timestampField = 'receivedTimestamp';
                break;
            case 'active':
                sessions = activeSessions;
                timestampField = 'startTimestamp';
                break;
            case 'inactive':
                sessions = inactiveSessions;
                timestampField = 'startTimestamp';
                break;
            default:
                sessions = completedSessions;
                timestampField = 'endTimestamp';
                break;
        }

        if (sessions && sessions.length > 0) {
            return (
                sessions.map((session, index) => (
                    <StyledRow as={Link} to={`/app/sessions/${session.id}`} mb="1rem" key={session.id}>
                        <Flex.verticallyCenter  flex="1">
                            <Text mr="1rem" minWidth="25px">{index + 1}.</Text>
                            <Text mr="1rem" minWidth="200px">{session.customerName}</Text>
                            <Text.italics mr="1rem" minWidth="260px">{session.customerEmail}</Text.italics>
                            <Text mr="1rem" flex="1">Subject: {session.subject}</Text>
                            <Text mr="1rem">
                                {
                                    <TimeAgo date={session[timestampField].toDate()} formatter={formatter}/>
                                }
                            </Text>
                        </Flex.verticallyCenter>
                        <Flex.verticallyCenter width="1rem">
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
                            <Loader bg={status === "pending" ? 'tertiaryText' : 'primary'} sizes={['1rem', '1.1rem', '1rem']} />}
                        </StatNumber>
                        {
                            pendingSessionsCount > 0 &&
                            <StyledCardNotifier bg={status !== 'pending' ? 'primary' : 'tertiaryText'} />
                        }
                    </StyledCard>

                    <StyledCard as={NavLink} to="/app/sessions/active">
                        <Text fontSize="1rem" fontWeight="medium">Active</Text>
                        <Text fontSize="1rem" fontWeight="medium">Sessions</Text>
                        <StatNumber>{activeSessionsCount ?
                            activeSessionsCount :
                            <Loader bg={status === "active" ? 'tertiaryText' : 'primary'} sizes={['1rem', '1.1rem', '1rem']} />}
                        </StatNumber>
                        {
                            curEmployeeHasActiveSession &&
                            <StyledCardNotifier bg={status !== 'active' ? 'primary' : 'tertiaryText'} />
                        }
                    </StyledCard>

                    <StyledCard as={NavLink} to="/app/sessions/inactive">
                        <Text fontSize="1rem" fontWeight="medium">Inactive</Text>
                        <Text fontSize="1rem" fontWeight="medium">Sessions</Text>
                        <StatNumber>{inactiveSessionsCount ?
                            inactiveSessionsCount :
                            <Loader bg={status === "inactive" ? 'tertiaryText' : 'primary'} sizes={['1rem', '1.1rem', '1rem']} />}
                        </StatNumber>
                    </StyledCard>

                    <StyledCard as={NavLink} to="/app/sessions/completed">
                        <Text fontSize="1rem" fontWeight="medium">Completed</Text>
                        <Text fontSize="1rem" fontWeight="medium">Sessions</Text>
                        <StatNumber>{completedSessionsCount ?
                            completedSessionsCount :
                            <Loader bg={status === "completed" ? 'tertiaryText' : 'primary'} sizes={['1rem', '1.1rem', '1rem']} />}
                        </StatNumber>
                    </StyledCard>
                </Flex>

                {this.renderSessionList(status)}

            </Column>
        );
    }
}

export default Sessions;