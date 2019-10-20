import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { firestore } from '../../config/clientSdk';
import { Container, Flex, Text } from '../../atoms';
import { Loader } from '../../components';
import { StyledCard, StatNumber, StyledCardNotifier } from './styles';

class Sessions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: null
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
        console.log(this.props.match.params);
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

            </Container>
        );
    }
}

export default Sessions;