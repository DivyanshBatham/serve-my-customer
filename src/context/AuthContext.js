import React, { Component } from 'react';
import { auth } from '../config/clientSdk';
import { FullPageLoader } from '../components';

export const AuthContext = React.createContext();

class AuthContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            fetchingAuthState: true,
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await auth.currentUser.getIdTokenResult();
                const { token: idToken } = idTokenResult;
                const { admin, companyId } = idTokenResult.claims;
                this.setState({
                    fetchingAuthState: false,
                    user: {
                        displayName: user.displayName,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        photoURL: user.photoURL,
                        isAnonymous: user.isAnonymous,
                        uid: user.uid,
                        providerData: user.providerData,
                        idToken,
                        companyId,
                        admin
                    }
                });
            } else {
                this.setState({
                    fetchingAuthState: false,
                    user: null
                })
            }
        });
    }

    render() {
        const { fetchingAuthState } = this.state;

        return (
            <AuthContext.Provider value={this.state}>
                {fetchingAuthState ?
                    <FullPageLoader />
                    :
                    this.props.children
                }
            </AuthContext.Provider>
        );
    }
}

export default AuthContextProvider;