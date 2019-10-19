import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../config/clientSdk';
import { ConditionalLoader } from '../../components';
import { Column, Button, Flex } from '../../atoms';
import { Form, AuthTextField, AuthLink, ErrorText } from './authStyles';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            error: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        }, async () => {
            const { email, password } = this.state;
            try {
                const res = await auth.signInWithEmailAndPassword(email, password);
                console.log(res);
            } catch (err) {
                console.log(err);
                this.setState({
                    loading: false,
                    error: err.message
                })
            }
        });
    }

    render() {
        const { email, password, loading, error } = this.state;

        return (
            <ConditionalLoader showLoader={loading}>
                <Column alignItems="center" p="1rem">
                    <h1>Serve My Customer</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <AuthTextField
                            type="text"
                            name="email"
                            aria-label="Email"
                            placeholder="Email"
                            value={email}
                            onChange={this.handleChange}
                        />
                        <AuthTextField
                            type="password"
                            name="password"
                            aria-label="Password"
                            placeholder="Password"
                            value={password}
                            onChange={this.handleChange}
                        />

                        {error && <ErrorText>* {error}</ErrorText>}

                        <Flex.spaceBetween alignItems="center" mt="2rem">
                            <AuthLink as={Link} to="/register" fontSize="0.9rem">New user? Create an account</AuthLink>
                            <Button type="submit">Login</Button>
                        </Flex.spaceBetween>

                    </Form>
                </Column>
            </ConditionalLoader >
        );
    }
}

export default Login;