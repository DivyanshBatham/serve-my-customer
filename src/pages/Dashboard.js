import React, { Component } from 'react';
import { firestore } from '../config/clientSdk';
import { Container } from '../atoms';

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
                    console.log("New ActiveSessions Snapshot");
                    this.setState({
                        activeSessions: activeSessions.docs.map(session => ({
                            id: session.id,
                            ...session.data()
                        }))
                    })
                }, (err) => {
                    console.log(err);
                });
        this.pendingSessionsListener =
            firestore.collection(`companies/${companyId}/sessions`).where('sessionStatus', "==", "pending")
                .onSnapshot((pendingSessions) => {
                    console.log("New PendingSessions Snapshot");
                    this.setState({
                        pendingSessions: pendingSessions.docs.map(session => ({
                            id: session.id,
                            ...session.data()
                        }))
                    })
                }, (err) => {
                    console.log(err);
                });
    }

    componentWillUnmount() {
        this.activeSessionsListener();
        this.pendingSessionsListener();
    }

    render() {
        const { activeSessions, pendingSessions } = this.state;
        return (
            <Container>
                <h1>Dashboard</h1>
                <h3>Active Sessions:</h3>
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
                </ul>
            </Container>
        );
    }
}

export default Dashboard;